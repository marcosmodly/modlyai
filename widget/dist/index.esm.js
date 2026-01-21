import require$$0, { createContext, useContext, useRef, useEffect, useState, useMemo } from 'react';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production_min;

function requireReactJsxRuntime_production_min () {
	if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
	hasRequiredReactJsxRuntime_production_min = 1;
var f=require$$0,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
	function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;
	return reactJsxRuntime_production_min;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;

	if (process.env.NODE_ENV !== "production") {
	  (function() {

	var React = require$$0;

	// ATTENTION
	// When adding new symbols to this file,
	// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
	// The Symbol used to tag the ReactElement-like types.
	var REACT_ELEMENT_TYPE = Symbol.for('react.element');
	var REACT_PORTAL_TYPE = Symbol.for('react.portal');
	var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
	var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
	var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
	var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
	var REACT_CONTEXT_TYPE = Symbol.for('react.context');
	var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
	var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
	var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
	var REACT_MEMO_TYPE = Symbol.for('react.memo');
	var REACT_LAZY_TYPE = Symbol.for('react.lazy');
	var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator';
	function getIteratorFn(maybeIterable) {
	  if (maybeIterable === null || typeof maybeIterable !== 'object') {
	    return null;
	  }

	  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

	  if (typeof maybeIterator === 'function') {
	    return maybeIterator;
	  }

	  return null;
	}

	var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

	function error(format) {
	  {
	    {
	      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      printWarning('error', format, args);
	    }
	  }
	}

	function printWarning(level, format, args) {
	  // When changing this logic, you might want to also
	  // update consoleWithStackDev.www.js as well.
	  {
	    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
	    var stack = ReactDebugCurrentFrame.getStackAddendum();

	    if (stack !== '') {
	      format += '%s';
	      args = args.concat([stack]);
	    } // eslint-disable-next-line react-internal/safe-string-coercion


	    var argsWithFormat = args.map(function (item) {
	      return String(item);
	    }); // Careful: RN currently depends on this prefix

	    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
	    // breaks IE9: https://github.com/facebook/react/issues/13610
	    // eslint-disable-next-line react-internal/no-production-logging

	    Function.prototype.apply.call(console[level], console, argsWithFormat);
	  }
	}

	// -----------------------------------------------------------------------------

	var enableScopeAPI = false; // Experimental Create Event Handle API.
	var enableCacheElement = false;
	var enableTransitionTracing = false; // No known bugs, but needs performance testing

	var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
	// stuff. Intended to enable React core members to more easily debug scheduling
	// issues in DEV builds.

	var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

	var REACT_MODULE_REFERENCE;

	{
	  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
	}

	function isValidElementType(type) {
	  if (typeof type === 'string' || typeof type === 'function') {
	    return true;
	  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


	  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
	    return true;
	  }

	  if (typeof type === 'object' && type !== null) {
	    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
	    // types supported by any Flight configuration anywhere since
	    // we don't know which Flight build this will end up being used
	    // with.
	    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
	      return true;
	    }
	  }

	  return false;
	}

	function getWrappedName(outerType, innerType, wrapperName) {
	  var displayName = outerType.displayName;

	  if (displayName) {
	    return displayName;
	  }

	  var functionName = innerType.displayName || innerType.name || '';
	  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
	} // Keep in sync with react-reconciler/getComponentNameFromFiber


	function getContextName(type) {
	  return type.displayName || 'Context';
	} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


	function getComponentNameFromType(type) {
	  if (type == null) {
	    // Host root, text node or just invalid type.
	    return null;
	  }

	  {
	    if (typeof type.tag === 'number') {
	      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
	    }
	  }

	  if (typeof type === 'function') {
	    return type.displayName || type.name || null;
	  }

	  if (typeof type === 'string') {
	    return type;
	  }

	  switch (type) {
	    case REACT_FRAGMENT_TYPE:
	      return 'Fragment';

	    case REACT_PORTAL_TYPE:
	      return 'Portal';

	    case REACT_PROFILER_TYPE:
	      return 'Profiler';

	    case REACT_STRICT_MODE_TYPE:
	      return 'StrictMode';

	    case REACT_SUSPENSE_TYPE:
	      return 'Suspense';

	    case REACT_SUSPENSE_LIST_TYPE:
	      return 'SuspenseList';

	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_CONTEXT_TYPE:
	        var context = type;
	        return getContextName(context) + '.Consumer';

	      case REACT_PROVIDER_TYPE:
	        var provider = type;
	        return getContextName(provider._context) + '.Provider';

	      case REACT_FORWARD_REF_TYPE:
	        return getWrappedName(type, type.render, 'ForwardRef');

	      case REACT_MEMO_TYPE:
	        var outerName = type.displayName || null;

	        if (outerName !== null) {
	          return outerName;
	        }

	        return getComponentNameFromType(type.type) || 'Memo';

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            return getComponentNameFromType(init(payload));
	          } catch (x) {
	            return null;
	          }
	        }

	      // eslint-disable-next-line no-fallthrough
	    }
	  }

	  return null;
	}

	var assign = Object.assign;

	// Helpers to patch console.logs to avoid logging during side-effect free
	// replaying on render function. This currently only patches the object
	// lazily which won't cover if the log function was extracted eagerly.
	// We could also eagerly patch the method.
	var disabledDepth = 0;
	var prevLog;
	var prevInfo;
	var prevWarn;
	var prevError;
	var prevGroup;
	var prevGroupCollapsed;
	var prevGroupEnd;

	function disabledLog() {}

	disabledLog.__reactDisabledLog = true;
	function disableLogs() {
	  {
	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      prevLog = console.log;
	      prevInfo = console.info;
	      prevWarn = console.warn;
	      prevError = console.error;
	      prevGroup = console.group;
	      prevGroupCollapsed = console.groupCollapsed;
	      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

	      var props = {
	        configurable: true,
	        enumerable: true,
	        value: disabledLog,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        info: props,
	        log: props,
	        warn: props,
	        error: props,
	        group: props,
	        groupCollapsed: props,
	        groupEnd: props
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    disabledDepth++;
	  }
	}
	function reenableLogs() {
	  {
	    disabledDepth--;

	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      var props = {
	        configurable: true,
	        enumerable: true,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        log: assign({}, props, {
	          value: prevLog
	        }),
	        info: assign({}, props, {
	          value: prevInfo
	        }),
	        warn: assign({}, props, {
	          value: prevWarn
	        }),
	        error: assign({}, props, {
	          value: prevError
	        }),
	        group: assign({}, props, {
	          value: prevGroup
	        }),
	        groupCollapsed: assign({}, props, {
	          value: prevGroupCollapsed
	        }),
	        groupEnd: assign({}, props, {
	          value: prevGroupEnd
	        })
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    if (disabledDepth < 0) {
	      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
	    }
	  }
	}

	var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
	var prefix;
	function describeBuiltInComponentFrame(name, source, ownerFn) {
	  {
	    if (prefix === undefined) {
	      // Extract the VM specific prefix used by each line.
	      try {
	        throw Error();
	      } catch (x) {
	        var match = x.stack.trim().match(/\n( *(at )?)/);
	        prefix = match && match[1] || '';
	      }
	    } // We use the prefix to ensure our stacks line up with native stack frames.


	    return '\n' + prefix + name;
	  }
	}
	var reentry = false;
	var componentFrameCache;

	{
	  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
	  componentFrameCache = new PossiblyWeakMap();
	}

	function describeNativeComponentFrame(fn, construct) {
	  // If something asked for a stack inside a fake render, it should get ignored.
	  if ( !fn || reentry) {
	    return '';
	  }

	  {
	    var frame = componentFrameCache.get(fn);

	    if (frame !== undefined) {
	      return frame;
	    }
	  }

	  var control;
	  reentry = true;
	  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

	  Error.prepareStackTrace = undefined;
	  var previousDispatcher;

	  {
	    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
	    // for warnings.

	    ReactCurrentDispatcher.current = null;
	    disableLogs();
	  }

	  try {
	    // This should throw.
	    if (construct) {
	      // Something should be setting the props in the constructor.
	      var Fake = function () {
	        throw Error();
	      }; // $FlowFixMe


	      Object.defineProperty(Fake.prototype, 'props', {
	        set: function () {
	          // We use a throwing setter instead of frozen or non-writable props
	          // because that won't throw in a non-strict mode function.
	          throw Error();
	        }
	      });

	      if (typeof Reflect === 'object' && Reflect.construct) {
	        // We construct a different control for this case to include any extra
	        // frames added by the construct call.
	        try {
	          Reflect.construct(Fake, []);
	        } catch (x) {
	          control = x;
	        }

	        Reflect.construct(fn, [], Fake);
	      } else {
	        try {
	          Fake.call();
	        } catch (x) {
	          control = x;
	        }

	        fn.call(Fake.prototype);
	      }
	    } else {
	      try {
	        throw Error();
	      } catch (x) {
	        control = x;
	      }

	      fn();
	    }
	  } catch (sample) {
	    // This is inlined manually because closure doesn't do it for us.
	    if (sample && control && typeof sample.stack === 'string') {
	      // This extracts the first frame from the sample that isn't also in the control.
	      // Skipping one frame that we assume is the frame that calls the two.
	      var sampleLines = sample.stack.split('\n');
	      var controlLines = control.stack.split('\n');
	      var s = sampleLines.length - 1;
	      var c = controlLines.length - 1;

	      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
	        // We expect at least one stack frame to be shared.
	        // Typically this will be the root most one. However, stack frames may be
	        // cut off due to maximum stack limits. In this case, one maybe cut off
	        // earlier than the other. We assume that the sample is longer or the same
	        // and there for cut off earlier. So we should find the root most frame in
	        // the sample somewhere in the control.
	        c--;
	      }

	      for (; s >= 1 && c >= 0; s--, c--) {
	        // Next we find the first one that isn't the same which should be the
	        // frame that called our sample function and the control.
	        if (sampleLines[s] !== controlLines[c]) {
	          // In V8, the first line is describing the message but other VMs don't.
	          // If we're about to return the first line, and the control is also on the same
	          // line, that's a pretty good indicator that our sample threw at same line as
	          // the control. I.e. before we entered the sample frame. So we ignore this result.
	          // This can happen if you passed a class to function component, or non-function.
	          if (s !== 1 || c !== 1) {
	            do {
	              s--;
	              c--; // We may still have similar intermediate frames from the construct call.
	              // The next one that isn't the same should be our match though.

	              if (c < 0 || sampleLines[s] !== controlLines[c]) {
	                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
	                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
	                // but we have a user-provided "displayName"
	                // splice it in to make the stack more readable.


	                if (fn.displayName && _frame.includes('<anonymous>')) {
	                  _frame = _frame.replace('<anonymous>', fn.displayName);
	                }

	                {
	                  if (typeof fn === 'function') {
	                    componentFrameCache.set(fn, _frame);
	                  }
	                } // Return the line we found.


	                return _frame;
	              }
	            } while (s >= 1 && c >= 0);
	          }

	          break;
	        }
	      }
	    }
	  } finally {
	    reentry = false;

	    {
	      ReactCurrentDispatcher.current = previousDispatcher;
	      reenableLogs();
	    }

	    Error.prepareStackTrace = previousPrepareStackTrace;
	  } // Fallback to just using the name if we couldn't make it throw.


	  var name = fn ? fn.displayName || fn.name : '';
	  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

	  {
	    if (typeof fn === 'function') {
	      componentFrameCache.set(fn, syntheticFrame);
	    }
	  }

	  return syntheticFrame;
	}
	function describeFunctionComponentFrame(fn, source, ownerFn) {
	  {
	    return describeNativeComponentFrame(fn, false);
	  }
	}

	function shouldConstruct(Component) {
	  var prototype = Component.prototype;
	  return !!(prototype && prototype.isReactComponent);
	}

	function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

	  if (type == null) {
	    return '';
	  }

	  if (typeof type === 'function') {
	    {
	      return describeNativeComponentFrame(type, shouldConstruct(type));
	    }
	  }

	  if (typeof type === 'string') {
	    return describeBuiltInComponentFrame(type);
	  }

	  switch (type) {
	    case REACT_SUSPENSE_TYPE:
	      return describeBuiltInComponentFrame('Suspense');

	    case REACT_SUSPENSE_LIST_TYPE:
	      return describeBuiltInComponentFrame('SuspenseList');
	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_FORWARD_REF_TYPE:
	        return describeFunctionComponentFrame(type.render);

	      case REACT_MEMO_TYPE:
	        // Memo may contain any component type so we recursively resolve it.
	        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            // Lazy may contain any component type so we recursively resolve it.
	            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
	          } catch (x) {}
	        }
	    }
	  }

	  return '';
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var loggedTypeFailures = {};
	var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame.setExtraStackFrame(null);
	    }
	  }
	}

	function checkPropTypes(typeSpecs, values, location, componentName, element) {
	  {
	    // $FlowFixMe This is okay but Flow doesn't know it.
	    var has = Function.call.bind(hasOwnProperty);

	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.

	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            // eslint-disable-next-line react-internal/prod-error-codes
	            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
	            err.name = 'Invariant Violation';
	            throw err;
	          }

	          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
	        } catch (ex) {
	          error$1 = ex;
	        }

	        if (error$1 && !(error$1 instanceof Error)) {
	          setCurrentlyValidatingElement(element);

	          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

	          setCurrentlyValidatingElement(null);
	        }

	        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error$1.message] = true;
	          setCurrentlyValidatingElement(element);

	          error('Failed %s type: %s', location, error$1.message);

	          setCurrentlyValidatingElement(null);
	        }
	      }
	    }
	  }
	}

	var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

	function isArray(a) {
	  return isArrayImpl(a);
	}

	/*
	 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
	 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
	 *
	 * The functions in this module will throw an easier-to-understand,
	 * easier-to-debug exception with a clear errors message message explaining the
	 * problem. (Instead of a confusing exception thrown inside the implementation
	 * of the `value` object).
	 */
	// $FlowFixMe only called in DEV, so void return is not possible.
	function typeName(value) {
	  {
	    // toStringTag is needed for namespaced types like Temporal.Instant
	    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
	    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
	    return type;
	  }
	} // $FlowFixMe only called in DEV, so void return is not possible.


	function willCoercionThrow(value) {
	  {
	    try {
	      testStringCoercion(value);
	      return false;
	    } catch (e) {
	      return true;
	    }
	  }
	}

	function testStringCoercion(value) {
	  // If you ended up here by following an exception call stack, here's what's
	  // happened: you supplied an object or symbol value to React (as a prop, key,
	  // DOM attribute, CSS property, string ref, etc.) and when React tried to
	  // coerce it to a string using `'' + value`, an exception was thrown.
	  //
	  // The most common types that will cause this exception are `Symbol` instances
	  // and Temporal objects like `Temporal.Instant`. But any object that has a
	  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
	  // exception. (Library authors do this to prevent users from using built-in
	  // numeric operators like `+` or comparison operators like `>=` because custom
	  // methods are needed to perform accurate arithmetic or comparison.)
	  //
	  // To fix the problem, coerce this object or symbol value to a string before
	  // passing it to React. The most reliable way is usually `String(value)`.
	  //
	  // To find which value is throwing, check the browser or debugger console.
	  // Before this exception was thrown, there should be `console.error` output
	  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
	  // problem and how that type was used: key, atrribute, input value prop, etc.
	  // In most cases, this console output also shows the component and its
	  // ancestor components where the exception happened.
	  //
	  // eslint-disable-next-line react-internal/safe-string-coercion
	  return '' + value;
	}
	function checkKeyStringCoercion(value) {
	  {
	    if (willCoercionThrow(value)) {
	      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

	      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
	    }
	  }
	}

	var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};
	var specialPropKeyWarningShown;
	var specialPropRefWarningShown;

	function hasValidRef(config) {
	  {
	    if (hasOwnProperty.call(config, 'ref')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.ref !== undefined;
	}

	function hasValidKey(config) {
	  {
	    if (hasOwnProperty.call(config, 'key')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.key !== undefined;
	}

	function warnIfStringRefCannotBeAutoConverted(config, self) {
	  {
	    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self) ;
	  }
	}

	function defineKeyPropWarningGetter(props, displayName) {
	  {
	    var warnAboutAccessingKey = function () {
	      if (!specialPropKeyWarningShown) {
	        specialPropKeyWarningShown = true;

	        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    };

	    warnAboutAccessingKey.isReactWarning = true;
	    Object.defineProperty(props, 'key', {
	      get: warnAboutAccessingKey,
	      configurable: true
	    });
	  }
	}

	function defineRefPropWarningGetter(props, displayName) {
	  {
	    var warnAboutAccessingRef = function () {
	      if (!specialPropRefWarningShown) {
	        specialPropRefWarningShown = true;

	        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    };

	    warnAboutAccessingRef.isReactWarning = true;
	    Object.defineProperty(props, 'ref', {
	      get: warnAboutAccessingRef,
	      configurable: true
	    });
	  }
	}
	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, instanceof check
	 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} props
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} owner
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @internal
	 */


	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allows us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,
	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,
	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.

	    Object.defineProperty(element._store, 'validated', {
	      configurable: false,
	      enumerable: false,
	      writable: true,
	      value: false
	    }); // self and source are DEV only properties.

	    Object.defineProperty(element, '_self', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: self
	    }); // Two elements created in two different places should be considered
	    // equal for testing purposes and therefore we hide it from enumeration.

	    Object.defineProperty(element, '_source', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: source
	    });

	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};
	/**
	 * https://github.com/reactjs/rfcs/pull/107
	 * @param {*} type
	 * @param {object} props
	 * @param {string} key
	 */

	function jsxDEV(type, config, maybeKey, source, self) {
	  {
	    var propName; // Reserved names are extracted

	    var props = {};
	    var key = null;
	    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
	    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
	    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
	    // but as an intermediary step, we will use jsxDEV for everything except
	    // <div {...props} key="Hi" />, because we aren't currently able to tell if
	    // key is explicitly declared to be undefined or not.

	    if (maybeKey !== undefined) {
	      {
	        checkKeyStringCoercion(maybeKey);
	      }

	      key = '' + maybeKey;
	    }

	    if (hasValidKey(config)) {
	      {
	        checkKeyStringCoercion(config.key);
	      }

	      key = '' + config.key;
	    }

	    if (hasValidRef(config)) {
	      ref = config.ref;
	      warnIfStringRefCannotBeAutoConverted(config, self);
	    } // Remaining properties are added to a new props object


	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    } // Resolve default props


	    if (type && type.defaultProps) {
	      var defaultProps = type.defaultProps;

	      for (propName in defaultProps) {
	        if (props[propName] === undefined) {
	          props[propName] = defaultProps[propName];
	        }
	      }
	    }

	    if (key || ref) {
	      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

	      if (key) {
	        defineKeyPropWarningGetter(props, displayName);
	      }

	      if (ref) {
	        defineRefPropWarningGetter(props, displayName);
	      }
	    }

	    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	  }
	}

	var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
	var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement$1(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
	    }
	  }
	}

	var propTypesMisspellWarningShown;

	{
	  propTypesMisspellWarningShown = false;
	}
	/**
	 * Verifies the object is a ReactElement.
	 * See https://reactjs.org/docs/react-api.html#isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a ReactElement.
	 * @final
	 */


	function isValidElement(object) {
	  {
	    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	  }
	}

	function getDeclarationErrorAddendum() {
	  {
	    if (ReactCurrentOwner$1.current) {
	      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

	      if (name) {
	        return '\n\nCheck the render method of `' + name + '`.';
	      }
	    }

	    return '';
	  }
	}

	function getSourceInfoErrorAddendum(source) {
	  {

	    return '';
	  }
	}
	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */


	var ownerHasKeyUseWarning = {};

	function getCurrentComponentErrorInfo(parentType) {
	  {
	    var info = getDeclarationErrorAddendum();

	    if (!info) {
	      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

	      if (parentName) {
	        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
	      }
	    }

	    return info;
	  }
	}
	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it. Error statuses are cached so a warning
	 * will only be shown once.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */


	function validateExplicitKey(element, parentType) {
	  {
	    if (!element._store || element._store.validated || element.key != null) {
	      return;
	    }

	    element._store.validated = true;
	    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

	    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
	      return;
	    }

	    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
	    // property, it may be the creator of the child that's responsible for
	    // assigning it a key.

	    var childOwner = '';

	    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
	      // Give the component that originally created this child.
	      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
	    }

	    setCurrentlyValidatingElement$1(element);

	    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

	    setCurrentlyValidatingElement$1(null);
	  }
	}
	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */


	function validateChildKeys(node, parentType) {
	  {
	    if (typeof node !== 'object') {
	      return;
	    }

	    if (isArray(node)) {
	      for (var i = 0; i < node.length; i++) {
	        var child = node[i];

	        if (isValidElement(child)) {
	          validateExplicitKey(child, parentType);
	        }
	      }
	    } else if (isValidElement(node)) {
	      // This element was passed in a valid location.
	      if (node._store) {
	        node._store.validated = true;
	      }
	    } else if (node) {
	      var iteratorFn = getIteratorFn(node);

	      if (typeof iteratorFn === 'function') {
	        // Entry iterators used to provide implicit keys,
	        // but now we print a separate warning for them later.
	        if (iteratorFn !== node.entries) {
	          var iterator = iteratorFn.call(node);
	          var step;

	          while (!(step = iterator.next()).done) {
	            if (isValidElement(step.value)) {
	              validateExplicitKey(step.value, parentType);
	            }
	          }
	        }
	      }
	    }
	  }
	}
	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */


	function validatePropTypes(element) {
	  {
	    var type = element.type;

	    if (type === null || type === undefined || typeof type === 'string') {
	      return;
	    }

	    var propTypes;

	    if (typeof type === 'function') {
	      propTypes = type.propTypes;
	    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
	    // Inner props are checked in the reconciler.
	    type.$$typeof === REACT_MEMO_TYPE)) {
	      propTypes = type.propTypes;
	    } else {
	      return;
	    }

	    if (propTypes) {
	      // Intentionally inside to avoid triggering lazy initializers:
	      var name = getComponentNameFromType(type);
	      checkPropTypes(propTypes, element.props, 'prop', name, element);
	    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
	      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

	      var _name = getComponentNameFromType(type);

	      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
	    }

	    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
	      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
	    }
	  }
	}
	/**
	 * Given a fragment, validate that it can only be provided with fragment props
	 * @param {ReactElement} fragment
	 */


	function validateFragmentProps(fragment) {
	  {
	    var keys = Object.keys(fragment.props);

	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];

	      if (key !== 'children' && key !== 'key') {
	        setCurrentlyValidatingElement$1(fragment);

	        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

	        setCurrentlyValidatingElement$1(null);
	        break;
	      }
	    }

	    if (fragment.ref !== null) {
	      setCurrentlyValidatingElement$1(fragment);

	      error('Invalid attribute `ref` supplied to `React.Fragment`.');

	      setCurrentlyValidatingElement$1(null);
	    }
	  }
	}

	var didWarnAboutKeySpread = {};
	function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
	  {
	    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.

	    if (!validType) {
	      var info = '';

	      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
	        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
	      }

	      var sourceInfo = getSourceInfoErrorAddendum();

	      if (sourceInfo) {
	        info += sourceInfo;
	      } else {
	        info += getDeclarationErrorAddendum();
	      }

	      var typeString;

	      if (type === null) {
	        typeString = 'null';
	      } else if (isArray(type)) {
	        typeString = 'array';
	      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
	        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
	        info = ' Did you accidentally export a JSX literal instead of a component?';
	      } else {
	        typeString = typeof type;
	      }

	      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
	    }

	    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.

	    if (element == null) {
	      return element;
	    } // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)


	    if (validType) {
	      var children = props.children;

	      if (children !== undefined) {
	        if (isStaticChildren) {
	          if (isArray(children)) {
	            for (var i = 0; i < children.length; i++) {
	              validateChildKeys(children[i], type);
	            }

	            if (Object.freeze) {
	              Object.freeze(children);
	            }
	          } else {
	            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
	          }
	        } else {
	          validateChildKeys(children, type);
	        }
	      }
	    }

	    {
	      if (hasOwnProperty.call(props, 'key')) {
	        var componentName = getComponentNameFromType(type);
	        var keys = Object.keys(props).filter(function (k) {
	          return k !== 'key';
	        });
	        var beforeExample = keys.length > 0 ? '{key: someKey, ' + keys.join(': ..., ') + ': ...}' : '{key: someKey}';

	        if (!didWarnAboutKeySpread[componentName + beforeExample]) {
	          var afterExample = keys.length > 0 ? '{' + keys.join(': ..., ') + ': ...}' : '{}';

	          error('A props object containing a "key" prop is being spread into JSX:\n' + '  let props = %s;\n' + '  <%s {...props} />\n' + 'React keys must be passed directly to JSX without using spread:\n' + '  let props = %s;\n' + '  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);

	          didWarnAboutKeySpread[componentName + beforeExample] = true;
	        }
	      }
	    }

	    if (type === REACT_FRAGMENT_TYPE) {
	      validateFragmentProps(element);
	    } else {
	      validatePropTypes(element);
	    }

	    return element;
	  }
	} // These two functions exist to still get child warnings in dev
	// even with the prod transform. This means that jsxDEV is purely
	// opt-in behavior for better messages but that we won't stop
	// giving you warnings if you use production apis.

	function jsxWithValidationStatic(type, props, key) {
	  {
	    return jsxWithValidation(type, props, key, true);
	  }
	}
	function jsxWithValidationDynamic(type, props, key) {
	  {
	    return jsxWithValidation(type, props, key, false);
	  }
	}

	var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
	// for now we can ship identical prod functions

	var jsxs =  jsxWithValidationStatic ;

	reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_development.jsx = jsx;
	reactJsxRuntime_development.jsxs = jsxs;
	  })();
	}
	return reactJsxRuntime_development;
}

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = requireReactJsxRuntime_production_min();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}

var jsxRuntimeExports = jsxRuntime.exports;

const defaultConfig = {
    apiEndpoints: {
        roomAnalyze: '/api/rooms/analyze',
        furnitureCustomize: '/api/furniture/customize',
        chat: '/api/widget/chat',
        catalog: '/api/catalog/items',
        recommendationsMatch: '/api/recommendations/match',
        cartAdd: '/api/cart/add',
        quoteRequest: '/api/quotes/request',
    },
    features: {
        roomPlanner: true,
        customizer: true,
    },
    storageKey: 'modly-customized-furniture',
};
function mergeConfig(userConfig = {}) {
    return {
        ...defaultConfig,
        ...userConfig,
        apiEndpoints: {
            ...defaultConfig.apiEndpoints,
            ...userConfig.apiEndpoints,
        },
        features: {
            ...defaultConfig.features,
            ...userConfig.features,
        },
    };
}

class ApiClient {
    constructor(config) {
        this.config = config;
    }
    getBaseUrl() {
        return this.config.apiBaseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
    }
    getEndpoint(path) {
        const baseUrl = this.getBaseUrl();
        return `${baseUrl}${path}`;
    }
    async analyzeRoom(photos, dimensions, preferences) {
        const endpoint = this.config.apiEndpoints?.roomAnalyze || '/api/rooms/analyze';
        const url = this.getEndpoint(endpoint);
        const formData = new FormData();
        photos.forEach((photo) => {
            formData.append('photos', photo);
        });
        formData.append('dimensions', JSON.stringify(dimensions));
        if (preferences) {
            formData.append('preferences', JSON.stringify(preferences));
        }
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            const error = new Error(`Failed to analyze room: ${response.statusText}`);
            this.config.onError?.(error);
            throw error;
        }
        const data = await response.json();
        this.config.onRoomAnalyzed?.(data);
        return data;
    }
    async customizeFurniture(config) {
        const endpoint = this.config.apiEndpoints?.furnitureCustomize || '/api/furniture/customize';
        const url = this.getEndpoint(endpoint);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(config),
        });
        if (!response.ok) {
            const error = new Error(`Failed to customize furniture: ${response.statusText}`);
            this.config.onError?.(error);
            throw error;
        }
        const data = await response.json();
        this.config.onFurnitureCustomized?.(data);
        return data;
    }
    async chat(request) {
        const endpoint = this.config.apiEndpoints?.chat || '/api/widget/chat';
        const url = this.getEndpoint(endpoint);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });
            if (!response.ok) {
                let errorMessage = `Failed to get chat response: ${response.statusText}`;
                try {
                    const errorData = await response.json();
                    if (errorData.error) {
                        errorMessage = errorData.error;
                    }
                }
                catch (e) {
                    // If error response is not JSON, use status text
                }
                const error = new Error(errorMessage);
                this.config.onError?.(error);
                throw error;
            }
            return await response.json();
        }
        catch (error) {
            // Re-throw with more context if it's a network error
            if (error instanceof TypeError && error.message.includes('fetch')) {
                const networkError = new Error('Network error: Unable to connect to the server. Please check your connection.');
                this.config.onError?.(networkError);
                throw networkError;
            }
            throw error;
        }
    }
    async getCatalog() {
        const endpoint = this.config.apiEndpoints?.catalog || '/api/catalog/items';
        const url = this.getEndpoint(endpoint);
        const response = await fetch(url, {
            method: 'GET',
        });
        if (!response.ok) {
            const error = new Error(`Failed to fetch catalog: ${response.statusText}`);
            this.config.onError?.(error);
            throw error;
        }
        return await response.json();
    }
    async submitQuoteRequest(quoteRequest) {
        const endpoint = this.config.apiEndpoints?.quoteRequest || '/api/quotes/request';
        const url = this.getEndpoint(endpoint);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quoteRequest),
        });
        if (!response.ok) {
            const error = new Error(`Failed to submit quote request: ${response.statusText}`);
            this.config.onError?.(error);
            throw error;
        }
        return await response.json();
    }
    async getRecommendations(request) {
        const endpoint = this.config.apiEndpoints?.recommendationsMatch || '/api/recommendations/match';
        const url = this.getEndpoint(endpoint);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            const error = new Error(`Failed to get recommendations: ${response.statusText}`);
            this.config.onError?.(error);
            throw error;
        }
        return await response.json();
    }
    async addToCart(item) {
        const endpoint = this.config.apiEndpoints?.cartAdd || '/api/cart/add';
        const url = this.getEndpoint(endpoint);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });
        if (!response.ok) {
            const error = new Error(`Failed to add to cart: ${response.statusText}`);
            this.config.onError?.(error);
            throw error;
        }
        return await response.json();
    }
}

class Storage {
    constructor(key = 'modly-customized-furniture') {
        this.key = key;
    }
    saveCustomizedFurniture(item) {
        const items = this.getCustomizedFurniture();
        const newItem = {
            ...item,
            id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            savedAt: new Date().toISOString(),
        };
        items.push(newItem);
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem(this.key, JSON.stringify(items));
            }
            return newItem;
        }
        catch (error) {
            console.error('Failed to save customized furniture:', error);
            throw error;
        }
    }
    getCustomizedFurniture() {
        if (typeof window === 'undefined') {
            return [];
        }
        try {
            const stored = localStorage.getItem(this.key);
            if (!stored) {
                return [];
            }
            return JSON.parse(stored);
        }
        catch (error) {
            console.error('Failed to load customized furniture:', error);
            return [];
        }
    }
    removeCustomizedFurniture(id) {
        const items = this.getCustomizedFurniture();
        const filtered = items.filter(item => item.id !== id);
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem(this.key, JSON.stringify(filtered));
            }
            return true;
        }
        catch (error) {
            console.error('Failed to remove customized furniture:', error);
            return false;
        }
    }
    clearCustomizedFurniture() {
        try {
            if (typeof window !== 'undefined') {
                localStorage.removeItem(this.key);
            }
            return true;
        }
        catch (error) {
            console.error('Failed to clear customized furniture:', error);
            return false;
        }
    }
}

const WidgetContext = createContext(null);
function WidgetProvider({ children, apiClient, storage, config }) {
    return (jsxRuntimeExports.jsx(WidgetContext.Provider, { value: { apiClient, storage, config }, children: children }));
}
function useWidgetContext() {
    const context = useContext(WidgetContext);
    if (!context) {
        throw new Error('useWidgetContext must be used within WidgetProvider');
    }
    return context;
}

const feetToMeters = (feet) => feet / 3.28084;
const metersToInches = (meters) => meters * 39.3701;
const inchesToMeters = (inches) => inches / 39.3701;
// Convert feet and inches to meters
const feetInchesToMeters = (feet, inches) => {
    return feetToMeters(feet) + inchesToMeters(inches);
};
// Convert meters to feet and inches
const metersToFeetInches = (meters) => {
    const totalInches = metersToInches(meters);
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
};
function RoomUploadForm({ onUpload, isLoading, onPhotosChange, formRef, initialDimensions, initialPreferences, onDimensionsChange, onPreferencesChange, }) {
    const formElementRef = useRef(null);
    // Expose form ref to parent
    useEffect(() => {
        if (formRef && formElementRef.current) {
            formRef(formElementRef.current);
        }
    }, [formRef]);
    // Initialize dimensions from props or defaults
    const getInitialDimensions = () => {
        if (initialDimensions) {
            return initialDimensions;
        }
        return {
            length: 0,
            width: 0,
            height: 2.4,
            roomType: 'living',
        };
    };
    const [photos, setPhotos] = useState([]);
    const [unitSystem, setUnitSystem] = useState('meters');
    const [dimensions, setDimensions] = useState(getInitialDimensions());
    // Initialize feet/inches from initial dimensions
    const initFeetInches = () => {
        const initDims = getInitialDimensions();
        if (initDims.length > 0 || initDims.width > 0 || initDims.height > 0) {
            const lengthFI = metersToFeetInches(initDims.length);
            const widthFI = metersToFeetInches(initDims.width);
            const heightFI = metersToFeetInches(initDims.height);
            return { lengthFI, widthFI, heightFI };
        }
        return {
            lengthFI: { feet: 0, inches: 0 },
            widthFI: { feet: 0, inches: 0 },
            heightFI: { feet: 8, inches: 0 },
        };
    };
    const initialFeetInches = initFeetInches();
    const [lengthFeet, setLengthFeet] = useState(initialFeetInches.lengthFI.feet);
    const [lengthInches, setLengthInches] = useState(initialFeetInches.lengthFI.inches);
    const [widthFeet, setWidthFeet] = useState(initialFeetInches.widthFI.feet);
    const [widthInches, setWidthInches] = useState(initialFeetInches.widthFI.inches);
    const [heightFeet, setHeightFeet] = useState(initialFeetInches.heightFI.feet);
    const [heightInches, setHeightInches] = useState(initialFeetInches.heightFI.inches);
    const [preferences, setPreferences] = useState(initialPreferences || {});
    const [showAdvanced, setShowAdvanced] = useState(false);
    const fileInputRef = useRef(null);
    // Update dimensions when initialDimensions prop changes
    useEffect(() => {
        if (initialDimensions) {
            setDimensions(initialDimensions);
            const lengthFI = metersToFeetInches(initialDimensions.length);
            const widthFI = metersToFeetInches(initialDimensions.width);
            const heightFI = metersToFeetInches(initialDimensions.height);
            setLengthFeet(lengthFI.feet);
            setLengthInches(lengthFI.inches);
            setWidthFeet(widthFI.feet);
            setWidthInches(widthFI.inches);
            setHeightFeet(heightFI.feet);
            setHeightInches(heightFI.inches);
        }
    }, [initialDimensions]);
    // Update preferences when initialPreferences prop changes
    useEffect(() => {
        if (initialPreferences) {
            setPreferences(initialPreferences);
        }
    }, [initialPreferences]);
    // Note: Dimension and preference changes are handled directly in updateDimensions and setPreferences
    // to avoid infinite loops from useEffect dependencies
    const handleFileChange = (e) => {
        if (e.target.files) {
            const newPhotos = Array.from(e.target.files);
            setPhotos(newPhotos);
            onPhotosChange?.(newPhotos);
        }
    };
    const updateDimensions = (newDimensions) => {
        setDimensions(newDimensions);
        if (onDimensionsChange) {
            onDimensionsChange(newDimensions);
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files) {
            const newPhotos = Array.from(e.dataTransfer.files);
            setPhotos(newPhotos);
            onPhotosChange?.(newPhotos);
        }
    };
    const handleUnitToggle = () => {
        const newUnit = unitSystem === 'meters' ? 'feet' : 'meters';
        if (newUnit === 'feet') {
            // Convert from meters to feet/inches
            const lengthFI = metersToFeetInches(dimensions.length);
            const widthFI = metersToFeetInches(dimensions.width);
            const heightFI = metersToFeetInches(dimensions.height);
            setLengthFeet(lengthFI.feet);
            setLengthInches(lengthFI.inches);
            setWidthFeet(widthFI.feet);
            setWidthInches(widthFI.inches);
            setHeightFeet(heightFI.feet);
            setHeightInches(heightFI.inches);
        }
        else {
            // Convert from feet/inches to meters
            updateDimensions({
                ...dimensions,
                length: feetInchesToMeters(lengthFeet, lengthInches),
                width: feetInchesToMeters(widthFeet, widthInches),
                height: feetInchesToMeters(heightFeet, heightInches),
            });
        }
        setUnitSystem(newUnit);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (photos.length === 0) {
            alert('Please upload at least one room photo');
            return;
        }
        // Convert to meters if in feet/inches
        let finalDimensions = dimensions;
        if (unitSystem === 'feet') {
            finalDimensions = {
                ...dimensions,
                length: feetInchesToMeters(lengthFeet, lengthInches),
                width: feetInchesToMeters(widthFeet, widthInches),
                height: feetInchesToMeters(heightFeet, heightInches),
            };
        }
        if (finalDimensions.length <= 0 || finalDimensions.width <= 0) {
            alert('Please provide valid room dimensions');
            return;
        }
        onUpload(photos, finalDimensions, preferences);
    };
    const removePhoto = (index) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };
    const toggleStyle = (style) => {
        const currentStyles = preferences.style || [];
        const newPreferences = currentStyles.includes(style)
            ? { ...preferences, style: currentStyles.filter(s => s !== style) }
            : { ...preferences, style: [...currentStyles, style] };
        setPreferences(newPreferences);
        if (onPreferencesChange) {
            onPreferencesChange(newPreferences);
        }
    };
    const styleOptions = [
        { id: 'modern', label: 'Modern', icon: '⚡' },
        { id: 'scandi', label: 'Scandi', icon: '🌲' },
        { id: 'industrial', label: 'Industrial', icon: '🏭' },
        { id: 'boho', label: 'Boho', icon: '🌿' },
    ];
    return (jsxRuntimeExports.jsxs("form", { ref: formElementRef, onSubmit: handleSubmit, className: "space-y-6", children: [jsxRuntimeExports.jsxs("div", { className: "bg-[#242723] border border-[#3A3F38] rounded-xl p-6", children: [jsxRuntimeExports.jsx("label", { className: "block text-base font-bold text-text-heading mb-3", children: "Upload Room Photos" }), jsxRuntimeExports.jsxs("div", { onClick: () => fileInputRef.current?.click(), onDragOver: handleDragOver, onDrop: handleDrop, className: "border-2 border-dashed border-earth-border rounded-lg p-6 md:p-8 text-center cursor-pointer hover:border-earth-sage transition-all duration-300 bg-earth-input relative min-h-[200px] flex flex-col items-center justify-center", children: [jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", multiple: true, onChange: handleFileChange, className: "hidden" }), photos.length === 0 ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: "\uD83D\uDCF8" }), jsxRuntimeExports.jsx("p", { className: "text-text-primary mb-1", children: "Click to upload or drag and drop" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-text-muted", children: "Multiple photos recommended for better analysis" })] })) : (jsxRuntimeExports.jsx("div", { className: "w-full", children: jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center items-center", children: [photos.map((photo, index) => (jsxRuntimeExports.jsxs("div", { className: "relative group", children: [jsxRuntimeExports.jsx("img", { src: URL.createObjectURL(photo), alt: `Room photo ${index + 1}`, className: "w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border border-earth-border group-hover:border-earth-sage transition-colors" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: (e) => {
                                                        e.stopPropagation();
                                                        removePhoto(index);
                                                    }, className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg", children: "\u00D7" })] }, index))), jsxRuntimeExports.jsx("button", { type: "button", onClick: () => fileInputRef.current?.click(), className: "w-20 h-20 md:w-24 md:h-24 border-2 border-dashed border-earth-border rounded-lg flex items-center justify-center text-text-muted hover:border-earth-sage hover:text-text-primary transition-colors", children: jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "+" }) })] }) }))] })] }), jsxRuntimeExports.jsxs("div", { className: "bg-[#242723] border border-[#3A3F38] rounded-xl p-6", children: [jsxRuntimeExports.jsx("label", { className: "block text-base font-bold text-text-heading mb-3", children: "Room Type" }), jsxRuntimeExports.jsxs("select", { value: dimensions.roomType, onChange: (e) => updateDimensions({ ...dimensions, roomType: e.target.value }), className: "w-full px-4 py-2.5 border border-earth-border rounded-lg bg-white text-[#1A1C19] focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575] [&>option]:bg-white [&>option]:text-[#1A1C19]", children: [jsxRuntimeExports.jsx("option", { value: "living", children: "Living Room" }), jsxRuntimeExports.jsx("option", { value: "bedroom", children: "Bedroom" }), jsxRuntimeExports.jsx("option", { value: "office", children: "Office" }), jsxRuntimeExports.jsx("option", { value: "dining", children: "Dining Room" }), jsxRuntimeExports.jsx("option", { value: "kitchen", children: "Kitchen" }), jsxRuntimeExports.jsx("option", { value: "other", children: "Other" })] })] }), jsxRuntimeExports.jsxs("div", { className: "bg-[#242723] border border-[#3A3F38] rounded-xl p-6", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [jsxRuntimeExports.jsx("label", { className: "block text-base font-bold text-text-heading", children: "Room Dimensions" }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [jsxRuntimeExports.jsx("span", { className: `text-sm ${unitSystem === 'meters' ? 'text-text-heading' : 'text-text-muted'}`, children: "Meters" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleUnitToggle, className: `relative w-12 h-6 rounded-full transition-colors duration-300 ${unitSystem === 'feet' ? 'bg-earth-sage' : 'bg-earth-border'}`, children: jsxRuntimeExports.jsx("span", { className: `absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-md ${unitSystem === 'feet' ? 'translate-x-6' : 'translate-x-0'}` }) }), jsxRuntimeExports.jsx("span", { className: `text-sm ${unitSystem === 'feet' ? 'text-text-heading' : 'text-text-muted'}`, children: "Feet/Inches" })] })] }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: unitSystem === 'meters' ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-text-primary mb-2", children: "Length" }), jsxRuntimeExports.jsx("input", { type: "number", step: "0.1", min: "0", value: dimensions.length || '', onChange: (e) => updateDimensions({ ...dimensions, length: parseFloat(e.target.value) || 0 }), className: "w-full px-4 py-2.5 border border-earth-border rounded-lg bg-white text-[#1A1C19] focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]", required: true })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-text-primary mb-2", children: "Width" }), jsxRuntimeExports.jsx("input", { type: "number", step: "0.1", min: "0", value: dimensions.width || '', onChange: (e) => updateDimensions({ ...dimensions, width: parseFloat(e.target.value) || 0 }), className: "w-full px-4 py-2.5 border border-earth-border rounded-lg bg-white text-[#1A1C19] focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]", required: true })] }), jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-text-primary mb-2", children: jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 whitespace-nowrap", children: ["Ceiling Height", jsxRuntimeExports.jsxs("div", { className: "group relative flex-shrink-0", children: [jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-text-icon cursor-help", fill: "currentColor", viewBox: "0 0 20 20", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" }) }), jsxRuntimeExports.jsx("div", { className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-earth-card border border-earth-border rounded-xl text-xs text-text-primary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-soft", children: "Helps AI recommend furniture that fits your vertical space and proportions" })] })] }) }), jsxRuntimeExports.jsx("input", { type: "number", step: "0.1", min: "0", value: dimensions.height || '', onChange: (e) => updateDimensions({ ...dimensions, height: parseFloat(e.target.value) || 0 }), className: "w-full px-4 py-2.5 border border-earth-border rounded-lg bg-white text-[#1A1C19] focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]", required: true })] })] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-text-primary mb-2", children: "Length" }), jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [jsxRuntimeExports.jsx("input", { type: "number", min: "0", value: lengthFeet || '', onChange: (e) => {
                                                        const feet = parseInt(e.target.value) || 0;
                                                        setLengthFeet(feet);
                                                        updateDimensions({ ...dimensions, length: feetInchesToMeters(feet, lengthInches) });
                                                    }, placeholder: "ft", className: "w-full px-4 py-2.5 border border-earth-border rounded-lg bg-white text-[#1A1C19] focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]", required: true }), jsxRuntimeExports.jsx("input", { type: "number", min: "0", max: "11", value: lengthInches || '', onChange: (e) => {
                                                        const inches = Math.min(11, parseInt(e.target.value) || 0);
                                                        setLengthInches(inches);
                                                        updateDimensions({ ...dimensions, length: feetInchesToMeters(lengthFeet, inches) });
                                                    }, placeholder: "in", className: "w-full px-4 py-2.5 border border-earth-border rounded-lg bg-white text-[#1A1C19] focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]" })] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-text-primary mb-2", children: "Width" }), jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [jsxRuntimeExports.jsx("input", { type: "number", min: "0", value: widthFeet || '', onChange: (e) => {
                                                        const feet = parseInt(e.target.value) || 0;
                                                        setWidthFeet(feet);
                                                        updateDimensions({ ...dimensions, width: feetInchesToMeters(feet, widthInches) });
                                                    }, placeholder: "ft", className: "w-full px-4 py-2.5 border border-earth-border rounded-lg bg-white text-[#1A1C19] focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]", required: true }), jsxRuntimeExports.jsx("input", { type: "number", min: "0", max: "11", value: widthInches || '', onChange: (e) => {
                                                        const inches = Math.min(11, parseInt(e.target.value) || 0);
                                                        setWidthInches(inches);
                                                        updateDimensions({ ...dimensions, width: feetInchesToMeters(widthFeet, inches) });
                                                    }, placeholder: "in", className: "w-full px-4 py-2.5 border border-earth-border rounded-lg bg-white text-[#1A1C19] focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]" })] })] }), jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-text-primary mb-2", children: jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 whitespace-nowrap", children: ["Ceiling Height", jsxRuntimeExports.jsxs("div", { className: "group relative flex-shrink-0", children: [jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-text-icon cursor-help", fill: "currentColor", viewBox: "0 0 20 20", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" }) }), jsxRuntimeExports.jsx("div", { className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-earth-card border border-earth-border rounded-xl text-xs text-text-primary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-soft", children: "Helps AI recommend furniture that fits your vertical space and proportions" })] })] }) }), jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [jsxRuntimeExports.jsx("input", { type: "number", min: "0", value: heightFeet || '', onChange: (e) => {
                                                        const feet = parseInt(e.target.value) || 0;
                                                        setHeightFeet(feet);
                                                        updateDimensions({ ...dimensions, height: feetInchesToMeters(feet, heightInches) });
                                                    }, placeholder: "ft", className: "w-full px-4 py-2.5 border border-earth-border rounded-lg bg-white text-[#1A1C19] focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]", required: true }), jsxRuntimeExports.jsx("input", { type: "number", min: "0", max: "11", value: heightInches || '', onChange: (e) => {
                                                        const inches = Math.min(11, parseInt(e.target.value) || 0);
                                                        setHeightInches(inches);
                                                        updateDimensions({ ...dimensions, height: feetInchesToMeters(heightFeet, inches) });
                                                    }, placeholder: "in", className: "w-full px-4 py-2.5 border border-earth-border rounded-lg bg-white text-[#1A1C19] focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]" })] })] })] })) })] }), jsxRuntimeExports.jsxs("div", { className: "bg-[#242723] border border-[#3A3F38] rounded-xl", children: [jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setShowAdvanced(!showAdvanced), className: "w-full flex items-center justify-between p-4 hover:bg-[#2A2F28] transition-all duration-300 rounded-t-xl", children: [jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-text-heading", children: "Advanced Preferences (Optional)" }), jsxRuntimeExports.jsx("svg", { className: `w-5 h-5 text-text-primary transition-transform duration-300 ${showAdvanced ? 'rotate-180' : ''}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })] }), showAdvanced && (jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6 pt-4 space-y-6 border-t border-[#3A3F38]", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-text-primary mb-4", children: "Preferred Styles" }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: styleOptions.map((style) => {
                                            const isSelected = preferences.style?.includes(style.id);
                                            return (jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => toggleStyle(style.id), className: `p-4 rounded-lg border transition-all duration-300 flex flex-col items-center justify-center ${isSelected
                                                    ? 'border-earth-sage bg-gradient-ai-subtle text-text-primary'
                                                    : 'border-earth-border bg-earth-input text-text-primary hover:border-earth-sage/50'}`, children: [jsxRuntimeExports.jsx("div", { className: "text-2xl mb-2", children: style.icon }), jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: style.label })] }, style.id));
                                        }) })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-text-primary mb-2", children: "Preferred Colors (comma-separated)" }), jsxRuntimeExports.jsx("input", { type: "text", placeholder: "e.g., Beige, Forest Green, Terracotta", value: preferences.colors?.join(', ') || '', onChange: (e) => {
                                            const newPreferences = { ...preferences, colors: e.target.value.split(',').map(s => s.trim()).filter(Boolean) };
                                            setPreferences(newPreferences);
                                            if (onPreferencesChange) {
                                                onPreferencesChange(newPreferences);
                                            }
                                        }, className: "w-full px-4 py-2.5 border border-earth-border rounded-lg bg-white text-[#1A1C19] focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]" })] }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-text-primary mb-2", children: "Budget Min ($)" }), jsxRuntimeExports.jsx("input", { type: "number", min: "0", value: preferences.budget?.min || '', onChange: (e) => {
                                                    const newPreferences = { ...preferences, budget: { ...preferences.budget, min: parseInt(e.target.value) || undefined } };
                                                    setPreferences(newPreferences);
                                                    if (onPreferencesChange) {
                                                        onPreferencesChange(newPreferences);
                                                    }
                                                }, className: "w-full px-4 py-2.5 border border-earth-border rounded-lg bg-white text-[#1A1C19] focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-text-primary mb-2", children: "Budget Max ($)" }), jsxRuntimeExports.jsx("input", { type: "number", min: "0", value: preferences.budget?.max || '', onChange: (e) => {
                                                    const newPreferences = { ...preferences, budget: { ...preferences.budget, max: parseInt(e.target.value) || undefined } };
                                                    setPreferences(newPreferences);
                                                    if (onPreferencesChange) {
                                                        onPreferencesChange(newPreferences);
                                                    }
                                                }, className: "w-full px-4 py-2.5 border border-earth-border rounded-lg bg-white text-[#1A1C19] focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]" })] })] })] }))] })] }));
}

/**
 * Extracts color palette from the parent website by analyzing computed styles
 * of the body and root elements
 */
function useWebsiteColors() {
    const [colors, setColors] = useState({
        primary: '#3D543F', // Default fallback
        secondary: '#8DA38E',
        background: '#FFFFFF',
        text: '#1A1C19',
        accent: '#8DA38E',
        border: '#E5E7EB',
    });
    useEffect(() => {
        const extractColors = () => {
            try {
                // Try to get parent document (if in iframe), fallback to current document
                let doc;
                let body;
                let root;
                try {
                    // Check if we can access parent document (for iframe scenarios)
                    if (window.parent && window.parent !== window && window.parent.document) {
                        doc = window.parent.document;
                    }
                    else {
                        doc = document;
                    }
                    body = doc.body;
                    root = doc.documentElement;
                }
                catch (e) {
                    // CORS or security restriction - use current document
                    doc = document;
                    body = doc.body;
                    root = doc.documentElement;
                }
                // Helper to get computed color value from CSS variables or computed styles
                const getComputedColor = (element, property, fallback) => {
                    try {
                        const computed = window.getComputedStyle(element);
                        // Try CSS custom properties first
                        const cssVar = computed.getPropertyValue(`--${property}`).trim();
                        if (cssVar)
                            return cssVar;
                        // Try direct property
                        const direct = computed.getPropertyValue(property).trim();
                        if (direct)
                            return direct;
                        return fallback || '';
                    }
                    catch (e) {
                        return fallback || '';
                    }
                };
                // Helper to convert any color format to hex
                const toHex = (color) => {
                    if (!color || color.trim() === '')
                        return '';
                    // Already hex
                    if (color.startsWith('#')) {
                        return color.length === 4
                            ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
                            : color;
                    }
                    // Handle rgb/rgba
                    const rgbMatch = color.match(/\d+/g);
                    if (rgbMatch && rgbMatch.length >= 3) {
                        const r = parseInt(rgbMatch[0]).toString(16).padStart(2, '0');
                        const g = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
                        const b = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
                        return `#${r}${g}${b}`;
                    }
                    // Handle named colors (basic set)
                    const namedColors = {
                        'white': '#FFFFFF',
                        'black': '#000000',
                        'red': '#FF0000',
                        'green': '#008000',
                        'blue': '#0000FF',
                        'yellow': '#FFFF00',
                        'orange': '#FFA500',
                        'purple': '#800080',
                        'pink': '#FFC0CB',
                        'gray': '#808080',
                        'grey': '#808080',
                    };
                    const lowerColor = color.toLowerCase().trim();
                    if (namedColors[lowerColor]) {
                        return namedColors[lowerColor];
                    }
                    return color;
                };
                // Try to extract primary color from links and buttons (common UI elements)
                const getElementColor = (selector, property = 'color') => {
                    try {
                        const element = doc.querySelector(selector);
                        if (element) {
                            const computed = window.getComputedStyle(element);
                            return computed.getPropertyValue(property).trim();
                        }
                    }
                    catch (e) {
                        // Ignore errors
                    }
                    return '';
                };
                // Extract primary color - try multiple sources
                const primary = getComputedColor(root, 'primary-color') ||
                    getComputedColor(root, 'color-primary') ||
                    getComputedColor(root, 'brand-color') ||
                    getComputedColor(root, 'theme-color') ||
                    getElementColor('a', 'color') || // Try link color
                    getElementColor('button', 'background-color') || // Try button background
                    getElementColor('[class*="primary"]', 'background-color') || // Try elements with "primary" in class
                    getComputedColor(body, 'color') ||
                    '#3D543F';
                // Extract background color
                const background = getComputedColor(root, 'background-color') ||
                    getComputedColor(root, 'bg-color') ||
                    getComputedColor(body, 'background-color') ||
                    '#FFFFFF';
                // Extract text color
                const text = getComputedColor(root, 'text-color') ||
                    getComputedColor(root, 'color-text') ||
                    getComputedColor(body, 'color') ||
                    '#1A1C19';
                // Extract accent color
                const accent = getComputedColor(root, 'accent-color') ||
                    getComputedColor(root, 'color-accent') ||
                    getComputedColor(root, 'secondary-color') ||
                    primary;
                // Extract secondary color
                const secondary = getComputedColor(root, 'secondary-color') ||
                    getComputedColor(root, 'color-secondary') ||
                    accent;
                // Extract border color
                const border = getComputedColor(root, 'border-color') ||
                    getComputedColor(root, 'color-border') ||
                    getComputedColor(body, 'border-color') ||
                    '#E5E7EB';
                return {
                    primary: toHex(primary) || '#3D543F',
                    secondary: toHex(secondary) || '#8DA38E',
                    background: toHex(background) || '#FFFFFF',
                    text: toHex(text) || '#1A1C19',
                    accent: toHex(accent) || '#8DA38E',
                    border: toHex(border) || '#E5E7EB',
                };
            }
            catch (error) {
                console.warn('Failed to extract website colors:', error);
                // Return defaults
                return {
                    primary: '#3D543F',
                    secondary: '#8DA38E',
                    background: '#FFFFFF',
                    text: '#1A1C19',
                    accent: '#8DA38E',
                    border: '#E5E7EB',
                };
            }
        };
        // Extract colors on mount and when window resizes (in case styles change)
        setColors(extractColors());
        const handleResize = () => {
            setColors(extractColors());
        };
        window.addEventListener('resize', handleResize);
        // Also try to observe style changes if MutationObserver is available
        let observer = null;
        try {
            const doc = window.parent?.document || document;
            observer = new MutationObserver(() => {
                setColors(extractColors());
            });
            observer.observe(doc.documentElement, {
                attributes: true,
                attributeFilter: ['style', 'class'],
            });
        }
        catch (e) {
            // MutationObserver not supported or failed
        }
        return () => {
            window.removeEventListener('resize', handleResize);
            if (observer) {
                observer.disconnect();
            }
        };
    }, []);
    return colors;
}

function ProductDetailsModal({ isOpen, onClose, onCustomize, onFinalize, item, recommendation, }) {
    const websiteColors = useWebsiteColors();
    if (!isOpen)
        return null;
    const displayItem = item || recommendation?.item;
    if (!displayItem)
        return null;
    return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-[#2A2D28] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10", children: [jsxRuntimeExports.jsxs("div", { className: "sticky top-0 bg-[#2A2D28] border-b border-white/10 px-6 py-4 flex items-center justify-between", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: "Product Details" }), jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-white/60 hover:text-white transition-colors", children: jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }), jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-2xl font-semibold text-white mb-2", children: displayItem.name }), jsxRuntimeExports.jsxs("p", { className: "text-white/60 text-sm", children: [displayItem.category, displayItem.subCategory && ` • ${displayItem.subCategory}`, displayItem.brand && ` • ${displayItem.brand}`] })] }), recommendation?.reasoning && (jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-lg p-4 border border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white/80 mb-2", children: "Why this fits:" }), jsxRuntimeExports.jsx("p", { className: "text-white/90 text-sm", children: recommendation.reasoning })] })), jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-lg p-4 border border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white/80 mb-3", children: "Dimensions" }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 text-sm", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Length:" }), jsxRuntimeExports.jsxs("p", { className: "text-white font-medium", children: [displayItem.dimensions.length, "m"] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Width:" }), jsxRuntimeExports.jsxs("p", { className: "text-white font-medium", children: [displayItem.dimensions.width, "m"] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Height:" }), jsxRuntimeExports.jsxs("p", { className: "text-white font-medium", children: [displayItem.dimensions.height, "m"] })] })] }), displayItem.dimensions.seatHeight && (jsxRuntimeExports.jsxs("div", { className: "mt-3 text-sm", children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Seat Height: " }), jsxRuntimeExports.jsxs("span", { className: "text-white font-medium", children: [displayItem.dimensions.seatHeight, "m"] })] }))] }), jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-lg p-4 border border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white/80 mb-3", children: "Materials" }), jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [displayItem.materials.primary && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Primary:" }), jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: displayItem.materials.primary })] })), displayItem.materials.secondary && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Secondary:" }), jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: displayItem.materials.secondary })] })), displayItem.materials.upholstery && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Upholstery:" }), jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: displayItem.materials.upholstery })] })), displayItem.materials.legs && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Legs:" }), jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: displayItem.materials.legs })] }))] })] }), jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-lg p-4 border border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white/80 mb-3", children: "Colors" }), jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [displayItem.colors.main && (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-white/60 text-sm", children: "Main:" }), jsxRuntimeExports.jsx("span", { className: "text-white font-medium text-sm", children: displayItem.colors.main })] })), displayItem.colors.accent && (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-white/60 text-sm", children: "Accent:" }), jsxRuntimeExports.jsx("span", { className: "text-white font-medium text-sm", children: displayItem.colors.accent })] }))] })] }), displayItem.styleTags && displayItem.styleTags.length > 0 && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white/80 mb-2", children: "Style" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: displayItem.styleTags.map((tag, i) => (jsxRuntimeExports.jsx("span", { className: "text-xs px-3 py-1 rounded-full bg-purple-500/15 text-purple-200 font-medium", children: tag }, i))) })] })), displayItem.priceRange && (jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-lg p-4 border border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white/80 mb-2", children: "Price Range" }), jsxRuntimeExports.jsxs("p", { className: "text-lg font-semibold text-white", children: ["$", displayItem.priceRange.min?.toLocaleString(), displayItem.priceRange.max && displayItem.priceRange.max !== displayItem.priceRange.min
                                            ? ` - $${displayItem.priceRange.max.toLocaleString()}`
                                            : ''] })] })), jsxRuntimeExports.jsx("div", { className: "bg-blue-500/10 border border-blue-500/30 rounded-lg p-4", children: jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-blue-200 text-sm font-medium mb-1", children: "Catalog coming soon" }), jsxRuntimeExports.jsx("p", { className: "text-blue-200/80 text-sm", children: "For now, you can customize this item or finalize a quote to get started." })] })] }) })] }), jsxRuntimeExports.jsxs("div", { className: "sticky bottom-0 bg-[#2A2D28] border-t border-white/10 px-6 py-4 space-y-3", children: [jsxRuntimeExports.jsxs("button", { onClick: onCustomize, className: "w-full px-6 py-3 rounded-lg font-semibold text-white transition-colors shadow-lg flex items-center justify-center gap-2", style: {
                                backgroundColor: websiteColors.primary,
                            }, children: [jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }), "Customize this"] }), jsxRuntimeExports.jsxs("button", { onClick: onFinalize, className: "w-full px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg flex items-center justify-center gap-2", children: [jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }), "Finalize & Request Quote"] }), jsxRuntimeExports.jsx("button", { onClick: onClose, className: "w-full text-center text-white/60 hover:text-white transition-colors text-sm py-2", children: "Close" })] })] }) }));
}

function RecommendationsList({ recommendations, onCustomize, onFinalize }) {
    const websiteColors = useWebsiteColors();
    const [selectedRecommendation, setSelectedRecommendation] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    // Use website colors for button only
    websiteColors.primary;
    const handleViewDetails = (recommendation) => {
        setSelectedRecommendation(recommendation);
        setShowDetailsModal(true);
    };
    const handleCustomizeFromModal = () => {
        if (selectedRecommendation && onCustomize) {
            setShowDetailsModal(false);
            onCustomize(selectedRecommendation.item);
        }
    };
    const handleFinalizeFromModal = () => {
        if (selectedRecommendation && onFinalize) {
            setShowDetailsModal(false);
            onFinalize(selectedRecommendation);
        }
    };
    if (recommendations.length === 0) {
        return (jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-white/60", children: jsxRuntimeExports.jsx("p", { className: "text-lg", children: "No recommendations available yet." }) }));
    }
    return (jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-6 text-white", children: "AI Recommendations" }), jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: recommendations.map((rec, index) => (jsxRuntimeExports.jsx("div", { className: "bg-zinc-900 rounded-lg shadow-md border border-white/10 overflow-hidden hover:shadow-lg transition-shadow", children: jsxRuntimeExports.jsxs("div", { className: "p-6", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-white", children: rec.item.name }), rec.matchScore && (jsxRuntimeExports.jsxs("span", { className: "text-sm px-2 py-1 rounded bg-emerald-500/15 text-emerald-200 font-medium", children: [Math.round(rec.matchScore * 100), "% match"] }))] }), jsxRuntimeExports.jsxs("p", { className: "text-sm mb-4 text-white/60", children: [rec.item.category, " ", rec.item.subCategory && `• ${rec.item.subCategory}`] }), jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 rounded bg-white/5 border border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium mb-2 text-white/80", children: "Dimensions:" }), jsxRuntimeExports.jsxs("div", { className: "text-sm space-y-1 text-white", children: [jsxRuntimeExports.jsxs("div", { children: ["Length: ", jsxRuntimeExports.jsxs("strong", { children: [rec.item.dimensions.length, "m"] })] }), jsxRuntimeExports.jsxs("div", { children: ["Width: ", jsxRuntimeExports.jsxs("strong", { children: [rec.item.dimensions.width, "m"] })] }), jsxRuntimeExports.jsxs("div", { children: ["Height: ", jsxRuntimeExports.jsxs("strong", { children: [rec.item.dimensions.height, "m"] })] }), rec.item.dimensions.seatHeight && (jsxRuntimeExports.jsxs("div", { children: ["Seat Height: ", jsxRuntimeExports.jsxs("strong", { children: [rec.item.dimensions.seatHeight, "m"] })] })), rec.item.dimensions.clearance && (jsxRuntimeExports.jsxs("div", { className: "text-xs mt-2 text-white/60", children: ["Clearance: Front ", rec.item.dimensions.clearance.front || 'N/A', "m"] }))] })] }), jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium mb-1 text-white/80", children: "Materials:" }), jsxRuntimeExports.jsxs("p", { className: "text-sm text-white", children: [rec.item.materials.primary, rec.item.materials.secondary && `, ${rec.item.materials.secondary}`, rec.item.materials.upholstery && ` • Upholstery: ${rec.item.materials.upholstery}`] })] }), jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium mb-1 text-white/80", children: "Colors:" }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-white", children: rec.item.colors.main }), rec.item.colors.accent && (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "\u2022" }), jsxRuntimeExports.jsx("span", { className: "text-sm text-white", children: rec.item.colors.accent })] }))] })] }), rec.item.styleTags && rec.item.styleTags.length > 0 && (jsxRuntimeExports.jsx("div", { className: "mb-4 flex flex-wrap gap-2", children: rec.item.styleTags.map((tag, i) => (jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-1 rounded bg-purple-500/15 text-purple-200 font-medium", children: tag }, i))) })), rec.placement && (jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 rounded bg-white/5 border border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium mb-2 text-white/80", children: "Placement:" }), rec.placement.coordinates && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs text-white", children: [jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Position: " }), "(", rec.placement.coordinates.x.toFixed(2), "m, ", rec.placement.coordinates.y.toFixed(2), "m)", jsxRuntimeExports.jsx("span", { className: "ml-2 text-white/60", children: "from southwest corner" })] })), rec.placement.distanceFromWalls && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs space-y-1 text-white", children: [jsxRuntimeExports.jsx("div", { className: "font-semibold mb-1", children: "Distance from walls:" }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-1", children: [rec.placement.distanceFromWalls.north !== undefined && (jsxRuntimeExports.jsxs("div", { children: ["North: ", jsxRuntimeExports.jsxs("strong", { children: [rec.placement.distanceFromWalls.north.toFixed(2), "m"] })] })), rec.placement.distanceFromWalls.south !== undefined && (jsxRuntimeExports.jsxs("div", { children: ["South: ", jsxRuntimeExports.jsxs("strong", { children: [rec.placement.distanceFromWalls.south.toFixed(2), "m"] })] })), rec.placement.distanceFromWalls.east !== undefined && (jsxRuntimeExports.jsxs("div", { children: ["East: ", jsxRuntimeExports.jsxs("strong", { children: [rec.placement.distanceFromWalls.east.toFixed(2), "m"] })] })), rec.placement.distanceFromWalls.west !== undefined && (jsxRuntimeExports.jsxs("div", { children: ["West: ", jsxRuntimeExports.jsxs("strong", { children: [rec.placement.distanceFromWalls.west.toFixed(2), "m"] })] }))] })] })), rec.placement.rotation !== undefined && rec.placement.rotation !== 0 && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs text-white", children: [jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Rotation: " }), rec.placement.rotation, "\u00B0"] })), (rec.placement.wall || rec.placement.position) && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs text-white", children: [jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Location: " }), rec.placement.position || (rec.placement.wall ? `Against ${rec.placement.wall} wall` : 'Centered')] })), jsxRuntimeExports.jsx("p", { className: "text-sm mt-2 pt-2 border-t border-white/10 text-white", children: rec.placement.reasoning })] })), jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium mb-1 text-white/80", children: "Why this fits:" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-white", children: rec.reasoning })] }), rec.item.priceRange && (jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-white/10", children: jsxRuntimeExports.jsxs("p", { className: "text-sm text-white/80", children: ["Price: ", jsxRuntimeExports.jsxs("strong", { className: "text-white", children: ["$", rec.item.priceRange.min?.toLocaleString(), rec.item.priceRange.max && rec.item.priceRange.max !== rec.item.priceRange.min
                                                    ? ` - $${rec.item.priceRange.max.toLocaleString()}`
                                                    : ''] })] }) })), jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-white/10 space-y-2", children: [onCustomize && (jsxRuntimeExports.jsxs("button", { onClick: () => onCustomize(rec.item), className: "w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 border border-white/20 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center gap-2", children: [jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }), "Customize this"] })), jsxRuntimeExports.jsxs("button", { onClick: () => handleViewDetails(rec), className: "w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 border border-white/20 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center gap-2", children: [jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }), "View in Catalog"] })] })] }) }, rec.item.id || index))) }), jsxRuntimeExports.jsx(ProductDetailsModal, { isOpen: showDetailsModal, onClose: () => {
                    setShowDetailsModal(false);
                    setSelectedRecommendation(null);
                }, onCustomize: handleCustomizeFromModal, onFinalize: handleFinalizeFromModal, recommendation: selectedRecommendation })] }));
}

function RoomPhotoPreview({ photoUrl, showFurniture = false }) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const handleFullscreen = () => {
        if (!document.fullscreenElement && photoUrl) {
            const element = document.getElementById('room-preview-image');
            if (element?.requestFullscreen) {
                element.requestFullscreen();
                setIsFullscreen(true);
            }
        }
        else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };
    return (jsxRuntimeExports.jsxs("div", { className: "bg-[#2D312C] rounded-xl border border-earth-border p-4 md:p-6 h-full flex flex-col", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-text-heading", children: "Your Room Preview" }), photoUrl && (jsxRuntimeExports.jsx("button", { onClick: handleFullscreen, className: "p-2 rounded-lg bg-earth-card border border-earth-border hover:border-earth-sage transition-colors", title: "Full Screen", children: jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" }) }) }))] }), jsxRuntimeExports.jsx("div", { className: "flex-1 bg-earth-background rounded-lg border border-earth-border relative overflow-hidden min-h-[300px] flex items-center justify-center", children: photoUrl ? (jsxRuntimeExports.jsxs("div", { id: "room-preview-image", className: "relative w-full h-full", children: [jsxRuntimeExports.jsx("img", { src: photoUrl, alt: "Room preview with AI furniture placement", className: "w-full h-full object-contain" }), showFurniture && (jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/4 w-20 h-20 border-2 border-earth-sage rounded-lg flex items-center justify-center bg-earth-sage/20", children: jsxRuntimeExports.jsx("svg", { className: "w-10 h-10 text-earth-sage", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }), jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 right-1/4 w-16 h-16 border-2 border-earth-sage rounded-lg flex items-center justify-center bg-earth-sage/20", children: jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-earth-sage", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) })] }))] })) : (jsxRuntimeExports.jsxs("div", { className: "text-center p-8", children: [jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "\uD83D\uDCF8" }), jsxRuntimeExports.jsx("p", { className: "text-text-primary mb-2", children: "Upload a room photo to see preview" }), jsxRuntimeExports.jsx("p", { className: "text-text-muted text-sm", children: "AI will place recommended furniture here" })] })) }), photoUrl && (jsxRuntimeExports.jsx("div", { className: "mt-3 text-xs text-text-muted text-center", children: jsxRuntimeExports.jsx("p", { children: "AI-recommended furniture placement visualization" }) }))] }));
}

function CustomizedFurnitureList({ items, onItemRemoved, onNavigateToCustomizer }) {
    const { storage } = useWidgetContext();
    const [removingId, setRemovingId] = useState(null);
    const handleRemove = async (id) => {
        if (!confirm('Are you sure you want to remove this customized furniture item?')) {
            return;
        }
        setRemovingId(id);
        try {
            storage.removeCustomizedFurniture(id);
            if (onItemRemoved) {
                onItemRemoved();
            }
        }
        catch (error) {
            console.error('Failed to remove item:', error);
        }
        finally {
            setRemovingId(null);
        }
    };
    const handleNavigateToCustomizer = () => {
        console.log('[CustomizedFurnitureList] Navigate to Customizer button clicked');
        if (onNavigateToCustomizer) {
            console.log('[CustomizedFurnitureList] Calling onNavigateToCustomizer callback');
            onNavigateToCustomizer();
        }
        else {
            console.log('[CustomizedFurnitureList] Dispatching modly:navigate-to-customizer event');
            // Fallback: dispatch custom event for parent widget
            window.dispatchEvent(new CustomEvent('modly:navigate-to-customizer'));
        }
    };
    if (items.length === 0) {
        return (jsxRuntimeExports.jsxs("div", { className: "text-center py-12 relative", children: [jsxRuntimeExports.jsx("div", { className: "mb-4", children: jsxRuntimeExports.jsx("svg", { className: "w-16 h-16 mx-auto text-text-muted", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" }) }) }), jsxRuntimeExports.jsx("p", { className: "text-lg text-text-primary mb-2", children: "No customized furniture yet" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-text-muted mb-4", children: "Customize furniture in the Customizer to see your creations here" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleNavigateToCustomizer, className: "px-6 py-3 bg-earth-forest text-white rounded-xl font-semibold hover:bg-earth-forest/90 transition-all duration-300 cursor-pointer relative z-10", children: "Go to Customizer" })] }));
    }
    return (jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-text-heading mb-6", children: "My Customized Furniture" }), jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: items.map((item) => (jsxRuntimeExports.jsxs("div", { className: "bg-earth-card rounded-xl shadow-soft border border-earth-border overflow-hidden hover:shadow-lg transition-shadow relative", children: [jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 z-10", children: jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-earth-sage text-text-primary rounded-lg text-xs font-semibold", children: "Custom" }) }), jsxRuntimeExports.jsx("div", { className: "w-full h-48 bg-earth-input flex items-center justify-center", children: jsxRuntimeExports.jsx("svg", { className: "w-16 h-16 text-text-muted", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }), jsxRuntimeExports.jsxs("div", { className: "p-6", children: [jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-text-heading mb-1", children: item.name }), jsxRuntimeExports.jsx("p", { className: "text-sm text-text-muted capitalize", children: item.baseItemType }), jsxRuntimeExports.jsxs("p", { className: "text-xs text-text-muted mt-1", children: ["Saved ", new Date(item.savedAt).toLocaleDateString()] })] }), jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 bg-earth-input rounded-xl border border-earth-border", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-text-heading mb-2", children: "Dimensions:" }), jsxRuntimeExports.jsxs("div", { className: "text-sm text-text-primary space-y-1", children: [jsxRuntimeExports.jsxs("div", { children: ["Length: ", jsxRuntimeExports.jsxs("strong", { children: [item.dimensions.length.toFixed(2), "m"] })] }), jsxRuntimeExports.jsxs("div", { children: ["Width: ", jsxRuntimeExports.jsxs("strong", { children: [item.dimensions.width.toFixed(2), "m"] })] }), jsxRuntimeExports.jsxs("div", { children: ["Height: ", jsxRuntimeExports.jsxs("strong", { children: [item.dimensions.height.toFixed(2), "m"] })] })] })] }), jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-text-heading mb-2", children: "Colors:" }), jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-earth-input border border-earth-border rounded-lg text-sm text-text-primary", children: item.colorScheme.primary }), item.colorScheme.secondary && (jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-earth-input border border-earth-border rounded-lg text-sm text-text-primary", children: item.colorScheme.secondary })), item.colorScheme.accent && (jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-earth-input border border-earth-border rounded-lg text-sm text-text-primary", children: item.colorScheme.accent }))] })] }), (item.materials.primary || item.materials.legs || item.materials.upholstery) && (jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-text-heading mb-1", children: "Materials:" }), jsxRuntimeExports.jsxs("p", { className: "text-sm text-text-primary", children: [item.materials.primary, item.materials.legs && ` • Legs: ${item.materials.legs}`, item.materials.upholstery && ` • Upholstery: ${item.materials.upholstery}`] })] })), item.ornamentDetails && item.ornamentDetails.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-text-heading mb-2", children: "Details:" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: item.ornamentDetails.map((detail, i) => (jsxRuntimeExports.jsx("span", { className: "text-xs bg-earth-sage/20 text-text-primary px-2 py-1 rounded", children: detail }, i))) })] })), item.aiNotes && (jsxRuntimeExports.jsx("div", { className: "mb-4 pt-4 border-t border-earth-border", children: jsxRuntimeExports.jsx("p", { className: "text-xs text-text-muted line-clamp-2", children: item.aiNotes }) })), jsxRuntimeExports.jsx("div", { className: "flex gap-2 pt-4 border-t border-earth-border", children: jsxRuntimeExports.jsx("button", { onClick: () => handleRemove(item.id), disabled: removingId === item.id, className: "flex-1 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl font-medium hover:bg-red-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm", children: removingId === item.id ? 'Removing...' : 'Remove' }) })] })] }, item.id))) })] }));
}

function FinalizeQuoteModal({ isOpen, onClose, onProceed, item, recommendation, }) {
    const websiteColors = useWebsiteColors();
    if (!isOpen)
        return null;
    const displayItem = item || (recommendation ? {
        name: recommendation.item.name,
        dimensions: recommendation.item.dimensions,
        materials: recommendation.item.materials,
        colorScheme: {
            primary: recommendation.item.colors.main,
            secondary: recommendation.item.colors.accent,
        },
        aiNotes: recommendation.reasoning,
    } : null);
    if (!displayItem)
        return null;
    return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-[#2A2D28] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10", children: [jsxRuntimeExports.jsxs("div", { className: "sticky top-0 bg-[#2A2D28] border-b border-white/10 px-6 py-4 flex items-center justify-between", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: "Finalize & Request Quote" }), jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-white/60 hover:text-white transition-colors", children: jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }), jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-white mb-2", children: displayItem.name }), jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm", children: "Review your customization details" })] }), jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-lg p-4 border border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white/80 mb-3", children: "Dimensions" }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 text-sm", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Length:" }), jsxRuntimeExports.jsxs("p", { className: "text-white font-medium", children: [displayItem.dimensions.length, "m"] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Width:" }), jsxRuntimeExports.jsxs("p", { className: "text-white font-medium", children: [displayItem.dimensions.width, "m"] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Height:" }), jsxRuntimeExports.jsxs("p", { className: "text-white font-medium", children: [displayItem.dimensions.height, "m"] })] })] })] }), displayItem.materials && Object.keys(displayItem.materials).length > 0 && (jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-lg p-4 border border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white/80 mb-3", children: "Materials" }), jsxRuntimeExports.jsx("div", { className: "space-y-2 text-sm", children: Object.entries(displayItem.materials).map(([key, value]) => value ? (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsxs("span", { className: "text-white/60 capitalize", children: [key, ":"] }), jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: value })] }, key)) : null) })] })), displayItem.colorScheme && (jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-lg p-4 border border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white/80 mb-3", children: "Color Scheme" }), jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [displayItem.colorScheme.primary && (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-white/60 text-sm", children: "Primary:" }), jsxRuntimeExports.jsx("span", { className: "text-white font-medium text-sm", children: displayItem.colorScheme.primary })] })), displayItem.colorScheme.secondary && (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-white/60 text-sm", children: "Secondary:" }), jsxRuntimeExports.jsx("span", { className: "text-white font-medium text-sm", children: displayItem.colorScheme.secondary })] })), displayItem.colorScheme.accent && (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-white/60 text-sm", children: "Accent:" }), jsxRuntimeExports.jsx("span", { className: "text-white font-medium text-sm", children: displayItem.colorScheme.accent })] }))] })] })), displayItem.aiNotes && (jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-lg p-4 border border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white/80 mb-2", children: "AI Notes" }), jsxRuntimeExports.jsx("p", { className: "text-white/90 text-sm", children: displayItem.aiNotes })] })), recommendation?.placement && (jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-lg p-4 border border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white/80 mb-3", children: "Placement Information" }), recommendation.placement.coordinates && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-sm", children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Position: " }), jsxRuntimeExports.jsxs("span", { className: "text-white", children: ["(", recommendation.placement.coordinates.x.toFixed(2), "m, ", recommendation.placement.coordinates.y.toFixed(2), "m)"] }), jsxRuntimeExports.jsx("span", { className: "text-white/60 ml-2", children: "from southwest corner" })] })), recommendation.placement.distanceFromWalls && (jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [jsxRuntimeExports.jsx("div", { className: "text-sm text-white/60 mb-1", children: "Distance from walls:" }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [recommendation.placement.distanceFromWalls.north !== undefined && (jsxRuntimeExports.jsxs("div", { className: "text-white", children: ["North: ", jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [recommendation.placement.distanceFromWalls.north.toFixed(2), "m"] })] })), recommendation.placement.distanceFromWalls.south !== undefined && (jsxRuntimeExports.jsxs("div", { className: "text-white", children: ["South: ", jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [recommendation.placement.distanceFromWalls.south.toFixed(2), "m"] })] })), recommendation.placement.distanceFromWalls.east !== undefined && (jsxRuntimeExports.jsxs("div", { className: "text-white", children: ["East: ", jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [recommendation.placement.distanceFromWalls.east.toFixed(2), "m"] })] })), recommendation.placement.distanceFromWalls.west !== undefined && (jsxRuntimeExports.jsxs("div", { className: "text-white", children: ["West: ", jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [recommendation.placement.distanceFromWalls.west.toFixed(2), "m"] })] }))] })] })), recommendation.placement.rotation !== undefined && recommendation.placement.rotation !== 0 && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-sm", children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Rotation: " }), jsxRuntimeExports.jsxs("span", { className: "text-white font-medium", children: [recommendation.placement.rotation, "\u00B0"] })] })), recommendation.placement.reasoning && (jsxRuntimeExports.jsx("div", { className: "mt-3 pt-3 border-t border-white/10", children: jsxRuntimeExports.jsx("p", { className: "text-sm text-white/90", children: recommendation.placement.reasoning }) }))] }))] }), jsxRuntimeExports.jsxs("div", { className: "sticky bottom-0 bg-[#2A2D28] border-t border-white/10 px-6 py-4 flex gap-3", children: [jsxRuntimeExports.jsx("button", { onClick: onClose, className: "flex-1 px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors", children: "Back" }), jsxRuntimeExports.jsx("button", { onClick: onProceed, className: "flex-1 px-6 py-3 rounded-lg font-medium text-white transition-colors shadow-lg", style: {
                                backgroundColor: websiteColors.primary,
                            }, children: "Proceed" })] })] }) }));
}

function QuoteRequestForm({ isOpen, onClose, onSubmit, item, recommendation, }) {
    const websiteColors = useWebsiteColors();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    if (!isOpen)
        return null;
    const displayItem = item || (recommendation ? {
        name: recommendation.item.name,
        dimensions: recommendation.item.dimensions,
        materials: recommendation.item.materials,
        colorScheme: {
            primary: recommendation.item.colors.main,
            secondary: recommendation.item.colors.accent,
        },
        aiNotes: recommendation.reasoning,
        placement: recommendation.placement,
    } : null);
    if (!displayItem)
        return null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        // Validation
        if (!formData.name.trim()) {
            setError('Name is required');
            return;
        }
        if (!formData.email.trim()) {
            setError('Email is required');
            return;
        }
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }
        setIsSubmitting(true);
        try {
            const quoteRequest = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim() || undefined,
                notes: formData.notes.trim() || undefined,
                item: {
                    name: displayItem.name,
                    dimensions: {
                        length: displayItem.dimensions.length,
                        width: displayItem.dimensions.width,
                        height: displayItem.dimensions.height,
                    },
                    materials: displayItem.materials,
                    colorScheme: displayItem.colorScheme,
                    aiNotes: displayItem.aiNotes,
                    placement: displayItem.placement ? {
                        wall: displayItem.placement.wall,
                        position: displayItem.placement.position,
                        coordinates: displayItem.placement.coordinates,
                        reasoning: displayItem.placement.reasoning,
                    } : undefined,
                },
            };
            await onSubmit(quoteRequest);
            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                notes: '',
            });
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit quote request');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-[#2A2D28] rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/10", children: [jsxRuntimeExports.jsxs("div", { className: "sticky top-0 bg-[#2A2D28] border-b border-white/10 px-6 py-4 flex items-center justify-between", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: "Request Quote" }), jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-white/60 hover:text-white transition-colors", children: jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }), jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-6", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm mb-4", children: "Please provide your contact information and we'll send you a detailed quote for:" }), jsxRuntimeExports.jsx("p", { className: "text-white font-medium", children: displayItem.name })] }), error && (jsxRuntimeExports.jsx("div", { className: "bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm", children: error })), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { htmlFor: "name", className: "block text-sm font-medium text-white mb-2", children: ["Name ", jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "*" })] }), jsxRuntimeExports.jsx("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, required: true, className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors", placeholder: "Your name", disabled: isSubmitting })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { htmlFor: "email", className: "block text-sm font-medium text-white mb-2", children: ["Email ", jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "*" })] }), jsxRuntimeExports.jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, required: true, className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors", placeholder: "your.email@example.com", disabled: isSubmitting })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { htmlFor: "phone", className: "block text-sm font-medium text-white mb-2", children: ["Phone ", jsxRuntimeExports.jsx("span", { className: "text-white/40 text-xs", children: "(optional)" })] }), jsxRuntimeExports.jsx("input", { type: "tel", id: "phone", name: "phone", value: formData.phone, onChange: handleChange, className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors", placeholder: "+1 (555) 123-4567", disabled: isSubmitting })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { htmlFor: "notes", className: "block text-sm font-medium text-white mb-2", children: ["Additional Notes ", jsxRuntimeExports.jsx("span", { className: "text-white/40 text-xs", children: "(optional)" })] }), jsxRuntimeExports.jsx("textarea", { id: "notes", name: "notes", value: formData.notes, onChange: handleChange, rows: 4, className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors resize-none", placeholder: "Any special requests or questions...", disabled: isSubmitting })] }), jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, disabled: isSubmitting, className: "flex-1 px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: "Cancel" }), jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSubmitting, className: "flex-1 px-6 py-3 rounded-lg font-medium text-white transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2", style: {
                                        backgroundColor: websiteColors.primary,
                                    }, children: isSubmitting ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("svg", { className: "animate-spin h-5 w-5", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), jsxRuntimeExports.jsx("span", { children: "Submitting..." })] })) : ('Submit Quote Request') })] })] })] }) }));
}

const STORAGE_KEY$1 = 'modly-room-planner-state';
function FurnitureRoomPlannerWidget({ config = {}, onCustomizeItem, onNavigateToCustomizer }) {
    const mergedConfig = useMemo(() => mergeConfig(config), [config]);
    const apiClient = useMemo(() => new ApiClient(mergedConfig), [mergedConfig]);
    const storage = useMemo(() => new Storage(mergedConfig.storageKey), [mergedConfig.storageKey]);
    const [recommendations, setRecommendations] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [customizedFurniture, setCustomizedFurniture] = useState([]);
    const [savedDimensions, setSavedDimensions] = useState(undefined);
    const [savedPreferences, setSavedPreferences] = useState(undefined);
    const formRef = useRef(null);
    // Finalize & Quote state
    const [showFinalizeModal, setShowFinalizeModal] = useState(false);
    const [showQuoteForm, setShowQuoteForm] = useState(false);
    const [quoteSuccess, setQuoteSuccess] = useState(false);
    const [selectedRecommendation, setSelectedRecommendation] = useState(null);
    // Load persisted state on mount
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY$1);
            if (saved) {
                const state = JSON.parse(saved);
                if (state.uploadedPhotos && state.uploadedPhotos.length > 0) {
                    setUploadedPhotos(state.uploadedPhotos);
                }
                if (state.recommendations) {
                    setRecommendations(state.recommendations);
                }
                if (state.lastDimensions) {
                    setSavedDimensions(state.lastDimensions);
                }
                if (state.lastPreferences) {
                    setSavedPreferences(state.lastPreferences);
                }
            }
        }
        catch (e) {
            console.warn('Failed to load persisted room planner state:', e);
        }
    }, []);
    // Save state whenever it changes
    useEffect(() => {
        try {
            const state = {
                uploadedPhotos,
                recommendations,
                lastDimensions: savedDimensions,
                lastPreferences: savedPreferences,
            };
            sessionStorage.setItem(STORAGE_KEY$1, JSON.stringify(state));
        }
        catch (e) {
            console.warn('Failed to save room planner state:', e);
        }
    }, [uploadedPhotos, recommendations, savedDimensions, savedPreferences]);
    useEffect(() => {
        const loadCustomizedFurniture = () => {
            const items = storage.getCustomizedFurniture();
            setCustomizedFurniture(items);
        };
        loadCustomizedFurniture();
    }, [storage]);
    const handleItemRemoved = () => {
        const items = storage.getCustomizedFurniture();
        setCustomizedFurniture(items);
    };
    const handleCustomize = (item) => {
        // Store the item in sessionStorage for the customizer to pick up
        sessionStorage.setItem('modly-customize-item', JSON.stringify(item));
        // Trigger callback if provided (for parent widget to switch tabs)
        if (onCustomizeItem) {
            onCustomizeItem(item);
        }
        else {
            // Fallback: dispatch custom event for parent widget
            window.dispatchEvent(new CustomEvent('modly:customize-item', { detail: item }));
        }
    };
    const handleNavigateToCustomizer = () => {
        console.log('[FurnitureRoomPlannerWidget] handleNavigateToCustomizer called');
        // Trigger callback if provided (for parent widget to switch tabs)
        if (onNavigateToCustomizer) {
            console.log('[FurnitureRoomPlannerWidget] Calling parent onNavigateToCustomizer');
            onNavigateToCustomizer();
        }
        else {
            console.log('[FurnitureRoomPlannerWidget] Dispatching modly:navigate-to-customizer event');
            // Fallback: dispatch custom event for parent widget
            window.dispatchEvent(new CustomEvent('modly:navigate-to-customizer'));
        }
    };
    const handlePhotosChange = async (photos) => {
        // Convert files to base64 for persistence
        const photoPromises = photos.map((photo) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(photo);
            });
        });
        const base64Photos = await Promise.all(photoPromises);
        setUploadedPhotos(base64Photos);
    };
    const handleDimensionsChange = (dimensions) => {
        setSavedDimensions(dimensions);
    };
    const handlePreferencesChange = (preferences) => {
        setSavedPreferences(preferences);
    };
    const handleUpload = async (photos, dimensions, preferences) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await apiClient.analyzeRoom(photos, dimensions, preferences);
            setRecommendations(data);
            // Dimensions and preferences are already saved via handleDimensionsChange and handlePreferencesChange
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            mergedConfig.onError?.(err instanceof Error ? err : new Error(errorMessage));
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleFinalizeRecommendation = (recommendation) => {
        setSelectedRecommendation(recommendation);
        setShowFinalizeModal(true);
    };
    const handleProceedToQuote = () => {
        setShowFinalizeModal(false);
        setShowQuoteForm(true);
    };
    const handleQuoteSubmit = async (quoteRequest) => {
        try {
            // Send quote request to API using apiClient
            await apiClient.submitQuoteRequest(quoteRequest);
            // Show success
            setShowQuoteForm(false);
            setQuoteSuccess(true);
            setSelectedRecommendation(null);
            setTimeout(() => {
                setQuoteSuccess(false);
            }, 5000);
        }
        catch (err) {
            throw err; // Let the form handle the error display
        }
    };
    return (jsxRuntimeExports.jsxs(WidgetProvider, { apiClient: apiClient, storage: storage, config: mergedConfig, children: [jsxRuntimeExports.jsx("div", { className: "furniture-widget-room-planner min-h-screen bg-[#1A1C19] py-12 px-6", children: jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-[#F0EFEA] mb-4", children: "Room Planner" }), jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-[#F0EFEA] max-w-2xl mx-auto", children: "Upload photos of your room and provide dimensions. Our AI will recommend the perfect furniture with detailed measurements and placement suggestions." })] }), jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-6 mb-8 items-stretch", children: [jsxRuntimeExports.jsx("div", { className: "flex flex-col", children: jsxRuntimeExports.jsx("div", { className: "bg-earth-card p-6 md:p-8 rounded-xl shadow-soft border border-[#3A3F38] h-full flex flex-col", children: jsxRuntimeExports.jsx(RoomUploadForm, { onUpload: handleUpload, isLoading: isLoading, onPhotosChange: handlePhotosChange, formRef: (form) => { formRef.current = form; }, initialDimensions: savedDimensions, initialPreferences: savedPreferences, onDimensionsChange: handleDimensionsChange, onPreferencesChange: handlePreferencesChange }) }) }), jsxRuntimeExports.jsx("div", { className: "flex flex-col", children: jsxRuntimeExports.jsx(RoomPhotoPreview, { photoUrl: uploadedPhotos[0], showFurniture: !!recommendations }) })] }), jsxRuntimeExports.jsx("div", { className: "mb-12 flex justify-center", children: jsxRuntimeExports.jsx("button", { type: "button", onClick: () => formRef.current?.requestSubmit(), disabled: isLoading, className: "px-8 py-4 bg-earth-forest text-white rounded-xl font-semibold text-lg hover:bg-earth-forest/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2", children: isLoading ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("svg", { className: "animate-spin h-5 w-5", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), jsxRuntimeExports.jsx("span", { children: "Analyzing Room..." })] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }) }), jsxRuntimeExports.jsx("span", { children: "Get AI Recommendations" })] })) }) }), error && (jsxRuntimeExports.jsxs("div", { className: "bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6", children: [jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Error:" }), jsxRuntimeExports.jsx("p", { children: error })] })), jsxRuntimeExports.jsx("div", { className: "mb-12 bg-earth-card p-6 md:p-8 rounded-xl shadow-soft border border-earth-border", children: jsxRuntimeExports.jsx(CustomizedFurnitureList, { items: customizedFurniture, onItemRemoved: handleItemRemoved, onNavigateToCustomizer: handleNavigateToCustomizer }) }), recommendations && (jsxRuntimeExports.jsxs("div", { className: "bg-earth-card p-6 md:p-8 rounded-xl shadow-soft border border-earth-border", children: [recommendations.roomAnalysis && (jsxRuntimeExports.jsxs("div", { className: "mb-8 p-6 bg-earth-background rounded-xl border border-earth-border", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold text-text-heading mb-4", children: "Room Analysis" }), jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-sm text-text-muted mb-1", children: "Detected Style:" }), jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-text-primary", children: recommendations.roomAnalysis.detectedStyle })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-sm text-text-muted mb-1", children: "Dominant Colors:" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-1", children: recommendations.roomAnalysis.dominantColors.map((color, i) => (jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-earth-input border border-earth-border rounded-xl text-sm text-text-primary", children: color }, i))) })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-sm text-text-muted mb-1", children: "Free Space:" }), jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-text-primary", children: recommendations.roomAnalysis.freeSpace.description })] })] })] })), jsxRuntimeExports.jsx(RecommendationsList, { recommendations: recommendations.recommendations, onCustomize: handleCustomize, onFinalize: handleFinalizeRecommendation }), recommendations.recommendations && recommendations.recommendations.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mt-8 pt-6 border-t border-earth-border text-center", children: [jsxRuntimeExports.jsx("p", { className: "text-white/80 mb-4", children: "Found the perfect piece?" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 justify-center", children: recommendations.recommendations.slice(0, 3).map((rec, idx) => (jsxRuntimeExports.jsxs("button", { onClick: () => handleFinalizeRecommendation(rec), className: "px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-300 flex items-center gap-2 shadow-lg", children: [jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }), jsxRuntimeExports.jsxs("span", { children: ["Request Quote for ", rec.item.name] })] }, rec.item.id || idx))) })] }))] }))] }) }), jsxRuntimeExports.jsx(FinalizeQuoteModal, { isOpen: showFinalizeModal, onClose: () => {
                    setShowFinalizeModal(false);
                    setSelectedRecommendation(null);
                }, onProceed: handleProceedToQuote, recommendation: selectedRecommendation }), jsxRuntimeExports.jsx(QuoteRequestForm, { isOpen: showQuoteForm, onClose: () => {
                    setShowQuoteForm(false);
                    setSelectedRecommendation(null);
                }, onSubmit: handleQuoteSubmit, recommendation: selectedRecommendation }), quoteSuccess && (jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-slide-up", children: [jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Quote Request Submitted!" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-white/90", children: "We'll contact you soon with details." })] })] }))] }));
}

function ColorComboBox({ label, value, onChange, options, placeholder = '', disabled = false, }) {
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    // Filter options based on input value
    useEffect(() => {
        if (value.trim() === '') {
            setFilteredOptions(options);
        }
        else {
            const filtered = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
            setFilteredOptions(filtered);
        }
    }, [value, options]);
    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
                inputRef.current?.blur();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);
    const handleInputChange = (e) => {
        onChange(e.target.value);
        setIsOpen(true);
    };
    const handleInputFocus = () => {
        setIsOpen(true);
    };
    const handleOptionClick = (option) => {
        onChange(option);
        setIsOpen(false);
        inputRef.current?.blur();
    };
    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            if (!isOpen) {
                inputRef.current?.focus();
            }
        }
    };
    return (jsxRuntimeExports.jsxs("div", { ref: wrapperRef, className: "relative", children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-text-primary mb-2", children: label }), jsxRuntimeExports.jsxs("div", { className: "relative", children: [jsxRuntimeExports.jsx("input", { ref: inputRef, type: "text", value: value, onChange: handleInputChange, onFocus: handleInputFocus, placeholder: placeholder, disabled: disabled, className: "w-full px-4 py-2.5 pr-10 border border-earth-border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: toggleDropdown, disabled: disabled, className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed", tabIndex: -1, children: jsxRuntimeExports.jsx("svg", { className: `w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }) })] }), isOpen && !disabled && (jsxRuntimeExports.jsx("div", { className: "absolute z-50 w-full mt-1 bg-white border border-earth-border rounded-xl shadow-lg max-h-60 overflow-y-auto", children: filteredOptions.length > 0 ? (jsxRuntimeExports.jsx("ul", { className: "py-1", children: filteredOptions.map((option) => (jsxRuntimeExports.jsx("li", { children: jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleOptionClick(option), className: "w-full px-4 py-2.5 text-left text-[#1A1C19] hover:bg-earth-sage/10 transition-colors", children: option }) }, option))) })) : (jsxRuntimeExports.jsx("div", { className: "px-4 py-2.5 text-[#757575] text-sm", children: "No matching colors" })) }))] }));
}

function FurnitureCustomizerPanel({ baseItem, onCustomize, isLoading, }) {
    const [config, setConfig] = useState({
        baseItemId: baseItem?.id,
        baseItemType: baseItem?.type || 'sofa',
        baseItemName: baseItem?.name,
        colorScheme: {
            primary: baseItem?.currentConfig?.colorScheme?.primary || 'Beige',
            secondary: baseItem?.currentConfig?.colorScheme?.secondary || 'Forest Green',
            accent: baseItem?.currentConfig?.colorScheme?.accent || 'Terracotta',
        },
        materialOverrides: baseItem?.currentConfig?.materialOverrides || {},
        ornamentDetails: baseItem?.currentConfig?.ornamentDetails || [],
        dimensionAdjustments: baseItem?.currentConfig?.dimensionAdjustments || {},
    });
    const [customPrompt, setCustomPrompt] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onCustomize(config);
    };
    const handlePromptCustomize = async () => {
        if (!customPrompt.trim())
            return;
        console.log('Apply AI clicked', { promptText: customPrompt });
        // In a real implementation, this would call the API
        // For now, we'll just update the config based on common keywords
        const prompt = customPrompt.toLowerCase();
        // Create a proper deep copy of config to avoid mutations
        const newConfig = {
            ...config,
            colorScheme: { ...config.colorScheme },
            materialOverrides: { ...config.materialOverrides },
            dimensionAdjustments: { ...config.dimensionAdjustments },
            ornamentDetails: [...(config.ornamentDetails || [])],
        };
        // Color adjustments
        if (prompt.includes('darker') || prompt.includes('dark')) {
            newConfig.colorScheme.primary = 'Dark Brown';
        }
        if (prompt.includes('lighter') || prompt.includes('light')) {
            newConfig.colorScheme.primary = 'Light Beige';
        }
        if (prompt.includes('green')) {
            newConfig.colorScheme.accent = 'Forest Green';
        }
        if (prompt.includes('terracotta') || prompt.includes('orange')) {
            newConfig.colorScheme.accent = 'Terracotta';
        }
        // Material adjustments
        if (prompt.includes('wood') || prompt.includes('oak')) {
            newConfig.materialOverrides.legs = 'Oak Wood';
            if (!newConfig.materialOverrides.primary) {
                newConfig.materialOverrides.primary = 'Solid Oak';
            }
        }
        if (prompt.includes('walnut')) {
            newConfig.materialOverrides.primary = 'Walnut Wood';
        }
        if (prompt.includes('metal')) {
            newConfig.materialOverrides.legs = 'Metal';
        }
        // Dimension adjustments
        if (prompt.includes('longer') || prompt.includes('extend')) {
            newConfig.dimensionAdjustments.length = (newConfig.dimensionAdjustments.length || 0) + 0.2;
        }
        if (prompt.includes('shorter')) {
            newConfig.dimensionAdjustments.length = Math.max(-1, (newConfig.dimensionAdjustments.length || 0) - 0.2);
        }
        if (prompt.includes('wider')) {
            newConfig.dimensionAdjustments.width = (newConfig.dimensionAdjustments.width || 0) + 0.2;
        }
        if (prompt.includes('narrower')) {
            newConfig.dimensionAdjustments.width = Math.max(-1, (newConfig.dimensionAdjustments.width || 0) - 0.2);
        }
        if (prompt.includes('taller') || prompt.includes('higher')) {
            newConfig.dimensionAdjustments.height = (newConfig.dimensionAdjustments.height || 0) + 0.1;
        }
        if (prompt.includes('lower') || prompt.includes('shorter height')) {
            newConfig.dimensionAdjustments.height = Math.max(-1, (newConfig.dimensionAdjustments.height || 0) - 0.1);
        }
        console.log('AI response', { aiResult: newConfig });
        // Update both the form state and trigger the API call
        setConfig(newConfig);
        setCustomPrompt('');
        console.log('Applied customization updated', { nextCustomization: newConfig });
        onCustomize(newConfig);
    };
    const colorOptions = [
        'Beige', 'Sand', 'Taupe', 'Cream', 'Ivory', 'White', 'Black', 'Charcoal',
        'Gray', 'Navy', 'Forest Green', 'Olive Green', 'Terracotta', 'Rust',
        'Walnut', 'Oak', 'Dark Brown', 'Light Brown', 'Brass', 'Gold', 'Silver',
    ];
    const materialOptions = [
        'Solid Oak', 'Walnut Wood', 'Pine Wood', 'Metal',
        'Rattan', 'Cotton Blend', 'Linen', 'Leather',
    ];
    return (jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-lg font-semibold text-text-heading mb-3", children: "Describe Your Customization (AI-powered)" }), jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [jsxRuntimeExports.jsx("input", { type: "text", value: customPrompt, onChange: (e) => setCustomPrompt(e.target.value), placeholder: "e.g., Make it darker with oak legs and add terracotta accents", className: "flex-1 px-4 py-2.5 border border-earth-border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handlePromptCustomize, disabled: isLoading || !customPrompt.trim(), className: "px-6 py-2 bg-earth-forest text-white rounded-xl font-medium hover:bg-earth-forest/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed", children: "Apply AI" })] })] }), jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-lg font-semibold text-text-heading mb-3", children: "Color Scheme" }), jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [jsxRuntimeExports.jsx(ColorComboBox, { label: "Primary Color", value: config.colorScheme.primary, onChange: (value) => setConfig({
                                            ...config,
                                            colorScheme: { ...config.colorScheme, primary: value },
                                        }), options: colorOptions, placeholder: "e.g. Warm beige, ivory, charcoal", disabled: isLoading }), jsxRuntimeExports.jsx(ColorComboBox, { label: "Secondary Color", value: config.colorScheme.secondary || '', onChange: (value) => setConfig({
                                            ...config,
                                            colorScheme: { ...config.colorScheme, secondary: value },
                                        }), options: colorOptions, placeholder: "e.g. Walnut brown, dark gray", disabled: isLoading }), jsxRuntimeExports.jsx(ColorComboBox, { label: "Accent Color", value: config.colorScheme.accent || '', onChange: (value) => setConfig({
                                            ...config,
                                            colorScheme: { ...config.colorScheme, accent: value },
                                        }), options: colorOptions, placeholder: "e.g. Terracotta, brass, muted gold", disabled: isLoading })] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-lg font-semibold text-text-heading mb-3", children: "Material Overrides" }), jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-text-primary mb-2", children: "Primary Material" }), jsxRuntimeExports.jsxs("select", { value: config.materialOverrides.primary || '', onChange: (e) => setConfig({
                                                    ...config,
                                                    materialOverrides: {
                                                        ...config.materialOverrides,
                                                        primary: e.target.value,
                                                    },
                                                }), className: "w-full px-4 py-2.5 border border-earth-border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all [&>option]:bg-white [&>option]:text-[#1A1C19]", children: [jsxRuntimeExports.jsx("option", { value: "", children: "Keep Original" }), materialOptions.map((material) => (jsxRuntimeExports.jsx("option", { value: material, children: material }, material)))] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-text-primary mb-2", children: "Legs Material" }), jsxRuntimeExports.jsxs("select", { value: config.materialOverrides.legs || '', onChange: (e) => setConfig({
                                                    ...config,
                                                    materialOverrides: {
                                                        ...config.materialOverrides,
                                                        legs: e.target.value,
                                                    },
                                                }), className: "w-full px-4 py-2.5 border border-earth-border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all [&>option]:bg-white [&>option]:text-[#1A1C19]", children: [jsxRuntimeExports.jsx("option", { value: "", children: "Keep Original" }), materialOptions.map((material) => (jsxRuntimeExports.jsx("option", { value: material, children: material }, material)))] })] })] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-lg font-semibold text-text-heading mb-3", children: "Dimension Adjustments (meters)" }), jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-text-primary mb-2", children: "Length Adjustment" }), jsxRuntimeExports.jsx("input", { type: "number", step: "0.1", value: config.dimensionAdjustments?.length || 0, onChange: (e) => setConfig({
                                                    ...config,
                                                    dimensionAdjustments: {
                                                        ...config.dimensionAdjustments,
                                                        length: parseFloat(e.target.value) || 0,
                                                    },
                                                }), className: "w-full px-4 py-2.5 border border-earth-border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-text-primary mb-2", children: "Width Adjustment" }), jsxRuntimeExports.jsx("input", { type: "number", step: "0.1", value: config.dimensionAdjustments?.width || 0, onChange: (e) => setConfig({
                                                    ...config,
                                                    dimensionAdjustments: {
                                                        ...config.dimensionAdjustments,
                                                        width: parseFloat(e.target.value) || 0,
                                                    },
                                                }), className: "w-full px-4 py-2.5 border border-earth-border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-text-primary mb-2", children: "Height Adjustment" }), jsxRuntimeExports.jsx("input", { type: "number", step: "0.1", value: config.dimensionAdjustments?.height || 0, onChange: (e) => setConfig({
                                                    ...config,
                                                    dimensionAdjustments: {
                                                        ...config.dimensionAdjustments,
                                                        height: parseFloat(e.target.value) || 0,
                                                    },
                                                }), className: "w-full px-4 py-2.5 border border-earth-border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]" })] })] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-lg font-semibold text-text-primary mb-3", children: "Ornaments & Details" }), jsxRuntimeExports.jsx("textarea", { value: config.ornamentDetails?.join(', ') || '', onChange: (e) => setConfig({
                                    ...config,
                                    ornamentDetails: e.target.value.split(',').map(s => s.trim()).filter(Boolean),
                                }), placeholder: "e.g., Carved legs, Decorative buttons, Tufted back", className: "w-full px-4 py-2.5 border border-earth-border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all placeholder:text-[#757575]", rows: 3 })] }), jsxRuntimeExports.jsx("button", { type: "submit", disabled: isLoading, className: "w-full px-8 py-4 bg-earth-forest text-white rounded-xl font-semibold text-lg hover:bg-earth-forest/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg", children: isLoading ? 'Processing Customization...' : 'Apply Customization' })] })] }));
}

function FurnitureCustomizerWidget({ config = {}, onNavigateToRoomPlanner }) {
    const mergedConfig = useMemo(() => mergeConfig(config), [config]);
    const apiClient = useMemo(() => new ApiClient(mergedConfig), [mergedConfig]);
    const storage = useMemo(() => new Storage(mergedConfig.storageKey), [mergedConfig.storageKey]);
    const [customizedItem, setCustomizedItem] = useState(null);
    const [savedItem, setSavedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [saveNotification, setSaveNotification] = useState(null);
    const [lastConfig, setLastConfig] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState('fabric');
    const [baseItem, setBaseItem] = useState({
        id: 'custom-1',
        name: 'Customizable Sofa',
        type: 'sofa',
    });
    // Finalize & Quote state
    const [showFinalizeModal, setShowFinalizeModal] = useState(false);
    const [showQuoteForm, setShowQuoteForm] = useState(false);
    const [quoteSuccess, setQuoteSuccess] = useState(false);
    // Load item from sessionStorage on mount
    useEffect(() => {
        const loadFromSessionStorage = () => {
            const stored = sessionStorage.getItem('modly-customize-item');
            if (!stored) {
                return false;
            }
            try {
                const item = JSON.parse(stored);
                // Check if this is a different item than what we currently have
                if (baseItem && baseItem.id === item.id) {
                    return false;
                }
                const currentConfig = {
                    baseItemId: item.id,
                    baseItemType: item.category || item.subCategory || 'furniture',
                    baseItemName: item.name,
                    colorScheme: {
                        primary: item.colors?.main || 'Beige',
                        secondary: item.colors?.accent || undefined,
                    },
                    materialOverrides: {
                        primary: item.materials?.primary || undefined,
                        legs: item.materials?.legs || undefined,
                        upholstery: item.materials?.upholstery || undefined,
                    },
                };
                const newBaseItem = {
                    id: item.id,
                    name: item.name,
                    type: item.category || item.subCategory || 'furniture',
                    currentConfig,
                };
                setBaseItem(newBaseItem);
                // Clear sessionStorage after reading
                sessionStorage.removeItem('modly-customize-item');
                // Reset customization state when loading a new item
                setCustomizedItem(null);
                setError(null);
                setSaveNotification(null);
                setLastConfig(null);
                return true;
            }
            catch (error) {
                console.warn('Failed to parse selected catalog item:', error);
                return false;
            }
        };
        // Load on mount
        loadFromSessionStorage();
        // Set up an interval to check for new items
        const interval = setInterval(() => {
            loadFromSessionStorage();
        }, 500);
        // Also check when the window gains focus
        const handleFocus = () => {
            loadFromSessionStorage();
        };
        window.addEventListener('focus', handleFocus);
        return () => {
            clearInterval(interval);
            window.removeEventListener('focus', handleFocus);
        };
    }, [baseItem]);
    const handleNavigateToRoomPlanner = () => {
        if (onNavigateToRoomPlanner) {
            onNavigateToRoomPlanner();
        }
        else {
            // Fallback: dispatch custom event for parent widget
            window.dispatchEvent(new CustomEvent('modly:navigate-to-room-planner'));
        }
    };
    const handleCustomize = async (config) => {
        setIsLoading(true);
        setError(null);
        setSaveNotification(null);
        setLastConfig(config);
        // Immediately update preview with the config data (single source of truth)
        const immediatePreview = {
            name: `Custom ${config.baseItemName || config.baseItemType || 'Furniture'}`,
            colorScheme: config.colorScheme,
            materials: {
                primary: config.materialOverrides.primary,
                legs: config.materialOverrides.legs,
                upholstery: config.materialOverrides.upholstery,
            },
            ornamentDetails: config.ornamentDetails || [],
            dimensionAdjustments: config.dimensionAdjustments,
            aiNotes: 'Processing AI customization...',
        };
        console.log('Applied customization updated', { nextCustomization: immediatePreview });
        setCustomizedItem(immediatePreview);
        try {
            const data = await apiClient.customizeFurniture(config);
            console.log('AI response', { aiResult: data });
            // Merge API response with the config to ensure all fields are included
            const mergedData = {
                ...immediatePreview,
                ...data,
                colorScheme: data.colorScheme || config.colorScheme,
                materials: data.materials || {
                    primary: config.materialOverrides.primary,
                    legs: config.materialOverrides.legs,
                    upholstery: config.materialOverrides.upholstery,
                },
                ornamentDetails: data.ornamentDetails || config.ornamentDetails,
                dimensionAdjustments: data.dimensionAdjustments || config.dimensionAdjustments,
            };
            setCustomizedItem(mergedData);
            try {
                const saved = storage.saveCustomizedFurniture({
                    name: mergedData.name || `Custom ${config.baseItemName || config.baseItemType || 'Furniture'}`,
                    baseItemType: config.baseItemType || 'furniture',
                    dimensions: mergedData.dimensions,
                    colorScheme: mergedData.colorScheme,
                    materials: mergedData.materials,
                    ornamentDetails: mergedData.ornamentDetails,
                    aiNotes: mergedData.aiNotes,
                    dimensionChanges: mergedData.dimensionChanges,
                });
                setSavedItem(saved);
                setSaveNotification('Customized furniture saved automatically!');
                setTimeout(() => setSaveNotification(null), 3000);
            }
            catch (saveErr) {
                console.error('Failed to auto-save:', saveErr);
            }
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            mergedConfig.onError?.(err instanceof Error ? err : new Error(errorMessage));
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleFinalize = () => {
        if (!savedItem && !customizedItem) {
            setError('Please customize an item first before requesting a quote.');
            return;
        }
        setShowFinalizeModal(true);
    };
    const handleProceedToQuote = () => {
        setShowFinalizeModal(false);
        setShowQuoteForm(true);
    };
    const handleQuoteSubmit = async (quoteRequest) => {
        try {
            // Send quote request to API using apiClient
            await apiClient.submitQuoteRequest(quoteRequest);
            // Show success
            setShowQuoteForm(false);
            setQuoteSuccess(true);
            setSaveNotification('Quote request submitted successfully! We\'ll contact you soon.');
            setTimeout(() => {
                setQuoteSuccess(false);
                setSaveNotification(null);
            }, 5000);
        }
        catch (err) {
            throw err; // Let the form handle the error display
        }
    };
    return (jsxRuntimeExports.jsxs(WidgetProvider, { apiClient: apiClient, storage: storage, config: mergedConfig, children: [jsxRuntimeExports.jsx("div", { className: "furniture-widget-customizer min-h-screen bg-earth-background py-12 px-6", children: jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-text-heading mb-4", children: "Furniture Customizer" }), jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-text-primary max-w-2xl mx-auto", children: "Use AI to customize furniture designs. Change colors, materials, add ornaments, and adjust dimensions to match your vision." })] }), jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [jsxRuntimeExports.jsx("div", { className: "bg-earth-card p-6 md:p-8 rounded-xl shadow-soft border border-earth-border", children: jsxRuntimeExports.jsx(FurnitureCustomizerPanel, { baseItem: baseItem ?? undefined, onCustomize: handleCustomize, isLoading: isLoading }, baseItem?.id || baseItem?.name || 'empty') }), jsxRuntimeExports.jsxs("div", { className: "bg-earth-card p-6 md:p-8 rounded-xl shadow-soft border border-earth-border", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold text-text-heading mb-6", children: "Customization Preview" }), saveNotification && (jsxRuntimeExports.jsxs("div", { className: "mb-4 bg-earth-sage/20 border border-earth-sage/50 text-text-primary p-4 rounded-xl flex items-center gap-3", children: [jsxRuntimeExports.jsx("svg", { className: "w-5 h-5 text-earth-sage", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }), jsxRuntimeExports.jsx("span", { children: saveNotification })] })), error && (jsxRuntimeExports.jsx("div", { className: "bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-4", children: jsxRuntimeExports.jsx("p", { children: error }) })), isLoading && (jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-text-primary", children: jsxRuntimeExports.jsx("p", { className: "text-lg", children: "Processing your customization..." }) })), customizedItem && !isLoading && (jsxRuntimeExports.jsx("div", { className: "space-y-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-earth-input p-6 rounded-xl border border-earth-border", children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-text-heading mb-4", children: customizedItem.name || `Custom ${lastConfig?.baseItemName || lastConfig?.baseItemType || 'Furniture'}` }), customizedItem.dimensions && (jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-text-primary mb-2", children: "Updated Dimensions:" }), jsxRuntimeExports.jsxs("div", { className: "text-sm text-text-primary space-y-1", children: [jsxRuntimeExports.jsxs("div", { children: ["Length: ", jsxRuntimeExports.jsxs("strong", { className: "text-text-heading", children: [customizedItem.dimensions.length, "m"] })] }), jsxRuntimeExports.jsxs("div", { children: ["Width: ", jsxRuntimeExports.jsxs("strong", { className: "text-text-heading", children: [customizedItem.dimensions.width, "m"] })] }), jsxRuntimeExports.jsxs("div", { children: ["Height: ", jsxRuntimeExports.jsxs("strong", { className: "text-text-heading", children: [customizedItem.dimensions.height, "m"] })] })] })] })), customizedItem.colorScheme && (jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-text-heading mb-2", children: "Color Scheme:" }), jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [customizedItem.colorScheme.primary && (jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 bg-earth-card border border-earth-border text-text-primary rounded-xl text-sm", children: ["Primary: ", customizedItem.colorScheme.primary] })), customizedItem.colorScheme.secondary && (jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 bg-earth-card border border-earth-border text-text-primary rounded-xl text-sm", children: ["Secondary: ", customizedItem.colorScheme.secondary] })), customizedItem.colorScheme.accent && (jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 bg-earth-card border border-earth-border text-text-primary rounded-xl text-sm", children: ["Accent: ", customizedItem.colorScheme.accent] }))] })] })), customizedItem.materials && (jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-text-heading mb-2", children: "Materials:" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-text-primary", children: Object.values(customizedItem.materials).filter(Boolean).join(', ') })] })), customizedItem.ornamentDetails && customizedItem.ornamentDetails.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-text-heading mb-2", children: "Ornaments & Details:" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: customizedItem.ornamentDetails.map((detail, i) => (jsxRuntimeExports.jsx("span", { className: "px-2 py-1 bg-earth-card border border-earth-border text-text-primary rounded-xl text-xs", children: detail }, i))) })] })), customizedItem.aiNotes && (jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-earth-border", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-text-heading mb-2", children: "AI Notes:" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-text-primary", children: customizedItem.aiNotes })] })), jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-4 border-t border-earth-border space-y-3", children: [jsxRuntimeExports.jsxs("button", { onClick: handleFinalize, className: "w-full py-3 px-6 bg-emerald-600 text-white rounded-xl font-semibold text-base hover:bg-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg", children: [jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }), jsxRuntimeExports.jsx("span", { children: "Finalize & Request Quote" })] }), jsxRuntimeExports.jsxs("button", { onClick: handleNavigateToRoomPlanner, className: "w-full py-3 px-6 bg-earth-forest text-white rounded-xl font-semibold text-base hover:bg-earth-forest/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg", children: [jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" }) }), jsxRuntimeExports.jsx("span", { children: "View in Room Planner" })] })] })] }) })), !customizedItem && !isLoading && (jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-text-muted", children: jsxRuntimeExports.jsx("p", { children: "Your customization preview will appear here" }) }))] })] })] }) }), jsxRuntimeExports.jsx(FinalizeQuoteModal, { isOpen: showFinalizeModal, onClose: () => setShowFinalizeModal(false), onProceed: handleProceedToQuote, item: savedItem }), jsxRuntimeExports.jsx(QuoteRequestForm, { isOpen: showQuoteForm, onClose: () => setShowQuoteForm(false), onSubmit: handleQuoteSubmit, item: savedItem }), quoteSuccess && (jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-slide-up", children: [jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Quote Request Submitted!" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-white/90", children: "We'll contact you soon with details." })] })] }))] }));
}

function MessageBubble({ message, onCustomizeItem, onAddToRoomPlanner, onViewInCatalog }) {
    const isUser = message.role === 'user';
    const isThinking = message.type === 'thinking';
    return (jsxRuntimeExports.jsx("div", { className: `flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`, children: jsxRuntimeExports.jsx("div", { className: `max-w-[80%] rounded-2xl px-4 py-3 ${isUser
                ? 'bg-blue-500 text-white'
                : isThinking
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-gray-50 text-gray-900 border border-gray-200'}`, children: isThinking ? (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0ms' } }), jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '150ms' } }), jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '300ms' } })] }), jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Thinking..." })] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("div", { className: "whitespace-pre-wrap text-sm leading-relaxed", children: message.content }), message.metadata?.recommendations && message.metadata?.recommendations.length > 0 && (jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: message.metadata?.recommendations.map((rec, index) => (jsxRuntimeExports.jsx(RecommendationCard, { recommendation: rec, onCustomize: onCustomizeItem, onAddToRoomPlanner: onAddToRoomPlanner, onViewInCatalog: onViewInCatalog }, rec.item.id || index))) })), message.metadata?.action && (jsxRuntimeExports.jsx("div", { className: "mt-3 pt-3 border-t border-gray-200", children: jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500", children: [message.metadata?.action?.type === 'open_room_planner' && 'Ready to analyze your room', message.metadata?.action?.type === 'open_customizer' && 'Ready to customize', message.metadata?.action?.type === 'show_catalog' && 'Ready to browse catalog'] }) }))] })) }) }));
}
function RecommendationCard({ recommendation, onCustomize, onAddToRoomPlanner, onViewInCatalog }) {
    const item = recommendation.item;
    return (jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-3 shadow-sm", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-gray-900", children: item.name }), recommendation.matchScore && (jsxRuntimeExports.jsxs("span", { className: "text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded", children: [Math.round(recommendation.matchScore * 100), "% match"] }))] }), jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-600 mb-2", children: [item.category, item.subCategory ? ` • ${item.subCategory}` : ''] }), item.priceRange && (jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-gray-900 mb-2", children: ["$", item.priceRange.min?.toLocaleString(), item.priceRange.max && item.priceRange.max !== item.priceRange.min
                        ? ` - $${item.priceRange.max.toLocaleString()}`
                        : ''] })), recommendation.reasoning && (jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-2", children: recommendation.reasoning })), jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [onViewInCatalog && (jsxRuntimeExports.jsxs("button", { onClick: () => onViewInCatalog(item.id), className: "flex-1 py-1.5 px-3 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-1 border border-gray-300", children: [jsxRuntimeExports.jsxs("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }), jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })] }), "View in Catalog"] })), onCustomize && (jsxRuntimeExports.jsxs("button", { onClick: () => onCustomize(item), className: "flex-1 py-1.5 px-3 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-1", children: [jsxRuntimeExports.jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }), "Customize this"] }))] })] }));
}

function ConversationInterface({ aiService, onCustomizeItem, onAddToRoomPlanner, onOpenRoomPlanner, onOpenCustomizer, onShowCatalog, onViewInCatalog, }) {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    // Load messages from AI service
    useEffect(() => {
        setMessages(aiService.getMessages());
    }, []);
    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    const handleSend = async () => {
        if (!input.trim() || isLoading)
            return;
        const userMessage = input.trim();
        setInput('');
        setIsLoading(true);
        // Add user message immediately
        const userMsg = {
            id: `msg-user-${Date.now()}`,
            role: 'user',
            type: 'text',
            content: userMessage,
            timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, userMsg]);
        // Add thinking indicator
        const thinkingMsg = {
            id: `msg-thinking-${Date.now()}`,
            role: 'assistant',
            type: 'thinking',
            content: 'Thinking...',
            timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, thinkingMsg]);
        try {
            const response = await aiService.sendMessage(userMessage);
            // Remove thinking message and add actual response
            setMessages((prev) => {
                const withoutThinking = prev.filter((m) => m.type !== 'thinking');
                return [...withoutThinking, response.message];
            });
            // Handle actions
            if (response.message.metadata?.action) {
                const actionType = response.message.metadata?.action?.type;
                setTimeout(() => {
                    switch (actionType) {
                        case 'open_room_planner':
                            onOpenRoomPlanner?.();
                            break;
                        case 'open_customizer':
                            onOpenCustomizer?.();
                            break;
                        case 'show_catalog':
                            onShowCatalog?.();
                            break;
                        case 'customize_item':
                            if (response.message.metadata?.action?.data) {
                                onCustomizeItem?.(response.message.metadata?.action?.data);
                            }
                            break;
                    }
                }, 500);
            }
        }
        catch (error) {
            console.error('Error sending message:', error);
            // Remove thinking message on error
            setMessages((prev) => prev.filter((m) => m.type !== 'thinking'));
        }
        finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    return (jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full bg-white", children: [jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-2", children: [messages.length === 0 ? (jsxRuntimeExports.jsx("div", { className: "text-center text-gray-500 py-8", children: jsxRuntimeExports.jsx("p", { children: "Start a conversation to get help with your furniture needs." }) })) : (messages.map((message) => (jsxRuntimeExports.jsx(MessageBubble, { message: message, onCustomizeItem: onCustomizeItem, onAddToRoomPlanner: onAddToRoomPlanner, onViewInCatalog: onViewInCatalog }, message.id)))), jsxRuntimeExports.jsx("div", { ref: messagesEndRef })] }), jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-200 p-4 bg-gray-50", children: [jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [jsxRuntimeExports.jsx("textarea", { ref: inputRef, value: input, onChange: (e) => setInput(e.target.value), onKeyPress: handleKeyPress, placeholder: "Type your message...", className: "flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none", rows: 1, style: { minHeight: '40px', maxHeight: '120px' }, disabled: isLoading }), jsxRuntimeExports.jsx("button", { onClick: handleSend, disabled: !input.trim() || isLoading, className: "px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium", children: isLoading ? (jsxRuntimeExports.jsxs("svg", { className: "animate-spin h-5 w-5", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] })) : ('Send') })] }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-2 text-center", children: "Press Enter to send, Shift+Enter for new line" })] })] }));
}

/**
 * Generates a spec sheet from a customization configuration
 */
function generateSpecSheet(config, additionalData) {
    const specId = `SPEC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const generatedAt = new Date().toISOString();
    // Build customizations list
    const customizations = [];
    if (config.dimensionAdjustments) {
        if (config.dimensionAdjustments.length) {
            customizations.push(`Length adjustment: ${config.dimensionAdjustments.length > 0 ? '+' : ''}${config.dimensionAdjustments.length}m`);
        }
        if (config.dimensionAdjustments.width) {
            customizations.push(`Width adjustment: ${config.dimensionAdjustments.width > 0 ? '+' : ''}${config.dimensionAdjustments.width}m`);
        }
        if (config.dimensionAdjustments.height) {
            customizations.push(`Height adjustment: ${config.dimensionAdjustments.height > 0 ? '+' : ''}${config.dimensionAdjustments.height}m`);
        }
    }
    if (config.ornamentDetails && config.ornamentDetails.length > 0) {
        customizations.push(...config.ornamentDetails.map(detail => `Ornament: ${detail}`));
    }
    if (config.aiNotes) {
        customizations.push(`AI Notes: ${config.aiNotes}`);
    }
    return {
        specId,
        generatedAt,
        product: {
            name: config.baseItemName || config.baseItemType || 'Custom Furniture',
            baseItemId: config.baseItemId,
            category: config.baseItemType || 'furniture',
        },
        configuration: {
            dimensions: config.dimensionAdjustments,
            materials: {
                ...config.materialOverrides,
            },
            colors: config.colorScheme,
            customizations,
        },
        pricing: {
            estimatedCost: additionalData?.estimatedCost,
            requiresQuote: additionalData?.requiresQuote ?? true,
        },
        customerNotes: additionalData?.customerNotes,
    };
}
/**
 * Generates HTML representation of a spec sheet (for printing/download)
 */
function generateSpecSheetHTML(specSheet) {
    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Specification Sheet - ${specSheet.specId}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .header {
      border-bottom: 3px solid #2c3e50;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    
    .header h1 {
      color: #2c3e50;
      font-size: 28px;
      margin-bottom: 10px;
    }
    
    .spec-id {
      color: #7f8c8d;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    
    .meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      padding: 15px;
      background: #ecf0f1;
      border-radius: 5px;
    }
    
    .meta-item {
      flex: 1;
    }
    
    .meta-label {
      font-size: 12px;
      color: #7f8c8d;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    
    .meta-value {
      font-size: 14px;
      color: #2c3e50;
      font-weight: 600;
    }
    
    .section {
      margin-bottom: 30px;
    }
    
    .section-title {
      color: #2c3e50;
      font-size: 18px;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid #ecf0f1;
    }
    
    .field {
      margin-bottom: 12px;
      padding-left: 10px;
    }
    
    .field-label {
      font-size: 12px;
      color: #7f8c8d;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 3px;
    }
    
    .field-value {
      font-size: 15px;
      color: #2c3e50;
      font-weight: 500;
    }
    
    .color-swatch {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 3px;
      border: 1px solid #ddd;
      vertical-align: middle;
      margin-right: 8px;
    }
    
    .customization-list {
      list-style: none;
      padding-left: 10px;
    }
    
    .customization-list li {
      padding: 8px 0;
      border-bottom: 1px solid #ecf0f1;
      font-size: 14px;
    }
    
    .customization-list li:last-child {
      border-bottom: none;
    }
    
    .customization-list li::before {
      content: "→";
      color: #3498db;
      margin-right: 10px;
      font-weight: bold;
    }
    
    .pricing {
      background: #e8f5e9;
      padding: 20px;
      border-radius: 5px;
      border-left: 4px solid #4caf50;
    }
    
    .pricing-label {
      font-size: 14px;
      color: #2e7d32;
      margin-bottom: 5px;
    }
    
    .pricing-value {
      font-size: 24px;
      color: #1b5e20;
      font-weight: 700;
    }
    
    .requires-quote {
      background: #fff3e0;
      border-left-color: #ff9800;
    }
    
    .requires-quote .pricing-label {
      color: #e65100;
    }
    
    .requires-quote .pricing-value {
      color: #bf360c;
    }
    
    .notes {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      font-style: italic;
      color: #555;
      font-size: 14px;
    }
    
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #ecf0f1;
      text-align: center;
      color: #95a5a6;
      font-size: 12px;
    }
    
    @media print {
      body {
        padding: 20px;
      }
      
      .header {
        page-break-after: avoid;
      }
      
      .section {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Product Specification Sheet</h1>
    <div class="spec-id">Spec ID: ${specSheet.specId}</div>
  </div>
  
  <div class="meta">
    <div class="meta-item">
      <div class="meta-label">Product Name</div>
      <div class="meta-value">${specSheet.product.name}</div>
    </div>
    <div class="meta-item">
      <div class="meta-label">Category</div>
      <div class="meta-value">${specSheet.product.category}</div>
    </div>
    <div class="meta-item">
      <div class="meta-label">Generated</div>
      <div class="meta-value">${formatDate(specSheet.generatedAt)}</div>
    </div>
  </div>
  
  ${specSheet.product.baseItemId ? `
  <div class="section">
    <div class="section-title">Base Product</div>
    <div class="field">
      <div class="field-label">Base Item ID</div>
      <div class="field-value">${specSheet.product.baseItemId}</div>
    </div>
  </div>
  ` : ''}
  
  ${specSheet.configuration.dimensions && Object.keys(specSheet.configuration.dimensions).length > 0 ? `
  <div class="section">
    <div class="section-title">Dimensions</div>
    ${specSheet.configuration.dimensions.length ? `
    <div class="field">
      <div class="field-label">Length</div>
      <div class="field-value">${specSheet.configuration.dimensions.length}m</div>
    </div>
    ` : ''}
    ${specSheet.configuration.dimensions.width ? `
    <div class="field">
      <div class="field-label">Width</div>
      <div class="field-value">${specSheet.configuration.dimensions.width}m</div>
    </div>
    ` : ''}
    ${specSheet.configuration.dimensions.height ? `
    <div class="field">
      <div class="field-label">Height</div>
      <div class="field-value">${specSheet.configuration.dimensions.height}m</div>
    </div>
    ` : ''}
  </div>
  ` : ''}
  
  <div class="section">
    <div class="section-title">Materials</div>
    ${Object.entries(specSheet.configuration.materials)
        .filter(([key, value]) => value)
        .map(([key, value]) => `
    <div class="field">
      <div class="field-label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
      <div class="field-value">${value}</div>
    </div>
    `).join('')}
  </div>
  
  <div class="section">
    <div class="section-title">Color Scheme</div>
    <div class="field">
      <div class="field-label">Primary Color</div>
      <div class="field-value">${specSheet.configuration.colors.primary}</div>
    </div>
    ${specSheet.configuration.colors.secondary ? `
    <div class="field">
      <div class="field-label">Secondary Color</div>
      <div class="field-value">${specSheet.configuration.colors.secondary}</div>
    </div>
    ` : ''}
    ${specSheet.configuration.colors.accent ? `
    <div class="field">
      <div class="field-label">Accent Color</div>
      <div class="field-value">${specSheet.configuration.colors.accent}</div>
    </div>
    ` : ''}
  </div>
  
  ${specSheet.configuration.customizations.length > 0 ? `
  <div class="section">
    <div class="section-title">Customizations</div>
    <ul class="customization-list">
      ${specSheet.configuration.customizations.map(custom => `
      <li>${custom}</li>
      `).join('')}
    </ul>
  </div>
  ` : ''}
  
  <div class="section">
    <div class="section-title">Pricing</div>
    <div class="pricing ${specSheet.pricing.requiresQuote ? 'requires-quote' : ''}">
      <div class="pricing-label">
        ${specSheet.pricing.requiresQuote ? 'Quote Required' : 'Estimated Cost'}
      </div>
      <div class="pricing-value">
        ${specSheet.pricing.estimatedCost
        ? `$${specSheet.pricing.estimatedCost.toLocaleString()}`
        : 'Contact for Pricing'}
      </div>
    </div>
  </div>
  
  ${specSheet.customerNotes ? `
  <div class="section">
    <div class="section-title">Customer Notes</div>
    <div class="notes">
      ${specSheet.customerNotes}
    </div>
  </div>
  ` : ''}
  
  <div class="footer">
    This specification sheet was generated automatically. Please contact us for any questions or modifications.
  </div>
</body>
</html>
  `.trim();
}
/**
 * Opens spec sheet HTML in a new window for printing
 */
function printSpecSheet(specSheet) {
    const html = generateSpecSheetHTML(specSheet);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
        // Wait for content to load, then trigger print
        printWindow.onload = () => {
            setTimeout(() => {
                printWindow.print();
            }, 250);
        };
    }
    else {
        console.error('Failed to open print window. Please check your popup blocker settings.');
    }
}

// Default validation rules
const defaultRules = [
    // Dimension constraints
    {
        field: 'dimensionAdjustments.length',
        validate: (value, config) => {
            if (!value)
                return null;
            if (value < -2 || value > 3) {
                return {
                    field: 'dimensionAdjustments.length',
                    message: 'Length adjustment must be between -2m and +3m',
                    severity: 'error',
                };
            }
            return null;
        },
    },
    {
        field: 'dimensionAdjustments.width',
        validate: (value, config) => {
            if (!value)
                return null;
            if (value < -1.5 || value > 2) {
                return {
                    field: 'dimensionAdjustments.width',
                    message: 'Width adjustment must be between -1.5m and +2m',
                    severity: 'error',
                };
            }
            return null;
        },
    },
    {
        field: 'dimensionAdjustments.height',
        validate: (value, config) => {
            if (!value)
                return null;
            if (value < -0.5 || value > 1.5) {
                return {
                    field: 'dimensionAdjustments.height',
                    message: 'Height adjustment must be between -0.5m and +1.5m',
                    severity: 'error',
                };
            }
            return null;
        },
    },
    // Color scheme validation
    {
        field: 'colorScheme.primary',
        validate: (value, config) => {
            if (!value || value.trim() === '') {
                return {
                    field: 'colorScheme.primary',
                    message: 'Primary color is required',
                    severity: 'error',
                };
            }
            return null;
        },
    },
    // Material compatibility
    {
        field: 'materialOverrides',
        validate: (value, config) => {
            if (!value)
                return null;
            // Check for incompatible material combinations
            const primary = value.primary?.toLowerCase();
            const legs = value.legs?.toLowerCase();
            if (primary?.includes('glass') && legs?.includes('wood')) {
                return {
                    field: 'materialOverrides',
                    message: 'Glass primary material may not pair well with wooden legs. Consider metal legs for better structural support.',
                    severity: 'warning',
                };
            }
            if (primary?.includes('marble') && !legs?.includes('metal')) {
                return {
                    field: 'materialOverrides',
                    message: 'Marble surfaces require metal legs for proper support',
                    severity: 'error',
                };
            }
            return null;
        },
    },
    // Ornament validation
    {
        field: 'ornamentDetails',
        validate: (value, config) => {
            if (!value || !Array.isArray(value))
                return null;
            if (value.length > 10) {
                return {
                    field: 'ornamentDetails',
                    message: 'Too many ornament details (maximum 10)',
                    severity: 'error',
                };
            }
            if (value.length > 5) {
                return {
                    field: 'ornamentDetails',
                    message: 'Consider reducing the number of ornaments for a cleaner look',
                    severity: 'warning',
                };
            }
            return null;
        },
    },
];
/**
 * Validates a configuration against a set of rules
 */
function validateConfiguration(config, customRules = []) {
    const rules = [...defaultRules, ...customRules];
    const errors = [];
    const warnings = [];
    for (const rule of rules) {
        const fieldParts = rule.field.split('.');
        let value = config;
        // Navigate to nested field
        for (const part of fieldParts) {
            if (value && typeof value === 'object') {
                value = value[part];
            }
            else {
                value = undefined;
                break;
            }
        }
        const error = rule.validate(value, config);
        if (error) {
            if (error.severity === 'error') {
                errors.push(error);
            }
            else {
                warnings.push(error);
            }
        }
    }
    return {
        valid: errors.length === 0,
        errors,
        warnings,
    };
}

function SpecSheetPreview({ specSheet, onClose }) {
    const handlePrint = () => {
        printSpecSheet(specSheet);
    };
    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    return (jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg max-w-2xl mx-auto", children: [jsxRuntimeExports.jsxs("div", { className: "border-b border-gray-200 p-4 flex items-center justify-between", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Specification Sheet" }), jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 mt-1", children: ["Spec ID: ", specSheet.specId] })] }), jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [jsxRuntimeExports.jsxs("button", { onClick: handlePrint, className: "px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center gap-1", children: [jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" }) }), "Print"] }), onClose && (jsxRuntimeExports.jsx("button", { onClick: onClose, className: "px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700", children: "\u2715" }))] })] }), jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-h-[600px] overflow-y-auto", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Product" }), jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded p-3 space-y-1", children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Name:" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: specSheet.product.name })] }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Category:" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: specSheet.product.category })] }), specSheet.product.baseItemId && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Base Item ID:" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: specSheet.product.baseItemId })] })), jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Generated:" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: formatDate(specSheet.generatedAt) })] })] })] }), specSheet.configuration.dimensions &&
                        Object.keys(specSheet.configuration.dimensions).length > 0 && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Dimensions" }), jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded p-3 space-y-1", children: [specSheet.configuration.dimensions.length && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Length:" }), jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-gray-900", children: [specSheet.configuration.dimensions.length, "m"] })] })), specSheet.configuration.dimensions.width && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Width:" }), jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-gray-900", children: [specSheet.configuration.dimensions.width, "m"] })] })), specSheet.configuration.dimensions.height && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Height:" }), jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-gray-900", children: [specSheet.configuration.dimensions.height, "m"] })] }))] })] })), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Materials" }), jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded p-3 space-y-1", children: Object.entries(specSheet.configuration.materials)
                                    .filter(([key, value]) => value)
                                    .map(([key, value]) => (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-600 capitalize", children: [key, ":"] }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: value })] }, key))) })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Color Scheme" }), jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded p-3 space-y-1", children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Primary:" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: specSheet.configuration.colors.primary })] }), specSheet.configuration.colors.secondary && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Secondary:" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: specSheet.configuration.colors.secondary })] })), specSheet.configuration.colors.accent && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Accent:" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: specSheet.configuration.colors.accent })] }))] })] }), specSheet.configuration.customizations.length > 0 && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Customizations" }), jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded p-3", children: jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: specSheet.configuration.customizations.map((custom, index) => (jsxRuntimeExports.jsxs("li", { className: "text-sm text-gray-700 flex items-start", children: [jsxRuntimeExports.jsx("span", { className: "text-blue-500 mr-2", children: "\u2192" }), jsxRuntimeExports.jsx("span", { children: custom })] }, index))) }) })] })), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Pricing" }), jsxRuntimeExports.jsx("div", { className: `rounded p-3 ${specSheet.pricing.requiresQuote
                                    ? 'bg-orange-50 border border-orange-200'
                                    : 'bg-green-50 border border-green-200'}`, children: jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700", children: specSheet.pricing.requiresQuote ? 'Quote Required' : 'Estimated Cost' }), jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-gray-900", children: specSheet.pricing.estimatedCost
                                                ? `$${specSheet.pricing.estimatedCost.toLocaleString()}`
                                                : 'Contact for Pricing' })] }) })] }), specSheet.customerNotes && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Customer Notes" }), jsxRuntimeExports.jsx("div", { className: "bg-gray-50 rounded p-3", children: jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-700 italic", children: specSheet.customerNotes }) })] }))] })] }));
}

function SubmitFlowModal({ config, product, apiClient, onSuccess, onClose, }) {
    const [step, setStep] = useState('validate');
    const [flowType, setFlowType] = useState('quote');
    const [validation, setValidation] = useState(null);
    const [specSheet, setSpecSheet] = useState(null);
    const [error, setError] = useState(null);
    // Form fields for quote request
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerNotes, setCustomerNotes] = useState('');
    useEffect(() => {
        // Validate configuration
        const validationResult = validateConfiguration(config);
        setValidation(validationResult);
        // Determine flow type based on product pricing
        const requiresQuote = !product?.priceRange || product.stockStatus === 'custom_order';
        setFlowType(requiresQuote ? 'quote' : 'cart');
        // Generate spec sheet
        const sheet = generateSpecSheet(config, {
            estimatedCost: product?.priceRange?.min,
            requiresQuote,
        });
        setSpecSheet(sheet);
        // Move to preview if validation passes
        if (validationResult.valid) {
            setStep('preview');
        }
    }, [config, product]);
    const handleContinue = () => {
        if (!validation?.valid) {
            return;
        }
        if (flowType === 'cart') {
            handleAddToCart();
        }
        else {
            setStep('form');
        }
    };
    const handleAddToCart = async () => {
        if (!product || !specSheet)
            return;
        setStep('submitting');
        setError(null);
        try {
            // Call API to add to cart
            const response = await fetch(`${apiClient['config'].apiBaseUrl || window.location.origin}/api/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.id,
                    configuration: config,
                    specSheet,
                    quantity: 1,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }
            const data = await response.json();
            setStep('success');
            setTimeout(() => {
                onSuccess({ type: 'cart', id: data.cartItemId });
            }, 1500);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add to cart');
            setStep('preview');
        }
    };
    const handleSubmitQuote = async () => {
        if (!customerName || !customerEmail || !specSheet) {
            setError('Please fill in all required fields');
            return;
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
            setError('Please enter a valid email address');
            return;
        }
        setStep('submitting');
        setError(null);
        try {
            const response = await apiClient.submitQuoteRequest({
                name: customerName,
                email: customerEmail,
                phone: customerPhone || undefined,
                notes: customerNotes || undefined,
                item: {
                    name: config.baseItemName || config.baseItemType || 'Custom Furniture',
                    dimensions: config.dimensionAdjustments || {},
                    materials: config.materialOverrides,
                    colorScheme: config.colorScheme,
                    aiNotes: config.aiNotes,
                },
                specSheet,
            });
            setStep('success');
            setTimeout(() => {
                onSuccess({ type: 'quote', id: response.quoteId });
            }, 1500);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit quote request');
            setStep('form');
        }
    };
    if (step === 'validate' && validation && !validation.valid) {
        return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg max-w-md w-full p-6", children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Configuration Issues" }), jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6", children: [validation.errors.map((error, index) => (jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded p-3", children: [jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-red-900", children: error.field }), jsxRuntimeExports.jsx("p", { className: "text-sm text-red-700", children: error.message })] }, index))), validation.warnings.map((warning, index) => (jsxRuntimeExports.jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded p-3", children: [jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-yellow-900", children: warning.field }), jsxRuntimeExports.jsx("p", { className: "text-sm text-yellow-700", children: warning.message })] }, index)))] }), jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: jsxRuntimeExports.jsx("button", { onClick: onClose, className: "flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors", children: "Go Back & Fix" }) })] }) }));
    }
    if (step === 'preview' && specSheet) {
        return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col", children: [jsxRuntimeExports.jsx(SpecSheetPreview, { specSheet: specSheet, onClose: onClose }), validation && validation.warnings.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "px-6 py-3 bg-yellow-50 border-t border-yellow-200", children: [jsxRuntimeExports.jsx("p", { className: "text-sm text-yellow-800 font-medium mb-1", children: "\u26A0\uFE0F Warnings:" }), validation.warnings.map((warning, index) => (jsxRuntimeExports.jsxs("p", { className: "text-xs text-yellow-700", children: ["\u2022 ", warning.message] }, index)))] })), error && (jsxRuntimeExports.jsx("div", { className: "px-6 py-3 bg-red-50 border-t border-red-200", children: jsxRuntimeExports.jsx("p", { className: "text-sm text-red-700", children: error }) })), jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-200 p-4 flex gap-3", children: [jsxRuntimeExports.jsx("button", { onClick: onClose, className: "px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors", children: "Cancel" }), jsxRuntimeExports.jsx("button", { onClick: handleContinue, className: "flex-1 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors", children: flowType === 'cart' ? 'Add to Cart' : 'Request Quote' })] })] }) }));
    }
    if (step === 'form') {
        return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg max-w-md w-full p-6", children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Request a Quote" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-6", children: "Fill in your details and we'll get back to you with a personalized quote." }), error && (jsxRuntimeExports.jsx("div", { className: "bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4 text-sm", children: error })), jsxRuntimeExports.jsxs("div", { className: "space-y-4 mb-6", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: ["Name ", jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })] }), jsxRuntimeExports.jsx("input", { type: "text", value: customerName, onChange: (e) => setCustomerName(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "Your full name" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: ["Email ", jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })] }), jsxRuntimeExports.jsx("input", { type: "email", value: customerEmail, onChange: (e) => setCustomerEmail(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "your.email@example.com" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Phone" }), jsxRuntimeExports.jsx("input", { type: "tel", value: customerPhone, onChange: (e) => setCustomerPhone(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "Optional" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Additional Notes" }), jsxRuntimeExports.jsx("textarea", { value: customerNotes, onChange: (e) => setCustomerNotes(e.target.value), rows: 3, className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none", placeholder: "Any special requests or questions?" })] })] }), jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [jsxRuntimeExports.jsx("button", { onClick: () => setStep('preview'), className: "px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors", children: "Back" }), jsxRuntimeExports.jsx("button", { onClick: handleSubmitQuote, className: "flex-1 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors", children: "Submit Quote Request" })] })] }) }));
    }
    if (step === 'submitting') {
        return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-8 text-center", children: [jsxRuntimeExports.jsx("div", { className: "animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: flowType === 'cart' ? 'Adding to cart...' : 'Submitting quote request...' })] }) }));
    }
    if (step === 'success') {
        return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-8 text-center max-w-md", children: [jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }), jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: flowType === 'cart' ? 'Added to Cart!' : 'Quote Request Submitted!' }), jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: flowType === 'cart'
                            ? 'Your customized product has been added to your cart.'
                            : "We'll review your request and get back to you soon." })] }) }));
    }
    return null;
}

const STORAGE_KEY = 'modly-conversation-state';
class ConversationStateManager {
    constructor() {
        this.state = this.loadState();
    }
    loadState() {
        try {
            const stored = sessionStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        }
        catch (e) {
            console.warn('Failed to load conversation state:', e);
        }
        return {
            messages: [],
            userPreferences: {},
            context: {},
        };
    }
    saveState() {
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
        }
        catch (e) {
            console.warn('Failed to save conversation state:', e);
        }
    }
    getState() {
        return { ...this.state };
    }
    addMessage(message) {
        this.state.messages.push(message);
        this.saveState();
    }
    getMessages() {
        return [...this.state.messages];
    }
    updateIntent(intent) {
        this.state.currentIntent = intent;
        this.saveState();
    }
    updatePreferences(preferences) {
        this.state.userPreferences = {
            ...this.state.userPreferences,
            ...preferences,
        };
        this.saveState();
    }
    updateContext(context) {
        this.state.context = {
            ...this.state.context,
            ...context,
        };
        this.saveState();
    }
    clearState() {
        this.state = {
            messages: [],
            userPreferences: {},
            context: {},
        };
        this.saveState();
    }
    resetConversation() {
        this.state.messages = [];
        this.state.currentIntent = undefined;
        this.saveState();
    }
}

class PageContextExtractor {
    static extractContext() {
        const context = {
            currentUrl: typeof window !== 'undefined' ? window.location.href : undefined,
            metadata: {},
        };
        // Extract data attributes from the page
        if (typeof document !== 'undefined') {
            // Check for data attributes on body or html element
            const body = document.body;
            const html = document.documentElement;
            // Extract all data-modly-* attributes
            [body, html].forEach((element) => {
                if (element) {
                    Array.from(element.attributes).forEach((attr) => {
                        if (attr.name.startsWith(this.DATA_ATTRIBUTE_PREFIX)) {
                            const key = attr.name.replace(this.DATA_ATTRIBUTE_PREFIX, '');
                            const value = attr.value;
                            // Map common attributes
                            switch (key) {
                                case 'product-id':
                                    context.productId = value;
                                    break;
                                case 'product-name':
                                    context.productName = value;
                                    break;
                                case 'category':
                                    context.category = value;
                                    break;
                                case 'price':
                                    context.price = parseFloat(value);
                                    break;
                                case 'page-type':
                                    context.pageType = value;
                                    break;
                                default:
                                    context.metadata[key] = value;
                            }
                        }
                    });
                }
            });
            // Try to infer page type from URL if not set
            if (!context.pageType && context.currentUrl) {
                const url = new URL(context.currentUrl);
                const pathname = url.pathname.toLowerCase();
                if (pathname.includes('/product/') || pathname.includes('/item/')) {
                    context.pageType = 'product';
                }
                else if (pathname.includes('/catalog/') || pathname.includes('/shop/')) {
                    context.pageType = 'catalog';
                }
                else if (pathname.includes('/category/') || pathname.includes('/collection/')) {
                    context.pageType = 'category';
                }
                else if (pathname === '/' || pathname === '/index') {
                    context.pageType = 'home';
                }
                else {
                    context.pageType = 'other';
                }
            }
            // Try to extract product info from common selectors if not found via data attributes
            if (!context.productName && context.pageType === 'product') {
                const productNameSelectors = [
                    'h1.product-title',
                    'h1[data-testid="product-title"]',
                    '.product-name',
                    'h1',
                ];
                for (const selector of productNameSelectors) {
                    const element = document.querySelector(selector);
                    if (element && element.textContent) {
                        context.productName = element.textContent.trim();
                        break;
                    }
                }
            }
        }
        return context;
    }
    static watchForChanges(callback) {
        if (typeof window === 'undefined') {
            return () => { };
        }
        let lastContext = this.extractContext();
        callback(lastContext);
        // Watch for URL changes (SPA navigation)
        let lastUrl = window.location.href;
        const checkUrl = () => {
            if (window.location.href !== lastUrl) {
                lastUrl = window.location.href;
                const newContext = this.extractContext();
                if (JSON.stringify(newContext) !== JSON.stringify(lastContext)) {
                    lastContext = newContext;
                    callback(newContext);
                }
            }
        };
        // Check periodically for URL changes
        const intervalId = setInterval(checkUrl, 1000);
        // Watch for attribute changes
        const observer = new MutationObserver(() => {
            const newContext = this.extractContext();
            if (JSON.stringify(newContext) !== JSON.stringify(lastContext)) {
                lastContext = newContext;
                callback(newContext);
            }
        });
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: Array.from(document.body.attributes)
                .map(attr => attr.name)
                .filter(name => name.startsWith(this.DATA_ATTRIBUTE_PREFIX)),
            subtree: true,
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: Array.from(document.documentElement.attributes)
                .map(attr => attr.name)
                .filter(name => name.startsWith(this.DATA_ATTRIBUTE_PREFIX)),
        });
        return () => {
            clearInterval(intervalId);
            observer.disconnect();
        };
    }
}
PageContextExtractor.DATA_ATTRIBUTE_PREFIX = 'data-modly-';

class AIService {
    constructor(apiClient, config) {
        this.apiClient = apiClient;
        this.stateManager = new ConversationStateManager();
        // Extract initial page context
        this.pageContext = PageContextExtractor.extractContext();
        // Watch for context changes
        this.contextUnwatch = PageContextExtractor.watchForChanges((newContext) => {
            this.pageContext = newContext;
            this.stateManager.updateContext({
                pageType: newContext.pageType,
                productId: newContext.productId,
                category: newContext.category,
                currentPage: newContext.currentUrl,
            });
        });
        // Initialize with greeting if no messages exist
        if (this.stateManager.getMessages().length === 0) {
            this.addGreeting();
        }
    }
    addGreeting() {
        const greeting = {
            id: `msg-greeting-${Date.now()}`,
            role: 'assistant',
            type: 'text',
            content: this.getInitialGreeting(),
            timestamp: Date.now(),
        };
        this.stateManager.addMessage(greeting);
    }
    getInitialGreeting() {
        const context = this.pageContext;
        if (context.pageType === 'product' && context.productName) {
            return `Hi! I'm ModlyAI, your furniture configuration assistant. I see you're looking at ${context.productName}. I can help you decide if this is the right fit, suggest similar items from our catalog, or help you configure it using our factory-approved options. What would you like to know?`;
        }
        else if (context.pageType === 'category' && context.category) {
            return `Hello! I'm ModlyAI, your furniture sales and configuration assistant. I see you're browsing ${context.category}. I can help you compare products, understand their features, and configure them to match your needs. What are you looking for today?`;
        }
        else {
            return `Hello! I'm ModlyAI, your furniture sales and configuration assistant. I can help you choose the right products from our catalog, plan your room, or configure items using our factory-approved options. What would you like to start with?`;
        }
    }
    async sendMessage(userMessage) {
        // Add user message to state
        const userMsg = {
            id: `msg-user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            role: 'user',
            type: 'text',
            content: userMessage,
            timestamp: Date.now(),
        };
        this.stateManager.addMessage(userMsg);
        // Build request
        const state = this.stateManager.getState();
        const request = {
            message: userMessage,
            conversationHistory: state.messages,
            context: {
                pageType: this.pageContext.pageType,
                productId: this.pageContext.productId,
                category: this.pageContext.category,
                currentPage: this.pageContext.currentUrl,
            },
            userPreferences: state.userPreferences,
        };
        // Call API
        try {
            const chatResponse = await this.apiClient.chat(request);
            // Add assistant response to state
            this.stateManager.addMessage(chatResponse.message);
            // Update preferences if provided
            if (chatResponse.updatedPreferences) {
                this.stateManager.updatePreferences(chatResponse.updatedPreferences);
            }
            // Update intent if we can infer it from the conversation
            this.updateIntentFromMessage(chatResponse.message);
            return chatResponse;
        }
        catch (error) {
            console.error('Error sending message:', error);
            // Create a more helpful error message
            let errorMessage = 'I apologize, but I encountered an error. Please try again.';
            if (error instanceof Error) {
                const errorMsg = error.message;
                if (errorMsg.includes('quota exceeded') || errorMsg.includes('insufficient_quota')) {
                    errorMessage = 'I apologize, but the AI service has reached its usage limit. The OpenAI API quota has been exceeded. Please contact the administrator to check the billing and usage limits, or try again later.';
                }
                else if (errorMsg.includes('AI service not configured') || errorMsg.includes('OPENAI_API_KEY')) {
                    errorMessage = 'The AI service is not configured. The OpenAI API key needs to be set in the server environment variables. Please contact the administrator.';
                }
                else if (errorMsg.includes('rate limit')) {
                    errorMessage = 'The AI service is currently experiencing high demand. Please try again in a few moments.';
                }
                else if (errorMsg.includes('Network error') || errorMsg.includes('fetch')) {
                    errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
                }
                else if (errorMsg.includes('Failed to get chat response')) {
                    errorMessage = 'The server encountered an error processing your request. Please try again in a moment.';
                }
                else if (errorMsg.includes('OpenAI API error')) {
                    errorMessage = errorMsg; // Show the OpenAI error directly
                }
                else {
                    // Include the actual error message
                    errorMessage = errorMsg;
                }
            }
            // Add error message
            const errorMsg = {
                id: `msg-error-${Date.now()}`,
                role: 'assistant',
                type: 'text',
                content: errorMessage,
                timestamp: Date.now(),
            };
            this.stateManager.addMessage(errorMsg);
            throw error;
        }
    }
    updateIntentFromMessage(message) {
        const content = message.content.toLowerCase();
        const metadata = message.metadata;
        if (metadata?.action) {
            switch (metadata?.action?.type) {
                case 'open_room_planner':
                    this.stateManager.updateIntent('room_planning');
                    break;
                case 'open_customizer':
                    this.stateManager.updateIntent('customization');
                    break;
                default:
                    if (content.includes('browse') || content.includes('catalog')) {
                        this.stateManager.updateIntent('browsing');
                    }
            }
        }
        else if (content.includes('room') || content.includes('plan')) {
            this.stateManager.updateIntent('room_planning');
        }
        else if (content.includes('customize') || content.includes('customization')) {
            this.stateManager.updateIntent('customization');
        }
        else if (content.includes('browse') || content.includes('show') || content.includes('catalog')) {
            this.stateManager.updateIntent('browsing');
        }
    }
    getState() {
        return this.stateManager.getState();
    }
    getMessages() {
        return this.stateManager.getMessages();
    }
    clearConversation() {
        this.stateManager.resetConversation();
        this.addGreeting();
    }
    updatePreferences(preferences) {
        this.stateManager.updatePreferences(preferences);
    }
    destroy() {
        if (this.contextUnwatch) {
            this.contextUnwatch();
        }
    }
}

function FurnitureAIWidget({ config = {}, defaultTab }) {
    const mergedConfig = useMemo(() => mergeConfig(config), [config]);
    const apiClient = useMemo(() => new ApiClient(mergedConfig), [mergedConfig]);
    const storage = useMemo(() => new Storage(mergedConfig.storageKey), [mergedConfig.storageKey]);
    const aiServiceRef = useRef(null);
    // Initialize AI service
    if (!aiServiceRef.current) {
        aiServiceRef.current = new AIService(apiClient, mergedConfig);
    }
    const [viewMode, setViewMode] = useState('conversation');
    const [customizeItem, setCustomizeItem] = useState(null);
    const [saveNotification, setSaveNotification] = useState(null);
    const [selectedCatalogItem, setSelectedCatalogItem] = useState(null);
    const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitConfig, setSubmitConfig] = useState(null);
    useEffect(() => {
        // Handle external events for backward compatibility
        const handleCustomizeItem = (event) => {
            setCustomizeItem(event.detail);
            setViewMode('customizer');
        };
        const handleNavigateToRoomPlanner = () => {
            setViewMode('room-planner');
        };
        const handleNavigateToCustomizer = () => {
            console.log('[FurnitureAIWidget] modly:navigate-to-customizer event received, switching to customizer view');
            setViewMode('customizer');
        };
        window.addEventListener('modly:customize-item', handleCustomizeItem);
        window.addEventListener('modly:navigate-to-room-planner', handleNavigateToRoomPlanner);
        window.addEventListener('modly:navigate-to-customizer', handleNavigateToCustomizer);
        return () => {
            window.removeEventListener('modly:customize-item', handleCustomizeItem);
            window.removeEventListener('modly:navigate-to-room-planner', handleNavigateToRoomPlanner);
            window.removeEventListener('modly:navigate-to-customizer', handleNavigateToCustomizer);
        };
    }, []);
    // Cleanup AI service on unmount
    useEffect(() => {
        return () => {
            aiServiceRef.current?.destroy();
        };
    }, []);
    // Convert FurnitureItem to CustomizedFurnitureItem format
    const convertFurnitureItemToCustomized = (item) => {
        return {
            name: item.name,
            baseItemType: item.category || item.subCategory || 'furniture',
            dimensions: {
                length: item.dimensions.length,
                width: item.dimensions.width,
                height: item.dimensions.height,
            },
            colorScheme: {
                primary: item.colors.main,
                secondary: item.colors.accent,
            },
            materials: {
                primary: item.materials.primary,
                secondary: item.materials.secondary,
                legs: item.materials.legs,
                upholstery: item.materials.upholstery,
            },
            aiNotes: `Recommended from AI conversation: ${item.name}`,
        };
    };
    const handleAddToRoomPlanner = (item) => {
        try {
            const customizedItem = convertFurnitureItemToCustomized(item);
            storage.saveCustomizedFurniture(customizedItem);
            setSaveNotification(`Added ${item.name} to Room Planner`);
            setTimeout(() => setSaveNotification(null), 3000);
        }
        catch (error) {
            console.error('Failed to add item to room planner:', error);
        }
    };
    const handleCustomizeItem = (item) => {
        sessionStorage.setItem('modly-customize-item', JSON.stringify(item));
        setCustomizeItem(item);
        setViewMode('customizer');
    };
    const handleOpenRoomPlanner = () => {
        setViewMode('room-planner');
    };
    const handleOpenCustomizer = () => {
        console.log('[FurnitureAIWidget] handleOpenCustomizer called, switching to customizer view');
        setViewMode('customizer');
    };
    const handleShowCatalog = () => {
        // Catalog doesn't exist yet - show message in conversation or do nothing
        if (aiServiceRef.current) {
            aiServiceRef.current.sendMessage('Show me the catalog');
        }
    };
    const handleViewInCatalog = (item) => {
        setSelectedCatalogItem(item);
        setIsCatalogModalOpen(true);
    };
    const handleCloseCatalogModal = () => {
        setIsCatalogModalOpen(false);
        setSelectedCatalogItem(null);
    };
    const handleCustomizeFromCatalog = () => {
        if (selectedCatalogItem) {
            handleCustomizeItem(selectedCatalogItem);
            handleCloseCatalogModal();
        }
    };
    const handleBackToConversation = () => {
        setViewMode('conversation');
    };
    const handleSubmitSuccess = (data) => {
        setShowSubmitModal(false);
        setSubmitConfig(null);
        setSaveNotification(data.type === 'cart'
            ? `Added to cart! (ID: ${data.id})`
            : `Quote request submitted! (ID: ${data.id})`);
        setTimeout(() => setSaveNotification(null), 5000);
    };
    const handleCloseSubmitModal = () => {
        setShowSubmitModal(false);
        setSubmitConfig(null);
    };
    return (jsxRuntimeExports.jsxs("div", { className: "furniture-widget-ai h-full flex flex-col", children: [jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 border-b border-gray-200 px-6 py-4 pr-16 flex items-center justify-between", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: jsxRuntimeExports.jsx("span", { className: "text-blue-600", children: "ModlyAI" }) }), viewMode === 'conversation' && (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("button", { onClick: handleOpenRoomPlanner, className: "text-sm px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors", children: "Room Planner" }), jsxRuntimeExports.jsx("button", { onClick: handleOpenCustomizer, className: "text-sm px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors", children: "Customizer" })] })), viewMode !== 'conversation' && (jsxRuntimeExports.jsxs("button", { onClick: handleBackToConversation, className: "text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1", children: [jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }), "Back to Chat"] }))] }), jsxRuntimeExports.jsx("div", { className: "flex gap-2" })] }), jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-hidden", children: [viewMode === 'conversation' && aiServiceRef.current && (jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col", children: [saveNotification && (jsxRuntimeExports.jsx("div", { className: "bg-green-500 text-white px-4 py-2 text-sm text-center flex-shrink-0", children: saveNotification })), jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0", children: jsxRuntimeExports.jsx(ConversationInterface, { aiService: aiServiceRef.current, onCustomizeItem: handleCustomizeItem, onAddToRoomPlanner: handleAddToRoomPlanner, onOpenRoomPlanner: handleOpenRoomPlanner, onOpenCustomizer: handleOpenCustomizer, onShowCatalog: handleShowCatalog, onViewInCatalog: handleViewInCatalog }) })] })), viewMode === 'room-planner' && (jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto", children: jsxRuntimeExports.jsx(FurnitureRoomPlannerWidget, { config: mergedConfig, onCustomizeItem: handleCustomizeItem, onNavigateToCustomizer: handleOpenCustomizer }) })), viewMode === 'customizer' && (jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto", children: jsxRuntimeExports.jsx(FurnitureCustomizerWidget, { config: mergedConfig, onNavigateToRoomPlanner: handleOpenRoomPlanner }) }))] }), showSubmitModal && submitConfig && (jsxRuntimeExports.jsx(SubmitFlowModal, { config: submitConfig.config, product: submitConfig.product, apiClient: apiClient, onSuccess: handleSubmitSuccess, onClose: handleCloseSubmitModal })), isCatalogModalOpen && selectedCatalogItem && (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-md w-full p-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: selectedCatalogItem.name }), jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6", children: [selectedCatalogItem.dimensions && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-1", children: "Dimensions" }), jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [selectedCatalogItem.dimensions.length, "\" L \u00D7 ", selectedCatalogItem.dimensions.width, "\" W \u00D7 ", selectedCatalogItem.dimensions.height, "\" H"] })] })), selectedCatalogItem.materials && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-1", children: "Materials" }), jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [selectedCatalogItem.materials.primary, selectedCatalogItem.materials.secondary && `, ${selectedCatalogItem.materials.secondary}`] })] })), selectedCatalogItem.colors && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-1", children: "Colors" }), jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [selectedCatalogItem.colors.main, selectedCatalogItem.colors.accent && ` / ${selectedCatalogItem.colors.accent}`] })] })), jsxRuntimeExports.jsx("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4", children: jsxRuntimeExports.jsxs("p", { className: "text-sm text-blue-900", children: [jsxRuntimeExports.jsx("strong", { children: "Catalog coming soon." }), " You can customize this item instead."] }) })] }), jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [jsxRuntimeExports.jsx("button", { onClick: handleCustomizeFromCatalog, className: "flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium", children: "Customize This" }), jsxRuntimeExports.jsx("button", { onClick: handleCloseCatalogModal, className: "flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium", children: "Close" })] })] }) }))] }));
}

// Helper function to check if a color is dark
const isDarkColor = (color) => {
    if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
        return false;
    }
    // Handle rgb/rgba
    const rgbMatch = color.match(/\d+/g);
    if (rgbMatch && rgbMatch.length >= 3) {
        const r = parseInt(rgbMatch[0]);
        const g = parseInt(rgbMatch[1]);
        const b = parseInt(rgbMatch[2]);
        // Calculate luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
    }
    // Handle hex
    if (color.startsWith('#')) {
        const hex = color.length === 4
            ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
            : color;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
    }
    // Named colors
    const darkColors = ['black', 'navy', 'darkblue', 'dark', 'darkslategray', 'darkslategrey'];
    return darkColors.includes(color.toLowerCase());
};
function FurnitureAIWidgetButton({ config = {}, defaultTab = 'room-planner', buttonText = 'ModlyAI', buttonPosition = 'bottom-right', buttonStyle, className = '' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    // Auto contrast detection: check user preference and page background
    useEffect(() => {
        const detectDarkMode = () => {
            // Check user preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            // Check page background
            const body = document.body;
            const root = document.documentElement;
            const bodyComputed = window.getComputedStyle(body);
            const rootComputed = window.getComputedStyle(root);
            const bodyBg = bodyComputed.backgroundColor || bodyComputed.getPropertyValue('background-color');
            const rootBg = rootComputed.backgroundColor || rootComputed.getPropertyValue('background-color');
            const isDarkBackground = isDarkColor(bodyBg) || isDarkColor(rootBg);
            setIsDarkMode(prefersDark || isDarkBackground);
        };
        detectDarkMode();
        // Listen for system preference changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => detectDarkMode();
        mediaQuery.addEventListener('change', handleChange);
        // Observe DOM changes
        const observer = new MutationObserver(detectDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'style', 'data-theme']
        });
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class', 'style']
        });
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
            observer.disconnect();
        };
    }, []);
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    const positionClasses = {
        'bottom-right': 'bottom-6 right-6',
        'bottom-left': 'bottom-6 left-6',
        'top-right': 'top-6 right-6',
        'top-left': 'top-6 left-6',
    };
    const finalButtonStyle = useMemo(() => {
        const baseStyle = {
            height: '44px',
            minWidth: '140px',
            padding: '12px 16px',
            // Frosted glass background
            background: isDarkMode
                ? 'rgba(0, 0, 0, 0.35)'
                : 'rgba(255, 255, 255, 0.14)',
            border: isDarkMode
                ? '1px solid rgba(255, 255, 255, 0.16)'
                : '1px solid rgba(255, 255, 255, 0.22)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)', // Safari support
            // Text color
            color: isDarkMode ? '#ffffff' : '#1a1a1a',
            // Shadow
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.28)',
            ...buttonStyle
        };
        return baseStyle;
    }, [isDarkMode, buttonStyle]);
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("button", { onClick: () => setIsOpen(true), style: finalButtonStyle, className: `modly-widget-button fixed ${positionClasses[buttonPosition]} z-50 font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${className}`, onMouseEnter: (e) => {
                    e.currentTarget.style.transform = 'scale(1.04)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.28)';
                }, onMouseLeave: (e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.28)';
                }, onFocus: (e) => {
                    e.currentTarget.style.outline = '2px solid rgba(99, 102, 241, 0.5)';
                    e.currentTarget.style.outlineOffset = '2px';
                }, onBlur: (e) => {
                    e.currentTarget.style.outline = 'none';
                }, "aria-label": "Open ModlyAI Widget", children: [jsxRuntimeExports.jsx("span", { className: "text-base font-semibold", style: {
                            letterSpacing: '0.02em',
                            fontWeight: 600
                        }, children: buttonText }), jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", style: { opacity: 0.75 }, children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" }) })] }), isOpen && (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center p-4", onClick: (e) => {
                    if (e.target === e.currentTarget) {
                        setIsOpen(false);
                    }
                }, children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col relative", children: [jsxRuntimeExports.jsx("button", { onClick: () => setIsOpen(false), className: "absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors", "aria-label": "Close modal", children: jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }), jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden", children: jsxRuntimeExports.jsx(FurnitureAIWidget, { config: config, defaultTab: defaultTab }) })] }) }))] }));
}

export { FurnitureAIWidget, FurnitureAIWidgetButton, FurnitureCustomizerWidget, FurnitureRoomPlannerWidget };
//# sourceMappingURL=index.esm.js.map
