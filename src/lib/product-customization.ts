export type CustomizationDimension = {
  min?: number
  max?: number
  default?: number
  unit?: string
  pricePerExtraUnit?: number
}

export type PricedOption = {
  name: string
  price?: number
}

export type CustomizationOptionValue = string | PricedOption

export type ProductCustomizationOptions = {
  colors?: CustomizationOptionValue[]
  materials?: CustomizationOptionValue[]
  dimensions?: {
    width?: CustomizationDimension
    length?: CustomizationDimension
    height?: CustomizationDimension
  }
  addOns?: Array<{
    name: string
    price?: number
  }>
  shopifyOptions?: Array<{
    name: string
    values: CustomizationOptionValue[]
  }>
  optionLabels?: Array<{
    name: string
    values: CustomizationOptionValue[]
  }>
}

type ProductLike = Record<string, unknown>

function readNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return undefined
}

export function splitCustomizationList(value: unknown): string[] | undefined {
  const entries = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(/[|,]/)
      : []

  const normalized = Array.from(
    new Set(
      entries
        .map((entry) => String(entry ?? '').trim())
        .filter(Boolean)
    )
  )

  return normalized.length > 0 ? normalized : undefined
}

function optionName(value: CustomizationOptionValue): string {
  return typeof value === 'string' ? value : value.name
}

function parsePricedOptionEntries(value: unknown): Map<string, number> {
  if (typeof value !== 'string' || !value.trim()) return new Map()

  const entries = value.split('|')
  const pricing = new Map<string, number>()

  for (const raw of entries) {
    const [namePart, pricePart] = raw.split(':')
    const name = String(namePart ?? '').trim()
    const price = readNumber(pricePart)
    if (name && price !== undefined) {
      pricing.set(name.toLowerCase(), price)
    }
  }

  return pricing
}

function normalizePricedOptions(
  values: unknown,
  pricingValue: unknown
): CustomizationOptionValue[] | undefined {
  if (Array.isArray(values)) {
    const normalized = values
      .map((entry) => {
        if (typeof entry === 'string') return entry.trim()
        if (!entry || typeof entry !== 'object') return null
        const option = entry as Record<string, unknown>
        const name = String(option.name ?? '').trim()
        if (!name) return null
        const price = readNumber(option.price)
        return price === undefined ? { name } : { name, price }
      })
      .filter(Boolean) as CustomizationOptionValue[]
    if (normalized.length === 0) return undefined

    const pricing = parsePricedOptionEntries(pricingValue)
    if (pricing.size === 0) return normalized

    return normalized.map((entry) => {
      const name = optionName(entry)
      const existingPrice = typeof entry === 'string' ? undefined : entry.price
      const price = existingPrice ?? pricing.get(name.toLowerCase())
      return price === undefined ? entry : { name, price }
    })
  }

  const names = splitCustomizationList(values)
  if (!names) return undefined

  const pricing = parsePricedOptionEntries(pricingValue)
  if (pricing.size === 0) return names

  return names.map((name) => {
    const price = pricing.get(name.toLowerCase())
    return price === undefined ? name : { name, price }
  })
}

export function parseCustomizationAddOns(value: unknown): ProductCustomizationOptions['addOns'] | undefined {
  if (Array.isArray(value)) {
    const addOns = value
      .map((entry) => {
        if (!entry || typeof entry !== 'object') return null
        const item = entry as Record<string, unknown>
        const name = String(item.name ?? '').trim()
        if (!name) return null
        return { name, price: readNumber(item.price) }
      })
      .filter(Boolean) as NonNullable<ProductCustomizationOptions['addOns']>
    return addOns.length > 0 ? addOns : undefined
  }

  if (typeof value !== 'string' || !value.trim()) return undefined

  const addOns = value
    .split('|')
    .map((raw) => {
      const [namePart, pricePart] = raw.split(':')
      const name = String(namePart ?? '').trim()
      if (!name) return null
      return { name, price: readNumber(pricePart) }
    })
    .filter(Boolean) as NonNullable<ProductCustomizationOptions['addOns']>

  return addOns.length > 0 ? addOns : undefined
}

function dimensionFromValues(
  minValue: unknown,
  maxValue: unknown,
  defaultValue: unknown,
  fallbackDefault?: unknown,
  unit = 'in',
  pricePerExtraUnitValue?: unknown
): CustomizationDimension | undefined {
  const min = readNumber(minValue)
  const max = readNumber(maxValue)
  const defaultNumber = readNumber(defaultValue) ?? readNumber(fallbackDefault)
  const pricePerExtraUnit = readNumber(pricePerExtraUnitValue)

  if (
    min === undefined &&
    max === undefined &&
    defaultNumber === undefined &&
    pricePerExtraUnit === undefined
  ) return undefined

  return {
    ...(min !== undefined ? { min } : {}),
    ...(max !== undefined ? { max } : {}),
    ...(defaultNumber !== undefined ? { default: defaultNumber } : {}),
    unit,
    ...(pricePerExtraUnit !== undefined ? { pricePerExtraUnit } : {}),
  }
}

export function buildCustomizationOptionsFromFlatFields(product: ProductLike): ProductCustomizationOptions | undefined {
  const colors = normalizePricedOptions(product.colors, product.colorPricing)
  const materials = normalizePricedOptions(product.materials, product.materialPricing)
  const addOns = parseCustomizationAddOns(product.addons ?? product.addOns)
  const dimensionFallbackPrice = product.dimensionPricePerInch ?? product.dimensionPricePerUnit
  const dimensions = {
    width: dimensionFromValues(
      product.widthMin,
      product.widthMax,
      product.widthDefault,
      product.width,
      'in',
      product.widthPricePerInch ?? dimensionFallbackPrice
    ),
    length: dimensionFromValues(
      product.lengthMin,
      product.lengthMax,
      product.lengthDefault,
      product.length,
      'in',
      product.lengthPricePerInch ?? dimensionFallbackPrice
    ),
    height: dimensionFromValues(
      product.heightMin,
      product.heightMax,
      product.heightDefault,
      product.height,
      'in',
      product.heightPricePerInch ?? dimensionFallbackPrice
    ),
  }

  const hasDimensions = Boolean(dimensions.width || dimensions.length || dimensions.height)
  const options: ProductCustomizationOptions = {
    ...(colors ? { colors } : {}),
    ...(materials ? { materials } : {}),
    ...(hasDimensions ? { dimensions } : {}),
    ...(addOns ? { addOns } : {}),
  }

  return Object.keys(options).length > 0 ? options : undefined
}

export function mergeCustomizationOptions(
  explicit: unknown,
  fallbackProduct: ProductLike
): ProductCustomizationOptions | undefined {
  const flatOptions = buildCustomizationOptionsFromFlatFields(fallbackProduct)
  if (!explicit || typeof explicit !== 'object' || Array.isArray(explicit)) return flatOptions

  const value = explicit as ProductCustomizationOptions
  const colors = normalizePricedOptions(value.colors, undefined)
  const materials = normalizePricedOptions(value.materials, undefined)
  const options: ProductCustomizationOptions = {
    ...flatOptions,
    ...(colors ? { colors } : {}),
    ...(materials ? { materials } : {}),
    ...(value.dimensions ? { dimensions: { ...flatOptions?.dimensions, ...value.dimensions } } : {}),
    ...(parseCustomizationAddOns(value.addOns) ? { addOns: parseCustomizationAddOns(value.addOns) } : {}),
    ...(Array.isArray(value.shopifyOptions) ? { shopifyOptions: value.shopifyOptions } : {}),
    ...(Array.isArray(value.optionLabels) ? { optionLabels: value.optionLabels } : {}),
  }

  return Object.keys(options).length > 0 ? options : undefined
}
