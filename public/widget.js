(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['react', 'react-dom'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.React, global.ReactDOM));
})(this, (function (require$$0$1, require$$0) { 'use strict';

  var client = {};

  var m = require$$0;
  if (process.env.NODE_ENV === 'production') {
    client.createRoot = m.createRoot;
    client.hydrateRoot = m.hydrateRoot;
  } else {
    var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    client.createRoot = function(c, o) {
      i.usingClientEntryPoint = true;
      try {
        return m.createRoot(c, o);
      } finally {
        i.usingClientEntryPoint = false;
      }
    };
    client.hydrateRoot = function(c, h, o) {
      i.usingClientEntryPoint = true;
      try {
        return m.hydrateRoot(c, h, o);
      } finally {
        i.usingClientEntryPoint = false;
      }
    };
  }

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
  var f=require$$0$1,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
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

  	var React = require$$0$1;

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

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */

  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
  }).join(" ").trim();

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */

  const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */

  const toCamelCase = (string) => string.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
  );

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const toPascalCase = (string) => {
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  };

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */

  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */

  const hasA11yProp = (props) => {
    for (const prop in props) {
      if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
        return true;
      }
    }
    return false;
  };

  const LucideContext = require$$0$1.createContext({});
  const useLucideContext = () => require$$0$1.useContext(LucideContext);

  const Icon = require$$0$1.forwardRef(
    ({ color, size, strokeWidth, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => {
      const {
        size: contextSize = 24,
        strokeWidth: contextStrokeWidth = 2,
        absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
        color: contextColor = "currentColor",
        className: contextClass = ""
      } = useLucideContext() ?? {};
      const calculatedStrokeWidth = absoluteStrokeWidth ?? contextAbsoluteStrokeWidth ? Number(strokeWidth ?? contextStrokeWidth) * 24 / Number(size ?? contextSize) : strokeWidth ?? contextStrokeWidth;
      return require$$0$1.createElement(
        "svg",
        {
          ref,
          ...defaultAttributes,
          width: size ?? contextSize ?? defaultAttributes.width,
          height: size ?? contextSize ?? defaultAttributes.height,
          stroke: color ?? contextColor,
          strokeWidth: calculatedStrokeWidth,
          className: mergeClasses("lucide", contextClass, className),
          ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
          ...rest
        },
        [
          ...iconNode.map(([tag, attrs]) => require$$0$1.createElement(tag, attrs)),
          ...Array.isArray(children) ? children : [children]
        ]
      );
    }
  );

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const createLucideIcon = (iconName, iconNode) => {
    const Component = require$$0$1.forwardRef(
      ({ className, ...props }, ref) => require$$0$1.createElement(Icon, {
        ref,
        iconNode,
        className: mergeClasses(
          `lucide-${toKebabCase(toPascalCase(iconName))}`,
          `lucide-${iconName}`,
          className
        ),
        ...props
      })
    );
    Component.displayName = toPascalCase(iconName);
    return Component;
  };

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$n = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
  ];
  const ArrowRight = createLucideIcon("arrow-right", __iconNode$n);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$m = [
    [
      "path",
      {
        d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
        key: "18u6gg"
      }
    ],
    ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
  ];
  const Camera = createLucideIcon("camera", __iconNode$m);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$l = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
  const Check = createLucideIcon("check", __iconNode$l);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$k = [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ];
  const ExternalLink = createLucideIcon("external-link", __iconNode$k);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$j = [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    ["path", { d: "M12 18v-6", key: "17g6i2" }],
    ["path", { d: "m9 15 3 3 3-3", key: "1npd3o" }]
  ];
  const FileDown = createLucideIcon("file-down", __iconNode$j);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$i = [
    [
      "path",
      {
        d: "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1",
        key: "3pnvol"
      }
    ],
    ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }],
    ["path", { d: "M12 10v12", key: "6ubwww" }],
    ["path", { d: "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z", key: "9hd38g" }],
    ["path", { d: "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z", key: "ufn41s" }]
  ];
  const Flower2 = createLucideIcon("flower-2", __iconNode$i);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$h = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
    ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
  ];
  const Image = createLucideIcon("image", __iconNode$h);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$g = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 16v-4", key: "1dtifu" }],
    ["path", { d: "M12 8h.01", key: "e9boi3" }]
  ];
  const Info = createLucideIcon("info", __iconNode$g);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$f = [
    ["path", { d: "M12 12v6", key: "3ahymv" }],
    [
      "path",
      {
        d: "M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z",
        key: "1l7kg2"
      }
    ],
    [
      "path",
      { d: "M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z", key: "1mmzpi" }
    ]
  ];
  const Lamp = createLucideIcon("lamp", __iconNode$f);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$e = [
    [
      "path",
      {
        d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
        key: "zw3jo"
      }
    ],
    [
      "path",
      {
        d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
        key: "1wduqc"
      }
    ],
    [
      "path",
      {
        d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
        key: "kqbvx6"
      }
    ]
  ];
  const Layers = createLucideIcon("layers", __iconNode$e);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$d = [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ];
  const Link2 = createLucideIcon("link-2", __iconNode$d);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$c = [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "m21 3-7 7", key: "1l2asr" }],
    ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
    ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
  ];
  const Maximize2 = createLucideIcon("maximize-2", __iconNode$c);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$b = [
    [
      "path",
      {
        d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
        key: "1sd12s"
      }
    ]
  ];
  const MessageCircle = createLucideIcon("message-circle", __iconNode$b);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$a = [
    ["path", { d: "M14 14a2 2 0 0 0 2-2V8h-2", key: "1r06pg" }],
    [
      "path",
      {
        d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
        key: "18887p"
      }
    ],
    ["path", { d: "M8 14a2 2 0 0 0 2-2V8H8", key: "1jzu5j" }]
  ];
  const MessageSquareQuote = createLucideIcon("message-square-quote", __iconNode$a);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$9 = [
    [
      "path",
      {
        d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
        key: "e79jfc"
      }
    ],
    ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
    ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
    ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
    ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
  ];
  const Palette = createLucideIcon("palette", __iconNode$9);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$8 = [
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
        key: "1a8usu"
      }
    ],
    ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
  ];
  const Pencil = createLucideIcon("pencil", __iconNode$8);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$7 = [
    ["path", { d: "m15 14 5-5-5-5", key: "12vg1m" }],
    ["path", { d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13", key: "6uklza" }]
  ];
  const Redo2 = createLucideIcon("redo-2", __iconNode$7);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$6 = [
    [
      "path",
      {
        d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
        key: "icamh8"
      }
    ],
    ["path", { d: "m14.5 12.5 2-2", key: "inckbg" }],
    ["path", { d: "m11.5 9.5 2-2", key: "fmmyf7" }],
    ["path", { d: "m8.5 6.5 2-2", key: "vc6u1g" }],
    ["path", { d: "m17.5 15.5 2-2", key: "wo5hmg" }]
  ];
  const Ruler = createLucideIcon("ruler", __iconNode$6);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$5 = [
    ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
    ["path", { d: "M3.103 6.034h17.794", key: "awc11p" }],
    [
      "path",
      {
        d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
        key: "o988cm"
      }
    ]
  ];
  const ShoppingBag = createLucideIcon("shopping-bag", __iconNode$5);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$4 = [
    ["path", { d: "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3", key: "1dgpiv" }],
    [
      "path",
      {
        d: "M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
        key: "xacw8m"
      }
    ],
    ["path", { d: "M4 18v2", key: "jwo5n2" }],
    ["path", { d: "M20 18v2", key: "1ar1qi" }],
    ["path", { d: "M12 4v9", key: "oqhhn3" }]
  ];
  const Sofa = createLucideIcon("sofa", __iconNode$4);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$3 = [
    [
      "path",
      {
        d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
        key: "1s2grr"
      }
    ],
    ["path", { d: "M20 2v4", key: "1rf3ol" }],
    ["path", { d: "M22 4h-4", key: "gwowj6" }],
    ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
  ];
  const Sparkles = createLucideIcon("sparkles", __iconNode$3);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$2 = [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ];
  const Undo2 = createLucideIcon("undo-2", __iconNode$2);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$1 = [
    ["path", { d: "M12 3v12", key: "1x0j5s" }],
    ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
  ];
  const Upload = createLucideIcon("upload", __iconNode$1);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode = [
    ["path", { d: "M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11", key: "pb2vm6" }],
    [
      "path",
      {
        d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z",
        key: "doq5xv"
      }
    ],
    ["path", { d: "M6 13h12", key: "yf64js" }],
    ["path", { d: "M6 17h12", key: "1jwigz" }]
  ];
  const Warehouse = createLucideIcon("warehouse", __iconNode);

  const DEFAULT_WIDGET_TITLE = 'ModlyAI';
  const DEFAULT_PRIMARY_COLOR = '#3B82F6';
  const DEFAULT_WELCOME_MESSAGE = "Hello! I'm your furniture assistant. I can help you choose the right products, plan your room, or customize items from this store's catalog.";
  const DEFAULT_ENABLED_ACTIONS = {
      viewInCatalog: true,
      customize: true,
      requestQuote: true,
  };
  function hasText(value) {
      return typeof value === 'string' && value.trim().length > 0;
  }
  const defaultConfig = {
      storeName: '',
      storeUrl: '',
      supportEmail: '',
      widgetTitle: DEFAULT_WIDGET_TITLE,
      primaryColor: DEFAULT_PRIMARY_COLOR,
      welcomeMessage: DEFAULT_WELCOME_MESSAGE,
      enabledActions: DEFAULT_ENABLED_ACTIONS,
      quoteEmail: '',
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
      const widgetTitle = hasText(userConfig.widgetTitle)
          ? userConfig.widgetTitle.trim()
          : hasText(userConfig.theme?.buttonText)
              ? userConfig.theme.buttonText.trim()
              : DEFAULT_WIDGET_TITLE;
      const primaryColor = hasText(userConfig.primaryColor)
          ? userConfig.primaryColor.trim()
          : hasText(userConfig.theme?.primaryColor)
              ? userConfig.theme.primaryColor.trim()
              : DEFAULT_PRIMARY_COLOR;
      const welcomeMessage = hasText(userConfig.welcomeMessage)
          ? userConfig.welcomeMessage.trim()
          : DEFAULT_WELCOME_MESSAGE;
      return {
          ...defaultConfig,
          ...userConfig,
          storeId: userConfig.storeId || userConfig.widgetId,
          widgetTitle,
          primaryColor,
          welcomeMessage,
          enabledActions: {
              ...DEFAULT_ENABLED_ACTIONS,
              ...userConfig.enabledActions,
          },
          apiEndpoints: {
              ...defaultConfig.apiEndpoints,
              ...userConfig.apiEndpoints,
          },
          theme: {
              ...userConfig.theme,
              primaryColor,
              buttonText: widgetTitle,
          },
          features: {
              ...defaultConfig.features,
              ...userConfig.features,
          },
      };
  }
  function getWidgetTitle(config = {}) {
      return hasText(config.widgetTitle)
          ? config.widgetTitle.trim()
          : hasText(config.theme?.buttonText)
              ? config.theme.buttonText.trim()
              : DEFAULT_WIDGET_TITLE;
  }
  function getPrimaryColor(config = {}) {
      return hasText(config.primaryColor)
          ? config.primaryColor.trim()
          : hasText(config.theme?.primaryColor)
              ? config.theme.primaryColor.trim()
              : DEFAULT_PRIMARY_COLOR;
  }
  function isDarkColor(color) {
      if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
          return false;
      }
      const rgbMatch = color.match(/\d+/g);
      if (rgbMatch && rgbMatch.length >= 3) {
          const r = parseInt(rgbMatch[0], 10);
          const g = parseInt(rgbMatch[1], 10);
          const b = parseInt(rgbMatch[2], 10);
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          return luminance < 0.5;
      }
      if (color.startsWith('#')) {
          const hex = color.length === 4
              ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
              : color;
          if (hex.length >= 7) {
              const r = parseInt(hex.slice(1, 3), 16);
              const g = parseInt(hex.slice(3, 5), 16);
              const b = parseInt(hex.slice(5, 7), 16);
              const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              return luminance < 0.5;
          }
      }
      const darkColors = ['black', 'navy', 'darkblue', 'dark', 'darkslategray', 'darkslategrey'];
      return darkColors.includes(color.toLowerCase());
  }
  function getReadableTextColor(backgroundColor) {
      return isDarkColor(backgroundColor) ? '#ffffff' : '#111827';
  }
  function getWelcomeMessage(config = {}) {
      return hasText(config.welcomeMessage) ? config.welcomeMessage.trim() : DEFAULT_WELCOME_MESSAGE;
  }
  function getEnabledActions(config = {}) {
      return {
          viewInCatalog: typeof config.enabledActions?.viewInCatalog === 'boolean'
              ? config.enabledActions.viewInCatalog
              : DEFAULT_ENABLED_ACTIONS.viewInCatalog,
          customize: typeof config.enabledActions?.customize === 'boolean'
              ? config.enabledActions.customize
              : DEFAULT_ENABLED_ACTIONS.customize,
          requestQuote: typeof config.enabledActions?.requestQuote === 'boolean'
              ? config.enabledActions.requestQuote
              : DEFAULT_ENABLED_ACTIONS.requestQuote,
      };
  }
  // NEW: Fetch config from server
  async function fetchRemoteConfig(configUrl, widgetId, storeId) {
      try {
          const url = new URL(configUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
          if (storeId) {
              url.searchParams.set('storeId', storeId);
          }
          if (widgetId) {
              url.searchParams.set('widgetId', widgetId);
          }
          if (typeof window !== 'undefined' && window.location.hostname) {
              url.searchParams.set('domain', window.location.hostname);
          }
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error(`Failed to fetch config: ${response.statusText}`);
          }
          return await response.json();
      }
      catch (error) {
          console.warn('Failed to fetch remote config, using defaults:', error);
          return {};
      }
  }

  const FALLBACK_COLOR_HEX = ['#9CA3AF', '#1F2937', '#D4B896', '#D4C5B9', '#6B7280', '#C2410C'];
  const COLOR_HEX_BY_NAME = {
      beige: '#F5F0E8',
      gray: '#9CA3AF',
      grey: '#9CA3AF',
      charcoal: '#374151',
      white: '#FFFFFF',
      black: '#111827',
      brown: '#92400E',
      navy_blue: '#1E3A5F',
      navy: '#1E3A5F',
      forest_green: '#166534',
      sage: '#84A98C',
      sage_green: '#84A98C',
      emerald: '#065F46',
      midnight_blue: '#1E3A8A',
      burgundy: '#7F1D1D',
      cream: '#FEFCE8',
      gold: '#D97706',
      walnut: '#7C3D12',
      oak: '#A16207',
      natural: '#D4B896',
      caramel: '#B45309',
      cognac: '#9A3412',
      rustic_brown: '#78350F',
      dark_walnut: '#431407',
      gray_wash: '#D1D5DB',
      smoked: '#6B7280',
      dusty_rose: '#FDA4AF',
      blush_pink: '#FBCFE8',
      clear: '#E0F2FE',
      white_oak: '#FEF9C3',
      pebble: '#C4B8AE',
      slate: '#475569',
      sand: '#D4C5B9',
      oat: '#D8CCB8',
      mist: '#CBD5E1',
      warm_oak: '#A16207',
      warmoak: '#A16207',
      blue: '#3B82F6',
      green: '#10B981',
      terracotta: '#C2410C',
      graphite: '#4B5563',
      chrome: '#9CA3AF',
      brass: '#B45309',
  };
  const getColorHex = (colorName) => {
      const normalized = colorName.toLowerCase().replace(/\s+/g, '_');
      return COLOR_HEX_BY_NAME[normalized] ?? '#E5E7EB';
  };
  const getMaterialDescription = (material) => {
      const descriptions = {
          Fabric: 'Soft and breathable, easy to maintain',
          Velvet: 'Luxurious feel, rich appearance',
          Leather: 'Durable and easy to clean, ages beautifully',
          Linen: 'Natural fiber, cool and textured',
          Bouclé: 'Cozy looped texture, on-trend',
          Boucle: 'Cozy looped texture, on-trend',
          Marble: 'Premium natural stone, unique patterns',
          'Tempered Glass': 'Modern and sleek, easy to clean',
          'Solid Wood': 'Long lasting, natural grain beauty',
          MDF: 'Smooth finish, affordable and sturdy',
          Metal: 'Industrial look, very durable',
          Rattan: 'Natural and lightweight, boho aesthetic',
          Wicker: 'Woven natural material, casual style',
          'Reclaimed Wood': 'Eco-friendly, unique character',
          Microfiber: 'Stain resistant, soft to touch',
          'Performance Fabric': 'Kid and pet friendly, highly durable',
          'Full Grain Leather': 'Top quality leather, develops patina',
          'PU Leather': 'Vegan leather, easy to wipe clean',
          Acrylic: 'Clear modern material, lightweight',
          Bamboo: 'Sustainable, strong natural material',
          'Engineered Wood': 'Consistent quality, moisture resistant',
          Upholstered: 'Padded and fabric wrapped, comfortable',
      };
      return descriptions[material] || 'Premium quality material';
  };
  const productMaterialOptions = (materials) => {
      const uniqueMaterials = Array.from(new Set(materials.filter(Boolean)));
      if (uniqueMaterials.length === 0) {
          return [
              {
                  id: 'standard_material',
                  name: 'Standard Material',
                  priceDelta: 0,
                  description: 'Factory-standard finish for this product.',
              },
          ];
      }
      return uniqueMaterials.map((material, index) => ({
          id: material
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '_')
              .replace(/^_+|_+$/g, ''),
          name: material,
          priceDelta: 0,
          description: getMaterialDescription(material),
      }));
  };
  const resolveColorHex = (colorName, index) => {
      const hex = getColorHex(colorName);
      return hex === '#E5E7EB' ? FALLBACK_COLOR_HEX[index % FALLBACK_COLOR_HEX.length] : hex;
  };
  const metersToInches = (value) => Number((value / 0.0254).toFixed(1));
  const inchesToMeters = (value) => Number((value * 0.0254).toFixed(3));
  const twentyPercentRange = (base, minimum) => {
      const min = Math.max(minimum, Math.round(base * 0.8));
      const max = Math.max(min + 1, Math.round(base * 1.2));
      return [min, max];
  };
  const normalizeProductType = (category) => {
      const value = category.toLowerCase();
      if (value.endsWith('ies')) {
          return `${value.slice(0, -3)}y`;
      }
      if (value.endsWith('s')) {
          return value.slice(0, -1);
      }
      return value;
  };
  const normalizeStringList$1 = (value) => {
      const entries = Array.isArray(value)
          ? value
          : typeof value === 'string'
              ? value.split(/[|,]/)
              : [];
      return Array.from(new Set(entries
          .map((entry) => String(entry ?? '').trim())
          .filter(Boolean)));
  };
  const getOptionName = (value) => typeof value === 'string' ? value : value.name;
  const getOptionPrice = (value) => typeof value === 'string' ? undefined : value.price;
  const normalizeCustomizationOptionValues = (value) => {
      if (Array.isArray(value)) {
          const options = value
              .map((entry) => {
              if (typeof entry === 'string')
                  return entry.trim();
              if (!entry || typeof entry !== 'object')
                  return null;
              const option = entry;
              const name = String(option.name ?? '').trim();
              if (!name)
                  return null;
              const price = typeof option.price === 'number' && Number.isFinite(option.price)
                  ? option.price
                  : typeof option.price === 'string' && option.price.trim() && Number.isFinite(Number(option.price))
                      ? Number(option.price)
                      : undefined;
              return price === undefined ? { name } : { name, price };
          })
              .filter(Boolean);
          const seen = new Set();
          return options.filter((option) => {
              const name = getOptionName(option).toLowerCase();
              if (seen.has(name))
                  return false;
              seen.add(name);
              return true;
          });
      }
      return normalizeStringList$1(value);
  };
  const normalizeCustomizationOptions = (value) => {
      if (!value || typeof value !== 'object' || Array.isArray(value)) {
          return undefined;
      }
      const options = value;
      const colors = normalizeCustomizationOptionValues(options.colors);
      const materials = normalizeCustomizationOptionValues(options.materials);
      return {
          ...options,
          ...(colors.length > 0 ? { colors } : {}),
          ...(materials.length > 0 ? { materials } : {}),
      };
  };
  const dimensionsFromInches = (lengthIn, widthIn, heightIn) => ({
      length: inchesToMeters(lengthIn),
      width: inchesToMeters(widthIn),
      height: inchesToMeters(heightIn),
      unit: 'm',
  });
  const products = [
      {
          id: 'demo-sofa-002',
          name: 'Modular Corner Sofa',
          category: 'Sofas',
          basePrice: 1099,
          dimensions: {
              length: 1.55,
              width: 2.4,
              height: 0.84,
              unit: 'm',
          },
          materials: ['Polyester', 'Engineered wood'],
          colors: [
              { name: 'Pebble', hex: '#C4B8AE', available: true },
              { name: 'Slate', hex: '#475569', available: true },
          ],
          images: {
              front: '/products/modular-corner-sofa-front.jpg',
              side: '/products/modular-corner-sofa-side.jpg',
              angle: '/products/modular-corner-sofa-angle.jpg',
              thumbnail: '/products/modular-corner-sofa-thumb.jpg',
          },
          tags: ['Sectional', 'Family', 'Modern'],
          customizer: {
              type: 'sofa',
              thumbnailLabel: 'Sectional',
              defaultWidthIn: 94.5,
              defaultDepthIn: 61,
              widthRangeIn: [84, 108],
              depthRangeIn: [54, 72],
              materialOptions: productMaterialOptions(['Polyester', 'Engineered wood']),
          },
      },
      {
          id: 'demo-chair-003',
          name: 'Woven Accent Lounge Chair',
          category: 'Chairs',
          basePrice: 199,
          dimensions: {
              length: 0.76,
              width: 0.72,
              height: 0.78,
              unit: 'm',
          },
          materials: ['Rattan', 'Steel'],
          colors: [
              { name: 'Natural', hex: '#D4B896', available: true },
              { name: 'Black', hex: '#1A1A1A', available: true },
          ],
          images: {
              front: '/products/woven-chair-front.jpg',
              side: '/products/woven-chair-side.jpg',
              angle: '/products/woven-chair-angle.jpg',
              thumbnail: '/products/woven-chair-thumb.jpg',
          },
          tags: ['Lounge', 'Boho', 'Lightweight'],
          customizer: {
              type: 'chair',
              thumbnailLabel: 'Lounge Chair',
              defaultWidthIn: 28.3,
              defaultDepthIn: 29.9,
              widthRangeIn: [24, 36],
              depthRangeIn: [24, 38],
              materialOptions: productMaterialOptions(['Rattan', 'Steel']),
          },
      },
      {
          id: 'demo-table-003',
          name: 'Low Profile Coffee Table',
          category: 'Tables',
          basePrice: 219,
          dimensions: {
              length: 0.6,
              width: 1.2,
              height: 0.42,
              unit: 'm',
          },
          materials: ['Engineered wood'],
          colors: [
              { name: 'Sand', hex: '#D4C5B9', available: true },
              { name: 'Graphite', hex: '#4B5563', available: true },
              { name: 'White', hex: '#F9FAFB', available: true },
          ],
          images: {
              front: '/products/low-profile-coffee-table-front.jpg',
              side: '/products/low-profile-coffee-table-side.jpg',
              angle: '/products/low-profile-coffee-table-angle.jpg',
              thumbnail: '/products/low-profile-coffee-table-thumb.jpg',
          },
          tags: ['Living room', 'Storage', 'Minimal'],
          customizer: {
              type: 'table',
              thumbnailLabel: 'Coffee Table',
              defaultWidthIn: 47.2,
              defaultDepthIn: 23.6,
              widthRangeIn: [40, 56],
              depthRangeIn: [20, 32],
              materialOptions: productMaterialOptions(['Engineered wood']),
          },
      },
      {
          id: 'custom-sofa',
          name: 'Custom Sofa',
          category: 'Sofas',
          basePrice: 899,
          dimensions: {
              length: 0.9,
              width: 2.2,
              height: 0.85,
              unit: 'm',
          },
          materials: ['Premium Fabric', 'Oak Wood Legs', 'Leather'],
          colors: [
              { name: 'Beige', hex: '#D4C5B9', available: true },
              { name: 'Navy', hex: '#1E293B', available: true },
              { name: 'Gray', hex: '#6B7280', available: true },
          ],
          images: {
              front: '/products/custom-sofa-front.jpg',
              side: '/products/custom-sofa-side.jpg',
              angle: '/products/custom-sofa-angle.jpg',
              thumbnail: '/products/custom-sofa-thumb.jpg',
          },
          tags: ['Custom', 'Configurable'],
          customizer: {
              type: 'sofa',
              thumbnailLabel: 'Custom Sofa',
              defaultWidthIn: 86.6,
              defaultDepthIn: 35.4,
              widthRangeIn: [72, 100],
              depthRangeIn: [30, 44],
              materialOptions: productMaterialOptions(['Premium Fabric', 'Leather', 'Oak Wood Legs']),
          },
      },
  ];
  function getProductById(id) {
      return products.find((product) => product.id === id);
  }
  function productFromFurnitureItem(item) {
      const existing = getProductById(item.id);
      if (existing) {
          return existing;
      }
      const rawItem = item;
      const customizationOptions = normalizeCustomizationOptions(item.customizationOptions);
      const explicitMaterials = normalizeCustomizationOptionValues(customizationOptions?.materials).map(getOptionName);
      const explicitColors = normalizeCustomizationOptionValues(customizationOptions?.colors).map(getOptionName);
      const rawMaterials = Array.isArray(rawItem.materials) || typeof rawItem.materials === 'string'
          ? normalizeStringList$1(rawItem.materials)
          : [];
      const rawColors = Array.isArray(rawItem.colors) || typeof rawItem.colors === 'string'
          ? normalizeStringList$1(rawItem.colors)
          : [];
      const baseMaterials = Array.from(new Set([
          ...explicitMaterials,
          ...rawMaterials,
          ...(!Array.isArray(rawItem.materials) && typeof rawItem.materials !== 'string'
              ? [
                  rawItem.materials.primary,
                  rawItem.materials.secondary,
                  rawItem.materials.upholstery,
                  rawItem.materials.legs,
              ]
              : []),
      ].filter((value) => Boolean(value))));
      const baseColors = Array.from(new Set([
          ...explicitColors,
          ...rawColors,
          ...(!Array.isArray(rawItem.colors) && typeof rawItem.colors !== 'string'
              ? [rawItem.colors.main, rawItem.colors.accent]
              : []),
      ].filter((value) => Boolean(value))));
      const widthIn = Math.max(18, Math.round(metersToInches(item.dimensions.width || 0.9)));
      const depthIn = Math.max(18, Math.round(metersToInches(item.dimensions.depth || item.dimensions.length || 0.9)));
      return {
          id: item.id,
          name: item.name,
          category: item.category,
          basePrice: item.priceRange?.min ?? 0,
          length: rawItem.length ?? metersToInches(item.dimensions.length || item.dimensions.depth || 0),
          width: rawItem.width ?? metersToInches(item.dimensions.width || 0),
          height: rawItem.height ?? metersToInches(item.dimensions.height || 0),
          source: item.source,
          productUrl: item.productUrl || item.url,
          imageUrl: item.images[0],
          image: item.images[0],
          thumbnail: item.images[0],
          externalId: item.externalId,
          shopifyProductId: item.shopifyProductId,
          storeId: item.storeId,
          status: item.status,
          customizationOptions,
          dimensions: {
              length: item.dimensions.length || item.dimensions.depth || 0,
              width: item.dimensions.width || 0,
              height: item.dimensions.height || 0,
              unit: 'm',
          },
          materials: baseMaterials.length > 0 ? baseMaterials : ['Custom'],
          colors: baseColors.length > 0
              ? baseColors.map((color, index) => ({
                  name: color,
                  hex: resolveColorHex(color, index),
                  available: true,
              }))
              : [{ name: 'Custom', hex: FALLBACK_COLOR_HEX[0], available: true }],
          images: {
              front: item.images[0] ?? '',
              side: item.images[1] ?? item.images[0] ?? '',
              angle: item.images[2] ?? item.images[0] ?? '',
              thumbnail: item.images[0] ?? '',
          },
          tags: item.styleTags ?? [],
          customizer: {
              type: normalizeProductType(item.subCategory || item.category),
              thumbnailLabel: item.subCategory || item.category,
              defaultWidthIn: widthIn,
              defaultDepthIn: depthIn,
              widthRangeIn: twentyPercentRange(widthIn, 18),
              depthRangeIn: twentyPercentRange(depthIn, 18),
              materialOptions: productMaterialOptions(baseMaterials),
          },
      };
  }
  function productFromCatalogProduct(product, index = 0) {
      const existing = product?.id ? getProductById(String(product.id)) : undefined;
      if (existing) {
          return existing;
      }
      const name = String(product?.title ?? product?.name ?? `Product ${index + 1}`);
      const materials = normalizeStringList$1(product?.materials);
      const colorNames = normalizeStringList$1(product?.colors);
      const lengthIn = Number(product?.length) || 0;
      const widthIn = Number(product?.width) || 0;
      const heightIn = Number(product?.height) || 0;
      const image = String(product?.imageUrl ?? product?.image ?? product?.images?.[0] ?? '');
      const price = Number(product?.price ?? product?.priceRange?.min ?? 0) || 0;
      const customizationOptions = normalizeCustomizationOptions(product?.customizationOptions);
      return {
          id: String(product?.id ?? `catalog-product-${index + 1}`),
          name,
          category: String(product?.category ?? 'Furniture'),
          basePrice: price,
          length: lengthIn,
          width: widthIn,
          height: heightIn,
          source: product?.source ? String(product.source) : undefined,
          productUrl: product?.productUrl ? String(product.productUrl) : product?.url ? String(product.url) : undefined,
          imageUrl: image,
          image,
          thumbnail: String(product?.thumbnail ?? image),
          externalId: product?.externalId ? String(product.externalId) : undefined,
          shopifyProductId: product?.shopifyProductId ? String(product.shopifyProductId) : undefined,
          storeId: product?.storeId ? String(product.storeId) : undefined,
          status: product?.status ? String(product.status) : undefined,
          customizationOptions,
          dimensions: dimensionsFromInches(lengthIn, widthIn, heightIn),
          materials: materials.length > 0 ? materials : ['Custom'],
          colors: colorNames.length > 0
              ? colorNames.map((color, colorIndex) => ({
                  name: color,
                  hex: resolveColorHex(color, colorIndex),
                  available: true,
              }))
              : [{ name: 'Custom', hex: FALLBACK_COLOR_HEX[0], available: true }],
          images: {
              front: image,
              side: image,
              angle: image,
              thumbnail: image,
          },
          tags: Array.isArray(product?.tags) ? product.tags : [],
          customizer: {
              type: normalizeProductType(String(product?.category ?? 'Furniture')),
              thumbnailLabel: String(product?.category ?? 'Furniture'),
              defaultWidthIn: Math.max(18, Math.round(widthIn || 36)),
              defaultDepthIn: Math.max(18, Math.round(lengthIn || 36)),
              widthRangeIn: twentyPercentRange(Math.max(18, Math.round(widthIn || 36)), 18),
              depthRangeIn: twentyPercentRange(Math.max(18, Math.round(lengthIn || 36)), 18),
              materialOptions: productMaterialOptions(materials),
          },
      };
  }

  const SESSION_STORAGE_KEY = 'modlyai_session_id';
  function createFallbackId() {
      return `session-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }
  function getWidgetSessionId() {
      if (typeof window === 'undefined')
          return createFallbackId();
      try {
          const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
          if (existing)
              return existing;
          const next = typeof window.crypto?.randomUUID === 'function'
              ? window.crypto.randomUUID()
              : createFallbackId();
          window.sessionStorage.setItem(SESSION_STORAGE_KEY, next);
          return next;
      }
      catch {
          return createFallbackId();
      }
  }
  function getAnalyticsEndpoint(apiBaseUrl) {
      const path = '/api/analytics/events';
      if (!apiBaseUrl)
          return path;
      try {
          return new URL(path, apiBaseUrl).toString();
      }
      catch {
          return path;
      }
  }
  function shouldWarnInDevelopment() {
      if (typeof window === 'undefined')
          return false;
      return ['localhost', '127.0.0.1'].includes(window.location.hostname);
  }
  function trackWidgetEvent({ storeId, widgetId, sessionId, type, productId, productName, metadata, apiBaseUrl, }) {
      if (!storeId || typeof window === 'undefined')
          return;
      const payload = {
          storeId,
          widgetId,
          sessionId: sessionId || getWidgetSessionId(),
          type,
          productId,
          productName,
          metadata,
      };
      window.setTimeout(() => {
          try {
              void fetch(getAnalyticsEndpoint(apiBaseUrl), {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(payload),
                  keepalive: true,
              }).catch((error) => {
                  if (shouldWarnInDevelopment()) {
                      console.warn('ModlyAI analytics event failed:', error);
                  }
              });
          }
          catch (error) {
              if (shouldWarnInDevelopment()) {
                  console.warn('ModlyAI analytics event failed:', error);
              }
          }
      }, 0);
  }

  const TRIAL_EXPIRED_WIDGET_MESSAGE = "This store's ModlyAI trial has ended. Please contact the store owner.";
  const normalizeStringList = (value) => {
      const entries = Array.isArray(value)
          ? value
          : typeof value === 'string'
              ? value.split(/[|,]/)
              : [];
      const normalized = Array.from(new Set(entries.map((entry) => String(entry ?? '').trim()).filter(Boolean)));
      return normalized.length > 0 ? normalized : undefined;
  };
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
      withStoreQuery(url) {
          const parsed = new URL(url, this.getBaseUrl() || 'http://localhost');
          if (this.config.storeId || this.config.widgetId) {
              parsed.searchParams.set('storeId', String(this.config.storeId || this.config.widgetId));
          }
          if (this.config.apiKey) {
              parsed.searchParams.set('apiKey', this.config.apiKey);
          }
          else if (this.config.publicApiKey) {
              parsed.searchParams.set('apiKey', this.config.publicApiKey);
          }
          if (this.config.storeDomain) {
              parsed.searchParams.set('domain', this.config.storeDomain);
          }
          return parsed.toString();
      }
      withStorePayload(payload) {
          return {
              ...payload,
              ...((this.config.storeId || this.config.widgetId) ? { storeId: this.config.storeId || this.config.widgetId } : {}),
              ...(this.config.widgetId ? { widgetId: this.config.widgetId } : {}),
              ...(this.config.apiKey ? { apiKey: this.config.apiKey } : {}),
              ...(this.config.publicApiKey ? { publicApiKey: this.config.publicApiKey } : {}),
              ...(this.config.storeDomain ? { storeDomain: this.config.storeDomain } : {}),
          };
      }
      normalizeCatalogProductForChat(product, index) {
          const title = String(product?.title ?? product?.name ?? '').trim();
          if (!title)
              return null;
          const dimensions = typeof product?.dimensions === 'string'
              ? product.dimensions
              : product?.dimensions
                  ? [
                      product.dimensions.length !== undefined ? `${product.dimensions.length} in L` : null,
                      product.dimensions.width !== undefined ? `${product.dimensions.width} in W` : null,
                      product.dimensions.height !== undefined ? `${product.dimensions.height} in H` : null,
                  ].filter(Boolean).join(' x ')
                  : undefined;
          return {
              id: String(product?.id ?? `catalog-product-${index + 1}`),
              title,
              name: title,
              category: product?.category ? String(product.category) : undefined,
              description: product?.description ? String(product.description) : undefined,
              price: product?.price ?? product?.priceRange?.min,
              sku: product?.sku ? String(product.sku) : undefined,
              dimensions: dimensions || undefined,
              image: product?.image ?? product?.imageUrl ?? product?.images?.[0],
              imageUrl: product?.imageUrl ?? product?.image ?? product?.images?.[0],
              tags: Array.isArray(product?.tags)
                  ? product.tags
                  : Array.isArray(product?.styleTags)
                      ? product.styleTags
                      : undefined,
              source: product?.source ? String(product.source) : undefined,
              length: product?.length ?? product?.dimensions?.length,
              width: product?.width ?? product?.dimensions?.width,
              height: product?.height ?? product?.dimensions?.height,
              colors: normalizeStringList(product?.colors),
              materials: normalizeStringList(product?.materials),
              productUrl: product?.productUrl ? String(product.productUrl) : product?.url ? String(product.url) : undefined,
              url: product?.url ? String(product.url) : product?.productUrl ? String(product.productUrl) : undefined,
              handle: product?.handle ? String(product.handle) : undefined,
              externalId: product?.externalId ? String(product.externalId) : undefined,
              shopifyProductId: product?.shopifyProductId ? String(product.shopifyProductId) : undefined,
              storeId: product?.storeId ? String(product.storeId) : undefined,
              status: product?.status ? String(product.status) : undefined,
              customizationOptions: product?.customizationOptions,
          };
      }
      async getCatalogForChat() {
          try {
              const catalogResponse = await this.getCatalog();
              const source = catalogResponse.catalog?.source ?? catalogResponse.meta?.catalogSource ?? catalogResponse.meta?.source;
              const rawProducts = Array.isArray(catalogResponse.catalog?.products)
                  ? catalogResponse.catalog.products
                  : Array.isArray(catalogResponse.items)
                      ? catalogResponse.items
                      : [];
              const products = rawProducts
                  .map((product, index) => this.normalizeCatalogProductForChat(product, index))
                  .filter(Boolean);
              return {
                  source: products.length > 0 ? 'instantdb' : (source ?? 'none'),
                  products,
              };
          }
          catch (error) {
              console.warn('Failed to load catalog before chat request:', error);
              return {
                  source: 'none',
                  products: [],
              };
          }
      }
      normalizeChatResponse(data) {
          if (data?.message && typeof data.message === 'object') {
              return data;
          }
          const content = typeof data?.reply === 'string' ? data.reply :
              typeof data?.message === 'string' ? data.message :
                  typeof data?.content === 'string' ? data.content :
                      typeof data?.text === 'string' ? data.text :
                          '';
          if (!content.trim()) {
              throw new Error('Chat response did not include a readable assistant message.');
          }
          const message = {
              id: `msg-assistant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              role: 'assistant',
              type: 'text',
              content,
              timestamp: Date.now(),
          };
          return {
              message,
              updatedPreferences: data?.updatedPreferences,
              shouldTriggerAction: data?.shouldTriggerAction,
          };
      }
      createTextChatResponse(content) {
          return {
              message: {
                  id: `msg-assistant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                  role: 'assistant',
                  type: 'text',
                  content,
                  timestamp: Date.now(),
              },
          };
      }
      async readErrorResponse(response) {
          try {
              return await response.json();
          }
          catch (e) {
              return null;
          }
      }
      getFriendlyApiError(response, data, fallback) {
          if (response.status === 402 && data?.error === 'trial_expired') {
              return TRIAL_EXPIRED_WIDGET_MESSAGE;
          }
          if ((response.status === 402 || response.status === 403) && data?.error === 'usage_limit_reached') {
              return data?.message || 'You have reached this store\'s plan limit. Please contact the store owner.';
          }
          return data?.message || data?.error || fallback;
      }
      async analyzeRoom(photos, dimensions, preferences) {
          const endpoint = this.config.apiEndpoints?.roomAnalyze || '/api/rooms/analyze';
          const url = this.withStoreQuery(this.getEndpoint(endpoint));
          const formData = new FormData();
          photos.forEach((photo) => {
              formData.append('photos', photo);
          });
          formData.append('dimensions', JSON.stringify(dimensions));
          if (this.config.apiKey) {
              formData.append('apiKey', this.config.apiKey);
          }
          if (this.config.storeDomain) {
              formData.append('storeDomain', this.config.storeDomain);
          }
          if (preferences) {
              formData.append('preferences', JSON.stringify(preferences));
          }
          const response = await fetch(url, {
              method: 'POST',
              body: formData,
          });
          if (!response.ok) {
              const errorData = await this.readErrorResponse(response);
              const error = new Error(this.getFriendlyApiError(response, errorData, `Failed to analyze room: ${response.statusText}`));
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
              body: JSON.stringify(this.withStorePayload(config)),
          });
          if (!response.ok) {
              const errorData = await this.readErrorResponse(response);
              const error = new Error(this.getFriendlyApiError(response, errorData, `Failed to customize furniture: ${response.statusText}`));
              this.config.onError?.(error);
              throw error;
          }
          const data = await response.json();
          this.config.onFurnitureCustomized?.(data);
          return data;
      }
      async chat(request) {
          const endpoint = this.config.apiEndpoints?.chat || '/api/widget/chat';
          const url = this.withStoreQuery(this.getEndpoint(endpoint));
          const catalog = request.catalog ?? await this.getCatalogForChat();
          const payload = this.withStorePayload({
              ...request,
              history: request.history ?? request.conversationHistory,
              catalog,
          });
          try {
              const response = await fetch(url, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(payload),
              });
              if (!response.ok) {
                  let errorMessage = `Failed to get chat response: ${response.statusText}`;
                  const errorData = await this.readErrorResponse(response);
                  console.warn('ModlyAI chat error response:', errorData);
                  if (response.status === 402 && errorData?.error === 'trial_expired') {
                      return this.createTextChatResponse(TRIAL_EXPIRED_WIDGET_MESSAGE);
                  }
                  errorMessage = this.getFriendlyApiError(response, errorData, errorMessage);
                  const error = new Error(errorMessage);
                  this.config.onError?.(error);
                  throw error;
              }
              const data = await response.json();
              return this.normalizeChatResponse(data);
          }
          catch (error) {
              console.error('Chat request failed:', error);
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
          const url = this.withStoreQuery(this.getEndpoint(endpoint));
          const response = await fetch(url, {
              method: 'GET',
          });
          if (!response.ok) {
              const error = new Error(`Failed to fetch catalog: ${response.statusText}`);
              this.config.onError?.(error);
              throw error;
          }
          const data = await response.json();
          return Array.isArray(data) ? { items: data } : data;
      }
      async submitQuoteRequest(quoteRequest) {
          const endpoint = this.config.apiEndpoints?.quoteRequest || '/api/quotes/request';
          const url = this.getEndpoint(endpoint);
          const payload = {
              ...quoteRequest,
              sessionId: quoteRequest.sessionId || getWidgetSessionId(),
              ...(this.config.quoteEmail ? { quoteEmail: this.config.quoteEmail } : {}),
              ...(this.config.supportEmail ? { supportEmail: this.config.supportEmail } : {}),
          };
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(this.withStorePayload(payload)),
          });
          if (!response.ok) {
              let errorMessage = `Failed to submit quote request: ${response.statusText}`;
              try {
                  const errorData = await response.json();
                  console.warn('ModlyAI quote request error response:', errorData);
                  if (errorData?.reason === 'validation_failed') {
                      errorMessage = errorData.message || 'Please check your contact details and try again.';
                  }
                  else if (errorData?.reason === 'missing_destination') {
                      errorMessage = errorData.message || 'Quote delivery is not configured for this store.';
                  }
                  else if (errorData?.reason === 'instantdb_save_failed') {
                      errorMessage = errorData.message || 'We could not save the quote request. Please try again.';
                  }
                  else if (errorData?.reason === 'email_send_failed') {
                      errorMessage = errorData.message || 'We could not deliver the quote request email. Please try again.';
                  }
                  else if (errorData?.error) {
                      errorMessage = errorData.message || errorData.error;
                  }
              }
              catch (e) {
                  // If the error response is not JSON, keep the status text fallback.
              }
              const error = new Error(errorMessage);
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
              body: JSON.stringify(this.withStorePayload(request)),
          });
          if (!response.ok) {
              const errorData = await this.readErrorResponse(response);
              const error = new Error(this.getFriendlyApiError(response, errorData, `Failed to get recommendations: ${response.statusText}`));
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
              body: JSON.stringify(this.withStorePayload(item)),
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

  const WidgetContext = require$$0$1.createContext(null);
  function WidgetProvider({ children, apiClient, storage, config }) {
      return (jsxRuntimeExports.jsx(WidgetContext.Provider, { value: { apiClient, storage, config }, children: children }));
  }
  function useWidgetContext() {
      const context = require$$0$1.useContext(WidgetContext);
      if (!context) {
          throw new Error('useWidgetContext must be used within WidgetProvider');
      }
      return context;
  }

  const formatCurrency$3 = (value, prefix = '') => typeof value === 'number' && Number.isFinite(value)
      ? `${prefix}$${value.toLocaleString()}`
      : undefined;
  const formatChoiceName = (value) => typeof value === 'string' ? value : value?.name;
  const formatDimension$1 = (value) => typeof value === 'number' && Number.isFinite(value) ? `${value.toFixed(2)} m` : undefined;
  const uniqueByName = (values) => {
      const seen = new Set();
      return values.filter((value) => {
          const key = value.name.trim().toLowerCase();
          if (!key || seen.has(key))
              return false;
          seen.add(key);
          return true;
      });
  };
  function CustomizedFurnitureList({ items, onItemRemoved, onNavigateToCustomizer, onRequestQuote, }) {
      const { storage } = useWidgetContext();
      const [removingId, setRemovingId] = require$$0$1.useState(null);
      const [imageErrors, setImageErrors] = require$$0$1.useState(() => new Set());
      const handleRemove = async (id) => {
          if (!confirm('Are you sure you want to remove this customized furniture item?')) {
              return;
          }
          setRemovingId(id);
          try {
              storage.removeCustomizedFurniture(id);
              onItemRemoved?.();
          }
          catch (error) {
              console.error('Failed to remove item:', error);
          }
          finally {
              setRemovingId(null);
          }
      };
      const handleNavigateToCustomizer = () => {
          if (onNavigateToCustomizer) {
              onNavigateToCustomizer();
              return;
          }
          window.dispatchEvent(new CustomEvent('modly:navigate-to-customizer'));
      };
      if (items.length === 0) {
          return (jsxRuntimeExports.jsxs("div", { className: "text-center py-12 relative", children: [jsxRuntimeExports.jsx("div", { className: "mb-4", children: jsxRuntimeExports.jsx("svg", { className: "w-16 h-16 mx-auto text-text-muted", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" }) }) }), jsxRuntimeExports.jsx("p", { className: "text-lg text-text-primary mb-2", children: "No customized furniture yet" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-text-muted mb-4", children: "Customize furniture in the Customizer to see your creations here" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleNavigateToCustomizer, className: "px-6 py-3 bg-earth-forest text-white rounded-xl font-semibold hover:bg-earth-forest/90 transition-all duration-300 cursor-pointer relative z-10", children: "Go to Customizer" })] }));
      }
      return (jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-950", children: "My Customized Furniture" }), jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-gray-500", children: [items.length, " saved custom design", items.length === 1 ? '' : 's'] })] }), jsxRuntimeExports.jsx("div", { className: ['grid grid-cols-1 gap-5', items.length === 1 ? 'mx-auto max-w-md' : 'sm:grid-cols-2 xl:grid-cols-3'].join(' '), children: items.map((item) => {
                      const imageUrl = item.imageUrl?.trim();
                      const canShowImage = Boolean(imageUrl && !imageErrors.has(item.id));
                      const productName = item.productName || item.name;
                      const category = item.category || item.baseItemType;
                      const selectedColor = formatChoiceName(item.selectedColor) || item.colorScheme.primary;
                      const selectedMaterial = formatChoiceName(item.selectedMaterial) || item.materials.primary;
                      const addOns = uniqueByName(item.selectedAddOns ??
                          item.ornamentDetails?.map((name) => ({ name })) ??
                          []);
                      const shopifyOptions = (item.selectedShopifyOptions ?? []).filter((option) => option.name.trim() && option.value.trim());
                      const dimensionRows = [
                          ['Length', formatDimension$1(item.dimensions.length)],
                          ['Width', formatDimension$1(item.dimensions.width)],
                          ['Height', formatDimension$1(item.dimensions.height)],
                      ].filter((row) => Boolean(row[1]));
                      const basePrice = formatCurrency$3(item.basePrice ?? item.price);
                      const customizationPrice = formatCurrency$3(item.customizationPrice, '+');
                      const estimatedTotal = formatCurrency$3(item.estimatedTotal);
                      return (jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_22px_55px_rgba(15,23,42,0.12)]", children: [jsxRuntimeExports.jsxs("div", { className: "relative p-3 pb-0", children: [jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden rounded-xl border border-gray-100 bg-gray-50", children: canShowImage ? (jsxRuntimeExports.jsx("img", { src: imageUrl, alt: productName, className: "h-full w-full object-cover", onError: () => setImageErrors((prev) => {
                                                  const next = new Set(prev);
                                                  next.add(item.id);
                                                  return next;
                                              }) })) : (jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-50 to-stone-100 text-gray-300", children: jsxRuntimeExports.jsx("svg", { className: "h-12 w-12", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) })) }), jsxRuntimeExports.jsx("span", { className: "absolute right-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-gray-200", children: "Custom" })] }), jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-5", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold leading-tight text-gray-950", children: productName }), jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500", children: [category && jsxRuntimeExports.jsx("span", { className: "capitalize", children: category }), category && jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "/" }), jsxRuntimeExports.jsxs("span", { children: ["Saved ", new Date(item.savedAt).toLocaleDateString()] })] })] }), dimensionRows.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-gray-200 bg-gray-50 p-3", children: [jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-semibold uppercase text-gray-500", children: "Dimensions" }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: dimensionRows.map(([label, value]) => (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-[11px] text-gray-500", children: label }), jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-950", children: value })] }, label))) })] })), (selectedColor || selectedMaterial || addOns.length > 0) && (jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [selectedColor && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-semibold uppercase text-gray-500", children: "Color" }), jsxRuntimeExports.jsx("span", { className: "inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-900", children: selectedColor })] })), selectedMaterial && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-semibold uppercase text-gray-500", children: "Material" }), jsxRuntimeExports.jsx("span", { className: "inline-flex rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-sm font-medium text-stone-900", children: selectedMaterial })] })), addOns.length > 0 && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-semibold uppercase text-gray-500", children: "Add-ons" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: addOns.map((addOn) => (jsxRuntimeExports.jsx("span", { className: "rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-900", children: addOn.name }, addOn.name))) })] }))] })), shopifyOptions.length > 0 && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-semibold uppercase text-gray-500", children: "Options" }), jsxRuntimeExports.jsx("div", { className: "space-y-2 rounded-xl border border-gray-200 p-3", children: shopifyOptions.map((option) => (jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 text-sm", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: option.name }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: option.value })] }, `${option.name}-${option.value}`))) })] })), (basePrice || customizationPrice || estimatedTotal || item.pricingMode === 'quote_required') && (jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm", children: [basePrice && (jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Base price" }), jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-950", children: basePrice })] })), customizationPrice && (jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Customizations" }), jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-950", children: customizationPrice })] })), jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 border-t border-gray-200 pt-2", children: [jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-700", children: "Estimated total" }), jsxRuntimeExports.jsx("span", { className: "font-bold text-gray-950", children: item.pricingMode === 'quote_required' ? 'Quote required' : estimatedTotal ?? 'Quote required' })] })] })), item.customerRequestText?.trim() && (jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-amber-200 bg-amber-50 p-3", children: [jsxRuntimeExports.jsx("p", { className: "mb-1 text-xs font-semibold uppercase text-amber-800", children: "Request" }), jsxRuntimeExports.jsx("p", { className: "line-clamp-3 text-sm text-amber-950", children: item.customerRequestText })] })), jsxRuntimeExports.jsxs("div", { className: "space-y-2 border-t border-gray-100 pt-4", children: [onRequestQuote && (jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onRequestQuote(item), className: "w-full rounded-xl bg-gray-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800", children: "Request Quote" })), jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [item.productUrl && (jsxRuntimeExports.jsx("a", { href: item.productUrl, target: "_blank", rel: "noreferrer", className: "flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50", children: "View in Catalog" })), jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleRemove(item.id), disabled: removingId === item.id, className: "flex-1 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50", children: removingId === item.id ? 'Removing...' : 'Remove' })] })] })] })] }, item.id));
                  }) })] }));
  }

  /**
   * Extracts color palette from the parent website by analyzing computed styles
   * of the body and root elements
   */
  function useWebsiteColors() {
      const [colors, setColors] = require$$0$1.useState({
          primary: '#3D543F', // Default fallback
          secondary: '#8DA38E',
          background: '#FFFFFF',
          text: '#1A1C19',
          accent: '#8DA38E',
          border: '#E5E7EB',
      });
      require$$0$1.useEffect(() => {
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

  const formatCurrency$2 = (value) => typeof value === 'number' && Number.isFinite(value) ? `$${value.toLocaleString()}` : undefined;
  const formatDimension = (value) => typeof value === 'number' && Number.isFinite(value) ? `${value.toFixed(3).replace(/\.?0+$/, '')}m` : undefined;
  const formatFitScore$1 = (value) => {
      if (typeof value !== 'number' || !Number.isFinite(value))
          return undefined;
      return `${Math.round(value <= 1 ? value * 100 : value)}%`;
  };
  const getEstimatedTotalLabel = (displayItem) => {
      if (displayItem.pricingMode === 'quote_required')
          return 'Quote required';
      return (formatCurrency$2(displayItem.estimatedTotal) ||
          formatCurrency$2(displayItem.basePrice) ||
          formatCurrency$2(displayItem.price) ||
          'Quote required');
  };
  const uniqueValues = (values) => Array.from(new Set(values.map((value) => value?.trim()).filter((value) => Boolean(value))));
  function FinalizeQuoteModal({ isOpen, onClose, onProceed, item, recommendation, roomDimensions, roomAnalysis, }) {
      const websiteColors = useWebsiteColors();
      const [inlineError, setInlineError] = require$$0$1.useState(null);
      if (!isOpen)
          return null;
      const displayItem = item || (recommendation ? {
          name: recommendation.item.name,
          category: recommendation.item.category,
          imageUrl: recommendation.item.images?.find((image) => image?.trim()),
          dimensions: recommendation.item.dimensions,
          materials: recommendation.item.materials,
          colorScheme: {
              primary: recommendation.item.colors.main,
              secondary: recommendation.item.colors.accent,
              accent: undefined,
          },
          aiNotes: recommendation.reasoning,
          placement: recommendation.placement,
          price: recommendation.item.priceRange?.min ?? recommendation.item.price,
          estimatedTotal: recommendation.item.priceRange?.min ?? recommendation.item.price,
          pricingMode: (recommendation.item.priceRange?.min ?? recommendation.item.price) ? 'estimated' : 'quote_required',
          matchScore: recommendation.matchScore,
      } : null);
      const fitScore = formatFitScore$1(recommendation?.matchScore);
      const estimatedTotal = displayItem ? getEstimatedTotalLabel(displayItem) : 'Quote required';
      const materialChips = displayItem
          ? uniqueValues([
              displayItem.materials?.primary,
              displayItem.materials?.secondary,
              displayItem.materials?.upholstery,
              displayItem.materials?.legs,
          ])
          : [];
      const roomColorChips = uniqueValues([
          displayItem?.colorScheme?.primary ? `Primary: ${displayItem.colorScheme.primary}` : undefined,
          displayItem?.colorScheme?.secondary ? `Secondary: ${displayItem.colorScheme.secondary}` : undefined,
          displayItem?.colorScheme?.accent ? `Accent: ${displayItem.colorScheme.accent}` : undefined,
          ...(roomAnalysis?.dominantColors?.slice(0, 3).map((color) => `Room: ${color}`) ?? []),
      ]);
      const placementText = recommendation?.placement?.reasoning || recommendation?.placement?.position;
      const hasProduct = Boolean(displayItem);
      const handleProceed = () => {
          if (!hasProduct) {
              setInlineError('Select a product before requesting a quote.');
              return;
          }
          setInlineError(null);
          onProceed();
      };
      return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-gray-950/45 p-4 backdrop-blur-sm", children: jsxRuntimeExports.jsxs("div", { className: "flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-stone-200 bg-[#fffaf4] shadow-[0_28px_80px_rgba(15,23,42,0.22)]", children: [jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 border-b border-stone-200 bg-[#fffaf4]/95 px-6 py-5 backdrop-blur", children: jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-950", children: "Request quote" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm leading-6 text-gray-600", children: "Review this room recommendation before sending it to the store." })] }), jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-gray-500 transition hover:bg-stone-50 hover:text-gray-900", "aria-label": "Close quote review", children: jsxRuntimeExports.jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }) }), jsxRuntimeExports.jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto px-6 py-6", children: [!displayItem ? (jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700", children: "Select a product before requesting a quote." })) : (jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-stone-200 bg-white p-4 shadow-sm", children: jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [jsxRuntimeExports.jsx("div", { className: "h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-stone-100", children: displayItem.imageUrl ? (jsxRuntimeExports.jsx("img", { src: displayItem.imageUrl, alt: displayItem.name, className: "h-full w-full object-cover" })) : (jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-stone-400", children: jsxRuntimeExports.jsx("svg", { className: "h-8 w-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.8, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M4 6h16v12H4z" }) }) })) }), jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase text-gray-500", children: displayItem.category || roomDimensions?.roomType || 'Room recommendation' }), jsxRuntimeExports.jsx("h3", { className: "mt-1 text-xl font-bold leading-tight text-gray-950", children: displayItem.name }), jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [fitScore && (jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700", children: ["Room fit score: ", fitScore] })), jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-900", children: ["Estimated total: ", estimatedTotal] })] })] })] }) }), jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-gray-950", children: "Room fit summary" }), jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-4 text-sm", children: [recommendation?.reasoning && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-900", children: "Why it fits" }), jsxRuntimeExports.jsx("p", { className: "mt-1 leading-6 text-gray-700", children: recommendation.reasoning })] })), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-900", children: "Dimensions" }), jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-3 gap-2", children: [
                                                                  ['Length', formatDimension(displayItem.dimensions.length)],
                                                                  ['Width', formatDimension(displayItem.dimensions.width)],
                                                                  ['Height', formatDimension(displayItem.dimensions.height)],
                                                              ].map(([label, value]) => (jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-stone-50 px-3 py-2", children: [jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: label }), jsxRuntimeExports.jsx("p", { className: "mt-0.5 font-semibold text-gray-950", children: value || 'N/A' })] }, label))) })] }), placementText && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-900", children: "Placement" }), jsxRuntimeExports.jsx("p", { className: "mt-1 leading-6 text-gray-700", children: placementText })] }))] })] }), (materialChips.length > 0 || roomColorChips.length > 0) && (jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-gray-950", children: "Materials and colors" }), materialChips.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase text-gray-500", children: "Materials" }), jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: materialChips.map((material) => (jsxRuntimeExports.jsx("span", { className: "rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-sm font-medium text-gray-800", children: material }, material))) })] })), roomColorChips.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase text-gray-500", children: "Color scheme" }), jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: roomColorChips.map((color) => (jsxRuntimeExports.jsx("span", { className: "rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-950", children: color }, color))) })] }))] })), displayItem.aiNotes && (jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5", children: [jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-indigo-950", children: "AI recommendation note" }), jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-6 text-gray-800", children: displayItem.aiNotes })] }))] })), inlineError && (jsxRuntimeExports.jsx("div", { className: "mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700", children: inlineError }))] }), jsxRuntimeExports.jsxs("div", { className: "sticky bottom-0 flex flex-col-reverse gap-3 border-t border-stone-200 bg-[#fffaf4]/95 px-6 py-4 backdrop-blur sm:flex-row sm:justify-end", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "rounded-xl border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-stone-50", children: "Back" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleProceed, className: "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:brightness-105", style: {
                                  backgroundImage: `linear-gradient(135deg, ${websiteColors.primary}, #7c3aed)`,
                              }, children: "Continue to quote form" })] })] }) }));
  }

  const getCustomizationChoiceName = (value) => typeof value === 'string' ? value : value?.name;
  const formatCurrency$1 = (value) => typeof value === 'number' && Number.isFinite(value) ? `$${value.toLocaleString()}` : undefined;
  const formatChoice = (value) => {
      const name = getCustomizationChoiceName(value);
      if (!name)
          return undefined;
      const price = typeof value === 'object' ? value.price : undefined;
      return price ? `${name} (+${formatCurrency$1(price)})` : name;
  };
  const formatDimensions$1 = (dimensions) => {
      if (!dimensions)
          return undefined;
      const unit = dimensions.unit || 'm';
      const rows = [
          dimensions.length !== undefined ? `Length: ${dimensions.length} ${unit}` : undefined,
          dimensions.width !== undefined ? `Width: ${dimensions.width} ${unit}` : undefined,
          dimensions.height !== undefined ? `Height: ${dimensions.height} ${unit}` : undefined,
      ].filter(Boolean);
      return rows.length > 0 ? rows.join(' / ') : undefined;
  };
  const formatFitScore = (value) => {
      if (typeof value !== 'number' || !Number.isFinite(value))
          return undefined;
      return `${Math.round(value <= 1 ? value * 100 : value)}%`;
  };
  const getFitScoreNumber = (value) => {
      if (typeof value !== 'number' || !Number.isFinite(value))
          return undefined;
      return Math.round(value <= 1 ? value * 100 : value);
  };
  const getRoomTypeLabel = (value) => {
      if (!value)
          return undefined;
      return value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
  };
  const emptyForm = {
      name: '',
      email: '',
      phone: '',
      notes: '',
  };
  function QuoteRequestForm({ isOpen, onClose, onSubmit, item, recommendation, storeId, widgetId, roomDimensions, roomAnalysis, }) {
      const websiteColors = useWebsiteColors();
      const [formData, setFormData] = require$$0$1.useState(emptyForm);
      const [isSubmitting, setIsSubmitting] = require$$0$1.useState(false);
      const [error, setError] = require$$0$1.useState(null);
      const [success, setSuccess] = require$$0$1.useState(null);
      require$$0$1.useEffect(() => {
          if (!isOpen) {
              setFormData(emptyForm);
              setError(null);
              setSuccess(null);
              setIsSubmitting(false);
          }
      }, [isOpen]);
      require$$0$1.useEffect(() => {
          if (!isOpen || !item?.customerRequestText?.trim())
              return;
          setFormData((prev) => (prev.notes.trim() ? prev : { ...prev, notes: item.customerRequestText?.trim() ?? '' }));
      }, [isOpen, item?.customerRequestText, item?.id]);
      if (!isOpen)
          return null;
      const displayItem = item || (recommendation ? {
          productId: recommendation.item.id,
          name: recommendation.item.name,
          category: recommendation.item.category,
          imageUrl: recommendation.item.images?.find((image) => image?.trim()),
          source: recommendation.item.source,
          productUrl: recommendation.item.productUrl || recommendation.item.url,
          price: recommendation.item.priceRange?.min ?? recommendation.item.price,
          basePrice: recommendation.item.priceRange?.min ?? recommendation.item.price,
          estimatedTotal: recommendation.item.priceRange?.min ?? recommendation.item.price,
          pricingMode: (recommendation.item.priceRange?.min ?? recommendation.item.price) ? 'estimated' : 'quote_required',
          externalId: recommendation.item.externalId,
          shopifyProductId: recommendation.item.shopifyProductId,
          storeId: recommendation.item.storeId || storeId,
          widgetId,
          dimensions: recommendation.item.dimensions,
          materials: recommendation.item.materials,
          colorScheme: {
              primary: recommendation.item.colors.main,
              secondary: recommendation.item.colors.accent,
          },
          aiNotes: recommendation.reasoning,
          placement: recommendation.placement,
          fitScore: getFitScoreNumber(recommendation.matchScore),
          roomAnalysis: {
              roomType: roomDimensions?.roomType,
              detectedStyle: roomAnalysis?.detectedStyle,
              dominantColors: roomAnalysis?.dominantColors,
              freeSpaceDescription: roomAnalysis?.freeSpace?.description,
              whyItFits: recommendation.reasoning,
          },
          roomDetails: roomDimensions ?? undefined,
          placementNote: recommendation.placement?.reasoning,
      } : null);
      if (!displayItem)
          return null;
      const isRoomRecommendation = Boolean(recommendation && !item);
      const productName = 'productName' in displayItem && displayItem.productName
          ? displayItem.productName
          : displayItem.name;
      const selectedColor = 'selectedColor' in displayItem
          ? formatChoice(displayItem.selectedColor)
          : displayItem.colorScheme.primary;
      const selectedMaterial = 'selectedMaterial' in displayItem
          ? formatChoice(displayItem.selectedMaterial)
          : displayItem.materials.primary;
      const selectedDimensions = 'selectedDimensions' in displayItem && displayItem.selectedDimensions
          ? formatDimensions$1(displayItem.selectedDimensions)
          : formatDimensions$1(displayItem.dimensions);
      const selectedAddOns = 'selectedAddOns' in displayItem
          ? displayItem.selectedAddOns?.map((addOn) => addOn.price ? `${addOn.name} (+${formatCurrency$1(addOn.price)})` : addOn.name)
          : undefined;
      const selectedShopifyOptions = 'selectedShopifyOptions' in displayItem
          ? displayItem.selectedShopifyOptions?.map((option) => option.price
              ? `${option.name}: ${option.value} (+${formatCurrency$1(option.price)})`
              : `${option.name}: ${option.value}`)
          : undefined;
      const estimatedTotal = 'pricingMode' in displayItem && displayItem.pricingMode === 'quote_required'
          ? 'Quote required'
          : 'estimatedTotal' in displayItem
              ? formatCurrency$1(displayItem.estimatedTotal)
              : formatCurrency$1(displayItem.price);
      const customerRequestText = 'customerRequestText' in displayItem ? displayItem.customerRequestText : undefined;
      const fitScore = isRoomRecommendation ? formatFitScore(recommendation?.matchScore) : undefined;
      const roomTypeLabel = getRoomTypeLabel(roomDimensions?.roomType);
      const whyItFits = isRoomRecommendation ? recommendation?.reasoning : undefined;
      const placementNote = isRoomRecommendation ? recommendation?.placement?.reasoning : undefined;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isNameValid = formData.name.trim().length > 0;
      const isEmailValid = emailRegex.test(formData.email.trim());
      const canSubmit = isNameValid && isEmailValid && !isSubmitting;
      const successWarning = success?.emailWarning ||
          success?.warnings?.[0] ||
          (success?.emailSkipped ? 'Quote saved. Email delivery may not be configured.' : undefined);
      const handleClose = () => {
          setFormData(emptyForm);
          setError(null);
          setSuccess(null);
          setIsSubmitting(false);
          onClose();
      };
      const handleSubmit = async (e) => {
          e.preventDefault();
          if (isSubmitting)
              return;
          setError(null);
          if (!isNameValid) {
              setError('Name is required.');
              return;
          }
          if (!formData.email.trim()) {
              setError('Email is required.');
              return;
          }
          if (!isEmailValid) {
              setError('Please enter a valid email address.');
              return;
          }
          setIsSubmitting(true);
          try {
              const customization = 'selectedColor' in displayItem || 'selectedMaterial' in displayItem
                  ? {
                      selectedColor: 'selectedColor' in displayItem ? displayItem.selectedColor : undefined,
                      selectedMaterial: 'selectedMaterial' in displayItem ? displayItem.selectedMaterial : undefined,
                      selectedShopifyOptions: 'selectedShopifyOptions' in displayItem ? displayItem.selectedShopifyOptions : undefined,
                      selectedDimensions: 'selectedDimensions' in displayItem ? displayItem.selectedDimensions : undefined,
                      dimensionPriceAdjustments: 'dimensionPriceAdjustments' in displayItem ? displayItem.dimensionPriceAdjustments : undefined,
                      selectedAddOns: 'selectedAddOns' in displayItem ? displayItem.selectedAddOns : undefined,
                      customizationPrice: 'customizationPrice' in displayItem ? displayItem.customizationPrice : undefined,
                      estimatedTotal: 'estimatedTotal' in displayItem ? displayItem.estimatedTotal : undefined,
                      pricingMode: 'pricingMode' in displayItem ? displayItem.pricingMode : undefined,
                      customerRequestText: 'customerRequestText' in displayItem ? displayItem.customerRequestText : undefined,
                  }
                  : undefined;
              const quoteRequest = {
                  storeId: displayItem.storeId || storeId,
                  widgetId: ('widgetId' in displayItem ? displayItem.widgetId : undefined) || widgetId,
                  source: isRoomRecommendation ? 'room_analysis_recommendation' : 'customized_furniture',
                  customer: {
                      name: formData.name.trim(),
                      email: formData.email.trim(),
                      phone: formData.phone.trim() || undefined,
                      message: formData.notes.trim() || undefined,
                  },
                  item: {
                      productId: 'productId' in displayItem ? displayItem.productId : undefined,
                      productName,
                      category: 'category' in displayItem ? displayItem.category : undefined,
                      productUrl: displayItem.productUrl,
                      imageUrl: 'imageUrl' in displayItem ? displayItem.imageUrl : undefined,
                      basePrice: 'basePrice' in displayItem ? displayItem.basePrice : displayItem.price,
                      customizationPrice: 'customizationPrice' in displayItem ? displayItem.customizationPrice : undefined,
                      estimatedTotal: 'estimatedTotal' in displayItem ? displayItem.estimatedTotal : displayItem.price,
                      pricingMode: 'pricingMode' in displayItem ? displayItem.pricingMode : undefined,
                      savedAt: 'savedAt' in displayItem ? displayItem.savedAt : undefined,
                      name: productName,
                      dimensions: {
                          length: displayItem.dimensions.length,
                          width: displayItem.dimensions.width,
                          height: displayItem.dimensions.height,
                      },
                      materials: displayItem.materials,
                      colorScheme: displayItem.colorScheme,
                      price: displayItem.price,
                      externalId: displayItem.externalId,
                      shopifyProductId: displayItem.shopifyProductId,
                      storeId: displayItem.storeId,
                      widgetId: 'widgetId' in displayItem ? displayItem.widgetId : undefined,
                      source: displayItem.source,
                      aiNotes: displayItem.aiNotes,
                      selectedColor: 'selectedColor' in displayItem
                          ? displayItem.selectedColor
                          : displayItem.colorScheme.primary,
                      selectedColorPrice: 'selectedColorPrice' in displayItem ? displayItem.selectedColorPrice : undefined,
                      selectedMaterial: 'selectedMaterial' in displayItem
                          ? displayItem.selectedMaterial
                          : displayItem.materials.primary,
                      selectedMaterialPrice: 'selectedMaterialPrice' in displayItem ? displayItem.selectedMaterialPrice : undefined,
                      selectedShopifyOptions: 'selectedShopifyOptions' in displayItem ? displayItem.selectedShopifyOptions : undefined,
                      selectedDimensions: 'selectedDimensions' in displayItem ? displayItem.selectedDimensions : undefined,
                      dimensionPriceAdjustments: 'dimensionPriceAdjustments' in displayItem ? displayItem.dimensionPriceAdjustments : undefined,
                      selectedAddOns: 'selectedAddOns' in displayItem ? displayItem.selectedAddOns : undefined,
                      customerRequestText: 'customerRequestText' in displayItem
                          ? displayItem.customerRequestText
                          : formData.notes.trim() || undefined,
                      placement: 'placement' in displayItem && displayItem.placement ? {
                          wall: displayItem.placement.wall,
                          position: displayItem.placement.position,
                          coordinates: displayItem.placement.coordinates,
                          reasoning: displayItem.placement.reasoning,
                      } : undefined,
                      fitScore: 'fitScore' in displayItem ? displayItem.fitScore : undefined,
                      placementNote: 'placementNote' in displayItem ? displayItem.placementNote : undefined,
                      roomAnalysis: 'roomAnalysis' in displayItem ? displayItem.roomAnalysis : undefined,
                      roomDetails: 'roomDetails' in displayItem ? displayItem.roomDetails : undefined,
                  },
                  customization: isRoomRecommendation ? undefined : customization,
              };
              const result = await onSubmit(quoteRequest);
              setSuccess(result || { success: true });
          }
          catch (err) {
              setError(err instanceof Error ? err.message : 'Failed to submit quote request.');
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
      return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-gray-950/45 p-4 backdrop-blur-sm", children: jsxRuntimeExports.jsxs("div", { className: "flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-stone-200 bg-[#fffaf4] shadow-[0_28px_80px_rgba(15,23,42,0.22)]", children: [jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 border-b border-stone-200 bg-[#fffaf4]/95 px-6 py-5 backdrop-blur", children: jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-950", children: "Request quote" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-600", children: isRoomRecommendation
                                              ? 'Send this room recommendation to the store.'
                                              : 'Send this customized furniture request to the store.' })] }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleClose, className: "flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-gray-500 transition hover:bg-stone-50 hover:text-gray-900", "aria-label": "Close quote request", children: jsxRuntimeExports.jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }) }), success ? (jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto px-6 py-6", children: [jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900", children: [jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm", children: jsxRuntimeExports.jsx("svg", { className: "h-7 w-7", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }), jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-emerald-950", children: "Quote request sent" }), jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-6 text-emerald-800", children: "Quote request sent. The store will follow up with pricing and next steps." })] }), jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm", children: [jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase text-gray-500", children: "Request summary" }), jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-3 text-sm", children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Product" }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: productName })] }), estimatedTotal && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4 border-t border-stone-100 pt-3", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Estimated total" }), jsxRuntimeExports.jsx("span", { className: "text-right font-bold text-gray-950", children: estimatedTotal })] }))] })] }), successWarning && (jsxRuntimeExports.jsx("div", { className: "mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900", children: successWarning })), jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-end", children: jsxRuntimeExports.jsx("button", { type: "button", onClick: handleClose, className: "rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:brightness-105", style: {
                                      backgroundImage: `linear-gradient(135deg, ${websiteColors.primary}, #7c3aed)`,
                                  }, children: "Continue Browsing" }) })] })) : (jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex min-h-0 flex-1 flex-col", children: [jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto px-6 py-6", children: [jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm", children: [jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-start justify-between gap-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase text-gray-500", children: isRoomRecommendation ? 'Room recommendation' : 'Customization summary' }), jsxRuntimeExports.jsx("h3", { className: "mt-1 text-lg font-bold leading-tight text-gray-950", children: productName }), isRoomRecommendation && (jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-semibold text-gray-600", children: "Request quote for room recommendation" }))] }), estimatedTotal && (jsxRuntimeExports.jsx("div", { className: "rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-900", children: estimatedTotal }))] }), jsxRuntimeExports.jsx("div", { className: "space-y-3 text-sm", children: isRoomRecommendation ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [roomTypeLabel && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Room type" }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: roomTypeLabel })] })), fitScore && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Fit score" }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: fitScore })] })), whyItFits && (jsxRuntimeExports.jsxs("div", { className: "border-t border-stone-100 pt-3", children: [jsxRuntimeExports.jsx("span", { className: "block text-gray-500", children: "Why it fits" }), jsxRuntimeExports.jsx("p", { className: "mt-1 leading-6 text-gray-800", children: whyItFits })] })), placementNote && (jsxRuntimeExports.jsxs("div", { className: "border-t border-stone-100 pt-3", children: [jsxRuntimeExports.jsx("span", { className: "block text-gray-500", children: "Placement note" }), jsxRuntimeExports.jsx("p", { className: "mt-1 leading-6 text-gray-800", children: placementNote })] })), estimatedTotal && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4 border-t border-stone-100 pt-3", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Estimated total" }), jsxRuntimeExports.jsx("span", { className: "text-right font-bold text-gray-950", children: estimatedTotal })] }))] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [selectedColor && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Color" }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: selectedColor })] })), selectedMaterial && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Material" }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: selectedMaterial })] })), selectedDimensions && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Dimensions" }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: selectedDimensions })] })), selectedShopifyOptions && selectedShopifyOptions.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Options" }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: selectedShopifyOptions.join(', ') })] })), selectedAddOns && selectedAddOns.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Add-ons" }), jsxRuntimeExports.jsx("span", { className: "text-right font-semibold text-gray-950", children: selectedAddOns.join(', ') })] })), customerRequestText?.trim() && (jsxRuntimeExports.jsxs("div", { className: "border-t border-stone-100 pt-3", children: [jsxRuntimeExports.jsx("span", { className: "block text-gray-500", children: "Customizer request" }), jsxRuntimeExports.jsx("p", { className: "mt-1 rounded-xl bg-amber-50 p-3 text-gray-800", children: customerRequestText })] }))] })) })] }), error && (jsxRuntimeExports.jsx("div", { className: "mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700", children: error })), jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 sm:grid-cols-2", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { htmlFor: "quote-name", className: "block text-sm font-semibold text-gray-800", children: ["Name ", jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })] }), jsxRuntimeExports.jsx("input", { type: "text", id: "quote-name", name: "name", value: formData.name, onChange: handleChange, required: true, className: "mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-gray-950 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100", placeholder: "Your name", disabled: isSubmitting })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { htmlFor: "quote-email", className: "block text-sm font-semibold text-gray-800", children: ["Email ", jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })] }), jsxRuntimeExports.jsx("input", { type: "email", id: "quote-email", name: "email", value: formData.email, onChange: handleChange, required: true, className: "mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-gray-950 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100", placeholder: "you@example.com", disabled: isSubmitting })] })] }), jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [jsxRuntimeExports.jsxs("label", { htmlFor: "quote-phone", className: "block text-sm font-semibold text-gray-800", children: ["Phone ", jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-gray-400", children: "(optional)" })] }), jsxRuntimeExports.jsx("input", { type: "tel", id: "quote-phone", name: "phone", value: formData.phone, onChange: handleChange, className: "mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-gray-950 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100", placeholder: "+1 (555) 123-4567", disabled: isSubmitting })] }), jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [jsxRuntimeExports.jsxs("label", { htmlFor: "quote-notes", className: "block text-sm font-semibold text-gray-800", children: ["Message / notes ", jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-gray-400", children: "(optional)" })] }), jsxRuntimeExports.jsx("textarea", { id: "quote-notes", name: "notes", value: formData.notes, onChange: handleChange, rows: 4, className: "mt-2 w-full resize-none rounded-xl border border-stone-200 bg-white px-4 py-3 text-gray-950 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100", placeholder: "Any special requests or questions...", disabled: isSubmitting })] })] }), jsxRuntimeExports.jsxs("div", { className: "sticky bottom-0 flex flex-col-reverse gap-3 border-t border-stone-200 bg-[#fffaf4]/95 px-6 py-4 backdrop-blur sm:flex-row sm:justify-end", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: handleClose, disabled: isSubmitting, className: "rounded-xl border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50", children: "Cancel" }), jsxRuntimeExports.jsx("button", { type: "submit", disabled: !canSubmit, className: "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50", style: {
                                          backgroundImage: `linear-gradient(135deg, ${websiteColors.primary}, #7c3aed)`,
                                      }, children: isSubmitting ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("svg", { className: "h-5 w-5 animate-spin", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), jsxRuntimeExports.jsx("span", { children: "Submitting..." })] })) : ('Submit Quote Request') })] })] }))] }) }));
  }

  const PLACEHOLDER_HOSTS = new Set([
      'yourstore.com',
      'www.yourstore.com',
      'example.com',
      'www.example.com',
      'example.org',
      'www.example.org',
      'example.net',
      'www.example.net',
      'test.com',
      'www.test.com',
      'demo.com',
      'www.demo.com',
      'placeholder.com',
      'www.placeholder.com',
  ]);
  const LOCAL_HOSTS = new Set([
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      '::1',
  ]);
  function parseProductUrl(url) {
      const trimmed = url.trim();
      if (!trimmed)
          return null;
      try {
          return new URL(trimmed);
      }
      catch {
          try {
              return new URL(`https://${trimmed}`);
          }
          catch {
              return null;
          }
      }
  }
  function isRealProductUrl(url) {
      if (!url)
          return false;
      const parsed = parseProductUrl(url);
      if (!parsed)
          return false;
      if (!['http:', 'https:'].includes(parsed.protocol))
          return false;
      const hostname = parsed.hostname.toLowerCase();
      if (!hostname || LOCAL_HOSTS.has(hostname) || PLACEHOLDER_HOSTS.has(hostname))
          return false;
      if (hostname.endsWith('.yourstore.com'))
          return false;
      if (hostname.endsWith('.example.com') || hostname.endsWith('.example.org') || hostname.endsWith('.example.net')) {
          return false;
      }
      if (hostname.endsWith('.localhost'))
          return false;
      if (hostname.endsWith('.test') || hostname.endsWith('.example') || hostname.endsWith('.invalid'))
          return false;
      const fullUrl = parsed.href.toLowerCase();
      return ![
          'yourstore',
          'example',
          'placeholder',
          'demo-only',
          'fake-store',
          'test-store',
      ].some((marker) => fullUrl.includes(marker));
  }
  function getRealProductUrl(product) {
      const productUrl = product.productUrl?.trim();
      if (isRealProductUrl(productUrl))
          return productUrl;
      const url = product.url?.trim();
      if (isRealProductUrl(url))
          return url;
      return undefined;
  }

  function getProductCatalogUrl$1(item) {
      return getRealProductUrl(item);
  }
  function getProductImageUrl$1(item) {
      return item.images?.find((image) => image?.trim()) ?? undefined;
  }
  function getPriceLabel(item) {
      if (typeof item.price === 'number') {
          return `$${item.price.toLocaleString()}`;
      }
      if (!item.priceRange)
          return 'Price on request';
      const min = item.priceRange.min;
      const max = item.priceRange.max;
      if (max && max !== min) {
          return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
      }
      return `$${min.toLocaleString()}`;
  }
  function getDimensionLabel(item) {
      const { length, width, height } = item.dimensions;
      if (!length || !width || !height)
          return null;
      return `${length}m L x ${width}m W x ${height}m H`;
  }
  function RecommendationsList({ recommendations, onCustomize, onFinalize, enabledActions, primaryColor, analyticsContext }) {
      const actions = enabledActions ?? { viewInCatalog: true, customize: true, requestQuote: true };
      const primaryTextColor = primaryColor ? getReadableTextColor(primaryColor) : undefined;
      if (recommendations.length === 0) {
          return (jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-gray-500", children: jsxRuntimeExports.jsx("p", { className: "text-lg", children: "No recommendations available yet." }) }));
      }
      return (jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-gray-950", children: "Matching catalog products" }), jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-gray-600", children: "Suggestions are based on the uploaded room photo, your preferences, and available catalog data." })] }), jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: recommendations.map((rec, index) => {
                      const catalogUrl = getProductCatalogUrl$1(rec.item);
                      const imageUrl = getProductImageUrl$1(rec.item);
                      const dimensionLabel = getDimensionLabel(rec.item);
                      const priceLabel = getPriceLabel(rec.item);
                      const handleViewInCatalogClick = (event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          if (!catalogUrl || typeof window === 'undefined')
                              return;
                          trackWidgetEvent({
                              ...analyticsContext,
                              type: 'view_in_catalog_clicked',
                              productId: rec.item.id,
                              productName: rec.item.name,
                              metadata: {
                                  source: 'room_planner',
                                  category: rec.item.category,
                                  productUrl: catalogUrl,
                              },
                          });
                          window.open(catalogUrl, '_blank', 'noopener,noreferrer');
                      };
                      return (jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md", children: [jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] bg-stone-100", children: imageUrl ? (jsxRuntimeExports.jsx("img", { src: imageUrl, alt: rec.item.name, className: "h-full w-full object-cover" })) : (jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-stone-100 to-stone-50 text-stone-400", children: jsxRuntimeExports.jsx(Image, { className: "h-10 w-10" }) })) }), jsxRuntimeExports.jsxs("div", { className: "p-5", children: [jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-start justify-between gap-3", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold leading-tight text-gray-950", children: rec.item.name }), jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-gray-500", children: [rec.item.category, " ", rec.item.subCategory && `- ${rec.item.subCategory}`] })] }), rec.matchScore && (jsxRuntimeExports.jsxs("span", { className: "shrink-0 text-sm px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium", children: [Math.round(rec.matchScore * 100), "% match"] }))] }), jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "rounded-full bg-stone-100 px-3 py-1 text-sm font-semibold text-gray-900", children: priceLabel }), dimensionLabel && (jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full border border-stone-200 px-3 py-1 text-xs font-medium text-gray-600", children: [jsxRuntimeExports.jsx(Ruler, { className: "h-3.5 w-3.5" }), dimensionLabel] }))] }), rec.item.styleTags && rec.item.styleTags.length > 0 && (jsxRuntimeExports.jsx("div", { className: "mb-4 flex flex-wrap gap-2", children: rec.item.styleTags.map((tag, i) => (jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium", children: tag }, i))) })), rec.placement && (jsxRuntimeExports.jsxs("div", { className: "mb-4 rounded-xl border border-stone-200 bg-stone-50 p-3", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold mb-2 text-gray-800", children: "Placement notes" }), rec.placement.coordinates && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs text-gray-800", children: [jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Position: " }), "(", rec.placement.coordinates.x.toFixed(2), "m, ", rec.placement.coordinates.y.toFixed(2), "m)", jsxRuntimeExports.jsx("span", { className: "ml-2 text-gray-500", children: "from southwest corner" })] })), rec.placement.distanceFromWalls && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs space-y-1 text-gray-800", children: [jsxRuntimeExports.jsx("div", { className: "font-semibold mb-1", children: "Distance from walls:" }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-1", children: [rec.placement.distanceFromWalls.north !== undefined && (jsxRuntimeExports.jsxs("div", { children: ["North: ", jsxRuntimeExports.jsxs("strong", { children: [rec.placement.distanceFromWalls.north.toFixed(2), "m"] })] })), rec.placement.distanceFromWalls.south !== undefined && (jsxRuntimeExports.jsxs("div", { children: ["South: ", jsxRuntimeExports.jsxs("strong", { children: [rec.placement.distanceFromWalls.south.toFixed(2), "m"] })] })), rec.placement.distanceFromWalls.east !== undefined && (jsxRuntimeExports.jsxs("div", { children: ["East: ", jsxRuntimeExports.jsxs("strong", { children: [rec.placement.distanceFromWalls.east.toFixed(2), "m"] })] })), rec.placement.distanceFromWalls.west !== undefined && (jsxRuntimeExports.jsxs("div", { children: ["West: ", jsxRuntimeExports.jsxs("strong", { children: [rec.placement.distanceFromWalls.west.toFixed(2), "m"] })] }))] })] })), rec.placement.rotation !== undefined && rec.placement.rotation !== 0 && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs text-gray-800", children: [jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Rotation: " }), rec.placement.rotation, " deg"] })), (rec.placement.wall || rec.placement.position) && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs text-gray-800", children: [jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Location: " }), rec.placement.position || (rec.placement.wall ? `Against ${rec.placement.wall} wall` : 'Centered')] })), jsxRuntimeExports.jsx("p", { className: "text-sm mt-2 pt-2 border-t border-gray-200 text-gray-800", children: rec.placement.reasoning })] })), jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-blue-100 bg-blue-50/70 p-3", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold mb-1 text-blue-950", children: "Why it fits" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-800", children: rec.reasoning })] }), jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2 border-t border-stone-200 pt-4", children: [actions.customize && onCustomize && (jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onCustomize(rec.item), className: "w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center gap-2", style: primaryColor ? { borderColor: primaryColor, color: primaryColor } : undefined, children: [jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" }), "Customize this"] })), actions.viewInCatalog && catalogUrl ? (jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleViewInCatalogClick, className: "w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2", children: [jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }), "View in Catalog"] })) : actions.viewInCatalog ? (jsxRuntimeExports.jsx("button", { type: "button", disabled: true, className: "w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 border border-gray-200 bg-gray-50 text-gray-400 flex items-center justify-center gap-2 cursor-not-allowed", children: "Catalog link unavailable" })) : null, actions.requestQuote && onFinalize && (jsxRuntimeExports.jsxs("button", { type: "button", onClick: (event) => {
                                                      event.preventDefault();
                                                      event.stopPropagation();
                                                      onFinalize(rec);
                                                  }, className: "w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 text-white flex items-center justify-center gap-2", style: {
                                                      backgroundColor: primaryColor || '#10B981',
                                                      color: primaryColor ? primaryTextColor : '#ffffff',
                                                  }, children: [jsxRuntimeExports.jsx(MessageSquareQuote, { className: "h-4 w-4" }), "Request Quote"] }))] })] })] }, rec.item.id || index));
                  }) })] }));
  }

  const STORAGE_KEY$1 = 'modly-room-planner-state';
  const FEET_PER_METER = 3.28084;
  const styleOptions = [
      { id: 'modern', label: 'Modern', Icon: Sparkles, tone: 'from-slate-50 to-white' },
      { id: 'scandi', label: 'Scandi', Icon: Lamp, tone: 'from-stone-50 to-white' },
      { id: 'industrial', label: 'Industrial', Icon: Warehouse, tone: 'from-zinc-50 to-white' },
      { id: 'boho', label: 'Boho', Icon: Flower2, tone: 'from-amber-50 to-white' },
  ];
  const roomSizePresets = [
      { id: 'small', label: 'Small', dimensions: { length: 3.2, width: 3, height: 2.4 } },
      { id: 'medium', label: 'Medium', dimensions: { length: 4.6, width: 3.8, height: 2.6 } },
      { id: 'large', label: 'Large', dimensions: { length: 6.2, width: 4.8, height: 2.8 } },
  ];
  const trustItems = [
      'Room size and layout',
      'Preferred style',
      'Budget range',
      'Product dimensions',
      'Catalog availability',
  ];
  async function base64ToFile(base64, filename) {
      const response = await fetch(base64);
      const blob = await response.blob();
      return new File([blob], filename, { type: blob.type });
  }
  function formatDimensionForUnit(valueMeters, unitSystem) {
      if (!valueMeters || valueMeters <= 0)
          return '';
      const value = unitSystem === 'meters' ? valueMeters : valueMeters * FEET_PER_METER;
      return value.toFixed(1).replace(/\.0$/, '');
  }
  function parseDimensionToMeters(value, unitSystem) {
      const numericValue = Number(value);
      if (!numericValue || numericValue <= 0)
          return 0;
      return unitSystem === 'meters' ? numericValue : numericValue / FEET_PER_METER;
  }
  function FurnitureRoomPlannerWidget({ config = {}, onCustomizeItem, onNavigateToCustomizer, }) {
      const mergedConfig = require$$0$1.useMemo(() => mergeConfig(config), [config]);
      const apiClient = require$$0$1.useMemo(() => new ApiClient(mergedConfig), [mergedConfig]);
      const storage = require$$0$1.useMemo(() => new Storage(mergedConfig.storageKey), [mergedConfig.storageKey]);
      const enabledActions = require$$0$1.useMemo(() => getEnabledActions(mergedConfig), [mergedConfig]);
      const analyticsContext = require$$0$1.useMemo(() => ({
          apiBaseUrl: mergedConfig.apiBaseUrl,
          storeId: mergedConfig.storeId || mergedConfig.widgetId,
          widgetId: mergedConfig.widgetId,
      }), [mergedConfig.apiBaseUrl, mergedConfig.storeId, mergedConfig.widgetId]);
      const primaryColor = getPrimaryColor(mergedConfig);
      const [recommendations, setRecommendations] = require$$0$1.useState(null);
      const [isLoading, setIsLoading] = require$$0$1.useState(false);
      const [error, setError] = require$$0$1.useState(null);
      const [shareMessage, setShareMessage] = require$$0$1.useState(null);
      const [resultsScrollRequest, setResultsScrollRequest] = require$$0$1.useState(0);
      const [uploadedPhotos, setUploadedPhotos] = require$$0$1.useState([]);
      const [customizedFurniture, setCustomizedFurniture] = require$$0$1.useState([]);
      const [savedDimensions, setSavedDimensions] = require$$0$1.useState(undefined);
      const [savedPreferences, setSavedPreferences] = require$$0$1.useState(undefined);
      const [roomType, setRoomType] = require$$0$1.useState('living');
      const [unitSystem, setUnitSystem] = require$$0$1.useState('meters');
      const [lengthValue, setLengthValue] = require$$0$1.useState('');
      const [widthValue, setWidthValue] = require$$0$1.useState('');
      const [heightValue, setHeightValue] = require$$0$1.useState('2.4');
      const [colorInput, setColorInput] = require$$0$1.useState('');
      const [budgetMin, setBudgetMin] = require$$0$1.useState('');
      const [budgetMax, setBudgetMax] = require$$0$1.useState('');
      const [selectedStyles, setSelectedStyles] = require$$0$1.useState(['modern']);
      const [showFinalizeModal, setShowFinalizeModal] = require$$0$1.useState(false);
      const [showQuoteForm, setShowQuoteForm] = require$$0$1.useState(false);
      const [quoteSuccess, setQuoteSuccess] = require$$0$1.useState(false);
      const [selectedRecommendation, setSelectedRecommendation] = require$$0$1.useState(null);
      const [selectedCustomizedItem, setSelectedCustomizedItem] = require$$0$1.useState(null);
      const fileInputRef = require$$0$1.useRef(null);
      const resultsRef = require$$0$1.useRef(null);
      const lastScrolledRequestRef = require$$0$1.useRef(0);
      require$$0$1.useEffect(() => {
          trackWidgetEvent({
              ...analyticsContext,
              type: 'room_planner_opened',
          });
      }, [analyticsContext]);
      require$$0$1.useEffect(() => {
          try {
              if (typeof window !== 'undefined') {
                  const saved = sessionStorage.getItem(STORAGE_KEY$1);
                  if (saved) {
                      const state = JSON.parse(saved);
                      if (state.uploadedPhotos?.length) {
                          setUploadedPhotos(state.uploadedPhotos);
                      }
                      if (state.recommendations) {
                          setRecommendations(state.recommendations);
                      }
                      if (state.lastDimensions) {
                          setSavedDimensions(state.lastDimensions);
                          setRoomType(state.lastDimensions.roomType);
                          setLengthValue(formatDimensionForUnit(state.lastDimensions.length, 'meters'));
                          setWidthValue(formatDimensionForUnit(state.lastDimensions.width, 'meters'));
                          setHeightValue(formatDimensionForUnit(state.lastDimensions.height, 'meters'));
                      }
                      if (state.lastPreferences) {
                          setSavedPreferences(state.lastPreferences);
                          setSelectedStyles(state.lastPreferences.style?.length ? state.lastPreferences.style : ['modern']);
                          setColorInput(state.lastPreferences.colors?.join(', ') || '');
                          setBudgetMin(state.lastPreferences.budget?.min ? String(state.lastPreferences.budget.min) : '');
                          setBudgetMax(state.lastPreferences.budget?.max ? String(state.lastPreferences.budget.max) : '');
                      }
                  }
              }
          }
          catch (e) {
              console.warn('Failed to load persisted room planner state:', e);
          }
      }, []);
      require$$0$1.useEffect(() => {
          try {
              if (typeof window !== 'undefined') {
                  const state = {
                      uploadedPhotos,
                      recommendations,
                      lastDimensions: savedDimensions,
                      lastPreferences: savedPreferences,
                  };
                  sessionStorage.setItem(STORAGE_KEY$1, JSON.stringify(state));
              }
          }
          catch (e) {
              console.warn('Failed to save room planner state:', e);
          }
      }, [uploadedPhotos, recommendations, savedDimensions, savedPreferences]);
      require$$0$1.useEffect(() => {
          const items = storage.getCustomizedFurniture();
          setCustomizedFurniture(items);
      }, [storage]);
      require$$0$1.useEffect(() => {
          if (resultsScrollRequest === 0 ||
              lastScrolledRequestRef.current === resultsScrollRequest ||
              !recommendations ||
              isLoading) {
              return;
          }
          const timer = window.setTimeout(() => {
              resultsRef.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
              });
              lastScrolledRequestRef.current = resultsScrollRequest;
          }, 100);
          return () => window.clearTimeout(timer);
      }, [isLoading, recommendations, resultsScrollRequest]);
      const handleItemRemoved = () => {
          const items = storage.getCustomizedFurniture();
          setCustomizedFurniture(items);
      };
      const handleCustomize = (item) => {
          if (!onCustomizeItem) {
              trackWidgetEvent({
                  ...analyticsContext,
                  type: 'customize_clicked',
                  productId: item.id,
                  productName: item.name,
                  metadata: {
                      source: 'room_planner',
                      category: item.category,
                  },
              });
          }
          if (typeof window !== 'undefined') {
              sessionStorage.setItem('modly-customize-item', JSON.stringify(item));
          }
          if (onCustomizeItem) {
              onCustomizeItem(item);
          }
          else if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('modly:customize-item', { detail: item }));
          }
      };
      const handleNavigateToCustomizer = () => {
          if (onNavigateToCustomizer) {
              onNavigateToCustomizer();
          }
          else {
              window.dispatchEvent(new CustomEvent('modly:navigate-to-customizer'));
          }
      };
      const handlePhotosChange = async (photos) => {
          const photoPromises = photos.map((photo) => new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(photo);
          }));
          const base64Photos = await Promise.all(photoPromises);
          setUploadedPhotos(base64Photos);
          setError(null);
          setShareMessage(null);
      };
      const handleUpload = async (photos, dimensions, preferences) => {
          setIsLoading(true);
          setError(null);
          try {
              const data = await apiClient.analyzeRoom(photos, dimensions, preferences);
              setRecommendations(data);
              setSavedDimensions(dimensions);
              setSavedPreferences(preferences);
              setResultsScrollRequest((request) => request + 1);
              trackWidgetEvent({
                  ...analyticsContext,
                  type: 'room_analyzed',
                  metadata: {
                      roomType: dimensions.roomType,
                      budgetMin: preferences?.budget?.min,
                      budgetMax: preferences?.budget?.max,
                      recommendationCount: data.recommendations?.length ?? 0,
                  },
              });
              data.recommendations?.forEach((rec) => {
                  trackWidgetEvent({
                      ...analyticsContext,
                      type: 'product_recommended',
                      productId: rec.item.id,
                      productName: rec.item.name,
                      metadata: {
                          category: rec.item.category,
                          price: rec.item.priceRange?.min ?? rec.item.price,
                          recommendationSource: 'room_planner',
                      },
                  });
              });
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
          if (!enabledActions.requestQuote)
              return;
          setSelectedCustomizedItem(null);
          setSelectedRecommendation(recommendation);
          setShowFinalizeModal(true);
      };
      const handleRequestQuoteForCustomizedItem = (item) => {
          if (!enabledActions.requestQuote)
              return;
          trackWidgetEvent({
              ...analyticsContext,
              type: 'quote_started',
              productId: item.productId,
              productName: item.productName || item.name,
              metadata: {
                  source: 'room_planner_saved_configuration',
                  quoteType: 'customized_furniture',
                  estimatedTotal: item.estimatedTotal,
                  pricingMode: item.pricingMode,
              },
          });
          setSelectedRecommendation(null);
          setSelectedCustomizedItem(item);
          setShowQuoteForm(true);
      };
      const handleProceedToQuote = () => {
          if (!enabledActions.requestQuote)
              return;
          const item = selectedCustomizedItem || selectedRecommendation?.item;
          trackWidgetEvent({
              ...analyticsContext,
              type: 'quote_started',
              productId: selectedCustomizedItem?.productId || selectedRecommendation?.item.id,
              productName: selectedCustomizedItem?.productName || item?.name,
              metadata: {
                  source: selectedRecommendation ? 'room_planner_recommendation' : 'room_planner_saved_configuration',
                  quoteType: selectedRecommendation ? 'room_analysis_recommendation' : 'customized_furniture',
                  estimatedTotal: selectedCustomizedItem?.estimatedTotal ||
                      selectedRecommendation?.item.priceRange?.min ||
                      selectedRecommendation?.item.price,
                  pricingMode: selectedCustomizedItem?.pricingMode,
              },
          });
          setShowFinalizeModal(false);
          setShowQuoteForm(true);
      };
      const handleQuoteSubmit = async (quoteRequest) => {
          try {
              const response = await apiClient.submitQuoteRequest(quoteRequest);
              setQuoteSuccess(true);
              setTimeout(() => {
                  setQuoteSuccess(false);
              }, 5000);
              return response;
          }
          catch (err) {
              throw err;
          }
      };
      const handleExportPdf = () => {
          trackWidgetEvent({
              ...analyticsContext,
              type: 'pdf_exported',
              metadata: {
                  source: 'room_planner',
                  recommendationCount: recommendations?.recommendations?.length ?? 0,
              },
          });
          if (typeof window !== 'undefined')
              window.print();
      };
      const buildShareText = () => {
          const dimText = savedDimensions
              ? `L ${savedDimensions.length.toFixed(1)}m x W ${savedDimensions.width.toFixed(1)}m x H ${savedDimensions.height.toFixed(1)}m`
              : 'Dimensions: (not provided)';
          const items = recommendations?.recommendations?.slice(0, 5).map((r) => r.item.name).join(', ') ||
              'No matches yet';
          return `Room Planner results\n${dimText}\nTop matches: ${items}`;
      };
      const handleShare = async () => {
          try {
              const text = buildShareText();
              const nav = navigator;
              if (typeof nav.share === 'function') {
                  await nav.share({ title: 'Room Planner', text });
                  setShareMessage('Shared successfully.');
                  return;
              }
              await navigator.clipboard.writeText(text);
              setShareMessage('Copied share summary to clipboard.');
          }
          catch (e) {
              console.warn('Share failed:', e);
              setShareMessage('Could not share automatically. Please copy the details manually.');
          }
      };
      const handleFileChange = async (e) => {
          if (!e.target.files)
              return;
          await handlePhotosChange(Array.from(e.target.files));
      };
      const handleDrop = async (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.dataTransfer.files?.length) {
              await handlePhotosChange(Array.from(e.dataTransfer.files));
          }
      };
      const handleUnitToggle = () => {
          const nextUnitSystem = unitSystem === 'meters' ? 'feet' : 'meters';
          const lengthMeters = parseDimensionToMeters(lengthValue, unitSystem);
          const widthMeters = parseDimensionToMeters(widthValue, unitSystem);
          const heightMeters = parseDimensionToMeters(heightValue, unitSystem);
          setUnitSystem(nextUnitSystem);
          setLengthValue(formatDimensionForUnit(lengthMeters, nextUnitSystem));
          setWidthValue(formatDimensionForUnit(widthMeters, nextUnitSystem));
          setHeightValue(formatDimensionForUnit(heightMeters, nextUnitSystem));
      };
      const applyRoomPreset = (preset) => {
          setLengthValue(formatDimensionForUnit(preset.dimensions.length, unitSystem));
          setWidthValue(formatDimensionForUnit(preset.dimensions.width, unitSystem));
          setHeightValue(formatDimensionForUnit(preset.dimensions.height, unitSystem));
      };
      const toggleStyle = (style) => {
          setSelectedStyles((currentStyles) => currentStyles.includes(style)
              ? currentStyles.filter((currentStyle) => currentStyle !== style)
              : [...currentStyles, style]);
      };
      const handleAnalyze = async () => {
          setError(null);
          setShareMessage(null);
          if (uploadedPhotos.length === 0) {
              setError('Please upload at least one room photo.');
              return;
          }
          const dimensions = {
              roomType,
              length: parseDimensionToMeters(lengthValue, unitSystem),
              width: parseDimensionToMeters(widthValue, unitSystem),
              height: parseDimensionToMeters(heightValue, unitSystem),
          };
          if (dimensions.length <= 0 || dimensions.width <= 0 || dimensions.height <= 0) {
              setError('Please provide valid room dimensions.');
              return;
          }
          const preferences = {
              style: selectedStyles,
              colors: colorInput
                  .split(',')
                  .map((value) => value.trim())
                  .filter(Boolean),
              budget: {
                  min: budgetMin ? Number(budgetMin) : undefined,
                  max: budgetMax ? Number(budgetMax) : undefined,
              },
          };
          setSavedDimensions(dimensions);
          setSavedPreferences(preferences);
          const files = await Promise.all(uploadedPhotos.map((photo, index) => base64ToFile(photo, `room-photo-${index + 1}.png`)));
          await handleUpload(files, dimensions, preferences);
      };
      return (jsxRuntimeExports.jsxs(WidgetProvider, { apiClient: apiClient, storage: storage, config: mergedConfig, children: [jsxRuntimeExports.jsxs("div", { className: "furniture-widget-room-planner min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)]", children: [jsxRuntimeExports.jsx("style", { children: `
          @media print {
            .no-print { display: none !important; }
            .print-only { display: block !important; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        ` }), jsxRuntimeExports.jsx("section", { className: "py-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4", children: jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4", children: [jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "AI-Powered Room Analysis" })] }), jsxRuntimeExports.jsx("h1", { className: "text-5xl font-bold mb-4", children: "Room Planner" }), jsxRuntimeExports.jsx("p", { className: "text-xl text-blue-100 mb-8", children: "Upload a photo of your room and get catalog-based furniture and customization suggestions based on your space and style." }), jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Room photo upload" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Catalog-based product suggestions" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Style-aware recommendations" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Placement guidance" })] })] })] }) }) }), jsxRuntimeExports.jsx("section", { className: "py-12 bg-gray-50", children: jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [jsxRuntimeExports.jsxs("div", { className: "rounded-[28px] border border-gray-200 bg-white p-5 shadow-xl md:p-6", children: [recommendations && (jsxRuntimeExports.jsx("div", { className: "mb-4 flex justify-end", children: jsxRuntimeExports.jsx("div", { className: "inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700", children: "Suggested analysis" }) })), jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", multiple: true, onChange: handleFileChange, className: "hidden" }), jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-5 lg:grid-cols-2", children: [jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-stone-200 bg-[#fffdf9] p-5 shadow-sm", children: [jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between gap-3", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-950", children: "Upload a room photo" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm leading-6 text-gray-600", children: "ModlyAI compares your room, style, and budget with products in this store's catalog." })] }), uploadedPhotos.length > 0 && (jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setUploadedPhotos([]), className: "shrink-0 rounded-full border border-stone-200 px-3 py-1 text-sm font-medium text-gray-500 transition hover:border-stone-300 hover:text-gray-900", children: "Remove" }))] }), jsxRuntimeExports.jsx("div", { role: "button", tabIndex: 0, onClick: () => fileInputRef.current?.click(), onKeyDown: (e) => {
                                                                  if (e.key === 'Enter' || e.key === ' ')
                                                                      fileInputRef.current?.click();
                                                              }, onDragOver: (e) => {
                                                                  e.preventDefault();
                                                                  e.stopPropagation();
                                                              }, onDrop: handleDrop, className: "mt-5 flex aspect-video w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-stone-300 bg-white px-6 text-center outline-none transition-colors hover:border-blue-500 hover:bg-blue-50/40 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2", children: jsxRuntimeExports.jsxs("div", { className: "flex max-w-sm flex-col items-center gap-4", children: [jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 shadow-inner", children: jsxRuntimeExports.jsx(Upload, { className: "h-8 w-8 text-blue-600" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-gray-900", children: uploadedPhotos.length > 0
                                                                                      ? `${uploadedPhotos.length} photo${uploadedPhotos.length > 1 ? 's' : ''} ready`
                                                                                      : 'Drag your photo here' }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500", children: "JPG or PNG. For best results, use a clear photo with good lighting." })] }), jsxRuntimeExports.jsx("button", { type: "button", onClick: (e) => {
                                                                              e.stopPropagation();
                                                                              fileInputRef.current?.click();
                                                                          }, className: "rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700", style: { backgroundColor: primaryColor }, children: "Choose Room Photo" })] }) }), jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-gray-500", children: "Use room details and catalog data to improve recommendations." })] }), jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm", children: [jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between gap-3", children: [jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-950", children: "Room preview" }), jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500", children: uploadedPhotos[0] ? 'Photo loaded' : 'Awaiting upload' })] }), jsxRuntimeExports.jsx("div", { className: "flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-stone-50", children: uploadedPhotos[0] ? (jsxRuntimeExports.jsx("img", { src: uploadedPhotos[0], alt: "Uploaded room preview", className: "aspect-video w-full rounded-xl object-cover" })) : (jsxRuntimeExports.jsxs("div", { className: "px-6 text-center text-gray-500", children: [jsxRuntimeExports.jsx("div", { className: "mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm", children: jsxRuntimeExports.jsx(Camera, { className: "h-7 w-7 text-blue-500" }) }), jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-800", children: "Your uploaded room photo will appear here." }), jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs leading-5 text-gray-500", children: "Tip: Take the photo from a corner or doorway to capture more of the room." })] })) })] })] }), jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12", children: [jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:col-span-4", children: [jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-start gap-3", children: [jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600", children: jsxRuntimeExports.jsx(Ruler, { className: "h-5 w-5" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-950", children: "Room Details" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Optional, but improves fit recommendations." })] })] }), jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Room Type" }), jsxRuntimeExports.jsxs("select", { value: roomType, onChange: (e) => setRoomType(e.target.value), className: "w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500", children: [jsxRuntimeExports.jsx("option", { value: "living", children: "Living Room" }), jsxRuntimeExports.jsx("option", { value: "bedroom", children: "Bedroom" }), jsxRuntimeExports.jsx("option", { value: "dining", children: "Dining Room" }), jsxRuntimeExports.jsx("option", { value: "office", children: "Office" }), jsxRuntimeExports.jsx("option", { value: "kitchen", children: "Kitchen" }), jsxRuntimeExports.jsx("option", { value: "other", children: "Other" })] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between gap-3", children: [jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-gray-700", children: "Room Dimensions" }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-medium text-gray-600", children: [jsxRuntimeExports.jsx("span", { children: "Meters" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleUnitToggle, className: `relative inline-flex h-6 w-11 items-center rounded-full transition ${unitSystem === 'feet' ? 'bg-blue-600' : 'bg-stone-200'}`, "aria-label": "Toggle meters or feet", children: jsxRuntimeExports.jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white transition ${unitSystem === 'feet' ? 'translate-x-6' : 'translate-x-1'}` }) }), jsxRuntimeExports.jsx("span", { children: "Feet" })] })] }), jsxRuntimeExports.jsx("div", { className: "mb-3 grid grid-cols-3 gap-2", children: roomSizePresets.map((preset) => (jsxRuntimeExports.jsx("button", { type: "button", onClick: () => applyRoomPreset(preset), className: "rounded-full border border-stone-300 bg-stone-50 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800", children: preset.label }, preset.id))) }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Length" }), jsxRuntimeExports.jsx("input", { type: "number", placeholder: unitSystem === 'meters' ? '4.6' : '15.1', value: lengthValue, onChange: (e) => setLengthValue(e.target.value), className: "w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Width" }), jsxRuntimeExports.jsx("input", { type: "number", placeholder: unitSystem === 'meters' ? '3.8' : '12.5', value: widthValue, onChange: (e) => setWidthValue(e.target.value), className: "w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" })] })] }), jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Ceiling Height" }), jsxRuntimeExports.jsx("input", { type: "number", placeholder: unitSystem === 'meters' ? '2.6' : '8.5', value: heightValue, onChange: (e) => setHeightValue(e.target.value), className: "w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" })] })] })] })] }), jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:col-span-4", children: [jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-start gap-3", children: [jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700", children: jsxRuntimeExports.jsx(Sofa, { className: "h-5 w-5" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-950", children: "Preferences" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Guide matches toward the showroom look you want." })] })] }), jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-3", children: "Preferred Styles" }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: styleOptions.map((styleOption) => {
                                                                                  const isSelected = selectedStyles.includes(styleOption.id);
                                                                                  const StyleIcon = styleOption.Icon;
                                                                                  return (jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => toggleStyle(styleOption.id), className: [
                                                                                          `rounded-xl border bg-gradient-to-br ${styleOption.tone} p-3 text-left transition`,
                                                                                          isSelected
                                                                                              ? 'border-blue-500 shadow-sm ring-2 ring-blue-100'
                                                                                              : 'border-stone-200 hover:border-stone-300 hover:shadow-sm',
                                                                                      ].join(' '), children: [jsxRuntimeExports.jsx("span", { className: [
                                                                                                  'mb-3 flex h-10 w-10 items-center justify-center rounded-lg border',
                                                                                                  isSelected
                                                                                                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                                                                                                      : 'border-stone-200 bg-white text-gray-600',
                                                                                              ].join(' '), children: jsxRuntimeExports.jsx(StyleIcon, { className: "h-5 w-5" }) }), jsxRuntimeExports.jsx("span", { className: [
                                                                                                  'block text-sm font-semibold',
                                                                                                  isSelected ? 'text-blue-950' : 'text-gray-800',
                                                                                              ].join(' '), children: styleOption.label })] }, styleOption.id));
                                                                              }) })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Preferred Colors" }), jsxRuntimeExports.jsx("input", { type: "text", value: colorInput, onChange: (e) => setColorInput(e.target.value), placeholder: "e.g., Beige, Forest Green, Terracotta", className: "w-full rounded-lg border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Comma-separated" })] })] })] }), jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:col-span-4", children: [jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-start gap-3", children: [jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700", children: jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-950", children: "Budget & Actions" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Recommendations stay grounded in your imported catalog." })] })] }), jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Budget Min ($)" }), jsxRuntimeExports.jsx("input", { type: "number", value: budgetMin, onChange: (e) => setBudgetMin(e.target.value), placeholder: "500", className: "w-full rounded-lg border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Budget Max ($)" }), jsxRuntimeExports.jsx("input", { type: "number", value: budgetMax, onChange: (e) => setBudgetMax(e.target.value), placeholder: "2000", className: "w-full rounded-lg border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" })] })] }), jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-blue-100 bg-blue-50/80 px-4 py-4 text-sm text-blue-950", children: [jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "What ModlyAI checks" }), jsxRuntimeExports.jsx("div", { className: "mt-3 grid gap-2", children: trustItems.map((item) => (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-blue-900", children: [jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 shrink-0 text-blue-600" }), jsxRuntimeExports.jsx("span", { children: item })] }, item))) })] }), jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-1", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: handleAnalyze, disabled: isLoading, className: "flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50", style: { backgroundColor: primaryColor }, children: isLoading ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("span", { className: "h-5 w-5 rounded-full border-2 border-white/50 border-t-white animate-spin" }), "Finding matches..."] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5" }), "Find matching catalog products"] })) }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: handleExportPdf, className: "min-h-11 rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-stone-50", children: "Export PDF" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleShare, className: "min-h-11 rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-stone-50", children: "Share" })] })] })] })] })] }), shareMessage && (jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900", children: shareMessage })), error && (jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700", children: [jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Error" }), jsxRuntimeExports.jsx("p", { className: "text-sm", children: error })] })), jsxRuntimeExports.jsxs("div", { className: "print-only hidden mt-6 text-left", children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-900", children: "Room Planner Share Summary" }), jsxRuntimeExports.jsx("pre", { className: "mt-2 whitespace-pre-wrap text-sm text-gray-700", children: buildShareText() })] })] }), jsxRuntimeExports.jsx("div", { className: "mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200", children: jsxRuntimeExports.jsx(CustomizedFurnitureList, { items: customizedFurniture, onItemRemoved: handleItemRemoved, onNavigateToCustomizer: handleNavigateToCustomizer, onRequestQuote: enabledActions.requestQuote ? handleRequestQuoteForCustomizedItem : undefined }) }), recommendations && (jsxRuntimeExports.jsxs("div", { ref: resultsRef, className: "mt-8 scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all md:p-8", children: [recommendations.roomAnalysis && (jsxRuntimeExports.jsxs("div", { className: "mb-8 rounded-xl border border-blue-100 bg-blue-50/80 p-6", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold text-gray-950", children: "Room analysis" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-blue-900/70", children: "Use room details and catalog data to improve recommendations." })] }), jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full", children: "Success" })] }), jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Observed style cues" }), jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-gray-900", children: recommendations.roomAnalysis.detectedStyle })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Color cues" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-1", children: recommendations.roomAnalysis.dominantColors.map((color, i) => (jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white border border-blue-200 rounded-full text-sm text-gray-900", children: color }, i))) })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Layout notes" }), jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-gray-900", children: recommendations.roomAnalysis.freeSpace.description })] })] })] })), jsxRuntimeExports.jsx(RecommendationsList, { recommendations: recommendations.recommendations, onCustomize: enabledActions.customize ? handleCustomize : undefined, onFinalize: enabledActions.requestQuote ? handleFinalizeRecommendation : undefined, enabledActions: enabledActions, primaryColor: primaryColor, analyticsContext: analyticsContext }), enabledActions.requestQuote && recommendations.recommendations && recommendations.recommendations.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mt-8 pt-6 border-t border-gray-200 text-center", children: [jsxRuntimeExports.jsx("p", { className: "text-gray-700 mb-4 font-medium", children: "Ready to convert this into a quote?" }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3", children: recommendations.recommendations.slice(0, 3).map((rec, idx) => (jsxRuntimeExports.jsxs("button", { type: "button", onClick: (event) => {
                                                              event.preventDefault();
                                                              event.stopPropagation();
                                                              handleFinalizeRecommendation(rec);
                                                          }, className: "w-full px-4 py-3 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2", style: { backgroundColor: primaryColor }, children: [jsxRuntimeExports.jsxs("span", { className: "text-center leading-snug", children: ["Request Quote for ", rec.item.name] }), jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5 flex-shrink-0" })] }, rec.item.id || idx))) })] }))] }))] }) })] }), jsxRuntimeExports.jsx(FinalizeQuoteModal, { isOpen: enabledActions.requestQuote && showFinalizeModal, onClose: () => {
                      setShowFinalizeModal(false);
                      setSelectedRecommendation(null);
                      setSelectedCustomizedItem(null);
                  }, onProceed: handleProceedToQuote, item: selectedCustomizedItem, recommendation: selectedRecommendation, roomDimensions: savedDimensions, roomAnalysis: recommendations?.roomAnalysis }), jsxRuntimeExports.jsx(QuoteRequestForm, { isOpen: enabledActions.requestQuote && showQuoteForm, onClose: () => {
                      setShowQuoteForm(false);
                      setSelectedRecommendation(null);
                      setSelectedCustomizedItem(null);
                  }, item: selectedCustomizedItem, onSubmit: handleQuoteSubmit, recommendation: selectedRecommendation, storeId: mergedConfig.storeId, widgetId: mergedConfig.widgetId, roomDimensions: savedDimensions, roomAnalysis: recommendations?.roomAnalysis }), quoteSuccess && (jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50", children: [jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6" }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Quote Request Submitted!" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-white/90", children: "Quote request sent. The store will follow up with pricing and next steps." })] })] }))] }));
  }

  const PAGE_WIDTH = 612;
  const PAGE_HEIGHT = 792;
  const MARGIN = 42;
  const FOOTER_TOP = 58;
  const CONTENT_BOTTOM = 86;
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
  const BLUE = [38 / 255, 99 / 255, 235 / 255];
  const PURPLE = [124 / 255, 58 / 255, 237 / 255];
  const DARK = [17 / 255, 24 / 255, 39 / 255];
  const MUTED = [107 / 255, 114 / 255, 128 / 255];
  const BORDER = [229 / 255, 231 / 255, 235 / 255];
  const SOFT = [249 / 255, 250 / 255, 251 / 255];
  const formatCurrency = (value) => typeof value === 'number' && Number.isFinite(value)
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
      }).format(value)
      : undefined;
  const formatPriceModifier = (value) => {
      if (typeof value !== 'number' || !Number.isFinite(value))
          return undefined;
      const formatted = formatCurrency(Math.abs(value));
      if (!formatted)
          return undefined;
      return value < 0 ? `-${formatted}` : `+${formatted}`;
  };
  const formatDimensions = (dimensions) => {
      if (!dimensions)
          return [];
      const unit = dimensions.unit || 'in';
      return [
          dimensions.length !== undefined ? { label: 'Length', value: `${dimensions.length} ${unit}` } : undefined,
          dimensions.width !== undefined ? { label: 'Width', value: `${dimensions.width} ${unit}` } : undefined,
          dimensions.height !== undefined ? { label: 'Height', value: `${dimensions.height} ${unit}` } : undefined,
      ].filter((row) => Boolean(row));
  };
  const formatDimensionPricing = (adjustments) => {
      if (!adjustments)
          return [];
      return [
          ['Width adjustment', adjustments.width],
          ['Length adjustment', adjustments.length],
          ['Height adjustment', adjustments.height],
      ]
          .map(([label, amount]) => {
          const value = formatPriceModifier(amount);
          return value && amount !== 0 ? { label, value } : undefined;
      })
          .filter((row) => Boolean(row));
  };
  const calculateCustomizationTotal = (lineItems) => lineItems.reduce((sum, lineItem) => sum + (Number.isFinite(lineItem.amount) ? lineItem.amount : 0), 0);
  const sanitizePdfText = (value) => String(value ?? '')
      .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  const escapePdfText = (value) => sanitizePdfText(value)
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');
  const rgb = ([r, g, b]) => `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)}`;
  const drawRect = (x, y, width, height, fill, stroke) => {
      if (fill && stroke)
          return `q ${rgb(fill)} rg ${rgb(stroke)} RG ${x} ${y} ${width} ${height} re B Q`;
      if (fill)
          return `q ${rgb(fill)} rg ${x} ${y} ${width} ${height} re f Q`;
      if (stroke)
          return `q ${rgb(stroke)} RG ${x} ${y} ${width} ${height} re S Q`;
      return '';
  };
  const drawLine = (x1, y1, x2, y2, color) => `q ${rgb(color)} RG 0.8 w ${x1} ${y1} m ${x2} ${y2} l S Q`;
  const textWidth = (text, size) => sanitizePdfText(text).length * size * 0.52;
  const wrapText = (text, width, size) => {
      const words = sanitizePdfText(text).split(' ').filter(Boolean);
      const lines = [];
      let current = '';
      words.forEach((word) => {
          const next = current ? `${current} ${word}` : word;
          if (textWidth(next, size) <= width) {
              current = next;
              return;
          }
          if (current)
              lines.push(current);
          current = word;
      });
      if (current)
          lines.push(current);
      return lines.length > 0 ? lines : [''];
  };
  class PdfLayout {
      constructor(footerMeta) {
          this.footerMeta = footerMeta;
          this.pages = [[]];
          this.y = PAGE_HEIGHT - MARGIN;
      }
      get page() {
          return this.pages[this.pages.length - 1];
      }
      add(command) {
          if (command)
              this.page.push(command);
      }
      addPage() {
          this.pages.push([]);
          this.y = PAGE_HEIGHT - 86;
          this.addText('Customized Furniture Quote', MARGIN, PAGE_HEIGHT - 48, 14, 'F2', DARK);
          this.add(drawLine(MARGIN, PAGE_HEIGHT - 62, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 62, BORDER));
      }
      ensureSpace(height) {
          if (this.y - height < CONTENT_BOTTOM) {
              this.addPage();
          }
      }
      addText(text, x, y, size = 10, font = 'F1', color = DARK) {
          this.add(`BT /${font} ${size} Tf ${rgb(color)} rg ${x} ${y} Td (${escapePdfText(text)}) Tj ET`);
      }
      addRightText(text, rightX, y, size = 10, font = 'F1', color = DARK) {
          this.addText(text, rightX - textWidth(text, size), y, size, font, color);
      }
      addWrappedText(text, x, y, width, size = 10, font = 'F1', color = DARK) {
          const lines = wrapText(text, width, size);
          lines.forEach((line, index) => this.addText(line, x, y - index * (size + 4), size, font, color));
          return y - lines.length * (size + 4);
      }
      drawHeader(brandName, generatedAt, referenceId) {
          this.add(drawRect(0, PAGE_HEIGHT - 82, PAGE_WIDTH, 82, [0.98, 0.98, 1]));
          this.add(drawRect(0, PAGE_HEIGHT - 82, 8, 82, BLUE));
          this.add(drawRect(8, PAGE_HEIGHT - 82, 4, 82, PURPLE));
          this.addText(brandName || 'ModlyAI', MARGIN, PAGE_HEIGHT - 42, 18, 'F2', DARK);
          this.addText('Generated by ModlyAI', MARGIN, PAGE_HEIGHT - 60, 9, 'F1', MUTED);
          this.addRightText('Customized Furniture Quote', PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 42, 16, 'F2', DARK);
          this.addRightText(`Generated: ${generatedAt.toLocaleString()}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 60, 9, 'F1', MUTED);
          if (referenceId) {
              this.addRightText(`Reference: ${referenceId}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 74, 8, 'F1', MUTED);
          }
          this.add(drawLine(MARGIN, PAGE_HEIGHT - 92, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 92, BORDER));
          this.y = PAGE_HEIGHT - 118;
      }
      drawCard(title, height, drawContent) {
          this.ensureSpace(height + 14);
          const top = this.y;
          this.add(drawRect(MARGIN, top - height, CONTENT_WIDTH, height, [1, 1, 1], BORDER));
          this.addText(title, MARGIN + 16, top - 24, 12, 'F2', DARK);
          this.add(drawLine(MARGIN + 16, top - 34, PAGE_WIDTH - MARGIN - 16, top - 34, BORDER));
          drawContent(top - 52);
          this.y = top - height - 14;
      }
      drawRows(rows, x, y, labelWidth = 122, valueWidth = 310) {
          let cursor = y;
          rows.forEach((row) => {
              this.addText(row.label, x, cursor, 9, 'F1', MUTED);
              cursor = this.addWrappedText(row.value, x + labelWidth, cursor, valueWidth, 9, 'F1', DARK) - 4;
          });
          return cursor;
      }
      drawFooter() {
          this.pages.forEach((page) => {
              page.push(drawLine(MARGIN, FOOTER_TOP, PAGE_WIDTH - MARGIN, FOOTER_TOP, BORDER));
              page.push(`BT /F2 8 Tf ${rgb(MUTED)} rg ${MARGIN} ${FOOTER_TOP - 16} Td (Generated by ModlyAI) Tj ET`);
              page.push(`BT /F1 8 Tf ${rgb(MUTED)} rg ${MARGIN} ${FOOTER_TOP - 29} Td (Final pricing, availability, and delivery are subject to merchant confirmation.) Tj ET`);
              if (this.footerMeta) {
                  page.push(`BT /F1 7 Tf ${rgb(MUTED)} rg ${MARGIN} ${FOOTER_TOP - 42} Td (${escapePdfText(this.footerMeta)}) Tj ET`);
              }
          });
      }
      toBlob() {
          this.drawFooter();
          const pageObjects = [];
          const contentObjects = [];
          const firstPageObject = 3;
          const firstContentObject = firstPageObject + this.pages.length;
          this.pages.forEach((commands, index) => {
              const pageObjectId = firstPageObject + index;
              const contentObjectId = firstContentObject + index;
              pageObjects.push(`${pageObjectId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${firstContentObject + this.pages.length} 0 R /F2 ${firstContentObject + this.pages.length + 1} 0 R >> >> /Contents ${contentObjectId} 0 R >>\nendobj\n`);
              const content = `${commands.join('\n')}\n`;
              contentObjects.push(`${contentObjectId} 0 obj\n<< /Length ${content.length} >>\nstream\n${content}endstream\nendobj\n`);
          });
          const fontStart = firstContentObject + this.pages.length;
          const objects = [
              `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`,
              `2 0 obj\n<< /Type /Pages /Kids [${this.pages.map((_, index) => `${firstPageObject + index} 0 R`).join(' ')}] /Count ${this.pages.length} >>\nendobj\n`,
              ...pageObjects,
              ...contentObjects,
              `${fontStart} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`,
              `${fontStart + 1} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n`,
          ];
          let pdf = '%PDF-1.4\n';
          const offsets = [0];
          objects.forEach((object) => {
              offsets.push(pdf.length);
              pdf += object;
          });
          const xrefOffset = pdf.length;
          pdf += `xref\n0 ${objects.length + 1}\n`;
          pdf += '0000000000 65535 f \n';
          offsets.slice(1).forEach((offset) => {
              pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
          });
          pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
          return new Blob([pdf], { type: 'application/pdf' });
      }
  }
  const choiceValue = (choice) => {
      const price = formatPriceModifier(choice.price);
      return price ? `${choice.value} (${price})` : choice.value;
  };
  const estimateRowsHeight = (rows, width = 310, size = 9) => rows.reduce((total, row) => total + wrapText(row.value, width, size).length * (size + 4) + 4, 0);
  function generateCustomizationPdf(input) {
      const technicalMeta = [input.storeId ? `Store: ${input.storeId}` : '', input.widgetId ? `Widget: ${input.widgetId}` : '']
          .filter(Boolean)
          .join(' / ');
      const pdf = new PdfLayout(technicalMeta || undefined);
      const referenceId = input.referenceId ?? `MOD-${input.generatedAt.getTime().toString(36).toUpperCase()}`;
      const basePrice = formatCurrency(input.product.basePrice ?? input.pricing.basePrice);
      const estimatedTotal = input.pricing.quoteRequired
          ? 'Quote required'
          : formatCurrency(input.product.estimatedTotal ?? input.pricing.estimatedTotal);
      const productRows = [
          { label: 'Product', value: input.product.name },
          input.product.category ? { label: 'Category', value: input.product.category } : undefined,
          input.product.productUrl ? { label: 'Product URL', value: input.product.productUrl } : undefined,
          basePrice ? { label: 'Base price', value: basePrice } : undefined,
          { label: 'Pricing mode', value: input.product.pricingMode === 'quote_required' ? 'Quote required' : 'Estimated' },
          estimatedTotal ? { label: 'Estimated total', value: estimatedTotal } : undefined,
      ].filter((row) => Boolean(row));
      const dimensionRows = formatDimensions(input.selectedCustomizations.dimensions);
      const dimensionPricingRows = formatDimensionPricing(input.selectedCustomizations.dimensionPriceAdjustments);
      const selectedRows = [
          input.selectedCustomizations.color
              ? { label: 'Color', value: choiceValue(input.selectedCustomizations.color) }
              : undefined,
          input.selectedCustomizations.material
              ? { label: 'Material', value: choiceValue(input.selectedCustomizations.material) }
              : undefined,
          ...(input.selectedCustomizations.shopifyOptions ?? []).map((option) => ({
              label: option.label,
              value: choiceValue(option),
          })),
          ...dimensionRows,
          ...dimensionPricingRows,
          ...(input.selectedCustomizations.addOns ?? []).map((addOn) => ({
              label: 'Add-on',
              value: choiceValue(addOn),
          })),
      ].filter((row) => Boolean(row));
      const pricingRows = [
          basePrice ? { label: 'Base price', value: basePrice } : undefined,
          ...input.pricing.lineItems
              .filter((lineItem) => lineItem.amount !== 0)
              .map((lineItem) => ({ label: lineItem.label, value: formatPriceModifier(lineItem.amount) ?? '' })),
          {
              label: 'Customization total',
              value: formatPriceModifier(input.pricing.customizationTotal ?? calculateCustomizationTotal(input.pricing.lineItems)) ?? '+$0.00',
          },
          {
              label: 'Estimated total',
              value: input.pricing.quoteRequired ? 'Quote required' : estimatedTotal ?? 'Quote required',
          },
      ].filter((row) => Boolean(row));
      pdf.drawHeader(input.brandName, input.generatedAt, referenceId);
      pdf.drawCard('Product Summary', Math.max(150, 58 + estimateRowsHeight(productRows, 230)), (topY) => {
          pdf.drawRows(productRows, MARGIN + 16, topY, 104, 238);
          if (input.product.imageUrl) {
              const imageX = PAGE_WIDTH - MARGIN - 154;
              pdf.add(drawRect(imageX, topY - 86, 138, 86, SOFT, BORDER));
              pdf.addText('Product image available', imageX + 16, topY - 36, 10, 'F2', DARK);
              pdf.addWrappedText('See product URL or catalog for the original image.', imageX + 16, topY - 54, 106, 8, 'F1', MUTED);
          }
      });
      if (selectedRows.length > 0) {
          pdf.drawCard('Selected Customizations', Math.max(112, 58 + estimateRowsHeight(selectedRows, 340)), (topY) => {
              pdf.drawRows(selectedRows, MARGIN + 16, topY, 130, 340);
          });
      }
      pdf.drawCard('Pricing Breakdown', Math.max(128, 62 + estimateRowsHeight(pricingRows, 220)), (topY) => {
          let cursor = topY;
          pricingRows.forEach((row, index) => {
              const isTotal = row.label === 'Estimated total';
              if (isTotal) {
                  pdf.add(drawLine(MARGIN + 16, cursor + 9, PAGE_WIDTH - MARGIN - 16, cursor + 9, BORDER));
              }
              pdf.addText(row.label, MARGIN + 16, cursor, 10, isTotal ? 'F2' : 'F1', isTotal ? DARK : MUTED);
              pdf.addRightText(row.value, PAGE_WIDTH - MARGIN - 18, cursor, 10, isTotal ? 'F2' : 'F1', isTotal ? DARK : DARK);
              cursor -= index === pricingRows.length - 2 ? 22 : 17;
          });
      });
      const notes = input.selectedCustomizations.customerRequestText?.trim();
      if (notes) {
          const noteLines = wrapText(notes, CONTENT_WIDTH - 32, 10);
          pdf.drawCard('Customer Request', Math.max(92, 58 + noteLines.length * 15), (topY) => {
              pdf.addWrappedText(notes, MARGIN + 16, topY, CONTENT_WIDTH - 32, 10, 'F1', DARK);
          });
      }
      return pdf.toBlob();
  }
  const createCustomizationPdfFilename = (productName, generatedAt = new Date()) => {
      const slug = productName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .slice(0, 64);
      const date = generatedAt.toISOString().slice(0, 10);
      return `modlyai-customized-furniture-${slug || date}.pdf`;
  };

  const ROOM_PLANNER_STORAGE_KEY = 'modly-room-planner-state';
  const CUSTOMIZER_SUGGESTION_LIMIT = 3;
  const SHORT_REASON_MAX_LENGTH = 120;
  const isDemoProduct$1 = (product) => Boolean(product && !product.source);
  const normalizeDisplayOptions$1 = (value) => normalizeCustomizationOptionValues(value).map((option) => ({
      name: getOptionName(option),
      price: getOptionPrice(option),
  }));
  const formatModifierLabel = (price, includedLabel = 'Included') => {
      if (typeof price !== 'number')
          return null;
      if (price <= 0)
          return includedLabel;
      return `+$${price.toLocaleString()}`;
  };
  const getShortReason = (reason) => {
      const normalized = (reason || 'Recommended by Room Planner.').replace(/\s+/g, ' ').trim();
      const firstSentence = normalized.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() || normalized;
      return firstSentence.length > SHORT_REASON_MAX_LENGTH
          ? `${firstSentence.slice(0, SHORT_REASON_MAX_LENGTH - 3).trim()}...`
          : firstSentence;
  };
  const hasDimensionRange$1 = (dimension) => dimension?.min !== undefined || dimension?.max !== undefined;
  const readFlatDimension = (value) => {
      if (typeof value === 'number' && Number.isFinite(value) && value > 0)
          return value;
      if (typeof value === 'string' && value.trim()) {
          const parsed = Number(value);
          if (Number.isFinite(parsed) && parsed > 0)
              return parsed;
      }
      return undefined;
  };
  const toDimensionRange = (dimension, fallbackDefault, fallbackRange, allowFallback = false) => {
      const min = dimension?.min ?? (allowFallback ? fallbackRange?.[0] : undefined);
      const max = dimension?.max ?? (allowFallback ? fallbackRange?.[1] : undefined);
      const defaultValue = dimension?.default ?? (allowFallback ? fallbackDefault : undefined);
      if (min === undefined && max === undefined && defaultValue === undefined)
          return null;
      const resolvedDefault = defaultValue ?? min ?? max ?? fallbackDefault;
      return {
          min: min ?? resolvedDefault,
          max: max ?? resolvedDefault,
          default: resolvedDefault,
          unit: dimension?.unit ?? 'in',
      };
  };
  const getProductCustomization = (product) => {
      if (!product) {
          return {
              colors: [],
              materials: [],
              dimensions: {},
              dimensionSummary: {},
              addOns: [],
              optionLabels: [],
              hasOptions: false,
          };
      }
      const explicit = product.customizationOptions;
      const allowDemoFallback = isDemoProduct$1(product);
      const explicitColorOptions = normalizeDisplayOptions$1(explicit?.colors);
      const explicitMaterialOptions = normalizeDisplayOptions$1(explicit?.materials);
      const explicitColorNames = explicitColorOptions.map((option) => option.name);
      const explicitMaterialNames = explicitMaterialOptions.map((option) => option.name);
      const productColorNames = product.colors
          .map((color) => color.name)
          .filter((name) => allowDemoFallback || name.toLowerCase() !== 'custom');
      const productMaterialNames = product.materials
          .filter((name) => allowDemoFallback || name.toLowerCase() !== 'custom');
      const colorNames = explicitColorNames.length > 0 ? explicitColorNames : productColorNames;
      const materialNames = explicitMaterialNames.length > 0 ? explicitMaterialNames : productMaterialNames;
      const colors = colorNames
          .map((name, index) => {
          const existing = product.colors.find((color) => color.name.toLowerCase() === name.toLowerCase());
          const pricedOption = explicitColorOptions.find((option) => option.name.toLowerCase() === name.toLowerCase());
          return {
              ...(existing ?? { name, hex: product.colors[index]?.hex ?? '#E5E7EB', available: true }),
              price: pricedOption?.price,
          };
      })
          .filter((color) => color.available);
      const materials = materialNames.map((name, index) => {
          const existing = product.customizer.materialOptions.find((option) => option.name.toLowerCase() === name.toLowerCase());
          const pricedOption = explicitMaterialOptions.find((option) => option.name.toLowerCase() === name.toLowerCase());
          return existing
              ? { ...existing, priceDelta: explicitMaterialOptions.length > 0 ? pricedOption?.price : existing.priceDelta }
              : {
                  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || `material_${index}`,
                  name,
                  priceDelta: pricedOption?.price ?? 0,
                  description: getMaterialDescription(name),
              };
      });
      const dimensions = {
          width: toDimensionRange(hasDimensionRange$1(explicit?.dimensions?.width) ? explicit?.dimensions?.width : undefined, product.customizer.defaultWidthIn, product.customizer.widthRangeIn, allowDemoFallback),
          length: toDimensionRange(hasDimensionRange$1(explicit?.dimensions?.length) ? explicit?.dimensions?.length : undefined, product.customizer.defaultDepthIn, product.customizer.depthRangeIn, allowDemoFallback),
          height: toDimensionRange(hasDimensionRange$1(explicit?.dimensions?.height) ? explicit?.dimensions?.height : undefined, product.dimensions.height, undefined, false),
      };
      const dimensionSummary = {
          width: !dimensions.width && readFlatDimension(product.width)
              ? { value: readFlatDimension(product.width), unit: 'in' }
              : undefined,
          length: !dimensions.length && readFlatDimension(product.length)
              ? { value: readFlatDimension(product.length), unit: 'in' }
              : undefined,
          height: !dimensions.height && readFlatDimension(product.height)
              ? { value: readFlatDimension(product.height), unit: 'in' }
              : undefined,
      };
      const addOns = explicit?.addOns ??
          (allowDemoFallback
              ? [
                  { name: 'Throw Pillows (2)', price: 60 },
                  { name: 'Ottoman', price: 350 },
              ]
              : []);
      const optionLabels = (explicit?.shopifyOptions ?? explicit?.optionLabels ?? []).map((option) => ({
          name: option.name,
          values: normalizeDisplayOptions$1(option.values),
      }));
      return {
          colors,
          materials,
          dimensions,
          dimensionSummary,
          addOns,
          optionLabels,
          hasOptions: colors.length > 0 ||
              materials.length > 0 ||
              Boolean(dimensions.width || dimensions.length || dimensions.height) ||
              Boolean(dimensionSummary.width || dimensionSummary.length || dimensionSummary.height) ||
              addOns.length > 0 ||
              optionLabels.length > 0,
      };
  };
  function FurnitureCustomizerPanel({ products, draft, setDraft, isApplying, validationErrors, price, onApply, onUndo, onRedo, canUndo, canRedo, onSaveConfig, onShareLink, onExportPdf, onViewFullRoomAnalysis, }) {
      const selectedProduct = require$$0$1.useMemo(() => products.find((p) => p.id === draft.productId) ?? products[0], [draft.productId, products]);
      const customization = require$$0$1.useMemo(() => getProductCustomization(selectedProduct), [selectedProduct]);
      require$$0$1.useEffect(() => {
          if (process.env.NODE_ENV !== 'development' || !selectedProduct) {
              return;
          }
          console.debug('[Modly customizer] selected product customization fields', {
              name: selectedProduct.name,
              colors: selectedProduct.colors,
              materials: selectedProduct.materials,
              length: selectedProduct.length,
              width: selectedProduct.width,
              height: selectedProduct.height,
              customization,
          });
      }, [customization, selectedProduct]);
      const materialOptions = customization.materials;
      const colorSwatches = customization.colors;
      const baseDimensions = {
          width: customization.dimensions.width?.default ?? selectedProduct?.customizer.defaultWidthIn ?? 36,
          length: customization.dimensions.length?.default ?? selectedProduct?.customizer.defaultDepthIn ?? 60,
          height: customization.dimensions.height?.default ?? selectedProduct?.dimensions.height ?? 30,
      };
      const widthMin = customization.dimensions.width?.min ?? baseDimensions.width;
      const widthMax = customization.dimensions.width?.max ?? baseDimensions.width;
      const lengthMin = customization.dimensions.length?.min ?? baseDimensions.length;
      const lengthMax = customization.dimensions.length?.max ?? baseDimensions.length;
      const heightMin = customization.dimensions.height?.min ?? baseDimensions.height;
      const heightMax = customization.dimensions.height?.max ?? baseDimensions.height;
      const [additionalDetails, setAdditionalDetails] = require$$0$1.useState('');
      const [charCount, setCharCount] = require$$0$1.useState(0);
      const [roomPlannerPhoto, setRoomPlannerPhoto] = require$$0$1.useState(null);
      const [roomPlannerRecommendations, setRoomPlannerRecommendations] = require$$0$1.useState(null);
      const [aiSuggestions, setAiSuggestions] = require$$0$1.useState(null);
      const [analyzing, setAnalyzing] = require$$0$1.useState(false);
      const roomPlannerSuggestions = require$$0$1.useMemo(() => {
          if (!roomPlannerRecommendations)
              return null;
          const topRecommendation = roomPlannerRecommendations.recommendations?.[0];
          return {
              fitScore: topRecommendation?.matchScore ?? 0,
              fitReason: topRecommendation?.reasoning ||
                  roomPlannerRecommendations.roomAnalysis?.freeSpace?.description ||
                  'Room Planner analysis is ready for this space.',
              roomStyle: roomPlannerRecommendations.roomAnalysis?.detectedStyle || 'Unknown',
              dominantColors: roomPlannerRecommendations.roomAnalysis?.dominantColors || [],
              recommendations: roomPlannerRecommendations.recommendations?.map((rec) => ({
                  type: rec.item.category || 'recommendation',
                  suggestion: rec.item.name,
                  reason: rec.reasoning || rec.placement?.reasoning || 'Recommended by Room Planner.',
              })) || [],
              warning: roomPlannerPhoto
                  ? undefined
                  : 'Room Planner analysis was found, but the uploaded photo is not available.',
          };
      }, [roomPlannerPhoto, roomPlannerRecommendations]);
      require$$0$1.useEffect(() => {
          const loadRoomPlannerState = () => {
              if (typeof window === 'undefined')
                  return;
              try {
                  const saved = sessionStorage.getItem(ROOM_PLANNER_STORAGE_KEY);
                  if (!saved) {
                      setRoomPlannerPhoto(null);
                      setRoomPlannerRecommendations(null);
                      return;
                  }
                  const state = JSON.parse(saved);
                  setRoomPlannerPhoto(state.uploadedPhotos?.[0] || null);
                  setRoomPlannerRecommendations(state.recommendations || null);
              }
              catch (error) {
                  console.warn('Failed to load Room Planner state for customizer:', error);
              }
          };
          loadRoomPlannerState();
          window.addEventListener('focus', loadRoomPlannerState);
          return () => {
              window.removeEventListener('focus', loadRoomPlannerState);
          };
      }, []);
      require$$0$1.useEffect(() => {
          setAiSuggestions(roomPlannerSuggestions);
      }, [roomPlannerSuggestions]);
      const getRoomPlannerImagePayload = () => {
          if (!roomPlannerPhoto)
              return null;
          const match = roomPlannerPhoto.match(/^data:(.*?);base64,(.*)$/);
          if (!match)
              return null;
          return {
              imageType: match[1] || 'image/jpeg',
              imageBase64: match[2] || '',
          };
      };
      const analyzeRoom = async (base64, imageType) => {
          setAnalyzing(true);
          setAiSuggestions(null);
          try {
              const res = await fetch('/api/ai/suggestions', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      imageBase64: base64,
                      imageType,
                      productName: selectedProduct?.name || 'furniture piece',
                      productCategory: selectedProduct?.category || 'furniture',
                      colors: selectedProduct?.colors?.map((c) => c.name) || [],
                      materials: selectedProduct?.materials || [],
                      additionalDetails: additionalDetails || null,
                  })
              });
              const data = await res.json();
              if (data.success)
                  setAiSuggestions(data.suggestions);
          }
          catch (error) {
              console.error('Analysis error:', error);
          }
          finally {
              setAnalyzing(false);
          }
      };
      const handleAnalyzeWithRoomPlannerPhoto = () => {
          const payload = getRoomPlannerImagePayload();
          if (!payload)
              return;
          analyzeRoom(payload.imageBase64, payload.imageType);
      };
      const compactSuggestions = require$$0$1.useMemo(() => (aiSuggestions?.recommendations ?? []).slice(0, CUSTOMIZER_SUGGESTION_LIMIT), [aiSuggestions]);
      const hasMoreSuggestions = (aiSuggestions?.recommendations?.length ?? 0) > CUSTOMIZER_SUGGESTION_LIMIT;
      const handleViewFullRoomAnalysis = () => {
          if (onViewFullRoomAnalysis) {
              onViewFullRoomAnalysis();
              return;
          }
          if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('modly:navigate-to-room-planner'));
          }
      };
      return (jsxRuntimeExports.jsx("section", { className: "py-12 bg-gray-50", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4", children: jsxRuntimeExports.jsxs("div", { className: "grid items-start gap-6 lg:grid-cols-12", children: [jsxRuntimeExports.jsx("div", { className: "self-start lg:col-span-3", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-lg sticky top-6", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Select Product" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "B2B-ready configs with instant pricing" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: onUndo, disabled: !canUndo || isApplying, className: "p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed", title: "Undo", children: jsxRuntimeExports.jsx(Undo2, { className: "w-4 h-4 text-gray-600" }) }), jsxRuntimeExports.jsx("button", { type: "button", onClick: onRedo, disabled: !canRedo || isApplying, className: "p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed", title: "Redo", children: jsxRuntimeExports.jsx(Redo2, { className: "w-4 h-4 text-gray-600" }) })] })] }), jsxRuntimeExports.jsx("select", { value: draft.productId, onChange: (e) => {
                                          const nextProduct = products.find((product) => product.id === e.target.value);
                                          if (!nextProduct) {
                                              return;
                                          }
                                          setDraft({
                                              ...draft,
                                              productId: nextProduct.id,
                                              fabricColor: getProductCustomization(nextProduct).colors[0]?.hex ?? draft.fabricColor,
                                              selectedColor: getProductCustomization(nextProduct).colors[0]?.name,
                                              materialId: getProductCustomization(nextProduct).materials[0]?.id ?? draft.materialId,
                                              selectedMaterial: getProductCustomization(nextProduct).materials[0]?.name,
                                              widthIn: getProductCustomization(nextProduct).dimensions.width?.default ??
                                                  nextProduct.customizer.defaultWidthIn,
                                              depthIn: getProductCustomization(nextProduct).dimensions.length?.default ??
                                                  nextProduct.customizer.defaultDepthIn,
                                              heightIn: getProductCustomization(nextProduct).dimensions.height?.default,
                                              selectedAddOns: [],
                                          });
                                      }, disabled: isApplying, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6 disabled:opacity-60", children: products.map((p) => (jsxRuntimeExports.jsx("option", { value: p.id, children: p.name }, p.id))) }), jsxRuntimeExports.jsxs("div", { className: "aspect-square bg-purple-50 rounded-lg mb-6 flex flex-col items-center justify-center border border-purple-200 text-center px-4", children: [jsxRuntimeExports.jsx(Layers, { className: "w-12 h-12 text-purple-400 mb-2" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-purple-600 font-medium", children: selectedProduct?.customizer.thumbnailLabel ?? 'Sectional' }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Instantly updates with your selections" })] }), jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm border-t border-gray-200 pt-4", children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gray-600", children: [jsxRuntimeExports.jsx("span", { children: "Base Price:" }), jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-900", children: price.base > 0 ? `$${price.base.toLocaleString()}` : 'Quote required' })] }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gray-600", children: [jsxRuntimeExports.jsx("span", { children: "Base Size:" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [selectedProduct?.dimensions.width, selectedProduct?.dimensions.unit, " W"] })] }), jsxRuntimeExports.jsxs("div", { className: "text-gray-600", children: [jsxRuntimeExports.jsx("span", { className: "block mb-1", children: "Materials:" }), jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-900", children: selectedProduct?.materials.join(', ') || 'Custom' })] }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gray-600", children: [jsxRuntimeExports.jsx("span", { children: "Customizations:" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-purple-600", children: ["+$", price.customizations.toLocaleString()] })] }), jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-200 pt-3 flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "font-bold text-gray-900", children: "Total:" }), jsxRuntimeExports.jsx("span", { className: "font-bold text-lg text-gray-900", children: price.quoteRequired ? 'Quote required' : `$${price.total.toLocaleString()}` })] })] }), jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-3 gap-2", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: onSaveConfig, disabled: isApplying, className: "px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50", children: "Save" }), jsxRuntimeExports.jsxs("button", { type: "button", onClick: onShareLink, disabled: isApplying, className: "px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 inline-flex items-center justify-center gap-2", children: [jsxRuntimeExports.jsx(Link2, { className: "w-4 h-4" }), "Share"] }), jsxRuntimeExports.jsxs("button", { type: "button", onClick: onExportPdf, disabled: isApplying, className: "px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 inline-flex items-center justify-center gap-2", children: [jsxRuntimeExports.jsx(FileDown, { className: "w-4 h-4" }), "PDF"] })] })] }) }), jsxRuntimeExports.jsx("div", { className: "self-start lg:col-span-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-lg", children: [jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-gray-900 mb-6 flex items-center gap-2", children: [jsxRuntimeExports.jsx(Palette, { className: "w-5 h-5 text-purple-600" }), "Customization Options"] }), jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-900 mb-3", children: "Color" }), colorSwatches.length > 0 ? (jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: colorSwatches.map((color) => {
                                                  const isSelected = draft.fabricColor.toLowerCase() === color.hex.toLowerCase();
                                                  return (jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setDraft({ ...draft, fabricColor: color.hex, selectedColor: color.name }), disabled: isApplying, className: [
                                                          'flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm transition-all',
                                                          isSelected
                                                              ? 'border-blue-500 bg-blue-50'
                                                              : 'border-gray-200 hover:border-gray-300',
                                                          isApplying ? 'opacity-60 cursor-not-allowed' : '',
                                                      ].join(' '), "aria-label": `Select color ${color.name}`, title: color.name, children: [jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full border border-gray-200", style: { backgroundColor: color.hex } }), jsxRuntimeExports.jsx("span", { children: color.name }), formatModifierLabel(color.price) && (jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-gray-500", children: formatModifierLabel(color.price) }))] }, color.name));
                                              }) })) : (jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "No colors available for this product" }))] }), jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-900 mb-3", children: "Material" }), materialOptions.length > 0 ? (jsxRuntimeExports.jsx("div", { className: "space-y-2", children: materialOptions.map((m) => {
                                                  const isSelected = draft.materialId === m.id;
                                                  return (jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setDraft({ ...draft, materialId: m.id, selectedMaterial: m.name }), disabled: isApplying, className: [
                                                          'w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm transition-all text-left',
                                                          isSelected
                                                              ? 'border-purple-500 bg-purple-50'
                                                              : 'border-gray-200 hover:border-gray-300',
                                                          isApplying ? 'opacity-60 cursor-not-allowed' : '',
                                                      ].join(' '), children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900", children: m.name }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: m.description || getMaterialDescription(m.name) })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [formatModifierLabel(m.priceDelta) && (jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-gray-500", children: formatModifierLabel(m.priceDelta) })), isSelected && jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-purple-500" })] })] }, m.id));
                                              }) })) : (jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "No materials available for this product" }))] }), (customization.dimensions.width || customization.dimensions.length || customization.dimensions.height) && (jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-900 mb-3 flex items-center gap-2", children: [jsxRuntimeExports.jsx(Maximize2, { className: "w-4 h-4 text-purple-600" }), "Dimensions"] }), jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [customization.dimensions.width && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Width" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [draft.widthIn, " ", customization.dimensions.width.unit] })] }), jsxRuntimeExports.jsx("input", { type: "range", min: widthMin, max: widthMax, value: draft.widthIn, onChange: (e) => setDraft({ ...draft, widthIn: Number(e.target.value) }), disabled: isApplying, className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [jsxRuntimeExports.jsxs("span", { children: [widthMin, customization.dimensions.width.unit] }), jsxRuntimeExports.jsxs("span", { children: [widthMax, customization.dimensions.width.unit] })] }), typeof customization.dimensions.width.pricePerExtraUnit === 'number' && (jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-gray-500", children: ["+$", customization.dimensions.width.pricePerExtraUnit.toLocaleString(), " per extra ", customization.dimensions.width.unit] }))] })), customization.dimensions.length && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Length" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [draft.depthIn, " ", customization.dimensions.length.unit] })] }), jsxRuntimeExports.jsx("input", { type: "range", min: lengthMin, max: lengthMax, value: draft.depthIn, onChange: (e) => setDraft({ ...draft, depthIn: Number(e.target.value) }), disabled: isApplying, className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [jsxRuntimeExports.jsxs("span", { children: [lengthMin, customization.dimensions.length.unit] }), jsxRuntimeExports.jsxs("span", { children: [lengthMax, customization.dimensions.length.unit] })] }), typeof customization.dimensions.length.pricePerExtraUnit === 'number' && (jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-gray-500", children: ["+$", customization.dimensions.length.pricePerExtraUnit.toLocaleString(), " per extra ", customization.dimensions.length.unit] }))] })), customization.dimensions.height && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Height" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [draft.heightIn ?? baseDimensions.height, " ", customization.dimensions.height.unit] })] }), jsxRuntimeExports.jsx("input", { type: "range", min: heightMin, max: heightMax, value: draft.heightIn ?? baseDimensions.height, onChange: (e) => setDraft({ ...draft, heightIn: Number(e.target.value) }), disabled: isApplying, className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [jsxRuntimeExports.jsxs("span", { children: [heightMin, customization.dimensions.height.unit] }), jsxRuntimeExports.jsxs("span", { children: [heightMax, customization.dimensions.height.unit] })] }), typeof customization.dimensions.height.pricePerExtraUnit === 'number' && (jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-gray-500", children: ["+$", customization.dimensions.height.pricePerExtraUnit.toLocaleString(), " per extra ", customization.dimensions.height.unit] }))] }))] }), validationErrors && validationErrors.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mt-4 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm", children: [jsxRuntimeExports.jsx("div", { className: "font-semibold mb-1", children: "Adjustments need review" }), jsxRuntimeExports.jsx("ul", { className: "list-disc pl-5 space-y-1", children: validationErrors.map((e, i) => (jsxRuntimeExports.jsx("li", { children: e }, i))) })] }))] })), !(customization.dimensions.width || customization.dimensions.length || customization.dimensions.height) &&
                                      (customization.dimensionSummary.width ||
                                          customization.dimensionSummary.length ||
                                          customization.dimensionSummary.height) && (jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-900 mb-3 flex items-center gap-2", children: [jsxRuntimeExports.jsx(Maximize2, { className: "w-4 h-4 text-purple-600" }), "Dimensions"] }), jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm", children: [customization.dimensionSummary.width && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Width" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [customization.dimensionSummary.width.value, " ", customization.dimensionSummary.width.unit] })] })), customization.dimensionSummary.length && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Length" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [customization.dimensionSummary.length.value, " ", customization.dimensionSummary.length.unit] })] })), customization.dimensionSummary.height && (jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Height" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [customization.dimensionSummary.height.value, " ", customization.dimensionSummary.height.unit] })] }))] })] })), customization.optionLabels.length > 0 && (jsxRuntimeExports.jsx("div", { className: "mb-6 space-y-3", children: customization.optionLabels.map((option) => (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-900 mb-2", children: option.name }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: option.values.map((value) => (jsxRuntimeExports.jsxs("span", { className: "px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-700", children: [value.name, formatModifierLabel(value.price, '') && (jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs font-semibold text-gray-500", children: formatModifierLabel(value.price, '') }))] }, value.name))) })] }, option.name))) })), customization.addOns.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-900 mb-3 flex items-center gap-2", children: [jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4 text-purple-600" }), "Add-ons"] }), jsxRuntimeExports.jsx("div", { className: "space-y-2", children: customization.addOns.map((addOn) => {
                                                  const selectedAddOns = draft.selectedAddOns ?? [];
                                                  const isChecked = selectedAddOns.includes(addOn.name);
                                                  return (jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition", children: [jsxRuntimeExports.jsx("input", { type: "checkbox", checked: isChecked, onChange: (e) => {
                                                                  const nextSelectedAddOns = e.target.checked
                                                                      ? [...selectedAddOns, addOn.name]
                                                                      : selectedAddOns.filter((name) => name !== addOn.name);
                                                                  setDraft({ ...draft, selectedAddOns: nextSelectedAddOns });
                                                              }, disabled: isApplying, className: "w-4 h-4 text-purple-600 rounded accent-purple-600" }), jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm text-gray-900", children: addOn.name }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: typeof addOn.price === 'number' ? `+$${addOn.price.toLocaleString()}` : 'Quote' })] }, addOn.name));
                                              }) })] })), !customization.hasOptions && (jsxRuntimeExports.jsx("div", { className: "mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900", children: "This product does not have predefined customization options. Tell us what you want and we'll send it as a quote request." })), jsxRuntimeExports.jsxs("button", { type: "button", onClick: onApply, disabled: isApplying || (validationErrors?.length ?? 0) > 0, className: "w-full py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed", children: [jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5" }), isApplying ? 'Applying...' : 'Apply Customizations'] })] }) }), jsxRuntimeExports.jsx("div", { className: "self-start lg:col-span-5", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-lg sticky top-6", children: [jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-5 mb-4", children: [jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-1", children: "Tell Us What You Want" }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-3", children: "Describe exactly what you need - AI will tailor suggestions to your specific request" }), jsxRuntimeExports.jsx("textarea", { value: additionalDetails, onChange: (e) => {
                                                  setAdditionalDetails(e.target.value);
                                                  setCharCount(e.target.value.length);
                                                  setDraft({ ...draft, customerRequestText: e.target.value });
                                              }, maxLength: 500, rows: 5, placeholder: `Examples:
- I want something that matches my grey walls
- Need storage space underneath
- Looking for pet-friendly fabric
- Want it to feel cozy but modern
- Must fit through a 32 inch doorway`, className: "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" }), jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [charCount, "/500 characters"] }), additionalDetails && (jsxRuntimeExports.jsx("button", { onClick: () => {
                                                          setAdditionalDetails('');
                                                          setCharCount(0);
                                                          setDraft({ ...draft, customerRequestText: '' });
                                                      }, className: "text-xs text-gray-400 hover:text-gray-600", children: "Clear" }))] }), jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mb-2", children: "Quick adds:" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [
                                                          'Pet-friendly fabric',
                                                          'Easy to clean',
                                                          'Extra storage',
                                                          'Child-safe',
                                                          'Matches grey walls',
                                                          'Cozy and warm feel',
                                                          'Minimalist style',
                                                          'Must fit small space',
                                                      ].map((chip) => (jsxRuntimeExports.jsxs("button", { onClick: () => {
                                                              const newText = additionalDetails
                                                                  ? `${additionalDetails}, ${chip.toLowerCase()}`
                                                                  : chip;
                                                              setAdditionalDetails(newText);
                                                              setCharCount(newText.length);
                                                              setDraft({ ...draft, customerRequestText: newText });
                                                          }, className: "text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-600 px-3 py-1 rounded-full transition-colors", children: ["+ ", chip] }, chip))) })] })] }), roomPlannerPhoto && (jsxRuntimeExports.jsx("button", { onClick: handleAnalyzeWithRoomPlannerPhoto, disabled: analyzing, className: "w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 mb-4", children: analyzing ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white" }), "Analyzing your room..."] })) : ('✨ Get AI Suggestions') })), jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-4 max-h-[380px] overflow-y-auto", children: [jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "AI Suggestions" }), !roomPlannerPhoto && !analyzing && (jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [jsxRuntimeExports.jsx("p", { className: "text-3xl mb-2", children: "\uD83C\uDFE0" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Use Room Planner first to upload a room photo and get personalized suggestions" })] })), analyzing && (jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-8 gap-3", children: [jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Analyzing your room and requirements..." })] })), aiSuggestions && !analyzing && (jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 rounded-lg p-3", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-blue-900", children: "Room Fit Score" }), jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-blue-600", children: [aiSuggestions.fitScore, "%"] })] }), jsxRuntimeExports.jsx("div", { className: "w-full bg-blue-200 rounded-full h-2", children: jsxRuntimeExports.jsx("div", { className: "bg-blue-600 h-2 rounded-full transition-all", style: { width: `${aiSuggestions.fitScore}%` } }) }), jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-700 mt-2", children: getShortReason(aiSuggestions.fitReason) })] }), jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500", children: "Room style detected:" }), jsxRuntimeExports.jsx("span", { className: "text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full", children: aiSuggestions.roomStyle })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1.5", children: "Room colors:" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: aiSuggestions.dominantColors?.map((color, i) => (jsxRuntimeExports.jsx("span", { className: "text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full", children: color }, i))) })] }), jsxRuntimeExports.jsx("div", { className: "space-y-2", children: compactSuggestions.map((rec, i) => (jsxRuntimeExports.jsxs("div", { className: "border border-gray-100 rounded-lg p-2.5", children: [jsxRuntimeExports.jsx("span", { className: `text-xs font-medium px-2 py-0.5 rounded-full ${rec.type === 'color'
                                                                    ? 'bg-purple-100 text-purple-700'
                                                                    : rec.type === 'material'
                                                                        ? 'bg-green-100 text-green-700'
                                                                        : rec.type === 'customization'
                                                                            ? 'bg-blue-100 text-blue-700'
                                                                            : 'bg-orange-100 text-orange-700'}`, children: rec.type }), jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-900 mt-1.5", children: rec.suggestion }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: getShortReason(rec.reason) })] }, i))) }), hasMoreSuggestions && (jsxRuntimeExports.jsx("button", { type: "button", onClick: handleViewFullRoomAnalysis, className: "w-full rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100", children: "View full room analysis" })), aiSuggestions.warning && (jsxRuntimeExports.jsx("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-2.5", children: jsxRuntimeExports.jsxs("p", { className: "text-xs text-yellow-800", children: ["\u26A0\uFE0F ", aiSuggestions.warning] }) })), roomPlannerPhoto && (jsxRuntimeExports.jsx("button", { onClick: handleAnalyzeWithRoomPlannerPhoto, className: "w-full text-sm text-blue-600 hover:underline text-center mt-2", children: "Re-analyze with updated details" }))] }))] })] }) })] }) }) }));
  }

  const createDraftForProduct = (product) => ({
      productId: product.id,
      fabricColor: getCustomizationForProduct(product).colors[0]?.hex ?? '#9CA3AF',
      selectedColor: getCustomizationForProduct(product).colors[0]?.name,
      materialId: getCustomizationForProduct(product).materials[0]?.id ?? 'standard_material',
      selectedMaterial: getCustomizationForProduct(product).materials[0]?.name,
      widthIn: getCustomizationForProduct(product).dimensions.width?.default ?? product.customizer.defaultWidthIn,
      depthIn: getCustomizationForProduct(product).dimensions.length?.default ?? product.customizer.defaultDepthIn,
      heightIn: getCustomizationForProduct(product).dimensions.height?.default,
      addons: { throwPillows: false, ottoman: false },
      selectedAddOns: [],
      rotationDeg: 0,
      zoom: 1,
      roomContext: { lengthFt: 12.5, widthFt: 15.2 },
  });
  const isDemoProduct = (product) => !product.source;
  const normalizeDisplayOptions = (value) => normalizeCustomizationOptionValues(value).map((option) => ({
      name: getOptionName(option),
      price: getOptionPrice(option),
  }));
  const hasDimensionRange = (dimension) => dimension?.min !== undefined || dimension?.max !== undefined;
  const getCustomizationForProduct = (product) => {
      const explicit = product.customizationOptions;
      const allowDemoFallback = isDemoProduct(product);
      const pricedColors = normalizeDisplayOptions(explicit?.colors);
      const pricedMaterials = normalizeDisplayOptions(explicit?.materials);
      const colorNames = pricedColors.map((option) => option.name);
      const materialNames = pricedMaterials.map((option) => option.name);
      const productColorNames = product.colors
          .map((color) => color.name)
          .filter((name) => allowDemoFallback || name.toLowerCase() !== 'custom');
      const productMaterialNames = product.materials
          .filter((name) => allowDemoFallback || name.toLowerCase() !== 'custom');
      const colors = (colorNames.length > 0 ? colorNames : productColorNames)
          .map((name, index) => {
          const existing = product.colors.find((color) => color.name.toLowerCase() === name.toLowerCase());
          const pricedColor = pricedColors.find((option) => option.name.toLowerCase() === name.toLowerCase());
          return {
              ...(existing ?? { name, hex: product.colors[index]?.hex ?? '#E5E7EB', available: true }),
              price: pricedColor?.price,
          };
      })
          .filter((color) => color.available);
      const materials = (materialNames.length > 0 ? materialNames : productMaterialNames).map((name, index) => {
          const existing = product.customizer.materialOptions.find((option) => option.name.toLowerCase() === name.toLowerCase());
          const pricedMaterial = pricedMaterials.find((option) => option.name.toLowerCase() === name.toLowerCase());
          return existing
              ? { ...existing, priceDelta: pricedMaterials.length > 0 ? pricedMaterial?.price : existing.priceDelta }
              : {
                  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || `material_${index}`,
                  name,
                  priceDelta: pricedMaterial?.price ?? 0,
                  description: getMaterialDescription(name),
              };
      });
      return {
          colors,
          materials,
          dimensions: {
              width: hasDimensionRange(explicit?.dimensions?.width)
                  ? explicit?.dimensions?.width
                  : (allowDemoFallback ? { default: product.customizer.defaultWidthIn, unit: 'in' } : undefined),
              length: hasDimensionRange(explicit?.dimensions?.length)
                  ? explicit?.dimensions?.length
                  : (allowDemoFallback ? { default: product.customizer.defaultDepthIn, unit: 'in' } : undefined),
              height: hasDimensionRange(explicit?.dimensions?.height) ? explicit?.dimensions?.height : undefined,
          },
          addOns: explicit?.addOns ??
              (allowDemoFallback
                  ? [
                      { name: 'Throw Pillows (2)', price: 60 },
                      { name: 'Ottoman', price: 350 },
                  ]
                  : []),
          shopifyOptions: explicit?.shopifyOptions ?? explicit?.optionLabels ?? [],
      };
  };
  const getColorName = (product, hex) => product.colors.find((color) => color.hex.toLowerCase() === hex.toLowerCase())?.name ?? hex;
  const getMaterialOption = (product, materialId) => product.customizer.materialOptions.find((option) => option.id === materialId) ??
      product.customizer.materialOptions[0];
  const getSelectedColorOption = (product, draft) => getCustomizationForProduct(product).colors.find((color) => draft.selectedColor
      ? color.name.toLowerCase() === draft.selectedColor.toLowerCase()
      : color.hex.toLowerCase() === draft.fabricColor.toLowerCase());
  const getProductImageUrl = (product) => {
      const candidate = product.imageUrl ||
          product.image ||
          product.thumbnail ||
          product.images.front ||
          product.images.thumbnail ||
          product.images.angle ||
          product.images.side;
      return candidate?.trim() || undefined;
  };
  const getSelectedShopifyOptions = (product) => {
      const customization = getCustomizationForProduct(product);
      const selectedOptions = [];
      customization.shopifyOptions.forEach((option) => {
          const values = normalizeCustomizationOptionValues(option.values);
          if (values.length !== 1)
              return;
          const value = values[0];
          const price = getOptionPrice(value);
          selectedOptions.push({
              name: option.name,
              value: getOptionName(value),
              ...(price !== undefined ? { price } : {}),
          });
      });
      return selectedOptions;
  };
  const calculateDimensionAdjustment = (selected, dimension) => {
      if (!dimension || selected === undefined)
          return { amount: 0, quoteRequired: false };
      if (selected <= (dimension.default ?? selected))
          return { amount: 0, quoteRequired: false };
      if (typeof dimension.pricePerExtraUnit !== 'number')
          return { amount: 0, quoteRequired: true };
      return {
          amount: Number(((selected - (dimension.default ?? selected)) * dimension.pricePerExtraUnit).toFixed(2)),
          quoteRequired: false,
      };
  };
  function FurnitureCustomizerWidget({ config = {}, onNavigateToRoomPlanner, selectedProduct: sharedSelectedProduct, onSelectedProductChange, }) {
      const mergedConfig = require$$0$1.useMemo(() => mergeConfig(config), [config]);
      const apiClient = require$$0$1.useMemo(() => new ApiClient(mergedConfig), [mergedConfig]);
      const storage = require$$0$1.useMemo(() => new Storage(mergedConfig.storageKey), [mergedConfig.storageKey]);
      const enabledActions = require$$0$1.useMemo(() => getEnabledActions(mergedConfig), [mergedConfig]);
      const analyticsContext = require$$0$1.useMemo(() => ({
          apiBaseUrl: mergedConfig.apiBaseUrl,
          storeId: mergedConfig.storeId || mergedConfig.widgetId,
          widgetId: mergedConfig.widgetId,
      }), [mergedConfig.apiBaseUrl, mergedConfig.storeId, mergedConfig.widgetId]);
      const primaryColor = getPrimaryColor(mergedConfig);
      const [catalogProducts, setCatalogProducts] = require$$0$1.useState([]);
      const availableProducts = require$$0$1.useMemo(() => {
          const baseProducts = catalogProducts.length > 0 ? catalogProducts : products;
          if (!sharedSelectedProduct) {
              return baseProducts;
          }
          const existing = baseProducts.find((product) => product.id === sharedSelectedProduct.id);
          return existing ? baseProducts : [sharedSelectedProduct, ...baseProducts];
      }, [catalogProducts, sharedSelectedProduct]);
      const defaultProduct = require$$0$1.useMemo(() => sharedSelectedProduct ?? availableProducts[0] ?? products[0], [availableProducts, sharedSelectedProduct]);
      const [, setCustomizedItem] = require$$0$1.useState(null);
      const [savedItem, setSavedItem] = require$$0$1.useState(null);
      const [isLoading, setIsLoading] = require$$0$1.useState(false);
      const [error, setError] = require$$0$1.useState(null);
      const [saveNotification, setSaveNotification] = require$$0$1.useState(null);
      const [lastConfig, setLastConfig] = require$$0$1.useState(null);
      const [baseProduct, setBaseProduct] = require$$0$1.useState(defaultProduct);
      const [draft, setDraft] = require$$0$1.useState(() => createDraftForProduct(defaultProduct));
      const [history, setHistory] = require$$0$1.useState(() => [createDraftForProduct(defaultProduct)]);
      const [historyIndex, setHistoryIndex] = require$$0$1.useState(0);
      const [showFinalizeModal, setShowFinalizeModal] = require$$0$1.useState(false);
      const [showQuoteForm, setShowQuoteForm] = require$$0$1.useState(false);
      const [quoteSuccess, setQuoteSuccess] = require$$0$1.useState(false);
      const canUndo = historyIndex > 0;
      const canRedo = historyIndex < history.length - 1;
      const setDraftWithHistory = require$$0$1.useCallback((next) => {
          setDraft(next);
          setSavedItem(null);
          setCustomizedItem(null);
          setLastConfig(null);
          setHistory((prev) => {
              const sliced = prev.slice(0, historyIndex + 1);
              const nextHistory = [...sliced, next];
              return nextHistory.length > 60 ? nextHistory.slice(nextHistory.length - 60) : nextHistory;
          });
          setHistoryIndex((prev) => Math.min(prev + 1, 59));
      }, [historyIndex]);
      const applySelectedProduct = require$$0$1.useCallback((product, clearSessionStorage = false) => {
          const nextDraft = createDraftForProduct(product);
          setBaseProduct(product);
          setDraft(nextDraft);
          setHistory([nextDraft]);
          setHistoryIndex(0);
          setCustomizedItem(null);
          setSavedItem(null);
          setError(null);
          setSaveNotification(null);
          setLastConfig(null);
          onSelectedProductChange?.(product);
          if (clearSessionStorage && typeof window !== 'undefined') {
              sessionStorage.removeItem('modly-customize-item');
          }
      }, [onSelectedProductChange]);
      require$$0$1.useEffect(() => {
          let cancelled = false;
          const loadCatalogProducts = async () => {
              try {
                  const response = await apiClient.getCatalog();
                  if (cancelled) {
                      return;
                  }
                  const catalogItems = Array.isArray(response.catalog?.products) ? response.catalog.products : [];
                  const nextProducts = catalogItems.length > 0
                      ? catalogItems.map((product, index) => productFromCatalogProduct(product, index))
                      : Array.isArray(response.items)
                          ? response.items.map((item) => productFromFurnitureItem(item))
                          : [];
                  setCatalogProducts(nextProducts.filter(Boolean));
              }
              catch (catalogError) {
                  if (!cancelled) {
                      console.warn('Failed to load catalog products for customizer:', catalogError);
                      setCatalogProducts([]);
                  }
              }
          };
          loadCatalogProducts();
          return () => {
              cancelled = true;
          };
      }, [apiClient]);
      require$$0$1.useEffect(() => {
          if (defaultProduct.id !== baseProduct.id) {
              applySelectedProduct(defaultProduct);
          }
      }, [applySelectedProduct, baseProduct.id, defaultProduct]);
      require$$0$1.useEffect(() => {
          const loadFromSessionStorage = () => {
              if (typeof window === 'undefined') {
                  return;
              }
              const stored = sessionStorage.getItem('modly-customize-item');
              if (!stored) {
                  return;
              }
              try {
                  const item = JSON.parse(stored);
                  const product = productFromFurnitureItem(item);
                  if (product.id !== baseProduct.id) {
                      applySelectedProduct(product, true);
                  }
                  else {
                      sessionStorage.removeItem('modly-customize-item');
                  }
              }
              catch (sessionError) {
                  console.warn('Failed to parse selected catalog item:', sessionError);
              }
          };
          loadFromSessionStorage();
          window.addEventListener('focus', loadFromSessionStorage);
          return () => {
              window.removeEventListener('focus', loadFromSessionStorage);
          };
      }, [applySelectedProduct, baseProduct.id]);
      const handleUndo = require$$0$1.useCallback(() => {
          setSavedItem(null);
          setCustomizedItem(null);
          setLastConfig(null);
          setHistoryIndex((idx) => {
              const nextIdx = Math.max(0, idx - 1);
              setDraft(history[nextIdx] ?? createDraftForProduct(baseProduct));
              return nextIdx;
          });
      }, [baseProduct, history]);
      const handleRedo = require$$0$1.useCallback(() => {
          setSavedItem(null);
          setCustomizedItem(null);
          setLastConfig(null);
          setHistoryIndex((idx) => {
              const nextIdx = Math.min(history.length - 1, idx + 1);
              setDraft(history[nextIdx] ?? createDraftForProduct(baseProduct));
              return nextIdx;
          });
      }, [baseProduct, history]);
      const selectedProduct = require$$0$1.useMemo(() => availableProducts.find((product) => product.id === draft.productId) ?? baseProduct, [availableProducts, baseProduct, draft.productId]);
      require$$0$1.useEffect(() => {
          if (selectedProduct.id !== baseProduct.id) {
              setBaseProduct(selectedProduct);
              onSelectedProductChange?.(selectedProduct);
          }
      }, [baseProduct.id, onSelectedProductChange, selectedProduct]);
      const validationErrors = require$$0$1.useMemo(() => {
          const errs = [];
          const customization = getCustomizationForProduct(selectedProduct);
          const widthRange = [
              customization.dimensions.width?.min ?? selectedProduct.customizer.widthRangeIn[0],
              customization.dimensions.width?.max ?? selectedProduct.customizer.widthRangeIn[1],
          ];
          const depthRange = [
              customization.dimensions.length?.min ?? selectedProduct.customizer.depthRangeIn[0],
              customization.dimensions.length?.max ?? selectedProduct.customizer.depthRangeIn[1],
          ];
          if (customization.dimensions.width && (draft.widthIn < widthRange[0] || draft.widthIn > widthRange[1])) {
              errs.push(`Width must be between ${widthRange[0]} and ${widthRange[1]} inches.`);
          }
          if (customization.dimensions.length && (draft.depthIn < depthRange[0] || draft.depthIn > depthRange[1])) {
              errs.push(`Depth must be between ${depthRange[0]} and ${depthRange[1]} inches.`);
          }
          if (draft.zoom < 0.8 || draft.zoom > 1.4) {
              errs.push('Zoom must be between 0.8x and 1.4x.');
          }
          return errs;
      }, [draft.depthIn, draft.widthIn, draft.zoom, selectedProduct]);
      const price = require$$0$1.useMemo(() => {
          const customization = getCustomizationForProduct(selectedProduct);
          const selectedColor = getSelectedColorOption(selectedProduct, draft);
          const selectedMaterial = customization.materials.find((material) => draft.selectedMaterial
              ? material.name.toLowerCase() === draft.selectedMaterial.toLowerCase()
              : material.id === draft.materialId);
          const selectedAddOns = draft.selectedAddOns ?? [];
          const selectedAddOnDetails = customization.addOns.filter((addOn) => selectedAddOns.includes(addOn.name));
          const colorPrice = selectedColor?.price;
          const materialPrice = selectedMaterial?.priceDelta;
          const widthAdjustment = calculateDimensionAdjustment(draft.widthIn, customization.dimensions.width);
          const lengthAdjustment = calculateDimensionAdjustment(draft.depthIn, customization.dimensions.length);
          const heightAdjustment = calculateDimensionAdjustment(draft.heightIn, customization.dimensions.height);
          const hasUnpricedAddOn = selectedAddOnDetails.some((addOn) => typeof addOn.price !== 'number');
          const selectedPricedColorIsUnknown = selectedColor !== undefined && typeof selectedColor.price !== 'number';
          const selectedPricedMaterialIsUnknown = selectedMaterial !== undefined && typeof selectedMaterial.priceDelta !== 'number';
          const addonsUpcharge = selectedAddOnDetails.reduce((sum, addOn) => sum + (typeof addOn.price === 'number' ? addOn.price : 0), 0);
          const dimensionsUpcharge = widthAdjustment.amount + lengthAdjustment.amount + heightAdjustment.amount;
          const dimensionAdjustments = {
              width: widthAdjustment.amount,
              length: lengthAdjustment.amount,
              height: heightAdjustment.amount,
              total: dimensionsUpcharge,
          };
          const customizations = (typeof colorPrice === 'number' ? colorPrice : 0) +
              (typeof materialPrice === 'number' ? materialPrice : 0) +
              dimensionsUpcharge +
              addonsUpcharge;
          const total = selectedProduct.basePrice + customizations;
          const lineItems = [
              { label: 'Color', amount: typeof colorPrice === 'number' ? colorPrice : 0 },
              { label: 'Material', amount: typeof materialPrice === 'number' ? materialPrice : 0 },
              { label: 'Dimensions', amount: dimensionsUpcharge },
              { label: 'Add-ons', amount: addonsUpcharge },
          ].filter((lineItem) => lineItem.amount !== 0);
          return {
              base: selectedProduct.basePrice,
              customizations,
              total,
              quoteRequired: selectedProduct.basePrice <= 0 ||
                  selectedPricedColorIsUnknown ||
                  selectedPricedMaterialIsUnknown ||
                  widthAdjustment.quoteRequired ||
                  lengthAdjustment.quoteRequired ||
                  heightAdjustment.quoteRequired ||
                  hasUnpricedAddOn,
              dimensionAdjustments,
              lineItems,
          };
      }, [
          draft.depthIn,
          draft.fabricColor,
          draft.heightIn,
          draft.materialId,
          draft.selectedAddOns,
          draft.selectedColor,
          draft.selectedMaterial,
          draft.widthIn,
          selectedProduct,
      ]);
      const configStorageKey = require$$0$1.useMemo(() => `${mergedConfig.storageKey}:customizer-configs`, [mergedConfig.storageKey]);
      const saveDraftConfig = require$$0$1.useCallback(() => {
          try {
              if (typeof window === 'undefined')
                  return;
              const existingRaw = localStorage.getItem(configStorageKey);
              const existing = existingRaw
                  ? JSON.parse(existingRaw)
                  : [];
              const materialName = getMaterialOption(selectedProduct, draft.materialId)?.name ?? 'Custom';
              const entry = {
                  id: `cfg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                  savedAt: new Date().toISOString(),
                  productId: selectedProduct.id,
                  name: `${selectedProduct.name} · ${materialName}`,
                  draft,
                  price: price.total,
              };
              localStorage.setItem(configStorageKey, JSON.stringify([entry, ...existing].slice(0, 25)));
              trackWidgetEvent({
                  ...analyticsContext,
                  type: 'configuration_saved',
                  productId: selectedProduct.id,
                  productName: selectedProduct.name,
                  metadata: {
                      source: 'customizer',
                      category: selectedProduct.category,
                      estimatedTotal: price.quoteRequired ? undefined : price.total,
                      pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
                  },
              });
              setSaveNotification('Configuration saved!');
              setTimeout(() => setSaveNotification(null), 2500);
          }
          catch (saveError) {
              console.error('Failed to save configuration:', saveError);
              setError('Failed to save configuration.');
          }
      }, [analyticsContext, configStorageKey, draft, price, selectedProduct]);
      const encodeSharePayload = require$$0$1.useCallback((payload) => {
          const json = JSON.stringify(payload);
          const b64 = typeof window !== 'undefined' ? window.btoa(unescape(encodeURIComponent(json))) : '';
          return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
      }, []);
      const shareLink = require$$0$1.useMemo(() => {
          if (typeof window === 'undefined')
              return '';
          const url = new URL(window.location.href);
          url.searchParams.set('modlyConfig', encodeSharePayload({ v: 1, productId: selectedProduct.id, draft, total: price.total }));
          return url.toString();
      }, [draft, encodeSharePayload, price.total, selectedProduct.id]);
      const copyShareLink = require$$0$1.useCallback(async () => {
          try {
              if (typeof window === 'undefined')
                  return;
              if (navigator.clipboard?.writeText) {
                  await navigator.clipboard.writeText(shareLink);
              }
              else {
                  const textarea = document.createElement('textarea');
                  textarea.value = shareLink;
                  document.body.appendChild(textarea);
                  textarea.select();
                  document.execCommand('copy');
                  textarea.remove();
              }
              setSaveNotification('Share link copied to clipboard!');
              setTimeout(() => setSaveNotification(null), 2500);
          }
          catch (copyError) {
              console.error('Failed to copy share link:', copyError);
              setError('Failed to copy share link.');
          }
      }, [shareLink]);
      const exportAsPdf = require$$0$1.useCallback(() => {
          if (typeof window === 'undefined')
              return;
          try {
              const customization = getCustomizationForProduct(selectedProduct);
              const selectedColor = getSelectedColorOption(selectedProduct, draft);
              const selectedMaterial = customization.materials.find((material) => draft.selectedMaterial
                  ? material.name.toLowerCase() === draft.selectedMaterial.toLowerCase()
                  : material.id === draft.materialId);
              const selectedColorName = draft.selectedColor ??
                  (customization.colors.length > 0
                      ? getColorName(selectedProduct, draft.fabricColor)
                      : undefined);
              const selectedMaterialName = draft.selectedMaterial ??
                  (customization.materials.length > 0
                      ? getMaterialOption(selectedProduct, draft.materialId)?.name
                      : undefined);
              const selectedAddOns = customization.addOns.filter((addOn) => (draft.selectedAddOns ?? []).includes(addOn.name));
              const generatedAt = new Date();
              const blob = generateCustomizationPdf({
                  brandName: mergedConfig.widgetTitle || mergedConfig.storeName || 'ModlyAI',
                  generatedAt,
                  referenceId: savedItem?.id,
                  storeId: selectedProduct.storeId ?? mergedConfig.storeId,
                  widgetId: mergedConfig.widgetId,
                  product: {
                      name: selectedProduct.name,
                      category: selectedProduct.category,
                      productUrl: selectedProduct.productUrl,
                      imageUrl: getProductImageUrl(selectedProduct),
                      basePrice: selectedProduct.basePrice,
                      pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
                      estimatedTotal: price.quoteRequired ? undefined : price.total,
                  },
                  selectedCustomizations: {
                      color: selectedColorName
                          ? { label: 'Color', value: selectedColorName, price: selectedColor?.price }
                          : undefined,
                      material: selectedMaterialName
                          ? { label: 'Material', value: selectedMaterialName, price: selectedMaterial?.priceDelta }
                          : undefined,
                      shopifyOptions: getSelectedShopifyOptions(selectedProduct).map((option) => ({
                          label: option.name,
                          value: option.value,
                          price: option.price,
                      })),
                      dimensions: {
                          length: draft.depthIn,
                          width: draft.widthIn,
                          height: draft.heightIn,
                          unit: customization.dimensions.width?.unit ?? customization.dimensions.length?.unit ?? 'in',
                      },
                      dimensionPriceAdjustments: price.dimensionAdjustments,
                      addOns: selectedAddOns.map((addOn) => ({
                          label: 'Add-on',
                          value: addOn.name,
                          price: addOn.price,
                      })),
                      customerRequestText: draft.customerRequestText,
                  },
                  pricing: {
                      basePrice: price.base,
                      lineItems: price.lineItems.map((lineItem) => ({
                          label: lineItem.label === 'Dimensions' ? 'Dimension adjustment' : lineItem.label,
                          amount: lineItem.amount,
                      })),
                      customizationTotal: price.customizations,
                      estimatedTotal: price.quoteRequired ? undefined : price.total,
                      quoteRequired: price.quoteRequired,
                  },
              });
              const blobUrl = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = blobUrl;
              link.download = createCustomizationPdfFilename(selectedProduct.name, generatedAt);
              document.body.appendChild(link);
              link.click();
              link.remove();
              window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
              setError(null);
              trackWidgetEvent({
                  ...analyticsContext,
                  type: 'pdf_exported',
                  productId: selectedProduct.id,
                  productName: selectedProduct.name,
                  metadata: {
                      source: 'customizer',
                      category: selectedProduct.category,
                      estimatedTotal: price.quoteRequired ? undefined : price.total,
                      pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
                  },
              });
              setSaveNotification('Export started.');
              setTimeout(() => setSaveNotification(null), 2500);
          }
          catch (exportError) {
              console.error('Failed to export customization:', exportError);
              setError('Could not export your customization. Please try again.');
          }
      }, [analyticsContext, draft, mergedConfig, price, savedItem?.id, selectedProduct]);
      const handleNavigateToRoomPlanner = () => {
          if (onNavigateToRoomPlanner) {
              onNavigateToRoomPlanner();
          }
          else {
              window.dispatchEvent(new CustomEvent('modly:navigate-to-room-planner'));
          }
      };
      const buildCustomizationConfig = require$$0$1.useCallback(() => {
          const customization = getCustomizationForProduct(selectedProduct);
          const currentMaterial = customization.materials.length > 0
              ? getMaterialOption(selectedProduct, draft.materialId)
              : undefined;
          const baseWidth = customization.dimensions.width?.default ?? selectedProduct.customizer.defaultWidthIn;
          const baseLength = customization.dimensions.length?.default ?? selectedProduct.customizer.defaultDepthIn;
          const baseHeight = customization.dimensions.height?.default ?? selectedProduct.dimensions.height;
          const widthDeltaIn = draft.widthIn - baseWidth;
          const depthDeltaIn = draft.depthIn - baseLength;
          const heightDeltaIn = (draft.heightIn ?? baseHeight) - baseHeight;
          const inchToMeters = 0.0254;
          const selectedAddOns = customization.addOns.filter((addOn) => (draft.selectedAddOns ?? []).includes(addOn.name));
          const ornamentDetails = selectedAddOns.map((addOn) => addOn.name);
          return {
              baseItemId: selectedProduct.id,
              baseItemType: selectedProduct.customizer.type,
              baseItemName: selectedProduct.name,
              source: selectedProduct.source,
              productUrl: selectedProduct.productUrl,
              price: selectedProduct.basePrice,
              externalId: selectedProduct.externalId,
              shopifyProductId: selectedProduct.shopifyProductId,
              storeId: selectedProduct.storeId,
              colorScheme: {
                  primary: draft.fabricColor,
                  secondary: selectedProduct.colors[1]?.hex,
              },
              materialOverrides: {
                  ...(currentMaterial?.name ? { primary: currentMaterial.name, upholstery: currentMaterial.name } : {}),
                  ...(selectedProduct.materials[1] ? { legs: selectedProduct.materials[1] } : {}),
              },
              ornamentDetails,
              dimensionAdjustments: {
                  width: Number((widthDeltaIn * inchToMeters).toFixed(3)),
                  length: Number((depthDeltaIn * inchToMeters).toFixed(3)),
                  height: Number((heightDeltaIn * inchToMeters).toFixed(3)),
              },
              aiNotes: `Configurator snapshot · ${selectedProduct.name} · Total $${price.total.toLocaleString()}`,
          };
      }, [draft.depthIn, draft.fabricColor, draft.heightIn, draft.materialId, draft.selectedAddOns, draft.widthIn, price.total, selectedProduct]);
      const buildCustomizedFurniturePayload = require$$0$1.useCallback((customizedData) => {
          const customization = getCustomizationForProduct(selectedProduct);
          const selectedColor = getSelectedColorOption(selectedProduct, draft);
          const selectedMaterial = customization.materials.find((material) => draft.selectedMaterial
              ? material.name.toLowerCase() === draft.selectedMaterial.toLowerCase()
              : material.id === draft.materialId);
          const selectedAddOns = customization.addOns.filter((addOn) => (draft.selectedAddOns ?? []).includes(addOn.name));
          const selectedColorName = draft.selectedColor ??
              (customization.colors.length > 0
                  ? getColorName(selectedProduct, draft.fabricColor)
                  : undefined);
          const selectedMaterialName = draft.selectedMaterial ??
              (customization.materials.length > 0
                  ? getMaterialOption(selectedProduct, draft.materialId)?.name
                  : undefined);
          const selectedShopifyOptions = getSelectedShopifyOptions(selectedProduct);
          const baseWidth = customization.dimensions.width?.default ?? selectedProduct.customizer.defaultWidthIn;
          const baseLength = customization.dimensions.length?.default ?? selectedProduct.customizer.defaultDepthIn;
          const baseHeight = customization.dimensions.height?.default ?? selectedProduct.dimensions.height;
          const inchToMeters = 0.0254;
          const dimensionAdjustments = customizedData?.dimensionAdjustments ?? {
              width: Number(((draft.widthIn - baseWidth) * inchToMeters).toFixed(3)),
              length: Number(((draft.depthIn - baseLength) * inchToMeters).toFixed(3)),
              height: Number((((draft.heightIn ?? baseHeight) - baseHeight) * inchToMeters).toFixed(3)),
          };
          const dimensions = customizedData?.dimensions ?? {
              length: Number((selectedProduct.dimensions.length + (dimensionAdjustments.length ?? 0)).toFixed(3)),
              width: Number((selectedProduct.dimensions.width + (dimensionAdjustments.width ?? 0)).toFixed(3)),
              height: Number((selectedProduct.dimensions.height + (dimensionAdjustments.height ?? 0)).toFixed(3)),
          };
          return {
              productId: selectedProduct.id,
              productName: selectedProduct.name,
              category: selectedProduct.category,
              imageUrl: getProductImageUrl(selectedProduct),
              source: selectedProduct.source,
              productUrl: selectedProduct.productUrl,
              price: selectedProduct.basePrice,
              basePrice: selectedProduct.basePrice,
              externalId: selectedProduct.externalId,
              shopifyProductId: selectedProduct.shopifyProductId,
              storeId: selectedProduct.storeId ?? mergedConfig.storeId,
              widgetId: mergedConfig.widgetId,
              name: selectedProduct.name,
              baseItemType: selectedProduct.category,
              dimensions,
              colorScheme: {
                  primary: selectedColorName ?? getColorName(selectedProduct, draft.fabricColor),
                  secondary: selectedProduct.colors[1]?.name,
              },
              materials: selectedMaterialName ? { primary: selectedMaterialName } : {},
              ornamentDetails: customizedData?.ornamentDetails ?? selectedAddOns.map((addOn) => addOn.name),
              aiNotes: customizedData?.aiNotes ??
                  `Configurator snapshot - ${selectedProduct.name} - ${price.quoteRequired ? 'Quote required' : `$${price.total.toLocaleString()}`}`,
              dimensionChanges: dimensionAdjustments,
              selectedColor: selectedColorName
                  ? { name: selectedColorName, price: selectedColor?.price }
                  : undefined,
              selectedColorPrice: selectedColor?.price,
              selectedMaterial: selectedMaterialName
                  ? { name: selectedMaterialName, price: selectedMaterial?.priceDelta }
                  : undefined,
              selectedMaterialPrice: selectedMaterial?.priceDelta,
              selectedShopifyOptions,
              selectedDimensions: {
                  width: draft.widthIn,
                  length: draft.depthIn,
                  height: draft.heightIn,
                  unit: customization.dimensions.width?.unit ?? customization.dimensions.length?.unit ?? 'in',
              },
              dimensionPriceAdjustments: price.dimensionAdjustments,
              selectedAddOns,
              customerRequestText: draft.customerRequestText,
              customizationPrice: price.customizations,
              estimatedTotal: price.quoteRequired ? undefined : price.total,
              pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
          };
      }, [draft, mergedConfig.storeId, mergedConfig.widgetId, price, selectedProduct]);
      const saveCustomizedFurnitureForCurrentDraft = require$$0$1.useCallback((customizedData) => {
          const saved = storage.saveCustomizedFurniture(buildCustomizedFurniturePayload(customizedData));
          setSavedItem(saved);
          return saved;
      }, [buildCustomizedFurniturePayload, storage]);
      const handleCustomize = require$$0$1.useCallback(async (customizationConfig) => {
          setIsLoading(true);
          setError(null);
          setSaveNotification(null);
          setLastConfig(customizationConfig);
          const immediatePreview = {
              name: selectedProduct.name,
              colorScheme: customizationConfig.colorScheme,
              materials: {
                  primary: customizationConfig.materialOverrides.primary,
                  legs: customizationConfig.materialOverrides.legs,
                  upholstery: customizationConfig.materialOverrides.upholstery,
              },
              ornamentDetails: customizationConfig.ornamentDetails || [],
              dimensionAdjustments: customizationConfig.dimensionAdjustments,
              aiNotes: 'Processing AI customization...',
          };
          setCustomizedItem(immediatePreview);
          try {
              const data = await apiClient.customizeFurniture(customizationConfig);
              const mergedDimensions = data.dimensions || {
                  length: Number((selectedProduct.dimensions.length +
                      (customizationConfig.dimensionAdjustments?.length ?? 0)).toFixed(3)),
                  width: Number((selectedProduct.dimensions.width +
                      (customizationConfig.dimensionAdjustments?.width ?? 0)).toFixed(3)),
                  height: Number((selectedProduct.dimensions.height +
                      (customizationConfig.dimensionAdjustments?.height ?? 0)).toFixed(3)),
              };
              const mergedData = {
                  ...immediatePreview,
                  ...data,
                  name: selectedProduct.name,
                  dimensions: mergedDimensions,
                  colorScheme: data.colorScheme || customizationConfig.colorScheme,
                  materials: data.materials || {
                      primary: customizationConfig.materialOverrides.primary,
                      legs: customizationConfig.materialOverrides.legs,
                      upholstery: customizationConfig.materialOverrides.upholstery,
                  },
                  ornamentDetails: data.ornamentDetails || customizationConfig.ornamentDetails,
                  dimensionAdjustments: data.dimensionAdjustments || customizationConfig.dimensionAdjustments,
              };
              setCustomizedItem(mergedData);
              try {
                  saveCustomizedFurnitureForCurrentDraft(mergedData);
                  setSaveNotification('Customized furniture saved automatically!');
                  setTimeout(() => setSaveNotification(null), 3000);
              }
              catch (saveError) {
                  console.error('Failed to auto-save:', saveError);
              }
          }
          catch (customizeError) {
              const errorMessage = customizeError instanceof Error ? customizeError.message : 'An error occurred';
              setError(errorMessage);
              mergedConfig.onError?.(customizeError instanceof Error ? customizeError : new Error(errorMessage));
          }
          finally {
              setIsLoading(false);
          }
      }, [
          apiClient,
          mergedConfig,
          saveCustomizedFurnitureForCurrentDraft,
          selectedProduct,
      ]);
      const handleApply = require$$0$1.useCallback(() => {
          setError(null);
          if (validationErrors.length > 0) {
              setError(validationErrors[0] ?? 'Please review your customizations.');
              return;
          }
          handleCustomize(buildCustomizationConfig());
      }, [buildCustomizationConfig, handleCustomize, validationErrors]);
      const handleFinalize = () => {
          if (!enabledActions.requestQuote)
              return;
          setError(null);
          setSaveNotification(null);
          if (!selectedProduct?.id) {
              setError('Please customize an item first before requesting a quote.');
              return;
          }
          if (validationErrors.length > 0) {
              setError(validationErrors[0] ?? 'Please review your customizations.');
              return;
          }
          try {
              if (!savedItem) {
                  saveCustomizedFurnitureForCurrentDraft();
              }
              trackWidgetEvent({
                  ...analyticsContext,
                  type: 'quote_started',
                  productId: selectedProduct.id,
                  productName: selectedProduct.name,
                  metadata: {
                      source: 'customizer',
                      quoteType: 'customized_furniture',
                      estimatedTotal: price.quoteRequired ? undefined : price.total,
                      pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
                  },
              });
              setShowFinalizeModal(false);
              setShowQuoteForm(true);
          }
          catch (saveError) {
              console.error('Failed to save customization before quote:', saveError);
              setError('Could not prepare your customization for quote. Please try again.');
          }
      };
      const handleProceedToQuote = () => {
          if (!enabledActions.requestQuote)
              return;
          trackWidgetEvent({
              ...analyticsContext,
              type: 'quote_started',
              productId: selectedProduct.id,
              productName: selectedProduct.name,
              metadata: {
                  source: 'customizer',
                  quoteType: 'customized_furniture',
                  estimatedTotal: price.quoteRequired ? undefined : price.total,
                  pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
              },
          });
          setShowFinalizeModal(false);
          setShowQuoteForm(true);
      };
      const handleQuoteSubmit = async (quoteRequest) => {
          try {
              const response = await apiClient.submitQuoteRequest(quoteRequest);
              setQuoteSuccess(true);
              setSaveNotification('Quote request sent. The store will follow up with pricing and next steps.');
              setTimeout(() => {
                  setQuoteSuccess(false);
                  setSaveNotification(null);
              }, 5000);
              return response;
          }
          catch (quoteError) {
              throw quoteError;
          }
      };
      return (jsxRuntimeExports.jsxs(WidgetProvider, { apiClient: apiClient, storage: storage, config: mergedConfig, children: [jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white", children: [jsxRuntimeExports.jsx("section", { className: "py-12 bg-gradient-to-br from-purple-600 to-purple-800 text-white", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4", children: jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4", children: [jsxRuntimeExports.jsx(Palette, { className: "w-4 h-4" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "AI-Powered Customization" })] }), jsxRuntimeExports.jsx("h1", { className: "text-5xl font-bold mb-4", children: "Furniture Customizer" }), jsxRuntimeExports.jsx("p", { className: "text-xl text-purple-100 mb-8", children: "Customize furniture colors, materials, and dimensions with AI assistance. See changes in real-time and get instant feasibility feedback." }), jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Real-time preview" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Factory-approved options" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Instant pricing" })] })] })] }) }) }), jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [saveNotification && (jsxRuntimeExports.jsxs("div", { className: "mt-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5" }), jsxRuntimeExports.jsx("span", { className: "font-medium", children: saveNotification })] })), error && (jsxRuntimeExports.jsx("div", { className: "mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl", children: jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [jsxRuntimeExports.jsx(Info, { className: "w-5 h-5 mt-0.5" }), jsxRuntimeExports.jsx("div", { children: error })] }) }))] }), jsxRuntimeExports.jsx(FurnitureCustomizerPanel, { products: availableProducts, draft: draft, setDraft: setDraftWithHistory, isApplying: isLoading, validationErrors: validationErrors, price: price, onApply: handleApply, onUndo: handleUndo, onRedo: handleRedo, canUndo: canUndo, canRedo: canRedo, onSaveConfig: saveDraftConfig, onShareLink: copyShareLink, onExportPdf: exportAsPdf, onViewFullRoomAnalysis: handleNavigateToRoomPlanner }), jsxRuntimeExports.jsx("section", { className: "py-8 bg-stone-50/70 border-t border-stone-200", children: jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4", children: jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-stone-200 bg-[#fffaf4] p-5 shadow-sm", children: [jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-gray-950", children: "Love Your Custom Design?" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Save, share, export, or send this configuration to the store." })] }), jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-gray-900", children: ["Estimated total: ", price.quoteRequired ? 'Quote required' : `$${price.total.toLocaleString()}`] })] }), jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-5", children: [enabledActions.requestQuote && (jsxRuntimeExports.jsx("button", { type: "button", onClick: handleFinalize, className: "min-h-12 rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 sm:col-span-2 lg:col-span-1", style: { backgroundColor: primaryColor }, children: "Add to Quote" })), jsxRuntimeExports.jsx("button", { type: "button", onClick: saveDraftConfig, className: "min-h-12 rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-stone-50", children: "Save Configuration" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: copyShareLink, className: "min-h-12 rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-stone-50", children: "Share Design" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: exportAsPdf, className: "min-h-12 rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-stone-50", children: "Export PDF" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleNavigateToRoomPlanner, className: "min-h-12 rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-stone-50", children: "View in Room Planner" })] })] }) }) })] }), jsxRuntimeExports.jsx(FinalizeQuoteModal, { isOpen: enabledActions.requestQuote && showFinalizeModal, onClose: () => setShowFinalizeModal(false), onProceed: handleProceedToQuote, item: savedItem }), jsxRuntimeExports.jsx(QuoteRequestForm, { isOpen: enabledActions.requestQuote && showQuoteForm, onClose: () => setShowQuoteForm(false), onSubmit: handleQuoteSubmit, item: savedItem }), quoteSuccess && (jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-slide-up", children: [jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Quote Request Submitted!" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-white/90", children: "We'll contact you soon with details." })] })] }))] }));
  }

  function MessageBubble({ message, onCustomizeItem, onAddToRoomPlanner, onViewInCatalog, enabledActions, primaryColor, analyticsContext }) {
      const isUser = message.role === 'user';
      const isThinking = message.type === 'thinking';
      const actions = enabledActions ?? { viewInCatalog: true, customize: true, requestQuote: true };
      return (jsxRuntimeExports.jsx("div", { className: `flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`, children: jsxRuntimeExports.jsx("div", { className: `max-w-[80%] rounded-2xl px-4 py-3 ${isUser
                ? 'bg-blue-500 text-white'
                : isThinking
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-gray-50 text-gray-900 border border-gray-200'}`, children: isThinking ? (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0ms' } }), jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '150ms' } }), jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '300ms' } })] }), jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Thinking..." })] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("div", { className: "whitespace-pre-wrap text-sm leading-relaxed", children: message.content }), message.metadata?.recommendations && message.metadata?.recommendations.length > 0 && (jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: message.metadata?.recommendations.map((rec, index) => (jsxRuntimeExports.jsx(RecommendationCard, { recommendation: rec, onCustomize: onCustomizeItem, onAddToRoomPlanner: onAddToRoomPlanner, onViewInCatalog: onViewInCatalog, enabledActions: actions, primaryColor: primaryColor, analyticsContext: analyticsContext }, rec.item.id || index))) })), message.metadata?.action && (jsxRuntimeExports.jsx("div", { className: "mt-3 pt-3 border-t border-gray-200", children: jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500", children: [message.metadata?.action?.type === 'open_room_planner' && 'Ready to analyze your room', message.metadata?.action?.type === 'open_customizer' && 'Ready to customize', message.metadata?.action?.type === 'show_catalog' && 'Ready to browse catalog'] }) }))] })) }) }));
  }
  function getProductCatalogUrl(item) {
      return getRealProductUrl(item);
  }
  function RecommendationCard({ recommendation, onCustomize, onAddToRoomPlanner, onViewInCatalog, enabledActions, primaryColor, analyticsContext, }) {
      const item = recommendation.item;
      const catalogUrl = getProductCatalogUrl(item);
      const primaryTextColor = primaryColor ? getReadableTextColor(primaryColor) : undefined;
      const handleViewInCatalogClick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          if (!catalogUrl || typeof window === 'undefined')
              return;
          if (onViewInCatalog) {
              onViewInCatalog(item);
              return;
          }
          trackWidgetEvent({
              ...analyticsContext,
              type: 'view_in_catalog_clicked',
              productId: item.id,
              productName: item.name,
              metadata: {
                  category: item.category,
                  productUrl: catalogUrl,
              },
          });
          window.open(catalogUrl, '_blank', 'noopener,noreferrer');
      };
      return (jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-3 shadow-sm", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-gray-900", children: item.name }), recommendation.matchScore && (jsxRuntimeExports.jsxs("span", { className: "text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded", children: [Math.round(recommendation.matchScore * 100), "% match"] }))] }), jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-600 mb-2", children: [item.category, item.subCategory ? ` • ${item.subCategory}` : ''] }), item.priceRange && (jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-gray-900 mb-2", children: ["$", item.priceRange.min?.toLocaleString(), item.priceRange.max && item.priceRange.max !== item.priceRange.min
                          ? ` - $${item.priceRange.max.toLocaleString()}`
                          : ''] })), recommendation.reasoning && (jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-2", children: recommendation.reasoning })), jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [enabledActions.viewInCatalog && catalogUrl ? (jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleViewInCatalogClick, className: "flex-1 py-1.5 px-3 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-1 border border-gray-300", children: [jsxRuntimeExports.jsxs("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }), jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })] }), "View in Catalog"] })) : enabledActions.viewInCatalog ? (jsxRuntimeExports.jsx("button", { type: "button", disabled: true, className: "flex-1 py-1.5 px-3 bg-gray-100 text-gray-400 text-xs rounded cursor-not-allowed flex items-center justify-center gap-1 border border-gray-300", children: "Catalog link unavailable" })) : null, enabledActions.customize && onCustomize && (jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onCustomize(item), className: "flex-1 py-1.5 px-3 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-1", style: primaryColor ? { backgroundColor: primaryColor, color: primaryTextColor } : undefined, children: [jsxRuntimeExports.jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }), "Customize this"] }))] })] }));
  }

  function ConversationInterface({ aiService, onCustomizeItem, onAddToRoomPlanner, onOpenRoomPlanner, onOpenCustomizer, onShowCatalog, onViewInCatalog, enabledActions, primaryColor, analyticsContext, }) {
      const [input, setInput] = require$$0$1.useState('');
      const [isLoading, setIsLoading] = require$$0$1.useState(false);
      const [messages, setMessages] = require$$0$1.useState([]);
      const messagesEndRef = require$$0$1.useRef(null);
      const inputRef = require$$0$1.useRef(null);
      const fallbackMessage = 'Sorry, I could not generate a response right now. Please try again.';
      const primaryTextColor = primaryColor ? getReadableTextColor(primaryColor) : undefined;
      // Load messages from AI service
      require$$0$1.useEffect(() => {
          setMessages(aiService.getMessages());
      }, [aiService]);
      // Scroll to bottom when messages change
      require$$0$1.useEffect(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);
      const handleSend = async () => {
          if (!input.trim() || isLoading)
              return;
          const userMessage = input.trim();
          const hasExistingUserMessage = messages.some((message) => message.role === 'user');
          setInput('');
          setIsLoading(true);
          if (!hasExistingUserMessage) {
              trackWidgetEvent({
                  ...analyticsContext,
                  type: 'chat_started',
              });
          }
          trackWidgetEvent({
              ...analyticsContext,
              type: 'message_sent',
              metadata: {
                  messageLength: userMessage.length,
              },
          });
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
              response.message.metadata?.recommendations?.forEach((rec) => {
                  trackWidgetEvent({
                      ...analyticsContext,
                      type: 'product_recommended',
                      productId: rec.item.id,
                      productName: rec.item.name,
                      metadata: {
                          category: rec.item.category,
                          price: rec.item.priceRange?.min ?? rec.item.price,
                          recommendationSource: 'chat',
                      },
                  });
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
              const errorMsg = {
                  id: `msg-error-${Date.now()}`,
                  role: 'assistant',
                  type: 'text',
                  content: fallbackMessage,
                  timestamp: Date.now(),
              };
              setMessages((prev) => [...prev.filter((m) => m.type !== 'thinking'), errorMsg]);
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
      return (jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full bg-white", children: [jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-2", children: [messages.length === 0 ? (jsxRuntimeExports.jsx("div", { className: "text-center text-gray-500 py-8", children: jsxRuntimeExports.jsx("p", { children: "Start a conversation to get help with your furniture needs." }) })) : (messages.map((message) => (jsxRuntimeExports.jsx(MessageBubble, { message: message, onCustomizeItem: onCustomizeItem, onAddToRoomPlanner: onAddToRoomPlanner, onViewInCatalog: onViewInCatalog, enabledActions: enabledActions, primaryColor: primaryColor, analyticsContext: analyticsContext }, message.id)))), jsxRuntimeExports.jsx("div", { ref: messagesEndRef })] }), jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-200 p-4 bg-gray-50", children: [jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [jsxRuntimeExports.jsx("textarea", { ref: inputRef, value: input, onChange: (e) => setInput(e.target.value), onKeyDown: handleKeyPress, placeholder: "Type your message...", className: "flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none", rows: 1, style: { minHeight: '40px', maxHeight: '120px' }, disabled: isLoading }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleSend, disabled: !input.trim() || isLoading, className: "px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium", style: primaryColor ? { backgroundColor: primaryColor, color: primaryTextColor } : undefined, children: isLoading ? (jsxRuntimeExports.jsxs("svg", { className: "animate-spin h-5 w-5", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] })) : ('Send') })] }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-2 text-center", children: "Press Enter to send, Shift+Enter for new line" })] })] }));
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
      const [step, setStep] = require$$0$1.useState('validate');
      const [flowType, setFlowType] = require$$0$1.useState('quote');
      const [validation, setValidation] = require$$0$1.useState(null);
      const [specSheet, setSpecSheet] = require$$0$1.useState(null);
      const [error, setError] = require$$0$1.useState(null);
      // Form fields for quote request
      const [customerName, setCustomerName] = require$$0$1.useState('');
      const [customerEmail, setCustomerEmail] = require$$0$1.useState('');
      const [customerPhone, setCustomerPhone] = require$$0$1.useState('');
      const [customerNotes, setCustomerNotes] = require$$0$1.useState('');
      require$$0$1.useEffect(() => {
          // Validate configuration
          const validationResult = validateConfiguration(config);
          setValidation(validationResult);
          // Determine flow type based on product pricing
          const requiresQuote = !product?.priceRange || product.stockStatus === 'custom_order' || product.source === 'shopify';
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
              const widgetConfig = apiClient['config'];
              trackWidgetEvent({
                  apiBaseUrl: widgetConfig.apiBaseUrl,
                  storeId: widgetConfig.storeId || widgetConfig.widgetId || config.storeId || product?.storeId,
                  widgetId: widgetConfig.widgetId,
                  type: 'quote_started',
                  productId: product?.id || config.baseItemId,
                  productName: product?.name || config.baseItemName,
                  metadata: {
                      source: 'customizer_submit_flow',
                      quoteType: 'customized_furniture',
                  },
              });
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
                      productUrl: config.productUrl || product?.productUrl || product?.url,
                      price: config.price ?? product?.priceRange?.min ?? product?.price,
                      externalId: config.externalId || product?.externalId,
                      shopifyProductId: config.shopifyProductId || product?.shopifyProductId,
                      storeId: config.storeId || product?.storeId,
                      source: config.source || product?.source,
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
          return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col", children: [jsxRuntimeExports.jsx(SpecSheetPreview, { specSheet: specSheet, onClose: onClose }), validation && validation.warnings.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "px-6 py-3 bg-yellow-50 border-t border-yellow-200", children: [jsxRuntimeExports.jsx("p", { className: "text-sm text-yellow-800 font-medium mb-1", children: "\u26A0\uFE0F Warnings:" }), validation.warnings.map((warning, index) => (jsxRuntimeExports.jsxs("p", { className: "text-xs text-yellow-700", children: ["\u2022 ", warning.message] }, index)))] })), error && (jsxRuntimeExports.jsx("div", { className: "px-6 py-3 bg-red-50 border-t border-red-200", children: jsxRuntimeExports.jsx("p", { className: "text-sm text-red-700", children: error }) })), jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-200 p-4 flex gap-3", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors", children: "Cancel" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleContinue, className: "flex-1 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors", children: flowType === 'cart' ? 'Add to Cart' : 'Request Quote' })] })] }) }));
      }
      if (step === 'form') {
          return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg max-w-md w-full p-6", children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Request a Quote" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-6", children: "Fill in your details and we'll get back to you with a personalized quote." }), error && (jsxRuntimeExports.jsx("div", { className: "bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4 text-sm", children: error })), jsxRuntimeExports.jsxs("div", { className: "space-y-4 mb-6", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: ["Name ", jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })] }), jsxRuntimeExports.jsx("input", { type: "text", value: customerName, onChange: (e) => setCustomerName(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "Your full name" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: ["Email ", jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })] }), jsxRuntimeExports.jsx("input", { type: "email", value: customerEmail, onChange: (e) => setCustomerEmail(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "your.email@example.com" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Phone" }), jsxRuntimeExports.jsx("input", { type: "tel", value: customerPhone, onChange: (e) => setCustomerPhone(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "Optional" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Additional Notes" }), jsxRuntimeExports.jsx("textarea", { value: customerNotes, onChange: (e) => setCustomerNotes(e.target.value), rows: 3, className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none", placeholder: "Any special requests or questions?" })] })] }), jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setStep('preview'), className: "px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors", children: "Back" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleSubmitQuote, className: "flex-1 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors", children: "Submit Quote Request" })] })] }) }));
      }
      if (step === 'submitting') {
          return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-8 text-center", children: [jsxRuntimeExports.jsx("div", { className: "animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: flowType === 'cart' ? 'Adding to cart...' : 'Submitting quote request...' })] }) }));
      }
      if (step === 'success') {
          return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg p-8 text-center max-w-md", children: [jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: jsxRuntimeExports.jsx("svg", { className: "w-8 h-8 text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }), jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: flowType === 'cart' ? 'Added to Cart!' : 'Quote Request Submitted!' }), jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: flowType === 'cart'
                              ? 'Your customized product has been added to your cart.'
                              : 'Quote request sent. The store will follow up with pricing and next steps.' })] }) }));
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
              if (typeof window !== 'undefined') {
                  const stored = sessionStorage.getItem(STORAGE_KEY);
                  if (stored) {
                      return JSON.parse(stored);
                  }
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
              if (typeof window !== 'undefined') {
                  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
              }
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
      updateMessages(messages) {
          this.state.messages = messages;
          this.saveState();
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
          this.fallbackMessage = 'Sorry, I could not generate a response right now. Please try again.';
          this.apiClient = apiClient;
          this.config = config;
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
          this.ensureInitialWelcomeMessage();
      }
      ensureInitialWelcomeMessage() {
          const welcomeText = getWelcomeMessage(this.config);
          const messages = this.stateManager.getMessages();
          if (messages.length === 0) {
              this.addGreeting(welcomeText);
              return;
          }
          const [first, ...rest] = messages;
          const shouldUpdateWelcome = first.role === 'assistant' &&
              (first.isWelcome ||
                  first.id.startsWith('msg-greeting-') ||
                  first.content === DEFAULT_WELCOME_MESSAGE);
          if (shouldUpdateWelcome && first.content !== welcomeText) {
              const updatedMessages = [
                  {
                      ...first,
                      content: welcomeText,
                      isWelcome: true,
                  },
                  ...rest,
              ];
              this.stateManager.updateMessages(updatedMessages);
              return;
          }
      }
      addGreeting(welcomeText = getWelcomeMessage(this.config)) {
          const greeting = {
              id: `msg-greeting-${Date.now()}`,
              role: 'assistant',
              type: 'text',
              content: welcomeText,
              timestamp: Date.now(),
              isWelcome: true,
          };
          this.stateManager.addMessage(greeting);
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
              // Add a user-safe error message while keeping the real error in the console.
              const errorMsg = {
                  id: `msg-error-${Date.now()}`,
                  role: 'assistant',
                  type: 'text',
                  content: this.fallbackMessage,
                  timestamp: Date.now(),
              };
              this.stateManager.addMessage(errorMsg);
              return { message: errorMsg };
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

  function FurnitureAIWidget({ config = {}, defaultTab, widgetTitle }) {
      const mergedConfig = require$$0$1.useMemo(() => mergeConfig(config), [config]);
      const apiClient = require$$0$1.useMemo(() => new ApiClient(mergedConfig), [mergedConfig]);
      const storage = require$$0$1.useMemo(() => new Storage(mergedConfig.storageKey), [mergedConfig.storageKey]);
      const aiService = require$$0$1.useMemo(() => new AIService(apiClient, mergedConfig), [apiClient, mergedConfig]);
      const enabledActions = require$$0$1.useMemo(() => getEnabledActions(mergedConfig), [mergedConfig]);
      const analyticsContext = require$$0$1.useMemo(() => ({
          apiBaseUrl: mergedConfig.apiBaseUrl,
          storeId: mergedConfig.storeId || mergedConfig.widgetId,
          widgetId: mergedConfig.widgetId,
      }), [mergedConfig.apiBaseUrl, mergedConfig.storeId, mergedConfig.widgetId]);
      const primaryColor = getPrimaryColor(mergedConfig);
      const displayTitle = widgetTitle ||
          config.widgetTitle ||
          config.theme?.buttonText ||
          DEFAULT_WIDGET_TITLE;
      const primaryTextColor = getReadableTextColor(primaryColor);
      const [viewMode, setViewMode] = require$$0$1.useState('conversation');
      const [selectedProduct, setSelectedProduct] = require$$0$1.useState(null);
      const [saveNotification, setSaveNotification] = require$$0$1.useState(null);
      const [selectedCatalogItem, setSelectedCatalogItem] = require$$0$1.useState(null);
      const [isCatalogModalOpen, setIsCatalogModalOpen] = require$$0$1.useState(false);
      const [showSubmitModal, setShowSubmitModal] = require$$0$1.useState(false);
      const [submitConfig, setSubmitConfig] = require$$0$1.useState(null);
      require$$0$1.useEffect(() => {
          // Handle external events for backward compatibility
          const handleCustomizeItem = (event) => {
              if (!enabledActions.customize)
                  return;
              trackWidgetEvent({
                  ...analyticsContext,
                  type: 'customize_clicked',
                  productId: event.detail.id,
                  productName: event.detail.name,
                  metadata: {
                      source: 'customize_event',
                      category: event.detail.category,
                  },
              });
              setSelectedProduct(productFromFurnitureItem(event.detail));
              setViewMode('customizer');
          };
          const handleNavigateToRoomPlanner = () => {
              setViewMode('room-planner');
          };
          const handleNavigateToCustomizer = () => {
              if (!enabledActions.customize)
                  return;
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
      }, [analyticsContext, enabledActions.customize]);
      // Cleanup AI service on unmount
      require$$0$1.useEffect(() => {
          return () => {
              aiService.destroy();
          };
      }, [aiService]);
      // Convert FurnitureItem to CustomizedFurnitureItem format
      const convertFurnitureItemToCustomized = (item) => {
          const product = productFromFurnitureItem(item);
          return {
              productId: product.id,
              productName: product.name,
              category: product.category || item.category || item.subCategory || 'furniture',
              imageUrl: item.images?.[0] || product.imageUrl || product.image || product.thumbnail,
              source: item.source,
              productUrl: item.productUrl || item.url,
              price: item.priceRange?.min ?? item.price,
              externalId: item.externalId,
              shopifyProductId: item.shopifyProductId,
              storeId: item.storeId,
              name: product.name,
              baseItemType: product.category || item.category || item.subCategory || 'furniture',
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
          if (!enabledActions.customize)
              return;
          trackWidgetEvent({
              ...analyticsContext,
              type: 'customize_clicked',
              productId: item.id,
              productName: item.name,
              metadata: {
                  source: 'chat',
                  category: item.category,
              },
          });
          setSelectedProduct(productFromFurnitureItem(item));
          setViewMode('customizer');
      };
      const handleOpenRoomPlanner = () => {
          setViewMode('room-planner');
      };
      const handleOpenCustomizer = () => {
          if (!enabledActions.customize)
              return;
          trackWidgetEvent({
              ...analyticsContext,
              type: 'customize_clicked',
              metadata: {
                  source: 'navigation',
              },
          });
          setViewMode('customizer');
      };
      const handleShowCatalog = () => {
          // Catalog navigation should not create a follow-up chat request.
      };
      const handleViewInCatalog = (item) => {
          const catalogUrl = getRealProductUrl(item);
          trackWidgetEvent({
              ...analyticsContext,
              type: 'view_in_catalog_clicked',
              productId: item.id,
              productName: item.name,
              metadata: {
                  category: item.category,
                  productUrl: catalogUrl,
              },
          });
          if (catalogUrl && typeof window !== 'undefined') {
              window.open(catalogUrl, '_blank', 'noopener,noreferrer');
          }
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
      return (jsxRuntimeExports.jsxs("div", { className: "furniture-widget-ai h-full flex flex-col", children: [jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 border-b border-gray-200 px-6 py-4 pr-16 flex items-center justify-between", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: displayTitle === DEFAULT_WIDGET_TITLE ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("span", { children: "Modly" }), jsxRuntimeExports.jsx("span", { style: { color: primaryColor }, children: "AI" })] })) : (jsxRuntimeExports.jsx("span", { children: displayTitle })) }), viewMode === 'conversation' && (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: handleOpenRoomPlanner, className: "text-sm px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors", children: "Room Planner" }), enabledActions.customize && (jsxRuntimeExports.jsx("button", { type: "button", onClick: handleOpenCustomizer, className: "text-sm px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors", children: "Customizer" }))] })), viewMode !== 'conversation' && (jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleBackToConversation, className: "text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1", children: [jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }), "Back to Chat"] }))] }), jsxRuntimeExports.jsx("div", { className: "flex gap-2" })] }), jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-hidden", children: [viewMode === 'conversation' && (jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col", children: [saveNotification && (jsxRuntimeExports.jsx("div", { className: "bg-green-500 text-white px-4 py-2 text-sm text-center flex-shrink-0", children: saveNotification })), jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0", children: jsxRuntimeExports.jsx(ConversationInterface, { aiService: aiService, onCustomizeItem: handleCustomizeItem, onAddToRoomPlanner: handleAddToRoomPlanner, onOpenRoomPlanner: handleOpenRoomPlanner, onOpenCustomizer: handleOpenCustomizer, onShowCatalog: handleShowCatalog, onViewInCatalog: handleViewInCatalog, enabledActions: enabledActions, primaryColor: primaryColor, analyticsContext: analyticsContext }) })] })), viewMode === 'room-planner' && (jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto", children: jsxRuntimeExports.jsx(FurnitureRoomPlannerWidget, { config: mergedConfig, onCustomizeItem: enabledActions.customize ? handleCustomizeItem : undefined, onNavigateToCustomizer: enabledActions.customize ? handleOpenCustomizer : undefined }) })), viewMode === 'customizer' && (jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto", children: enabledActions.customize && (jsxRuntimeExports.jsx(FurnitureCustomizerWidget, { config: mergedConfig, onNavigateToRoomPlanner: handleOpenRoomPlanner, selectedProduct: selectedProduct, onSelectedProductChange: setSelectedProduct })) }))] }), showSubmitModal && submitConfig && (jsxRuntimeExports.jsx(SubmitFlowModal, { config: submitConfig.config, product: submitConfig.product, apiClient: apiClient, onSuccess: handleSubmitSuccess, onClose: handleCloseSubmitModal })), isCatalogModalOpen && selectedCatalogItem && (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-md w-full p-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: selectedCatalogItem.name }), jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6", children: [selectedCatalogItem.dimensions && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-1", children: "Dimensions" }), jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [selectedCatalogItem.dimensions.length, "\" L \u00D7 ", selectedCatalogItem.dimensions.width, "\" W \u00D7 ", selectedCatalogItem.dimensions.height, "\" H"] })] })), selectedCatalogItem.materials && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-1", children: "Materials" }), jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [selectedCatalogItem.materials.primary, selectedCatalogItem.materials.secondary && `, ${selectedCatalogItem.materials.secondary}`] })] })), selectedCatalogItem.colors && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-1", children: "Colors" }), jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [selectedCatalogItem.colors.main, selectedCatalogItem.colors.accent && ` / ${selectedCatalogItem.colors.accent}`] })] })), jsxRuntimeExports.jsx("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4", children: jsxRuntimeExports.jsxs("p", { className: "text-sm text-blue-900", children: [jsxRuntimeExports.jsx("strong", { children: "Catalog coming soon." }), " You can customize this item instead."] }) })] }), jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [enabledActions.customize && (jsxRuntimeExports.jsx("button", { type: "button", onClick: handleCustomizeFromCatalog, className: "flex-1 text-white px-4 py-2 rounded-lg transition-colors font-medium", style: { backgroundColor: primaryColor, color: primaryTextColor }, children: "Customize This" })), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleCloseCatalogModal, className: "flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium", children: "Close" })] })] }) }))] }));
  }

  function FurnitureAIWidgetButton({ config = {}, defaultTab = 'room-planner', buttonText, buttonPosition = 'bottom-right', buttonStyle, className = '' }) {
      const [isOpen, setIsOpen] = require$$0$1.useState(false);
      const displayTitle = config.widgetTitle ||
          config.theme?.buttonText ||
          buttonText ||
          DEFAULT_WIDGET_TITLE;
      const trackOpen = () => {
          trackWidgetEvent({
              apiBaseUrl: config.apiBaseUrl,
              storeId: config.storeId || config.widgetId,
              widgetId: config.widgetId,
              type: 'widget_opened',
              metadata: {
                  source: 'widget_button',
              },
          });
      };
      require$$0$1.useEffect(() => {
          const onOpen = () => {
              setIsOpen(true);
              trackOpen();
          };
          window.addEventListener('modly:open-widget', onOpen);
          return () => window.removeEventListener('modly:open-widget', onOpen);
      }, [config.apiBaseUrl, config.storeId, config.widgetId]);
      require$$0$1.useEffect(() => {
          const handleEscape = (e) => {
              if (e.key === 'Escape' && isOpen) {
                  setIsOpen(false);
              }
          };
          document.addEventListener('keydown', handleEscape);
          return () => document.removeEventListener('keydown', handleEscape);
      }, [isOpen]);
      require$$0$1.useEffect(() => {
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
      const finalButtonStyle = require$$0$1.useMemo(() => {
          const primaryColor = getPrimaryColor(config);
          const textColor = getReadableTextColor(primaryColor);
          const isDarkPrimary = isDarkColor(primaryColor);
          const baseStyle = {
              height: '44px',
              minWidth: '112px',
              padding: '0 18px',
              background: isDarkPrimary
                  ? `linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 48%, rgba(0,0,0,0.10) 100%), ${primaryColor}`
                  : `linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.10) 45%, rgba(17,24,39,0.06) 100%), ${primaryColor}`,
              border: isDarkPrimary
                  ? '1px solid rgba(255, 255, 255, 0.20)'
                  : '1px solid rgba(17, 24, 39, 0.14)',
              color: textColor,
              boxShadow: '0 10px 24px rgba(15, 23, 42, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.20)',
              ...buttonStyle
          };
          return baseStyle;
      }, [config, buttonStyle]);
      return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("button", { onClick: () => {
                      setIsOpen(true);
                      trackOpen();
                  }, style: finalButtonStyle, className: `modly-widget-button fixed ${positionClasses[buttonPosition]} z-50 cursor-pointer rounded-full inline-flex items-center justify-center gap-2 transition-all duration-200 ease-out ${className}`, onMouseEnter: (e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.filter = 'brightness(1.04)';
                      e.currentTarget.style.boxShadow = '0 14px 30px rgba(15, 23, 42, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.24)';
                  }, onMouseLeave: (e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.filter = 'brightness(1)';
                      e.currentTarget.style.boxShadow = '0 10px 24px rgba(15, 23, 42, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.20)';
                  }, onFocus: (e) => {
                      e.currentTarget.style.outline = '2px solid rgba(99, 102, 241, 0.5)';
                      e.currentTarget.style.outlineOffset = '2px';
                  }, onBlur: (e) => {
                      e.currentTarget.style.outline = 'none';
                  }, "aria-label": `Open ${displayTitle} widget`, children: [jsxRuntimeExports.jsx(MessageCircle, { "aria-hidden": "true", className: "h-4 w-4 shrink-0", strokeWidth: 2 }), jsxRuntimeExports.jsx("span", { className: "text-[14.5px] font-semibold", style: {
                              letterSpacing: '0',
                              lineHeight: 1,
                              fontWeight: 600,
                              whiteSpace: 'nowrap'
                          }, children: displayTitle })] }), isOpen && (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center p-4", onClick: (e) => {
                      if (e.target === e.currentTarget) {
                          setIsOpen(false);
                      }
                  }, children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col relative", children: [jsxRuntimeExports.jsx("button", { onClick: () => setIsOpen(false), className: "absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors", "aria-label": "Close modal", children: jsxRuntimeExports.jsx("svg", { className: "w-6 h-6 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }), jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden", children: jsxRuntimeExports.jsx(FurnitureAIWidget, { config: config, defaultTab: defaultTab, widgetTitle: displayTitle }) })] }) }))] }));
  }

  let widgetRoot = null;
  let container = null;
  async function initWidget(userConfig) {
      // Destroy existing widget if any
      if (widgetRoot) {
          widgetRoot.unmount();
          widgetRoot = null;
      }
      if (container) {
          container.remove();
          container = null;
      }
      // Create container
      container = document.createElement('div');
      container.id = 'modly-widget-container';
      document.body.appendChild(container);
      // Fetch remote config if configUrl is provided
      let remoteConfig = {};
      const configUrl = userConfig?.configUrl || ((userConfig?.widgetId || userConfig?.storeId) ? '/api/widget/config' : undefined);
      if (configUrl) {
          remoteConfig = await fetchRemoteConfig(configUrl, userConfig?.widgetId, userConfig?.storeId);
      }
      // Merge configs (remote > user > defaults)
      const finalConfig = mergeConfig({
          ...userConfig,
          ...remoteConfig,
      });
      // Render widget
      widgetRoot = client.createRoot(container);
      widgetRoot.render(require$$0$1.createElement(FurnitureAIWidgetButton, {
          config: finalConfig,
          buttonText: getWidgetTitle(finalConfig),
          buttonPosition: finalConfig.theme?.buttonPosition || 'bottom-right',
      }));
  }
  function destroyWidget() {
      if (widgetRoot) {
          widgetRoot.unmount();
          widgetRoot = null;
      }
      if (container) {
          container.remove();
          container = null;
      }
  }
  // Expose global API
  window.ModlyWidget = {
      init: initWidget,
      destroy: destroyWidget,
  };
  // Auto-initialize if script has data attributes
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', autoInit);
  }
  else {
      autoInit();
  }
  function autoInit() {
      const script = document.querySelector('[data-modly-widget]');
      if (script) {
          const storeId = script.dataset.storeId;
          const widgetId = script.dataset.widgetId;
          const configUrl = script.dataset.configUrl;
          if (configUrl || storeId || widgetId) {
              initWidget({
                  configUrl: configUrl || undefined,
                  storeId: storeId || undefined,
                  widgetId: widgetId || undefined,
              });
          }
      }
  }

}));
//# sourceMappingURL=widget.umd.js.map
