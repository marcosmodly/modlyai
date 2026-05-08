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


  const __iconNode$e = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
  ];
  const ArrowRight = createLucideIcon("arrow-right", __iconNode$e);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$d = [
    [
      "path",
      {
        d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
        key: "18u6gg"
      }
    ],
    ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
  ];
  const Camera = createLucideIcon("camera", __iconNode$d);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$c = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
  const Check = createLucideIcon("check", __iconNode$c);

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
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    ["path", { d: "M12 18v-6", key: "17g6i2" }],
    ["path", { d: "m9 15 3 3 3-3", key: "1npd3o" }]
  ];
  const FileDown = createLucideIcon("file-down", __iconNode$b);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$a = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 16v-4", key: "1dtifu" }],
    ["path", { d: "M12 8h.01", key: "e9boi3" }]
  ];
  const Info = createLucideIcon("info", __iconNode$a);

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
  const Layers = createLucideIcon("layers", __iconNode$9);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$8 = [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
  ];
  const Link2 = createLucideIcon("link-2", __iconNode$8);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$7 = [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "m21 3-7 7", key: "1l2asr" }],
    ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
    ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
  ];
  const Maximize2 = createLucideIcon("maximize-2", __iconNode$7);

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
        d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
        key: "1sd12s"
      }
    ]
  ];
  const MessageCircle = createLucideIcon("message-circle", __iconNode$6);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$5 = [
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
  const Palette = createLucideIcon("palette", __iconNode$5);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$4 = [
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
        key: "1a8usu"
      }
    ],
    ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
  ];
  const Pencil = createLucideIcon("pencil", __iconNode$4);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$3 = [
    ["path", { d: "m15 14 5-5-5-5", key: "12vg1m" }],
    ["path", { d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13", key: "6uklza" }]
  ];
  const Redo2 = createLucideIcon("redo-2", __iconNode$3);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$2 = [
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
  const Sparkles = createLucideIcon("sparkles", __iconNode$2);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode$1 = [
    ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
  ];
  const Undo2 = createLucideIcon("undo-2", __iconNode$1);

  /**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */


  const __iconNode = [
    ["path", { d: "M12 3v12", key: "1x0j5s" }],
    ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
  ];
  const Upload = createLucideIcon("upload", __iconNode);

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
          priceDelta: index === 0 ? 0 : index * 75,
          description: getMaterialDescription(material),
      }));
  };
  const resolveColorHex = (colorName, index) => {
      const hex = getColorHex(colorName);
      return hex === '#E5E7EB' ? FALLBACK_COLOR_HEX[index % FALLBACK_COLOR_HEX.length] : hex;
  };
  const metersToInches = (value) => Number((value / 0.0254).toFixed(1));
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
      const baseMaterials = Array.from(new Set([
          item.materials.primary,
          item.materials.secondary,
          item.materials.upholstery,
          item.materials.legs,
      ].filter((value) => Boolean(value))));
      const baseColors = Array.from(new Set([item.colors.main, item.colors.accent].filter((value) => Boolean(value))));
      const widthIn = Math.max(18, Math.round(metersToInches(item.dimensions.width || 0.9)));
      const depthIn = Math.max(18, Math.round(metersToInches(item.dimensions.depth || item.dimensions.length || 0.9)));
      return {
          id: item.id,
          name: item.name,
          category: item.category,
          basePrice: item.priceRange?.min ?? 0,
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
              productUrl: product?.productUrl ? String(product.productUrl) : product?.url ? String(product.url) : undefined,
              url: product?.url ? String(product.url) : product?.productUrl ? String(product.productUrl) : undefined,
              handle: product?.handle ? String(product.handle) : undefined,
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
                  try {
                      const errorData = await response.json();
                      console.warn('ModlyAI chat error response:', errorData);
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
              ...(this.config.quoteEmail ? { quoteEmail: this.config.quoteEmail } : {}),
          };
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(this.withStorePayload(payload)),
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
              body: JSON.stringify(this.withStorePayload(request)),
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

  function CustomizedFurnitureList({ items, onItemRemoved, onNavigateToCustomizer, }) {
      const { storage } = useWidgetContext();
      const [removingId, setRemovingId] = require$$0$1.useState(null);
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
      return (jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-text-heading mb-6", children: "My Customized Furniture" }), jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: items.map((item) => {
                      const displayName = item.name;
                      const displayCategory = item.baseItemType;
                      const displayMaterials = item.materials;
                      return (jsxRuntimeExports.jsxs("div", { className: "bg-earth-card rounded-xl shadow-soft border border-earth-border overflow-hidden hover:shadow-lg transition-shadow relative", children: [jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 z-10", children: jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-earth-sage text-text-primary rounded-lg text-xs font-semibold", children: "Custom" }) }), jsxRuntimeExports.jsx("div", { className: "w-full h-48 bg-earth-input flex items-center justify-center", children: jsxRuntimeExports.jsx("svg", { className: "w-16 h-16 text-text-muted", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }), jsxRuntimeExports.jsxs("div", { className: "p-6", children: [jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-text-heading mb-1", children: displayName }), jsxRuntimeExports.jsx("p", { className: "text-sm text-text-muted capitalize", children: displayCategory }), jsxRuntimeExports.jsxs("p", { className: "text-xs text-text-muted mt-1", children: ["Saved ", new Date(item.savedAt).toLocaleDateString()] })] }), jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 bg-earth-input rounded-xl border border-earth-border", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-text-heading mb-2", children: "Dimensions:" }), jsxRuntimeExports.jsxs("div", { className: "text-sm text-text-primary space-y-1", children: [jsxRuntimeExports.jsxs("div", { children: ["Length: ", jsxRuntimeExports.jsxs("strong", { children: [item.dimensions.length.toFixed(2), "m"] })] }), jsxRuntimeExports.jsxs("div", { children: ["Width: ", jsxRuntimeExports.jsxs("strong", { children: [item.dimensions.width.toFixed(2), "m"] })] }), jsxRuntimeExports.jsxs("div", { children: ["Height: ", jsxRuntimeExports.jsxs("strong", { children: [item.dimensions.height.toFixed(2), "m"] })] })] })] }), jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-text-heading mb-2", children: "Colors:" }), jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-earth-input border border-earth-border rounded-lg text-sm text-text-primary", children: item.colorScheme.primary }), item.colorScheme.secondary && (jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-earth-input border border-earth-border rounded-lg text-sm text-text-primary", children: item.colorScheme.secondary })), item.colorScheme.accent && (jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-earth-input border border-earth-border rounded-lg text-sm text-text-primary", children: item.colorScheme.accent }))] })] }), (displayMaterials.primary || displayMaterials.legs || displayMaterials.upholstery) && (jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-text-heading mb-1", children: "Materials:" }), jsxRuntimeExports.jsxs("p", { className: "text-sm text-text-primary", children: [displayMaterials.primary, displayMaterials.legs && ` | Legs: ${displayMaterials.legs}`, displayMaterials.upholstery && ` | Upholstery: ${displayMaterials.upholstery}`] })] })), item.ornamentDetails && item.ornamentDetails.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-text-heading mb-2", children: "Details:" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: item.ornamentDetails.map((detail, index) => (jsxRuntimeExports.jsx("span", { className: "text-xs bg-earth-sage/20 text-text-primary px-2 py-1 rounded", children: detail }, index))) })] })), item.aiNotes && (jsxRuntimeExports.jsx("div", { className: "mb-4 pt-4 border-t border-earth-border", children: jsxRuntimeExports.jsx("p", { className: "text-xs text-text-muted line-clamp-2", children: item.aiNotes }) })), jsxRuntimeExports.jsx("div", { className: "flex gap-2 pt-4 border-t border-earth-border", children: jsxRuntimeExports.jsx("button", { onClick: () => handleRemove(item.id), disabled: removingId === item.id, className: "flex-1 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl font-medium hover:bg-red-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm", children: removingId === item.id ? 'Removing...' : 'Remove' }) })] })] }, item.id));
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
              accent: undefined,
          },
          aiNotes: recommendation.reasoning,
      } : null);
      if (!displayItem)
          return null;
      return (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-[#2A2D28] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10", children: [jsxRuntimeExports.jsxs("div", { className: "sticky top-0 bg-[#2A2D28] border-b border-white/10 px-6 py-4 flex items-center justify-between", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: "Finalize & Request Quote" }), jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-white/60 hover:text-white transition-colors", children: jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }), jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-white mb-2", children: displayItem.name }), jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm", children: "Review your customization details" })] }), jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-lg p-4 border border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white/80 mb-3", children: "Dimensions" }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 text-sm", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Length:" }), jsxRuntimeExports.jsxs("p", { className: "text-white font-medium", children: [displayItem.dimensions.length, "m"] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Width:" }), jsxRuntimeExports.jsxs("p", { className: "text-white font-medium", children: [displayItem.dimensions.width, "m"] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Height:" }), jsxRuntimeExports.jsxs("p", { className: "text-white font-medium", children: [displayItem.dimensions.height, "m"] })] })] })] }), displayItem.materials && Object.keys(displayItem.materials).length > 0 && (jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-lg p-4 border border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white/80 mb-3", children: "Materials" }), jsxRuntimeExports.jsx("div", { className: "space-y-2 text-sm", children: Object.entries(displayItem.materials).map(([key, value]) => value ? (jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [jsxRuntimeExports.jsxs("span", { className: "text-white/60 capitalize", children: [key, ":"] }), jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: value })] }, key)) : null) })] })), displayItem.colorScheme && (jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-lg p-4 border border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white/80 mb-3", children: "Color Scheme" }), jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [displayItem.colorScheme.primary && (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-white/60 text-sm", children: "Primary:" }), jsxRuntimeExports.jsx("span", { className: "text-white font-medium text-sm", children: displayItem.colorScheme.primary })] })), displayItem.colorScheme.secondary && (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-white/60 text-sm", children: "Secondary:" }), jsxRuntimeExports.jsx("span", { className: "text-white font-medium text-sm", children: displayItem.colorScheme.secondary })] })), displayItem.colorScheme?.accent && (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-white/60 text-sm", children: "Accent:" }), jsxRuntimeExports.jsx("span", { className: "text-white font-medium text-sm", children: displayItem.colorScheme.accent })] }))] })] })), displayItem.aiNotes && (jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-lg p-4 border border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white/80 mb-2", children: "AI Notes" }), jsxRuntimeExports.jsx("p", { className: "text-white/90 text-sm", children: displayItem.aiNotes })] })), recommendation?.placement && (jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-lg p-4 border border-white/10", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white/80 mb-3", children: "Placement Information" }), recommendation.placement.coordinates && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-sm", children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Position: " }), jsxRuntimeExports.jsxs("span", { className: "text-white", children: ["(", recommendation.placement.coordinates.x.toFixed(2), "m, ", recommendation.placement.coordinates.y.toFixed(2), "m)"] }), jsxRuntimeExports.jsx("span", { className: "text-white/60 ml-2", children: "from southwest corner" })] })), recommendation.placement.distanceFromWalls && (jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [jsxRuntimeExports.jsx("div", { className: "text-sm text-white/60 mb-1", children: "Distance from walls:" }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [recommendation.placement.distanceFromWalls.north !== undefined && (jsxRuntimeExports.jsxs("div", { className: "text-white", children: ["North: ", jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [recommendation.placement.distanceFromWalls.north.toFixed(2), "m"] })] })), recommendation.placement.distanceFromWalls.south !== undefined && (jsxRuntimeExports.jsxs("div", { className: "text-white", children: ["South: ", jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [recommendation.placement.distanceFromWalls.south.toFixed(2), "m"] })] })), recommendation.placement.distanceFromWalls.east !== undefined && (jsxRuntimeExports.jsxs("div", { className: "text-white", children: ["East: ", jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [recommendation.placement.distanceFromWalls.east.toFixed(2), "m"] })] })), recommendation.placement.distanceFromWalls.west !== undefined && (jsxRuntimeExports.jsxs("div", { className: "text-white", children: ["West: ", jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [recommendation.placement.distanceFromWalls.west.toFixed(2), "m"] })] }))] })] })), recommendation.placement.rotation !== undefined && recommendation.placement.rotation !== 0 && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-sm", children: [jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Rotation: " }), jsxRuntimeExports.jsxs("span", { className: "text-white font-medium", children: [recommendation.placement.rotation, "\u00B0"] })] })), recommendation.placement.reasoning && (jsxRuntimeExports.jsx("div", { className: "mt-3 pt-3 border-t border-white/10", children: jsxRuntimeExports.jsx("p", { className: "text-sm text-white/90", children: recommendation.placement.reasoning }) }))] }))] }), jsxRuntimeExports.jsxs("div", { className: "sticky bottom-0 bg-[#2A2D28] border-t border-white/10 px-6 py-4 flex gap-3", children: [jsxRuntimeExports.jsx("button", { onClick: onClose, className: "flex-1 px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors", children: "Back" }), jsxRuntimeExports.jsx("button", { onClick: onProceed, className: "flex-1 px-6 py-3 rounded-lg font-medium text-white transition-colors shadow-lg", style: {
                                  backgroundColor: websiteColors.primary,
                              }, children: "Proceed" })] })] }) }));
  }

  function QuoteRequestForm({ isOpen, onClose, onSubmit, item, recommendation, }) {
      const websiteColors = useWebsiteColors();
      const [formData, setFormData] = require$$0$1.useState({
          name: '',
          email: '',
          phone: '',
          notes: '',
      });
      const [isSubmitting, setIsSubmitting] = require$$0$1.useState(false);
      const [error, setError] = require$$0$1.useState(null);
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
                      placement: 'placement' in displayItem && displayItem.placement ? {
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
  function RecommendationsList({ recommendations, onCustomize, onFinalize, enabledActions, primaryColor }) {
      const actions = enabledActions ?? { viewInCatalog: true, customize: true, requestQuote: true };
      const primaryTextColor = primaryColor ? getReadableTextColor(primaryColor) : undefined;
      if (recommendations.length === 0) {
          return (jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-gray-500", children: jsxRuntimeExports.jsx("p", { className: "text-lg", children: "No recommendations available yet." }) }));
      }
      return (jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-6 text-gray-900", children: "AI Recommendations" }), jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: recommendations.map((rec, index) => {
                      const catalogUrl = getProductCatalogUrl$1(rec.item);
                      return (jsxRuntimeExports.jsx("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow", children: jsxRuntimeExports.jsxs("div", { className: "p-6", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-900", children: rec.item.name }), rec.matchScore && (jsxRuntimeExports.jsxs("span", { className: "shrink-0 text-sm px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium", children: [Math.round(rec.matchScore * 100), "% match"] }))] }), jsxRuntimeExports.jsxs("p", { className: "text-sm mb-4 text-gray-500", children: [rec.item.category, " ", rec.item.subCategory && `- ${rec.item.subCategory}`] }), jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 rounded bg-gray-50 border border-gray-200", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium mb-2 text-gray-700", children: "Dimensions:" }), jsxRuntimeExports.jsxs("div", { className: "text-sm space-y-1 text-gray-800", children: [jsxRuntimeExports.jsxs("div", { children: ["Length: ", jsxRuntimeExports.jsxs("strong", { children: [rec.item.dimensions.length, "m"] })] }), jsxRuntimeExports.jsxs("div", { children: ["Width: ", jsxRuntimeExports.jsxs("strong", { children: [rec.item.dimensions.width, "m"] })] }), jsxRuntimeExports.jsxs("div", { children: ["Height: ", jsxRuntimeExports.jsxs("strong", { children: [rec.item.dimensions.height, "m"] })] }), rec.item.dimensions.seatHeight && (jsxRuntimeExports.jsxs("div", { children: ["Seat Height: ", jsxRuntimeExports.jsxs("strong", { children: [rec.item.dimensions.seatHeight, "m"] })] })), rec.item.dimensions.clearance && (jsxRuntimeExports.jsxs("div", { className: "text-xs mt-2 text-gray-500", children: ["Clearance: Front ", rec.item.dimensions.clearance.front || 'N/A', "m"] }))] })] }), jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium mb-1 text-gray-700", children: "Materials:" }), jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-800", children: [rec.item.materials.primary, rec.item.materials.secondary && `, ${rec.item.materials.secondary}`, rec.item.materials.upholstery && ` - Upholstery: ${rec.item.materials.upholstery}`] })] }), jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium mb-1 text-gray-700", children: "Colors:" }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-800", children: rec.item.colors.main }), rec.item.colors.accent && (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "-" }), jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-800", children: rec.item.colors.accent })] }))] })] }), rec.item.styleTags && rec.item.styleTags.length > 0 && (jsxRuntimeExports.jsx("div", { className: "mb-4 flex flex-wrap gap-2", children: rec.item.styleTags.map((tag, i) => (jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium", children: tag }, i))) })), rec.placement && (jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 rounded bg-gray-50 border border-gray-200", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium mb-2 text-gray-700", children: "Placement:" }), rec.placement.coordinates && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs text-gray-800", children: [jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Position: " }), "(", rec.placement.coordinates.x.toFixed(2), "m, ", rec.placement.coordinates.y.toFixed(2), "m)", jsxRuntimeExports.jsx("span", { className: "ml-2 text-gray-500", children: "from southwest corner" })] })), rec.placement.distanceFromWalls && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs space-y-1 text-gray-800", children: [jsxRuntimeExports.jsx("div", { className: "font-semibold mb-1", children: "Distance from walls:" }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-1", children: [rec.placement.distanceFromWalls.north !== undefined && (jsxRuntimeExports.jsxs("div", { children: ["North: ", jsxRuntimeExports.jsxs("strong", { children: [rec.placement.distanceFromWalls.north.toFixed(2), "m"] })] })), rec.placement.distanceFromWalls.south !== undefined && (jsxRuntimeExports.jsxs("div", { children: ["South: ", jsxRuntimeExports.jsxs("strong", { children: [rec.placement.distanceFromWalls.south.toFixed(2), "m"] })] })), rec.placement.distanceFromWalls.east !== undefined && (jsxRuntimeExports.jsxs("div", { children: ["East: ", jsxRuntimeExports.jsxs("strong", { children: [rec.placement.distanceFromWalls.east.toFixed(2), "m"] })] })), rec.placement.distanceFromWalls.west !== undefined && (jsxRuntimeExports.jsxs("div", { children: ["West: ", jsxRuntimeExports.jsxs("strong", { children: [rec.placement.distanceFromWalls.west.toFixed(2), "m"] })] }))] })] })), rec.placement.rotation !== undefined && rec.placement.rotation !== 0 && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs text-gray-800", children: [jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Rotation: " }), rec.placement.rotation, " deg"] })), (rec.placement.wall || rec.placement.position) && (jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs text-gray-800", children: [jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Location: " }), rec.placement.position || (rec.placement.wall ? `Against ${rec.placement.wall} wall` : 'Centered')] })), jsxRuntimeExports.jsx("p", { className: "text-sm mt-2 pt-2 border-t border-gray-200 text-gray-800", children: rec.placement.reasoning })] })), jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-gray-200", children: [jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium mb-1 text-gray-700", children: "Why this fits:" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-800", children: rec.reasoning })] }), rec.item.priceRange && (jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-gray-200", children: jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-700", children: ["Price: ", jsxRuntimeExports.jsxs("strong", { className: "text-gray-900", children: ["$", rec.item.priceRange.min?.toLocaleString(), rec.item.priceRange.max && rec.item.priceRange.max !== rec.item.priceRange.min
                                                          ? ` - $${rec.item.priceRange.max.toLocaleString()}`
                                                          : ''] })] }) })), jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-gray-200 space-y-2", children: [actions.customize && onCustomize && (jsxRuntimeExports.jsxs("button", { onClick: () => onCustomize(rec.item), className: "w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center gap-2", style: primaryColor ? { borderColor: primaryColor, color: primaryColor } : undefined, children: [jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" }), "Customize this"] })), actions.viewInCatalog && catalogUrl ? (jsxRuntimeExports.jsxs("a", { href: catalogUrl, target: "_blank", rel: "noopener noreferrer", className: "w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2", children: [jsxRuntimeExports.jsx(Info, { className: "w-4 h-4" }), "View in Catalog"] })) : actions.viewInCatalog ? (jsxRuntimeExports.jsx("button", { type: "button", disabled: true, className: "w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 border border-gray-200 bg-gray-50 text-gray-400 flex items-center justify-center gap-2 cursor-not-allowed", children: "Catalog link unavailable" })) : null, actions.requestQuote && onFinalize && (jsxRuntimeExports.jsx("button", { onClick: () => onFinalize(rec), className: "w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 text-white flex items-center justify-center gap-2", style: {
                                                  backgroundColor: primaryColor || '#10B981',
                                                  color: primaryColor ? primaryTextColor : '#ffffff',
                                              }, children: "Request Quote" }))] })] }) }, rec.item.id || index));
                  }) })] }));
  }

  const STORAGE_KEY$1 = 'modly-room-planner-state';
  const FEET_PER_METER = 3.28084;
  const styleOptions = [
      { id: 'modern', label: 'Modern', icon: '⚡' },
      { id: 'scandi', label: 'Scandi', icon: '🌲' },
      { id: 'industrial', label: 'Industrial', icon: '🏭' },
      { id: 'boho', label: 'Boho', icon: '🌿' },
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
      const primaryColor = getPrimaryColor(mergedConfig);
      const [recommendations, setRecommendations] = require$$0$1.useState(null);
      const [isLoading, setIsLoading] = require$$0$1.useState(false);
      const [error, setError] = require$$0$1.useState(null);
      const [shareMessage, setShareMessage] = require$$0$1.useState(null);
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
      const fileInputRef = require$$0$1.useRef(null);
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
      const handleItemRemoved = () => {
          const items = storage.getCustomizedFurniture();
          setCustomizedFurniture(items);
      };
      const handleCustomize = (item) => {
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
          setSelectedRecommendation(recommendation);
          setShowFinalizeModal(true);
      };
      const handleProceedToQuote = () => {
          if (!enabledActions.requestQuote)
              return;
          setShowFinalizeModal(false);
          setShowQuoteForm(true);
      };
      const handleQuoteSubmit = async (quoteRequest) => {
          try {
              await apiClient.submitQuoteRequest(quoteRequest);
              setShowQuoteForm(false);
              setQuoteSuccess(true);
              setSelectedRecommendation(null);
              setTimeout(() => {
                  setQuoteSuccess(false);
              }, 5000);
          }
          catch (err) {
              throw err;
          }
      };
      const handleExportPdf = () => {
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
        ` }), jsxRuntimeExports.jsx("section", { className: "py-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4", children: jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4", children: [jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "AI-Powered Room Analysis" })] }), jsxRuntimeExports.jsx("h1", { className: "text-5xl font-bold mb-4", children: "Room Planner" }), jsxRuntimeExports.jsx("p", { className: "text-xl text-blue-100 mb-8", children: "Upload a photo of your room and get catalog-based furniture and customization suggestions based on your space and style." }), jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Room photo upload" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Catalog-based product suggestions" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Style-aware recommendations" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Placement guidance" })] })] })] }) }) }), jsxRuntimeExports.jsx("section", { className: "py-12 bg-gray-50", children: jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [jsxRuntimeExports.jsxs("div", { className: "rounded-[28px] border border-gray-200 bg-white p-5 shadow-xl md:p-6", children: [recommendations && (jsxRuntimeExports.jsx("div", { className: "mb-4 flex justify-end", children: jsxRuntimeExports.jsx("div", { className: "inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700", children: "Suggested analysis" }) })), jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", multiple: true, onChange: handleFileChange, className: "hidden" }), jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 lg:grid-cols-2", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between gap-3", children: [jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Upload Room Photos" }), uploadedPhotos.length > 0 && (jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setUploadedPhotos([]), className: "text-sm font-medium text-gray-500 transition hover:text-gray-900", children: "Remove" }))] }), jsxRuntimeExports.jsx("div", { role: "button", tabIndex: 0, onClick: () => fileInputRef.current?.click(), onKeyDown: (e) => {
                                                                  if (e.key === 'Enter' || e.key === ' ')
                                                                      fileInputRef.current?.click();
                                                              }, onDragOver: (e) => {
                                                                  e.preventDefault();
                                                                  e.stopPropagation();
                                                              }, onDrop: handleDrop, className: "w-full aspect-video rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 text-center transition-colors hover:border-blue-500 hover:bg-blue-50/50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center cursor-pointer outline-none", children: jsxRuntimeExports.jsxs("div", { className: "flex max-w-sm flex-col items-center gap-4", children: [jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-blue-100", children: jsxRuntimeExports.jsx(Upload, { className: "h-8 w-8 text-blue-600" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-gray-900", children: uploadedPhotos.length > 0
                                                                                      ? `${uploadedPhotos.length} photo${uploadedPhotos.length > 1 ? 's' : ''} ready`
                                                                                      : 'Drop your room photo here' }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Click to browse or drag and drop a JPG or PNG." })] }), jsxRuntimeExports.jsx("button", { type: "button", onClick: (e) => {
                                                                              e.stopPropagation();
                                                                              fileInputRef.current?.click();
                                                                          }, className: "rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700", children: "Choose File" })] }) })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between gap-3", children: [jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Room Preview" }), jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500", children: uploadedPhotos[0] ? 'Photo loaded' : 'Awaiting upload' })] }), jsxRuntimeExports.jsx("div", { className: "w-full aspect-video rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center", children: uploadedPhotos[0] ? (jsxRuntimeExports.jsx("img", { src: uploadedPhotos[0], alt: "Uploaded room preview", className: "w-full aspect-video object-cover rounded-xl" })) : (jsxRuntimeExports.jsxs("div", { className: "px-6 text-center text-gray-400", children: [jsxRuntimeExports.jsx(Camera, { className: "mx-auto mb-2 h-12 w-12" }), jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Your room photo will appear here" })] })) })] })] }), jsxRuntimeExports.jsx("div", { className: "mt-6 bg-white rounded-2xl border border-gray-200 p-8 shadow-lg", children: jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [jsxRuntimeExports.jsx("div", { className: "lg:col-span-4 space-y-6", children: jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Room Details" }), jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Room Type" }), jsxRuntimeExports.jsxs("select", { value: roomType, onChange: (e) => setRoomType(e.target.value), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500", children: [jsxRuntimeExports.jsx("option", { value: "living", children: "Living Room" }), jsxRuntimeExports.jsx("option", { value: "bedroom", children: "Bedroom" }), jsxRuntimeExports.jsx("option", { value: "dining", children: "Dining Room" }), jsxRuntimeExports.jsx("option", { value: "office", children: "Office" }), jsxRuntimeExports.jsx("option", { value: "kitchen", children: "Kitchen" }), jsxRuntimeExports.jsx("option", { value: "other", children: "Other" })] }), jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-gray-500", children: "Select the room type that best matches the uploaded photo." })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-gray-700", children: "Room Dimensions" }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-600", children: [jsxRuntimeExports.jsx("span", { children: "Meters" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleUnitToggle, className: `relative inline-flex h-6 w-11 items-center rounded-full transition ${unitSystem === 'feet' ? 'bg-blue-600' : 'bg-gray-200'}`, children: jsxRuntimeExports.jsx("span", { className: `inline-block h-4 w-4 transform rounded-full bg-white transition ${unitSystem === 'feet' ? 'translate-x-6' : 'translate-x-1'}` }) }), jsxRuntimeExports.jsx("span", { children: "Feet" })] })] }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-xs text-gray-600 mb-1", children: "Length" }), jsxRuntimeExports.jsx("input", { type: "number", placeholder: unitSystem === 'meters' ? '12' : '39.4', value: lengthValue, onChange: (e) => setLengthValue(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-xs text-gray-600 mb-1", children: "Width" }), jsxRuntimeExports.jsx("input", { type: "number", placeholder: unitSystem === 'meters' ? '15' : '49.2', value: widthValue, onChange: (e) => setWidthValue(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] })] }), jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [jsxRuntimeExports.jsx("label", { className: "block text-xs text-gray-600 mb-1", children: "Ceiling Height" }), jsxRuntimeExports.jsx("input", { type: "number", placeholder: unitSystem === 'meters' ? '2.4' : '8', value: heightValue, onChange: (e) => setHeightValue(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] })] })] })] }) }), jsxRuntimeExports.jsx("div", { className: "lg:col-span-4 space-y-6", children: jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Preferences" }), jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-3", children: "Preferred Styles" }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: styleOptions.map((styleOption) => {
                                                                                          const isSelected = selectedStyles.includes(styleOption.id);
                                                                                          return (jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => toggleStyle(styleOption.id), className: [
                                                                                                  'p-3 rounded-lg text-center transition border',
                                                                                                  isSelected
                                                                                                      ? 'border-2 border-blue-600 bg-blue-50 hover:bg-blue-100'
                                                                                                      : 'border-gray-300 hover:bg-gray-50',
                                                                                              ].join(' '), children: [jsxRuntimeExports.jsx("span", { className: "text-2xl mb-1 block", children: styleOption.icon }), jsxRuntimeExports.jsx("span", { className: [
                                                                                                          'text-sm font-medium',
                                                                                                          isSelected ? 'text-blue-900' : 'text-gray-700',
                                                                                                      ].join(' '), children: styleOption.label })] }, styleOption.id));
                                                                                      }) })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Preferred Colors" }), jsxRuntimeExports.jsx("input", { type: "text", value: colorInput, onChange: (e) => setColorInput(e.target.value), placeholder: "e.g., Beige, Forest Green, Terracotta", className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Comma-separated" })] })] })] }) }), jsxRuntimeExports.jsx("div", { className: "lg:col-span-4 space-y-6", children: jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Budget & Actions" }), jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Budget Min ($)" }), jsxRuntimeExports.jsx("input", { type: "number", value: budgetMin, onChange: (e) => setBudgetMin(e.target.value), placeholder: "500", className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Budget Max ($)" }), jsxRuntimeExports.jsx("input", { type: "number", value: budgetMax, onChange: (e) => setBudgetMax(e.target.value), placeholder: "2000", className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] })] }), jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-4", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: handleAnalyze, disabled: isLoading, className: "w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed", style: { backgroundColor: primaryColor }, children: isLoading ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("span", { className: "h-5 w-5 rounded-full border-2 border-white/50 border-t-white animate-spin" }), "Analyzing..."] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5" }), "Analyze Room"] })) }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: handleExportPdf, className: "px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition text-sm", children: "Export PDF" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleShare, className: "px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition text-sm", children: "Share" })] }), jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900", children: [jsxRuntimeExports.jsx("p", { className: "font-medium", children: "All options are visible at once." }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-blue-800/80", children: "No collapsible sections, less scrolling, and faster setup on desktop." })] })] })] })] }) })] }) }), shareMessage && (jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900", children: shareMessage })), error && (jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700", children: [jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Error" }), jsxRuntimeExports.jsx("p", { className: "text-sm", children: error })] })), jsxRuntimeExports.jsxs("div", { className: "print-only hidden mt-6 text-left", children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-900", children: "Room Planner Share Summary" }), jsxRuntimeExports.jsx("pre", { className: "mt-2 whitespace-pre-wrap text-sm text-gray-700", children: buildShareText() })] })] }), jsxRuntimeExports.jsx("div", { className: "mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200", children: jsxRuntimeExports.jsx(CustomizedFurnitureList, { items: customizedFurniture, onItemRemoved: handleItemRemoved, onNavigateToCustomizer: handleNavigateToCustomizer }) }), recommendations && (jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 transition-all", children: [recommendations.roomAnalysis && (jsxRuntimeExports.jsxs("div", { className: "mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-4", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold text-gray-900", children: "Room Analysis" }), jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full", children: "Success" })] }), jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Detected Style" }), jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-gray-900", children: recommendations.roomAnalysis.detectedStyle })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Dominant Colors" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-1", children: recommendations.roomAnalysis.dominantColors.map((color, i) => (jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white border border-blue-200 rounded-full text-sm text-gray-900", children: color }, i))) })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Free Space" }), jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-gray-900", children: recommendations.roomAnalysis.freeSpace.description })] })] })] })), jsxRuntimeExports.jsx(RecommendationsList, { recommendations: recommendations.recommendations, onCustomize: enabledActions.customize ? handleCustomize : undefined, onFinalize: enabledActions.requestQuote ? handleFinalizeRecommendation : undefined, enabledActions: enabledActions, primaryColor: primaryColor }), enabledActions.requestQuote && recommendations.recommendations && recommendations.recommendations.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mt-8 pt-6 border-t border-gray-200 text-center", children: [jsxRuntimeExports.jsx("p", { className: "text-gray-700 mb-4 font-medium", children: "Ready to convert this into a quote?" }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3", children: recommendations.recommendations.slice(0, 3).map((rec, idx) => (jsxRuntimeExports.jsxs("button", { onClick: () => handleFinalizeRecommendation(rec), className: "w-full px-4 py-3 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2", style: { backgroundColor: primaryColor }, children: [jsxRuntimeExports.jsxs("span", { className: "text-center leading-snug", children: ["Request Quote for ", rec.item.name] }), jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5 flex-shrink-0" })] }, rec.item.id || idx))) })] }))] }))] }) })] }), jsxRuntimeExports.jsx(FinalizeQuoteModal, { isOpen: enabledActions.requestQuote && showFinalizeModal, onClose: () => {
                      setShowFinalizeModal(false);
                      setSelectedRecommendation(null);
                  }, onProceed: handleProceedToQuote, recommendation: selectedRecommendation }), jsxRuntimeExports.jsx(QuoteRequestForm, { isOpen: enabledActions.requestQuote && showQuoteForm, onClose: () => {
                      setShowQuoteForm(false);
                      setSelectedRecommendation(null);
                  }, onSubmit: handleQuoteSubmit, recommendation: selectedRecommendation }), quoteSuccess && (jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50", children: [jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6" }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Quote Request Submitted!" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-white/90", children: "We'll contact you soon with details." })] })] }))] }));
  }

  const ROOM_PLANNER_STORAGE_KEY = 'modly-room-planner-state';
  function FurnitureCustomizerPanel({ products, draft, setDraft, isApplying, validationErrors, price, onApply, onUndo, onRedo, canUndo, canRedo, onSaveConfig, onShareLink, onExportPdf, }) {
      const selectedProduct = require$$0$1.useMemo(() => products.find((p) => p.id === draft.productId) ?? products[0], [draft.productId, products]);
      const materialOptions = require$$0$1.useMemo(() => selectedProduct?.customizer.materialOptions ?? [], [selectedProduct]);
      const colorSwatches = require$$0$1.useMemo(() => selectedProduct?.colors.filter((color) => color.available) ?? [], [selectedProduct]);
      const baseDimensions = {
          width: selectedProduct?.customizer.defaultWidthIn || 36,
          length: selectedProduct?.customizer.defaultDepthIn || 60,
          height: selectedProduct?.dimensions.height || 30,
      };
      const widthMin = Math.round(baseDimensions.width * 0.8);
      const widthMax = Math.round(baseDimensions.width * 1.2);
      const lengthMin = Math.round(baseDimensions.length * 0.8);
      const lengthMax = Math.round(baseDimensions.length * 1.2);
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
              recommendations: roomPlannerRecommendations.recommendations?.slice(0, 4).map((rec) => ({
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
      return (jsxRuntimeExports.jsx("section", { className: "py-12 bg-gray-50 min-h-screen", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4", children: jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-12 gap-6", children: [jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-lg sticky top-6", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Select Product" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-4", children: "B2B-ready configs with instant pricing" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: onUndo, disabled: !canUndo || isApplying, className: "p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed", title: "Undo", children: jsxRuntimeExports.jsx(Undo2, { className: "w-4 h-4 text-gray-600" }) }), jsxRuntimeExports.jsx("button", { type: "button", onClick: onRedo, disabled: !canRedo || isApplying, className: "p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed", title: "Redo", children: jsxRuntimeExports.jsx(Redo2, { className: "w-4 h-4 text-gray-600" }) })] })] }), jsxRuntimeExports.jsx("select", { value: draft.productId, onChange: (e) => {
                                          const nextProduct = products.find((product) => product.id === e.target.value);
                                          if (!nextProduct) {
                                              return;
                                          }
                                          setDraft({
                                              ...draft,
                                              productId: nextProduct.id,
                                              fabricColor: nextProduct.colors[0]?.hex ?? draft.fabricColor,
                                              materialId: nextProduct.customizer.materialOptions[0]?.id ?? draft.materialId,
                                              widthIn: nextProduct.customizer.defaultWidthIn,
                                              depthIn: nextProduct.customizer.defaultDepthIn,
                                          });
                                      }, disabled: isApplying, className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6 disabled:opacity-60", children: products.map((p) => (jsxRuntimeExports.jsx("option", { value: p.id, children: p.name }, p.id))) }), jsxRuntimeExports.jsxs("div", { className: "aspect-square bg-purple-50 rounded-lg mb-6 flex flex-col items-center justify-center border border-purple-200 text-center px-4", children: [jsxRuntimeExports.jsx(Layers, { className: "w-12 h-12 text-purple-400 mb-2" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-purple-600 font-medium", children: selectedProduct?.customizer.thumbnailLabel ?? 'Sectional' }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Instantly updates with your selections" })] }), jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm border-t border-gray-200 pt-4", children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gray-600", children: [jsxRuntimeExports.jsx("span", { children: "Base Price:" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: ["$", price.base.toLocaleString()] })] }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gray-600", children: [jsxRuntimeExports.jsx("span", { children: "Base Size:" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [selectedProduct?.dimensions.width, selectedProduct?.dimensions.unit, " W"] })] }), jsxRuntimeExports.jsxs("div", { className: "text-gray-600", children: [jsxRuntimeExports.jsx("span", { className: "block mb-1", children: "Materials:" }), jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-900", children: selectedProduct?.materials.join(', ') || 'Custom' })] }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gray-600", children: [jsxRuntimeExports.jsx("span", { children: "Customizations:" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-purple-600", children: ["+$", price.customizations.toLocaleString()] })] }), jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-200 pt-3 flex justify-between", children: [jsxRuntimeExports.jsx("span", { className: "font-bold text-gray-900", children: "Total:" }), jsxRuntimeExports.jsxs("span", { className: "font-bold text-lg text-gray-900", children: ["$", price.total.toLocaleString()] })] })] }), jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-3 gap-2", children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: onSaveConfig, disabled: isApplying, className: "px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50", children: "Save" }), jsxRuntimeExports.jsxs("button", { type: "button", onClick: onShareLink, disabled: isApplying, className: "px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 inline-flex items-center justify-center gap-2", children: [jsxRuntimeExports.jsx(Link2, { className: "w-4 h-4" }), "Share"] }), jsxRuntimeExports.jsxs("button", { type: "button", onClick: onExportPdf, disabled: isApplying, className: "px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 inline-flex items-center justify-center gap-2", children: [jsxRuntimeExports.jsx(FileDown, { className: "w-4 h-4" }), "PDF"] })] })] }) }), jsxRuntimeExports.jsx("div", { className: "lg:col-span-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-lg", children: [jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-gray-900 mb-6 flex items-center gap-2", children: [jsxRuntimeExports.jsx(Palette, { className: "w-5 h-5 text-purple-600" }), "Customization Options"] }), jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-900 mb-3", children: "Fabric Color" }), colorSwatches.length > 0 ? (jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: colorSwatches.map((color) => {
                                                  const isSelected = draft.fabricColor.toLowerCase() === color.hex.toLowerCase();
                                                  return (jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setDraft({ ...draft, fabricColor: color.hex }), disabled: isApplying, className: [
                                                          'flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm transition-all',
                                                          isSelected
                                                              ? 'border-blue-500 bg-blue-50'
                                                              : 'border-gray-200 hover:border-gray-300',
                                                          isApplying ? 'opacity-60 cursor-not-allowed' : '',
                                                      ].join(' '), "aria-label": `Select color ${color.name}`, title: color.name, children: [jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full border border-gray-200", style: { backgroundColor: color.hex } }), color.name] }, color.name));
                                              }) })) : (jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "No colors available for this product" }))] }), jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-900 mb-3", children: "Material" }), materialOptions.length > 0 ? (jsxRuntimeExports.jsx("div", { className: "space-y-2", children: materialOptions.map((m) => {
                                                  const isSelected = draft.materialId === m.id;
                                                  return (jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setDraft({ ...draft, materialId: m.id }), disabled: isApplying, className: [
                                                          'w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm transition-all text-left',
                                                          isSelected
                                                              ? 'border-purple-500 bg-purple-50'
                                                              : 'border-gray-200 hover:border-gray-300',
                                                          isApplying ? 'opacity-60 cursor-not-allowed' : '',
                                                      ].join(' '), children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("p", { className: "font-medium text-gray-900", children: [m.name, " (", m.priceDelta === 0 ? '+$0' : `+$${m.priceDelta}`, ")"] }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: m.description || getMaterialDescription(m.name) })] }), isSelected && jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-purple-500" })] }, m.id));
                                              }) })) : (jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "No materials available for this product" }))] }), jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-900 mb-3 flex items-center gap-2", children: [jsxRuntimeExports.jsx(Maximize2, { className: "w-4 h-4 text-purple-600" }), "Dimensions"] }), jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Width" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [draft.widthIn, " inches"] })] }), jsxRuntimeExports.jsx("input", { type: "range", min: widthMin, max: widthMax, value: draft.widthIn, onChange: (e) => setDraft({ ...draft, widthIn: Number(e.target.value) }), disabled: isApplying, className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [jsxRuntimeExports.jsxs("span", { children: [widthMin, "\""] }), jsxRuntimeExports.jsxs("span", { children: [widthMax, "\""] })] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Length" }), jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [draft.depthIn, " inches"] })] }), jsxRuntimeExports.jsx("input", { type: "range", min: lengthMin, max: lengthMax, value: draft.depthIn, onChange: (e) => setDraft({ ...draft, depthIn: Number(e.target.value) }), disabled: isApplying, className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [jsxRuntimeExports.jsxs("span", { children: [lengthMin, "\""] }), jsxRuntimeExports.jsxs("span", { children: [lengthMax, "\""] })] })] })] }), validationErrors && validationErrors.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mt-4 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm", children: [jsxRuntimeExports.jsx("div", { className: "font-semibold mb-1", children: "Adjustments need review" }), jsxRuntimeExports.jsx("ul", { className: "list-disc pl-5 space-y-1", children: validationErrors.map((e, i) => (jsxRuntimeExports.jsx("li", { children: e }, i))) })] }))] }), jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-900 mb-3 flex items-center gap-2", children: [jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4 text-purple-600" }), "Add-ons"] }), jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition", children: [jsxRuntimeExports.jsx("input", { type: "checkbox", checked: draft.addons.throwPillows, onChange: (e) => setDraft({
                                                                  ...draft,
                                                                  addons: { ...draft.addons, throwPillows: e.target.checked },
                                                              }), disabled: isApplying, className: "w-4 h-4 text-purple-600 rounded accent-purple-600" }), jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm text-gray-900", children: "Throw Pillows (2)" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: "+$60" })] }), jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition", children: [jsxRuntimeExports.jsx("input", { type: "checkbox", checked: draft.addons.ottoman, onChange: (e) => setDraft({
                                                                  ...draft,
                                                                  addons: { ...draft.addons, ottoman: e.target.checked },
                                                              }), disabled: isApplying, className: "w-4 h-4 text-purple-600 rounded accent-purple-600" }), jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm text-gray-900", children: "Ottoman" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900", children: "+$350" })] })] })] }), jsxRuntimeExports.jsxs("button", { type: "button", onClick: onApply, disabled: isApplying || (validationErrors?.length ?? 0) > 0, className: "w-full py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed", children: [jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5" }), isApplying ? 'Applying...' : 'Apply Customizations'] })] }) }), jsxRuntimeExports.jsx("div", { className: "lg:col-span-5", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-6 shadow-lg sticky top-6", children: [jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-5 mb-4", children: [jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-1", children: "Tell Us What You Want" }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-3", children: "Describe exactly what you need - AI will tailor suggestions to your specific request" }), jsxRuntimeExports.jsx("textarea", { value: additionalDetails, onChange: (e) => {
                                                  setAdditionalDetails(e.target.value);
                                                  setCharCount(e.target.value.length);
                                              }, maxLength: 500, rows: 5, placeholder: `Examples:
- I want something that matches my grey walls
- Need storage space underneath
- Looking for pet-friendly fabric
- Want it to feel cozy but modern
- Must fit through a 32 inch doorway`, className: "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" }), jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [charCount, "/500 characters"] }), additionalDetails && (jsxRuntimeExports.jsx("button", { onClick: () => { setAdditionalDetails(''); setCharCount(0); }, className: "text-xs text-gray-400 hover:text-gray-600", children: "Clear" }))] }), jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mb-2", children: "Quick adds:" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [
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
                                                          }, className: "text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-600 px-3 py-1 rounded-full transition-colors", children: ["+ ", chip] }, chip))) })] })] }), roomPlannerPhoto && (jsxRuntimeExports.jsx("button", { onClick: handleAnalyzeWithRoomPlannerPhoto, disabled: analyzing, className: "w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 mb-4", children: analyzing ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white" }), "Analyzing your room..."] })) : ('✨ Get AI Suggestions') })), jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-5", children: [jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-4", children: "AI Suggestions" }), !roomPlannerPhoto && !analyzing && (jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [jsxRuntimeExports.jsx("p", { className: "text-3xl mb-2", children: "\uD83C\uDFE0" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Use Room Planner first to upload a room photo and get personalized suggestions" })] })), analyzing && (jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-8 gap-3", children: [jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Analyzing your room and requirements..." })] })), aiSuggestions && !analyzing && (jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 rounded-xl p-4", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-blue-900", children: "Room Fit Score" }), jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-blue-600", children: [aiSuggestions.fitScore, "%"] })] }), jsxRuntimeExports.jsx("div", { className: "w-full bg-blue-200 rounded-full h-2", children: jsxRuntimeExports.jsx("div", { className: "bg-blue-600 h-2 rounded-full transition-all", style: { width: `${aiSuggestions.fitScore}%` } }) }), jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-700 mt-2", children: aiSuggestions.fitReason })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500", children: "Room style detected:" }), jsxRuntimeExports.jsx("span", { className: "text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full", children: aiSuggestions.roomStyle })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-2", children: "Room colors:" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: aiSuggestions.dominantColors?.map((color, i) => (jsxRuntimeExports.jsx("span", { className: "text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full", children: color }, i))) })] }), jsxRuntimeExports.jsx("div", { className: "space-y-3", children: aiSuggestions.recommendations?.map((rec, i) => (jsxRuntimeExports.jsxs("div", { className: "border border-gray-100 rounded-xl p-3", children: [jsxRuntimeExports.jsx("span", { className: `text-xs font-medium px-2 py-0.5 rounded-full ${rec.type === 'color'
                                                                    ? 'bg-purple-100 text-purple-700'
                                                                    : rec.type === 'material'
                                                                        ? 'bg-green-100 text-green-700'
                                                                        : rec.type === 'customization'
                                                                            ? 'bg-blue-100 text-blue-700'
                                                                            : 'bg-orange-100 text-orange-700'}`, children: rec.type }), jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-900 mt-2", children: rec.suggestion }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: rec.reason })] }, i))) }), aiSuggestions.warning && (jsxRuntimeExports.jsx("div", { className: "bg-yellow-50 border border-yellow-200 rounded-xl p-3", children: jsxRuntimeExports.jsxs("p", { className: "text-xs text-yellow-800", children: ["\u26A0\uFE0F ", aiSuggestions.warning] }) })), roomPlannerPhoto && (jsxRuntimeExports.jsx("button", { onClick: handleAnalyzeWithRoomPlannerPhoto, className: "w-full text-sm text-blue-600 hover:underline text-center mt-2", children: "Re-analyze with updated details" }))] }))] })] }) })] }) }) }));
  }

  const createDraftForProduct = (product) => ({
      productId: product.id,
      fabricColor: product.colors[0]?.hex ?? '#9CA3AF',
      materialId: product.customizer.materialOptions[0]?.id ?? 'standard_material',
      widthIn: product.customizer.defaultWidthIn,
      depthIn: product.customizer.defaultDepthIn,
      addons: { throwPillows: false, ottoman: false },
      rotationDeg: 0,
      zoom: 1,
      roomContext: { lengthFt: 12.5, widthFt: 15.2 },
  });
  const getColorName = (product, hex) => product.colors.find((color) => color.hex.toLowerCase() === hex.toLowerCase())?.name ?? hex;
  const getMaterialOption = (product, materialId) => product.customizer.materialOptions.find((option) => option.id === materialId) ??
      product.customizer.materialOptions[0];
  const dimensionRange = (base) => [
      Math.round(base * 0.8),
      Math.round(base * 1.2),
  ];
  function FurnitureCustomizerWidget({ config = {}, onNavigateToRoomPlanner, selectedProduct: sharedSelectedProduct, onSelectedProductChange, }) {
      const mergedConfig = require$$0$1.useMemo(() => mergeConfig(config), [config]);
      const apiClient = require$$0$1.useMemo(() => new ApiClient(mergedConfig), [mergedConfig]);
      const storage = require$$0$1.useMemo(() => new Storage(mergedConfig.storageKey), [mergedConfig.storageKey]);
      const enabledActions = require$$0$1.useMemo(() => getEnabledActions(mergedConfig), [mergedConfig]);
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
      const [customizedItem, setCustomizedItem] = require$$0$1.useState(null);
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
                  const nextProducts = Array.isArray(response.items)
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
          setHistoryIndex((idx) => {
              const nextIdx = Math.max(0, idx - 1);
              setDraft(history[nextIdx] ?? createDraftForProduct(baseProduct));
              return nextIdx;
          });
      }, [baseProduct, history]);
      const handleRedo = require$$0$1.useCallback(() => {
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
          const widthRange = dimensionRange(selectedProduct.customizer.defaultWidthIn);
          const depthRange = dimensionRange(selectedProduct.customizer.defaultDepthIn);
          if (draft.widthIn < widthRange[0] || draft.widthIn > widthRange[1]) {
              errs.push(`Width must be between ${widthRange[0]} and ${widthRange[1]} inches.`);
          }
          if (draft.depthIn < depthRange[0] || draft.depthIn > depthRange[1]) {
              errs.push(`Depth must be between ${depthRange[0]} and ${depthRange[1]} inches.`);
          }
          if (draft.zoom < 0.8 || draft.zoom > 1.4) {
              errs.push('Zoom must be between 0.8x and 1.4x.');
          }
          return errs;
      }, [draft.depthIn, draft.widthIn, draft.zoom, selectedProduct]);
      const price = require$$0$1.useMemo(() => {
          const materialUpcharge = getMaterialOption(selectedProduct, draft.materialId)?.priceDelta ?? 0;
          const addonsUpcharge = (draft.addons.throwPillows ? 60 : 0) + (draft.addons.ottoman ? 350 : 0);
          const deltaW = Math.abs(draft.widthIn - selectedProduct.customizer.defaultWidthIn);
          const deltaD = Math.abs(draft.depthIn - selectedProduct.customizer.defaultDepthIn);
          const dimensionUpcharge = Math.round(deltaW * 6 + deltaD * 10);
          const customizations = materialUpcharge + addonsUpcharge + dimensionUpcharge;
          const total = selectedProduct.basePrice + customizations;
          const lineItems = [
              { label: 'Material', amount: materialUpcharge },
              { label: 'Add-ons', amount: addonsUpcharge },
              { label: 'Dimensions', amount: dimensionUpcharge },
          ].filter((lineItem) => lineItem.amount !== 0);
          return {
              base: selectedProduct.basePrice,
              customizations,
              total,
              lineItems,
          };
      }, [draft.addons.ottoman, draft.addons.throwPillows, draft.depthIn, draft.materialId, draft.widthIn, selectedProduct]);
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
              setSaveNotification('Configuration saved!');
              setTimeout(() => setSaveNotification(null), 2500);
          }
          catch (saveError) {
              console.error('Failed to save configuration:', saveError);
              setError('Failed to save configuration.');
          }
      }, [configStorageKey, draft, price.total, selectedProduct]);
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
          const materialName = getMaterialOption(selectedProduct, draft.materialId)?.name ?? draft.materialId;
          const colorName = getColorName(selectedProduct, draft.fabricColor);
          const previewWindow = window.open('', '_blank', 'noopener,noreferrer,width=900,height=700');
          if (!previewWindow) {
              setError('Popup blocked. Please allow popups to export PDF.');
              return;
          }
          const html = `
      <html>
        <head>
          <title>Furniture Configuration</title>
          <meta charset="utf-8" />
          <style>
            body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; padding: 24px; color: #111827; }
            .card { border: 1px solid #E5E7EB; border-radius: 16px; padding: 18px; margin-bottom: 14px; }
            h1 { margin: 0 0 8px 0; font-size: 22px; }
            h2 { margin: 0 0 10px 0; font-size: 14px; color: #6B7280; text-transform: uppercase; letter-spacing: .08em; }
            .row { display: flex; justify-content: space-between; gap: 12px; margin: 8px 0; }
            .muted { color: #6B7280; }
            .total { font-size: 18px; font-weight: 800; }
            .swatch { width: 16px; height: 16px; border-radius: 4px; border: 1px solid #E5E7EB; display:inline-block; vertical-align: middle; margin-right: 8px; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>${selectedProduct.name.replace(/</g, '&lt;')}</h1>
            <div class="muted">Generated: ${new Date().toLocaleString()}</div>
          </div>
          <div class="card">
            <h2>Configuration</h2>
            <div class="row"><div class="muted">Material</div><div>${materialName}</div></div>
            <div class="row"><div class="muted">Color</div><div><span class="swatch" style="background:${draft.fabricColor}"></span>${colorName}</div></div>
            <div class="row"><div class="muted">Width</div><div>${draft.widthIn} in</div></div>
            <div class="row"><div class="muted">Depth</div><div>${draft.depthIn} in</div></div>
            <div class="row"><div class="muted">Base Dimensions</div><div>${selectedProduct.dimensions.length}${selectedProduct.dimensions.unit} L × ${selectedProduct.dimensions.width}${selectedProduct.dimensions.unit} W × ${selectedProduct.dimensions.height}${selectedProduct.dimensions.unit} H</div></div>
            <div class="row"><div class="muted">Add-ons</div><div>${[
            draft.addons.throwPillows ? 'Throw pillows (2)' : '',
            draft.addons.ottoman ? 'Ottoman' : '',
        ]
            .filter(Boolean)
            .join(', ') || 'None'}</div></div>
          </div>
          <div class="card">
            <h2>Pricing</h2>
            <div class="row"><div class="muted">Base</div><div>$${price.base.toLocaleString()}</div></div>
            ${price.lineItems
            .map((lineItem) => `<div class="row"><div class="muted">${lineItem.label}</div><div>+$${lineItem.amount.toLocaleString()}</div></div>`)
            .join('')}
            <div class="row total"><div>Total</div><div>$${price.total.toLocaleString()}</div></div>
          </div>
          <script>
            window.focus();
            setTimeout(() => window.print(), 250);
          </script>
        </body>
      </html>
    `;
          previewWindow.document.open();
          previewWindow.document.write(html);
          previewWindow.document.close();
      }, [draft, price, selectedProduct]);
      const handleNavigateToRoomPlanner = () => {
          if (onNavigateToRoomPlanner) {
              onNavigateToRoomPlanner();
          }
          else {
              window.dispatchEvent(new CustomEvent('modly:navigate-to-room-planner'));
          }
      };
      const buildCustomizationConfig = require$$0$1.useCallback(() => {
          const currentMaterial = getMaterialOption(selectedProduct, draft.materialId);
          const widthDeltaIn = draft.widthIn - selectedProduct.customizer.defaultWidthIn;
          const depthDeltaIn = draft.depthIn - selectedProduct.customizer.defaultDepthIn;
          const inchToMeters = 0.0254;
          const ornamentDetails = [];
          if (draft.addons.throwPillows)
              ornamentDetails.push('Throw Pillows (2)');
          if (draft.addons.ottoman)
              ornamentDetails.push('Ottoman');
          return {
              baseItemId: selectedProduct.id,
              baseItemType: selectedProduct.customizer.type,
              baseItemName: selectedProduct.name,
              colorScheme: {
                  primary: draft.fabricColor,
                  secondary: selectedProduct.colors[1]?.hex,
              },
              materialOverrides: {
                  primary: currentMaterial?.name,
                  upholstery: currentMaterial?.name,
                  legs: selectedProduct.materials[1],
              },
              ornamentDetails,
              dimensionAdjustments: {
                  width: Number((widthDeltaIn * inchToMeters).toFixed(3)),
                  length: Number((depthDeltaIn * inchToMeters).toFixed(3)),
              },
              aiNotes: `Configurator snapshot · ${selectedProduct.name} · Total $${price.total.toLocaleString()}`,
          };
      }, [draft.addons.ottoman, draft.addons.throwPillows, draft.depthIn, draft.fabricColor, draft.materialId, draft.widthIn, price.total, selectedProduct]);
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
                  const saved = storage.saveCustomizedFurniture({
                      productId: selectedProduct.id,
                      name: selectedProduct.name,
                      baseItemType: selectedProduct.category,
                      dimensions: mergedData.dimensions,
                      colorScheme: {
                          primary: getColorName(selectedProduct, draft.fabricColor),
                          secondary: selectedProduct.colors[1]?.name,
                      },
                      materials: mergedData.materials,
                      ornamentDetails: mergedData.ornamentDetails,
                      aiNotes: mergedData.aiNotes,
                      dimensionChanges: mergedData.dimensionAdjustments,
                  });
                  setSavedItem(saved);
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
      }, [apiClient, draft.fabricColor, mergedConfig, selectedProduct, storage]);
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
          if (!savedItem && !customizedItem) {
              setError('Please customize an item first before requesting a quote.');
              return;
          }
          setShowFinalizeModal(true);
      };
      const handleProceedToQuote = () => {
          if (!enabledActions.requestQuote)
              return;
          setShowFinalizeModal(false);
          setShowQuoteForm(true);
      };
      const handleQuoteSubmit = async (quoteRequest) => {
          try {
              await apiClient.submitQuoteRequest(quoteRequest);
              setShowQuoteForm(false);
              setQuoteSuccess(true);
              setSaveNotification("Quote request submitted successfully! We'll contact you soon.");
              setTimeout(() => {
                  setQuoteSuccess(false);
                  setSaveNotification(null);
              }, 5000);
          }
          catch (quoteError) {
              throw quoteError;
          }
      };
      return (jsxRuntimeExports.jsxs(WidgetProvider, { apiClient: apiClient, storage: storage, config: mergedConfig, children: [jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white", children: [jsxRuntimeExports.jsx("section", { className: "py-12 bg-gradient-to-br from-purple-600 to-purple-800 text-white", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4", children: jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4", children: [jsxRuntimeExports.jsx(Palette, { className: "w-4 h-4" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "AI-Powered Customization" })] }), jsxRuntimeExports.jsx("h1", { className: "text-5xl font-bold mb-4", children: "Furniture Customizer" }), jsxRuntimeExports.jsx("p", { className: "text-xl text-purple-100 mb-8", children: "Customize furniture colors, materials, and dimensions with AI assistance. See changes in real-time and get instant feasibility feedback." }), jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Real-time preview" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Factory-approved options" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-green-300" }), jsxRuntimeExports.jsx("span", { children: "Instant pricing" })] })] })] }) }) }), jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [saveNotification && (jsxRuntimeExports.jsxs("div", { className: "mt-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3", children: [jsxRuntimeExports.jsx(Check, { className: "w-5 h-5" }), jsxRuntimeExports.jsx("span", { className: "font-medium", children: saveNotification })] })), error && (jsxRuntimeExports.jsx("div", { className: "mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl", children: jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [jsxRuntimeExports.jsx(Info, { className: "w-5 h-5 mt-0.5" }), jsxRuntimeExports.jsx("div", { children: error })] }) }))] }), jsxRuntimeExports.jsx(FurnitureCustomizerPanel, { products: availableProducts, draft: draft, setDraft: setDraftWithHistory, isApplying: isLoading, validationErrors: validationErrors, price: price, onApply: handleApply, onUndo: handleUndo, onRedo: handleRedo, canUndo: canUndo, canRedo: canRedo, onSaveConfig: saveDraftConfig, onShareLink: copyShareLink, onExportPdf: exportAsPdf }), jsxRuntimeExports.jsx("section", { className: "py-12 bg-white border-t border-gray-200", children: jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 text-center", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Love Your Custom Design?" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-8", children: "Save your configuration or share it with others" }), jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [enabledActions.requestQuote && (jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleFinalize, className: "px-8 py-4 text-white rounded-lg font-semibold transition shadow-lg", style: { backgroundColor: primaryColor }, children: ["Add to Quote - $", price.total.toLocaleString()] })), jsxRuntimeExports.jsx("button", { type: "button", onClick: saveDraftConfig, className: "px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition", children: "Save Configuration" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: copyShareLink, className: "px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition", children: "Share Design" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: exportAsPdf, className: "px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition", children: "Export PDF" }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleNavigateToRoomPlanner, className: "px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition", children: "View in Room Planner" })] })] }) })] }), jsxRuntimeExports.jsx(FinalizeQuoteModal, { isOpen: enabledActions.requestQuote && showFinalizeModal, onClose: () => setShowFinalizeModal(false), onProceed: handleProceedToQuote, item: savedItem }), jsxRuntimeExports.jsx(QuoteRequestForm, { isOpen: enabledActions.requestQuote && showQuoteForm, onClose: () => setShowQuoteForm(false), onSubmit: handleQuoteSubmit, item: savedItem }), quoteSuccess && (jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-slide-up", children: [jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Quote Request Submitted!" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-white/90", children: "We'll contact you soon with details." })] })] }))] }));
  }

  function MessageBubble({ message, onCustomizeItem, onAddToRoomPlanner, onViewInCatalog, enabledActions, primaryColor }) {
      const isUser = message.role === 'user';
      const isThinking = message.type === 'thinking';
      const actions = enabledActions ?? { viewInCatalog: true, customize: true, requestQuote: true };
      return (jsxRuntimeExports.jsx("div", { className: `flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`, children: jsxRuntimeExports.jsx("div", { className: `max-w-[80%] rounded-2xl px-4 py-3 ${isUser
                ? 'bg-blue-500 text-white'
                : isThinking
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-gray-50 text-gray-900 border border-gray-200'}`, children: isThinking ? (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0ms' } }), jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '150ms' } }), jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '300ms' } })] }), jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Thinking..." })] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("div", { className: "whitespace-pre-wrap text-sm leading-relaxed", children: message.content }), message.metadata?.recommendations && message.metadata?.recommendations.length > 0 && (jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: message.metadata?.recommendations.map((rec, index) => (jsxRuntimeExports.jsx(RecommendationCard, { recommendation: rec, onCustomize: onCustomizeItem, onAddToRoomPlanner: onAddToRoomPlanner, onViewInCatalog: onViewInCatalog, enabledActions: actions, primaryColor: primaryColor }, rec.item.id || index))) })), message.metadata?.action && (jsxRuntimeExports.jsx("div", { className: "mt-3 pt-3 border-t border-gray-200", children: jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500", children: [message.metadata?.action?.type === 'open_room_planner' && 'Ready to analyze your room', message.metadata?.action?.type === 'open_customizer' && 'Ready to customize', message.metadata?.action?.type === 'show_catalog' && 'Ready to browse catalog'] }) }))] })) }) }));
  }
  function getProductCatalogUrl(item) {
      return getRealProductUrl(item);
  }
  function RecommendationCard({ recommendation, onCustomize, onAddToRoomPlanner, onViewInCatalog, enabledActions, primaryColor, }) {
      const item = recommendation.item;
      const catalogUrl = getProductCatalogUrl(item);
      const primaryTextColor = primaryColor ? getReadableTextColor(primaryColor) : undefined;
      return (jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-3 shadow-sm", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-gray-900", children: item.name }), recommendation.matchScore && (jsxRuntimeExports.jsxs("span", { className: "text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded", children: [Math.round(recommendation.matchScore * 100), "% match"] }))] }), jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-600 mb-2", children: [item.category, item.subCategory ? ` • ${item.subCategory}` : ''] }), item.priceRange && (jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-gray-900 mb-2", children: ["$", item.priceRange.min?.toLocaleString(), item.priceRange.max && item.priceRange.max !== item.priceRange.min
                          ? ` - $${item.priceRange.max.toLocaleString()}`
                          : ''] })), recommendation.reasoning && (jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-2", children: recommendation.reasoning })), jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [enabledActions.viewInCatalog && catalogUrl ? (jsxRuntimeExports.jsxs("a", { href: catalogUrl, target: "_blank", rel: "noopener noreferrer", className: "flex-1 py-1.5 px-3 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-1 border border-gray-300", children: [jsxRuntimeExports.jsxs("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }), jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })] }), "View in Catalog"] })) : enabledActions.viewInCatalog ? (jsxRuntimeExports.jsx("button", { type: "button", disabled: true, className: "flex-1 py-1.5 px-3 bg-gray-100 text-gray-400 text-xs rounded cursor-not-allowed flex items-center justify-center gap-1 border border-gray-300", children: "Catalog link unavailable" })) : null, enabledActions.customize && onCustomize && (jsxRuntimeExports.jsxs("button", { onClick: () => onCustomize(item), className: "flex-1 py-1.5 px-3 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-1", style: primaryColor ? { backgroundColor: primaryColor, color: primaryTextColor } : undefined, children: [jsxRuntimeExports.jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }), "Customize this"] }))] })] }));
  }

  function ConversationInterface({ aiService, onCustomizeItem, onAddToRoomPlanner, onOpenRoomPlanner, onOpenCustomizer, onShowCatalog, onViewInCatalog, enabledActions, primaryColor, }) {
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
      return (jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full bg-white", children: [jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-2", children: [messages.length === 0 ? (jsxRuntimeExports.jsx("div", { className: "text-center text-gray-500 py-8", children: jsxRuntimeExports.jsx("p", { children: "Start a conversation to get help with your furniture needs." }) })) : (messages.map((message) => (jsxRuntimeExports.jsx(MessageBubble, { message: message, onCustomizeItem: onCustomizeItem, onAddToRoomPlanner: onAddToRoomPlanner, onViewInCatalog: onViewInCatalog, enabledActions: enabledActions, primaryColor: primaryColor }, message.id)))), jsxRuntimeExports.jsx("div", { ref: messagesEndRef })] }), jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-200 p-4 bg-gray-50", children: [jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [jsxRuntimeExports.jsx("textarea", { ref: inputRef, value: input, onChange: (e) => setInput(e.target.value), onKeyDown: handleKeyPress, placeholder: "Type your message...", className: "flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none", rows: 1, style: { minHeight: '40px', maxHeight: '120px' }, disabled: isLoading }), jsxRuntimeExports.jsx("button", { onClick: handleSend, disabled: !input.trim() || isLoading, className: "px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium", style: primaryColor ? { backgroundColor: primaryColor, color: primaryTextColor } : undefined, children: isLoading ? (jsxRuntimeExports.jsxs("svg", { className: "animate-spin h-5 w-5", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [jsxRuntimeExports.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), jsxRuntimeExports.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] })) : ('Send') })] }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-2 text-center", children: "Press Enter to send, Shift+Enter for new line" })] })] }));
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
      }, [enabledActions.customize]);
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
          setSelectedProduct(productFromFurnitureItem(item));
          setViewMode('customizer');
      };
      const handleOpenRoomPlanner = () => {
          setViewMode('room-planner');
      };
      const handleOpenCustomizer = () => {
          if (!enabledActions.customize)
              return;
          setViewMode('customizer');
      };
      const handleShowCatalog = () => {
          // Catalog doesn't exist yet - show message in conversation or do nothing
          aiService.sendMessage('Show me the catalog');
      };
      const handleViewInCatalog = (item) => {
          const catalogUrl = getRealProductUrl(item);
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
      return (jsxRuntimeExports.jsxs("div", { className: "furniture-widget-ai h-full flex flex-col", children: [jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 border-b border-gray-200 px-6 py-4 pr-16 flex items-center justify-between", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: displayTitle === DEFAULT_WIDGET_TITLE ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("span", { children: "Modly" }), jsxRuntimeExports.jsx("span", { style: { color: primaryColor }, children: "AI" })] })) : (jsxRuntimeExports.jsx("span", { children: displayTitle })) }), viewMode === 'conversation' && (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("button", { onClick: handleOpenRoomPlanner, className: "text-sm px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors", children: "Room Planner" }), enabledActions.customize && (jsxRuntimeExports.jsx("button", { onClick: handleOpenCustomizer, className: "text-sm px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors", children: "Customizer" }))] })), viewMode !== 'conversation' && (jsxRuntimeExports.jsxs("button", { onClick: handleBackToConversation, className: "text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1", children: [jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }), "Back to Chat"] }))] }), jsxRuntimeExports.jsx("div", { className: "flex gap-2" })] }), jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-hidden", children: [viewMode === 'conversation' && (jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col", children: [saveNotification && (jsxRuntimeExports.jsx("div", { className: "bg-green-500 text-white px-4 py-2 text-sm text-center flex-shrink-0", children: saveNotification })), jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0", children: jsxRuntimeExports.jsx(ConversationInterface, { aiService: aiService, onCustomizeItem: handleCustomizeItem, onAddToRoomPlanner: handleAddToRoomPlanner, onOpenRoomPlanner: handleOpenRoomPlanner, onOpenCustomizer: handleOpenCustomizer, onShowCatalog: handleShowCatalog, onViewInCatalog: handleViewInCatalog, enabledActions: enabledActions, primaryColor: primaryColor }) })] })), viewMode === 'room-planner' && (jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto", children: jsxRuntimeExports.jsx(FurnitureRoomPlannerWidget, { config: mergedConfig, onCustomizeItem: enabledActions.customize ? handleCustomizeItem : undefined, onNavigateToCustomizer: enabledActions.customize ? handleOpenCustomizer : undefined }) })), viewMode === 'customizer' && (jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto", children: enabledActions.customize && (jsxRuntimeExports.jsx(FurnitureCustomizerWidget, { config: mergedConfig, onNavigateToRoomPlanner: handleOpenRoomPlanner, selectedProduct: selectedProduct, onSelectedProductChange: setSelectedProduct })) }))] }), showSubmitModal && submitConfig && (jsxRuntimeExports.jsx(SubmitFlowModal, { config: submitConfig.config, product: submitConfig.product, apiClient: apiClient, onSuccess: handleSubmitSuccess, onClose: handleCloseSubmitModal })), isCatalogModalOpen && selectedCatalogItem && (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-md w-full p-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: selectedCatalogItem.name }), jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6", children: [selectedCatalogItem.dimensions && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-1", children: "Dimensions" }), jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [selectedCatalogItem.dimensions.length, "\" L \u00D7 ", selectedCatalogItem.dimensions.width, "\" W \u00D7 ", selectedCatalogItem.dimensions.height, "\" H"] })] })), selectedCatalogItem.materials && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-1", children: "Materials" }), jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [selectedCatalogItem.materials.primary, selectedCatalogItem.materials.secondary && `, ${selectedCatalogItem.materials.secondary}`] })] })), selectedCatalogItem.colors && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-1", children: "Colors" }), jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [selectedCatalogItem.colors.main, selectedCatalogItem.colors.accent && ` / ${selectedCatalogItem.colors.accent}`] })] })), jsxRuntimeExports.jsx("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4", children: jsxRuntimeExports.jsxs("p", { className: "text-sm text-blue-900", children: [jsxRuntimeExports.jsx("strong", { children: "Catalog coming soon." }), " You can customize this item instead."] }) })] }), jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [enabledActions.customize && (jsxRuntimeExports.jsx("button", { onClick: handleCustomizeFromCatalog, className: "flex-1 text-white px-4 py-2 rounded-lg transition-colors font-medium", style: { backgroundColor: primaryColor, color: primaryTextColor }, children: "Customize This" })), jsxRuntimeExports.jsx("button", { onClick: handleCloseCatalogModal, className: "flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium", children: "Close" })] })] }) }))] }));
  }

  function FurnitureAIWidgetButton({ config = {}, defaultTab = 'room-planner', buttonText, buttonPosition = 'bottom-right', buttonStyle, className = '' }) {
      const [isOpen, setIsOpen] = require$$0$1.useState(false);
      const displayTitle = config.widgetTitle ||
          config.theme?.buttonText ||
          buttonText ||
          DEFAULT_WIDGET_TITLE;
      require$$0$1.useEffect(() => {
          const onOpen = () => setIsOpen(true);
          window.addEventListener('modly:open-widget', onOpen);
          return () => window.removeEventListener('modly:open-widget', onOpen);
      }, []);
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
      return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("button", { onClick: () => setIsOpen(true), style: finalButtonStyle, className: `modly-widget-button fixed ${positionClasses[buttonPosition]} z-50 cursor-pointer rounded-full inline-flex items-center justify-center gap-2 transition-all duration-200 ease-out ${className}`, onMouseEnter: (e) => {
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
