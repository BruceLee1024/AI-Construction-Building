var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// tooling/agent-harness/run.ts
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// node_modules/.bun/nanoid@5.1.6/node_modules/nanoid/index.js
import { webcrypto as crypto } from "node:crypto";
var POOL_SIZE_MULTIPLIER = 128;
var pool;
var poolOffset;
function fillPool(bytes) {
  if (!pool || pool.length < bytes) {
    pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
    crypto.getRandomValues(pool);
    poolOffset = 0;
  } else if (poolOffset + bytes > pool.length) {
    crypto.getRandomValues(pool);
    poolOffset = 0;
  }
  poolOffset += bytes;
}
function random(bytes) {
  fillPool(bytes |= 0);
  return pool.subarray(poolOffset - bytes, poolOffset);
}
function customRandom(alphabet, defaultSize, getRandom) {
  let mask = (2 << 31 - Math.clz32(alphabet.length - 1 | 1)) - 1;
  let step = Math.ceil(1.6 * mask * defaultSize / alphabet.length);
  return (size = defaultSize) => {
    if (!size) return "";
    let id = "";
    while (true) {
      let bytes = getRandom(step);
      let i = step;
      while (i--) {
        id += alphabet[bytes[i] & mask] || "";
        if (id.length >= size) return id;
      }
    }
  };
}
function customAlphabet(alphabet, size = 21) {
  return customRandom(alphabet, size, random);
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/classic/external.js
var external_exports = {};
__export(external_exports, {
  $brand: () => $brand,
  $input: () => $input,
  $output: () => $output,
  NEVER: () => NEVER,
  TimePrecision: () => TimePrecision,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBase64: () => ZodBase64,
  ZodBase64URL: () => ZodBase64URL,
  ZodBigInt: () => ZodBigInt,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBoolean: () => ZodBoolean,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCUID: () => ZodCUID,
  ZodCUID2: () => ZodCUID2,
  ZodCatch: () => ZodCatch,
  ZodCodec: () => ZodCodec,
  ZodCustom: () => ZodCustom,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodE164: () => ZodE164,
  ZodEmail: () => ZodEmail,
  ZodEmoji: () => ZodEmoji,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodExactOptional: () => ZodExactOptional,
  ZodFile: () => ZodFile,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodGUID: () => ZodGUID,
  ZodIPv4: () => ZodIPv4,
  ZodIPv6: () => ZodIPv6,
  ZodISODate: () => ZodISODate,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODuration: () => ZodISODuration,
  ZodISOTime: () => ZodISOTime,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodJWT: () => ZodJWT,
  ZodKSUID: () => ZodKSUID,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMAC: () => ZodMAC,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNanoID: () => ZodNanoID,
  ZodNever: () => ZodNever,
  ZodNonOptional: () => ZodNonOptional,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodPipe: () => ZodPipe,
  ZodPrefault: () => ZodPrefault,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRealError: () => ZodRealError,
  ZodRecord: () => ZodRecord,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodStringFormat: () => ZodStringFormat,
  ZodSuccess: () => ZodSuccess,
  ZodSymbol: () => ZodSymbol,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodTransform: () => ZodTransform,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodULID: () => ZodULID,
  ZodURL: () => ZodURL,
  ZodUUID: () => ZodUUID,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  ZodXID: () => ZodXID,
  ZodXor: () => ZodXor,
  _ZodString: () => _ZodString,
  _default: () => _default2,
  _function: () => _function,
  any: () => any,
  array: () => array,
  base64: () => base642,
  base64url: () => base64url2,
  bigint: () => bigint2,
  boolean: () => boolean2,
  catch: () => _catch2,
  check: () => check,
  cidrv4: () => cidrv42,
  cidrv6: () => cidrv62,
  clone: () => clone,
  codec: () => codec,
  coerce: () => coerce_exports,
  config: () => config,
  core: () => core_exports2,
  cuid: () => cuid3,
  cuid2: () => cuid22,
  custom: () => custom,
  date: () => date3,
  decode: () => decode2,
  decodeAsync: () => decodeAsync2,
  describe: () => describe2,
  discriminatedUnion: () => discriminatedUnion,
  e164: () => e1642,
  email: () => email2,
  emoji: () => emoji2,
  encode: () => encode2,
  encodeAsync: () => encodeAsync2,
  endsWith: () => _endsWith,
  enum: () => _enum2,
  exactOptional: () => exactOptional,
  file: () => file,
  flattenError: () => flattenError,
  float32: () => float32,
  float64: () => float64,
  formatError: () => formatError,
  fromJSONSchema: () => fromJSONSchema,
  function: () => _function,
  getErrorMap: () => getErrorMap,
  globalRegistry: () => globalRegistry,
  gt: () => _gt,
  gte: () => _gte,
  guid: () => guid2,
  hash: () => hash,
  hex: () => hex2,
  hostname: () => hostname2,
  httpUrl: () => httpUrl,
  includes: () => _includes,
  instanceof: () => _instanceof,
  int: () => int,
  int32: () => int32,
  int64: () => int64,
  intersection: () => intersection,
  ipv4: () => ipv42,
  ipv6: () => ipv62,
  iso: () => iso_exports,
  json: () => json,
  jwt: () => jwt,
  keyof: () => keyof,
  ksuid: () => ksuid2,
  lazy: () => lazy,
  length: () => _length,
  literal: () => literal,
  locales: () => locales_exports,
  looseObject: () => looseObject,
  looseRecord: () => looseRecord,
  lowercase: () => _lowercase,
  lt: () => _lt,
  lte: () => _lte,
  mac: () => mac2,
  map: () => map,
  maxLength: () => _maxLength,
  maxSize: () => _maxSize,
  meta: () => meta2,
  mime: () => _mime,
  minLength: () => _minLength,
  minSize: () => _minSize,
  multipleOf: () => _multipleOf,
  nan: () => nan,
  nanoid: () => nanoid2,
  nativeEnum: () => nativeEnum,
  negative: () => _negative,
  never: () => never,
  nonnegative: () => _nonnegative,
  nonoptional: () => nonoptional,
  nonpositive: () => _nonpositive,
  normalize: () => _normalize,
  null: () => _null3,
  nullable: () => nullable,
  nullish: () => nullish2,
  number: () => number2,
  object: () => object,
  optional: () => optional,
  overwrite: () => _overwrite,
  parse: () => parse2,
  parseAsync: () => parseAsync2,
  partialRecord: () => partialRecord,
  pipe: () => pipe,
  positive: () => _positive,
  prefault: () => prefault,
  preprocess: () => preprocess,
  prettifyError: () => prettifyError,
  promise: () => promise,
  property: () => _property,
  readonly: () => readonly,
  record: () => record,
  refine: () => refine,
  regex: () => _regex,
  regexes: () => regexes_exports,
  registry: () => registry,
  safeDecode: () => safeDecode2,
  safeDecodeAsync: () => safeDecodeAsync2,
  safeEncode: () => safeEncode2,
  safeEncodeAsync: () => safeEncodeAsync2,
  safeParse: () => safeParse2,
  safeParseAsync: () => safeParseAsync2,
  set: () => set,
  setErrorMap: () => setErrorMap,
  size: () => _size,
  slugify: () => _slugify,
  startsWith: () => _startsWith,
  strictObject: () => strictObject,
  string: () => string2,
  stringFormat: () => stringFormat,
  stringbool: () => stringbool,
  success: () => success,
  superRefine: () => superRefine,
  symbol: () => symbol,
  templateLiteral: () => templateLiteral,
  toJSONSchema: () => toJSONSchema,
  toLowerCase: () => _toLowerCase,
  toUpperCase: () => _toUpperCase,
  transform: () => transform,
  treeifyError: () => treeifyError,
  trim: () => _trim,
  tuple: () => tuple,
  uint32: () => uint32,
  uint64: () => uint64,
  ulid: () => ulid2,
  undefined: () => _undefined3,
  union: () => union,
  unknown: () => unknown,
  uppercase: () => _uppercase,
  url: () => url,
  util: () => util_exports,
  uuid: () => uuid2,
  uuidv4: () => uuidv4,
  uuidv6: () => uuidv6,
  uuidv7: () => uuidv7,
  void: () => _void2,
  xid: () => xid2,
  xor: () => xor
});

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/core/index.js
var core_exports2 = {};
__export(core_exports2, {
  $ZodAny: () => $ZodAny,
  $ZodArray: () => $ZodArray,
  $ZodAsyncError: () => $ZodAsyncError,
  $ZodBase64: () => $ZodBase64,
  $ZodBase64URL: () => $ZodBase64URL,
  $ZodBigInt: () => $ZodBigInt,
  $ZodBigIntFormat: () => $ZodBigIntFormat,
  $ZodBoolean: () => $ZodBoolean,
  $ZodCIDRv4: () => $ZodCIDRv4,
  $ZodCIDRv6: () => $ZodCIDRv6,
  $ZodCUID: () => $ZodCUID,
  $ZodCUID2: () => $ZodCUID2,
  $ZodCatch: () => $ZodCatch,
  $ZodCheck: () => $ZodCheck,
  $ZodCheckBigIntFormat: () => $ZodCheckBigIntFormat,
  $ZodCheckEndsWith: () => $ZodCheckEndsWith,
  $ZodCheckGreaterThan: () => $ZodCheckGreaterThan,
  $ZodCheckIncludes: () => $ZodCheckIncludes,
  $ZodCheckLengthEquals: () => $ZodCheckLengthEquals,
  $ZodCheckLessThan: () => $ZodCheckLessThan,
  $ZodCheckLowerCase: () => $ZodCheckLowerCase,
  $ZodCheckMaxLength: () => $ZodCheckMaxLength,
  $ZodCheckMaxSize: () => $ZodCheckMaxSize,
  $ZodCheckMimeType: () => $ZodCheckMimeType,
  $ZodCheckMinLength: () => $ZodCheckMinLength,
  $ZodCheckMinSize: () => $ZodCheckMinSize,
  $ZodCheckMultipleOf: () => $ZodCheckMultipleOf,
  $ZodCheckNumberFormat: () => $ZodCheckNumberFormat,
  $ZodCheckOverwrite: () => $ZodCheckOverwrite,
  $ZodCheckProperty: () => $ZodCheckProperty,
  $ZodCheckRegex: () => $ZodCheckRegex,
  $ZodCheckSizeEquals: () => $ZodCheckSizeEquals,
  $ZodCheckStartsWith: () => $ZodCheckStartsWith,
  $ZodCheckStringFormat: () => $ZodCheckStringFormat,
  $ZodCheckUpperCase: () => $ZodCheckUpperCase,
  $ZodCodec: () => $ZodCodec,
  $ZodCustom: () => $ZodCustom,
  $ZodCustomStringFormat: () => $ZodCustomStringFormat,
  $ZodDate: () => $ZodDate,
  $ZodDefault: () => $ZodDefault,
  $ZodDiscriminatedUnion: () => $ZodDiscriminatedUnion,
  $ZodE164: () => $ZodE164,
  $ZodEmail: () => $ZodEmail,
  $ZodEmoji: () => $ZodEmoji,
  $ZodEncodeError: () => $ZodEncodeError,
  $ZodEnum: () => $ZodEnum,
  $ZodError: () => $ZodError,
  $ZodExactOptional: () => $ZodExactOptional,
  $ZodFile: () => $ZodFile,
  $ZodFunction: () => $ZodFunction,
  $ZodGUID: () => $ZodGUID,
  $ZodIPv4: () => $ZodIPv4,
  $ZodIPv6: () => $ZodIPv6,
  $ZodISODate: () => $ZodISODate,
  $ZodISODateTime: () => $ZodISODateTime,
  $ZodISODuration: () => $ZodISODuration,
  $ZodISOTime: () => $ZodISOTime,
  $ZodIntersection: () => $ZodIntersection,
  $ZodJWT: () => $ZodJWT,
  $ZodKSUID: () => $ZodKSUID,
  $ZodLazy: () => $ZodLazy,
  $ZodLiteral: () => $ZodLiteral,
  $ZodMAC: () => $ZodMAC,
  $ZodMap: () => $ZodMap,
  $ZodNaN: () => $ZodNaN,
  $ZodNanoID: () => $ZodNanoID,
  $ZodNever: () => $ZodNever,
  $ZodNonOptional: () => $ZodNonOptional,
  $ZodNull: () => $ZodNull,
  $ZodNullable: () => $ZodNullable,
  $ZodNumber: () => $ZodNumber,
  $ZodNumberFormat: () => $ZodNumberFormat,
  $ZodObject: () => $ZodObject,
  $ZodObjectJIT: () => $ZodObjectJIT,
  $ZodOptional: () => $ZodOptional,
  $ZodPipe: () => $ZodPipe,
  $ZodPrefault: () => $ZodPrefault,
  $ZodPromise: () => $ZodPromise,
  $ZodReadonly: () => $ZodReadonly,
  $ZodRealError: () => $ZodRealError,
  $ZodRecord: () => $ZodRecord,
  $ZodRegistry: () => $ZodRegistry,
  $ZodSet: () => $ZodSet,
  $ZodString: () => $ZodString,
  $ZodStringFormat: () => $ZodStringFormat,
  $ZodSuccess: () => $ZodSuccess,
  $ZodSymbol: () => $ZodSymbol,
  $ZodTemplateLiteral: () => $ZodTemplateLiteral,
  $ZodTransform: () => $ZodTransform,
  $ZodTuple: () => $ZodTuple,
  $ZodType: () => $ZodType,
  $ZodULID: () => $ZodULID,
  $ZodURL: () => $ZodURL,
  $ZodUUID: () => $ZodUUID,
  $ZodUndefined: () => $ZodUndefined,
  $ZodUnion: () => $ZodUnion,
  $ZodUnknown: () => $ZodUnknown,
  $ZodVoid: () => $ZodVoid,
  $ZodXID: () => $ZodXID,
  $ZodXor: () => $ZodXor,
  $brand: () => $brand,
  $constructor: () => $constructor,
  $input: () => $input,
  $output: () => $output,
  Doc: () => Doc,
  JSONSchema: () => json_schema_exports,
  JSONSchemaGenerator: () => JSONSchemaGenerator,
  NEVER: () => NEVER,
  TimePrecision: () => TimePrecision,
  _any: () => _any,
  _array: () => _array,
  _base64: () => _base64,
  _base64url: () => _base64url,
  _bigint: () => _bigint,
  _boolean: () => _boolean,
  _catch: () => _catch,
  _check: () => _check,
  _cidrv4: () => _cidrv4,
  _cidrv6: () => _cidrv6,
  _coercedBigint: () => _coercedBigint,
  _coercedBoolean: () => _coercedBoolean,
  _coercedDate: () => _coercedDate,
  _coercedNumber: () => _coercedNumber,
  _coercedString: () => _coercedString,
  _cuid: () => _cuid,
  _cuid2: () => _cuid2,
  _custom: () => _custom,
  _date: () => _date,
  _decode: () => _decode,
  _decodeAsync: () => _decodeAsync,
  _default: () => _default,
  _discriminatedUnion: () => _discriminatedUnion,
  _e164: () => _e164,
  _email: () => _email,
  _emoji: () => _emoji2,
  _encode: () => _encode,
  _encodeAsync: () => _encodeAsync,
  _endsWith: () => _endsWith,
  _enum: () => _enum,
  _file: () => _file,
  _float32: () => _float32,
  _float64: () => _float64,
  _gt: () => _gt,
  _gte: () => _gte,
  _guid: () => _guid,
  _includes: () => _includes,
  _int: () => _int,
  _int32: () => _int32,
  _int64: () => _int64,
  _intersection: () => _intersection,
  _ipv4: () => _ipv4,
  _ipv6: () => _ipv6,
  _isoDate: () => _isoDate,
  _isoDateTime: () => _isoDateTime,
  _isoDuration: () => _isoDuration,
  _isoTime: () => _isoTime,
  _jwt: () => _jwt,
  _ksuid: () => _ksuid,
  _lazy: () => _lazy,
  _length: () => _length,
  _literal: () => _literal,
  _lowercase: () => _lowercase,
  _lt: () => _lt,
  _lte: () => _lte,
  _mac: () => _mac,
  _map: () => _map,
  _max: () => _lte,
  _maxLength: () => _maxLength,
  _maxSize: () => _maxSize,
  _mime: () => _mime,
  _min: () => _gte,
  _minLength: () => _minLength,
  _minSize: () => _minSize,
  _multipleOf: () => _multipleOf,
  _nan: () => _nan,
  _nanoid: () => _nanoid,
  _nativeEnum: () => _nativeEnum,
  _negative: () => _negative,
  _never: () => _never,
  _nonnegative: () => _nonnegative,
  _nonoptional: () => _nonoptional,
  _nonpositive: () => _nonpositive,
  _normalize: () => _normalize,
  _null: () => _null2,
  _nullable: () => _nullable,
  _number: () => _number,
  _optional: () => _optional,
  _overwrite: () => _overwrite,
  _parse: () => _parse,
  _parseAsync: () => _parseAsync,
  _pipe: () => _pipe,
  _positive: () => _positive,
  _promise: () => _promise,
  _property: () => _property,
  _readonly: () => _readonly,
  _record: () => _record,
  _refine: () => _refine,
  _regex: () => _regex,
  _safeDecode: () => _safeDecode,
  _safeDecodeAsync: () => _safeDecodeAsync,
  _safeEncode: () => _safeEncode,
  _safeEncodeAsync: () => _safeEncodeAsync,
  _safeParse: () => _safeParse,
  _safeParseAsync: () => _safeParseAsync,
  _set: () => _set,
  _size: () => _size,
  _slugify: () => _slugify,
  _startsWith: () => _startsWith,
  _string: () => _string,
  _stringFormat: () => _stringFormat,
  _stringbool: () => _stringbool,
  _success: () => _success,
  _superRefine: () => _superRefine,
  _symbol: () => _symbol,
  _templateLiteral: () => _templateLiteral,
  _toLowerCase: () => _toLowerCase,
  _toUpperCase: () => _toUpperCase,
  _transform: () => _transform,
  _trim: () => _trim,
  _tuple: () => _tuple,
  _uint32: () => _uint32,
  _uint64: () => _uint64,
  _ulid: () => _ulid,
  _undefined: () => _undefined2,
  _union: () => _union,
  _unknown: () => _unknown,
  _uppercase: () => _uppercase,
  _url: () => _url,
  _uuid: () => _uuid,
  _uuidv4: () => _uuidv4,
  _uuidv6: () => _uuidv6,
  _uuidv7: () => _uuidv7,
  _void: () => _void,
  _xid: () => _xid,
  _xor: () => _xor,
  clone: () => clone,
  config: () => config,
  createStandardJSONSchemaMethod: () => createStandardJSONSchemaMethod,
  createToJSONSchemaMethod: () => createToJSONSchemaMethod,
  decode: () => decode,
  decodeAsync: () => decodeAsync,
  describe: () => describe,
  encode: () => encode,
  encodeAsync: () => encodeAsync,
  extractDefs: () => extractDefs,
  finalize: () => finalize,
  flattenError: () => flattenError,
  formatError: () => formatError,
  globalConfig: () => globalConfig,
  globalRegistry: () => globalRegistry,
  initializeContext: () => initializeContext,
  isValidBase64: () => isValidBase64,
  isValidBase64URL: () => isValidBase64URL,
  isValidJWT: () => isValidJWT,
  locales: () => locales_exports,
  meta: () => meta,
  parse: () => parse,
  parseAsync: () => parseAsync,
  prettifyError: () => prettifyError,
  process: () => process2,
  regexes: () => regexes_exports,
  registry: () => registry,
  safeDecode: () => safeDecode,
  safeDecodeAsync: () => safeDecodeAsync,
  safeEncode: () => safeEncode,
  safeEncodeAsync: () => safeEncodeAsync,
  safeParse: () => safeParse,
  safeParseAsync: () => safeParseAsync,
  toDotPath: () => toDotPath,
  toJSONSchema: () => toJSONSchema,
  treeifyError: () => treeifyError,
  util: () => util_exports,
  version: () => version
});

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/core/core.js
var NEVER = Object.freeze({
  status: "aborted"
});
// @__NO_SIDE_EFFECTS__
function $constructor(name, initializer3, params) {
  function init(inst, def) {
    if (!inst._zod) {
      Object.defineProperty(inst, "_zod", {
        value: {
          def,
          constr: _,
          traits: /* @__PURE__ */ new Set()
        },
        enumerable: false
      });
    }
    if (inst._zod.traits.has(name)) {
      return;
    }
    inst._zod.traits.add(name);
    initializer3(inst, def);
    const proto = _.prototype;
    const keys = Object.keys(proto);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (!(k in inst)) {
        inst[k] = proto[k].bind(inst);
      }
    }
  }
  const Parent = params?.Parent ?? Object;
  class Definition extends Parent {
  }
  Object.defineProperty(Definition, "name", { value: name });
  function _(def) {
    var _a2;
    const inst = params?.Parent ? new Definition() : this;
    init(inst, def);
    (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
    for (const fn of inst._zod.deferred) {
      fn();
    }
    return inst;
  }
  Object.defineProperty(_, "init", { value: init });
  Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst) => {
      if (params?.Parent && inst instanceof params.Parent)
        return true;
      return inst?._zod?.traits?.has(name);
    }
  });
  Object.defineProperty(_, "name", { value: name });
  return _;
}
var $brand = Symbol("zod_brand");
var $ZodAsyncError = class extends Error {
  constructor() {
    super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
  }
};
var $ZodEncodeError = class extends Error {
  constructor(name) {
    super(`Encountered unidirectional transform during encode: ${name}`);
    this.name = "ZodEncodeError";
  }
};
var globalConfig = {};
function config(newConfig) {
  if (newConfig)
    Object.assign(globalConfig, newConfig);
  return globalConfig;
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/core/util.js
var util_exports = {};
__export(util_exports, {
  BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES,
  Class: () => Class,
  NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
  aborted: () => aborted,
  allowsEval: () => allowsEval,
  assert: () => assert,
  assertEqual: () => assertEqual,
  assertIs: () => assertIs,
  assertNever: () => assertNever,
  assertNotEqual: () => assertNotEqual,
  assignProp: () => assignProp,
  base64ToUint8Array: () => base64ToUint8Array,
  base64urlToUint8Array: () => base64urlToUint8Array,
  cached: () => cached,
  captureStackTrace: () => captureStackTrace,
  cleanEnum: () => cleanEnum,
  cleanRegex: () => cleanRegex,
  clone: () => clone,
  cloneDef: () => cloneDef,
  createTransparentProxy: () => createTransparentProxy,
  defineLazy: () => defineLazy,
  esc: () => esc,
  escapeRegex: () => escapeRegex,
  extend: () => extend,
  finalizeIssue: () => finalizeIssue,
  floatSafeRemainder: () => floatSafeRemainder,
  getElementAtPath: () => getElementAtPath,
  getEnumValues: () => getEnumValues,
  getLengthableOrigin: () => getLengthableOrigin,
  getParsedType: () => getParsedType,
  getSizableOrigin: () => getSizableOrigin,
  hexToUint8Array: () => hexToUint8Array,
  isObject: () => isObject,
  isPlainObject: () => isPlainObject,
  issue: () => issue,
  joinValues: () => joinValues,
  jsonStringifyReplacer: () => jsonStringifyReplacer,
  merge: () => merge,
  mergeDefs: () => mergeDefs,
  normalizeParams: () => normalizeParams,
  nullish: () => nullish,
  numKeys: () => numKeys,
  objectClone: () => objectClone,
  omit: () => omit,
  optionalKeys: () => optionalKeys,
  parsedType: () => parsedType,
  partial: () => partial,
  pick: () => pick,
  prefixIssues: () => prefixIssues,
  primitiveTypes: () => primitiveTypes,
  promiseAllObject: () => promiseAllObject,
  propertyKeyTypes: () => propertyKeyTypes,
  randomString: () => randomString,
  required: () => required,
  safeExtend: () => safeExtend,
  shallowClone: () => shallowClone,
  slugify: () => slugify,
  stringifyPrimitive: () => stringifyPrimitive,
  uint8ArrayToBase64: () => uint8ArrayToBase64,
  uint8ArrayToBase64url: () => uint8ArrayToBase64url,
  uint8ArrayToHex: () => uint8ArrayToHex,
  unwrapMessage: () => unwrapMessage
});
function assertEqual(val) {
  return val;
}
function assertNotEqual(val) {
  return val;
}
function assertIs(_arg) {
}
function assertNever(_x) {
  throw new Error("Unexpected value in exhaustive check");
}
function assert(_) {
}
function getEnumValues(entries) {
  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
  const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
  return values;
}
function joinValues(array2, separator = "|") {
  return array2.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
  if (typeof value === "bigint")
    return value.toString();
  return value;
}
function cached(getter) {
  const set2 = false;
  return {
    get value() {
      if (!set2) {
        const value = getter();
        Object.defineProperty(this, "value", { value });
        return value;
      }
      throw new Error("cached value already set");
    }
  };
}
function nullish(input) {
  return input === null || input === void 0;
}
function cleanRegex(source) {
  const start = source.startsWith("^") ? 1 : 0;
  const end = source.endsWith("$") ? source.length - 1 : source.length;
  return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepString = step.toString();
  let stepDecCount = (stepString.split(".")[1] || "").length;
  if (stepDecCount === 0 && /\d?e-\d?/.test(stepString)) {
    const match = stepString.match(/\d?e-(\d?)/);
    if (match?.[1]) {
      stepDecCount = Number.parseInt(match[1]);
    }
  }
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var EVALUATING = Symbol("evaluating");
function defineLazy(object2, key, getter) {
  let value = void 0;
  Object.defineProperty(object2, key, {
    get() {
      if (value === EVALUATING) {
        return void 0;
      }
      if (value === void 0) {
        value = EVALUATING;
        value = getter();
      }
      return value;
    },
    set(v) {
      Object.defineProperty(object2, key, {
        value: v
        // configurable: true,
      });
    },
    configurable: true
  });
}
function objectClone(obj) {
  return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}
function assignProp(target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    writable: true,
    enumerable: true,
    configurable: true
  });
}
function mergeDefs(...defs) {
  const mergedDescriptors = {};
  for (const def of defs) {
    const descriptors = Object.getOwnPropertyDescriptors(def);
    Object.assign(mergedDescriptors, descriptors);
  }
  return Object.defineProperties({}, mergedDescriptors);
}
function cloneDef(schema) {
  return mergeDefs(schema._zod.def);
}
function getElementAtPath(obj, path2) {
  if (!path2)
    return obj;
  return path2.reduce((acc, key) => acc?.[key], obj);
}
function promiseAllObject(promisesObj) {
  const keys = Object.keys(promisesObj);
  const promises = keys.map((key) => promisesObj[key]);
  return Promise.all(promises).then((results) => {
    const resolvedObj = {};
    for (let i = 0; i < keys.length; i++) {
      resolvedObj[keys[i]] = results[i];
    }
    return resolvedObj;
  });
}
function randomString(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
function esc(str) {
  return JSON.stringify(str);
}
function slugify(input) {
  return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {
};
function isObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
var allowsEval = cached(() => {
  if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
    return false;
  }
  try {
    const F = Function;
    new F("");
    return true;
  } catch (_) {
    return false;
  }
});
function isPlainObject(o) {
  if (isObject(o) === false)
    return false;
  const ctor = o.constructor;
  if (ctor === void 0)
    return true;
  if (typeof ctor !== "function")
    return true;
  const prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function shallowClone(o) {
  if (isPlainObject(o))
    return { ...o };
  if (Array.isArray(o))
    return [...o];
  return o;
}
function numKeys(data) {
  let keyCount = 0;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      keyCount++;
    }
  }
  return keyCount;
}
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return "undefined";
    case "string":
      return "string";
    case "number":
      return Number.isNaN(data) ? "nan" : "number";
    case "boolean":
      return "boolean";
    case "function":
      return "function";
    case "bigint":
      return "bigint";
    case "symbol":
      return "symbol";
    case "object":
      if (Array.isArray(data)) {
        return "array";
      }
      if (data === null) {
        return "null";
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return "promise";
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return "map";
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return "set";
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return "date";
      }
      if (typeof File !== "undefined" && data instanceof File) {
        return "file";
      }
      return "object";
    default:
      throw new Error(`Unknown data type: ${t}`);
  }
};
var propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
var primitiveTypes = /* @__PURE__ */ new Set(["string", "number", "bigint", "boolean", "symbol", "undefined"]);
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
  const cl = new inst._zod.constr(def ?? inst._zod.def);
  if (!def || params?.parent)
    cl._zod.parent = inst;
  return cl;
}
function normalizeParams(_params) {
  const params = _params;
  if (!params)
    return {};
  if (typeof params === "string")
    return { error: () => params };
  if (params?.message !== void 0) {
    if (params?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    params.error = params.message;
  }
  delete params.message;
  if (typeof params.error === "string")
    return { ...params, error: () => params.error };
  return params;
}
function createTransparentProxy(getter) {
  let target;
  return new Proxy({}, {
    get(_, prop, receiver) {
      target ?? (target = getter());
      return Reflect.get(target, prop, receiver);
    },
    set(_, prop, value, receiver) {
      target ?? (target = getter());
      return Reflect.set(target, prop, value, receiver);
    },
    has(_, prop) {
      target ?? (target = getter());
      return Reflect.has(target, prop);
    },
    deleteProperty(_, prop) {
      target ?? (target = getter());
      return Reflect.deleteProperty(target, prop);
    },
    ownKeys(_) {
      target ?? (target = getter());
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor(_, prop) {
      target ?? (target = getter());
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
    defineProperty(_, prop, descriptor) {
      target ?? (target = getter());
      return Reflect.defineProperty(target, prop, descriptor);
    }
  });
}
function stringifyPrimitive(value) {
  if (typeof value === "bigint")
    return value.toString() + "n";
  if (typeof value === "string")
    return `"${value}"`;
  return `${value}`;
}
function optionalKeys(shape) {
  return Object.keys(shape).filter((k) => {
    return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
  });
}
var NUMBER_FORMAT_RANGES = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
var BIGINT_FORMAT_RANGES = {
  int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
  uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
};
function pick(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = {};
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key])
          continue;
        newShape[key] = currDef.shape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: []
  });
  return clone(schema, def);
}
function omit(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = { ...schema._zod.def.shape };
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key])
          continue;
        delete newShape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: []
  });
  return clone(schema, def);
}
function extend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to extend: expected a plain object");
  }
  const checks = schema._zod.def.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    const existingShape = schema._zod.def.shape;
    for (const key in shape) {
      if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) {
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
      }
    }
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    }
  });
  return clone(schema, def);
}
function safeExtend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to safeExtend: expected a plain object");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    }
  });
  return clone(schema, def);
}
function merge(a, b) {
  const def = mergeDefs(a._zod.def, {
    get shape() {
      const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
      assignProp(this, "shape", _shape);
      return _shape;
    },
    get catchall() {
      return b._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return clone(a, def);
}
function partial(Class2, schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in oldShape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          shape[key] = Class2 ? new Class2({
            type: "optional",
            innerType: oldShape[key]
          }) : oldShape[key];
        }
      } else {
        for (const key in oldShape) {
          shape[key] = Class2 ? new Class2({
            type: "optional",
            innerType: oldShape[key]
          }) : oldShape[key];
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    },
    checks: []
  });
  return clone(schema, def);
}
function required(Class2, schema, mask) {
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in shape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          shape[key] = new Class2({
            type: "nonoptional",
            innerType: oldShape[key]
          });
        }
      } else {
        for (const key in oldShape) {
          shape[key] = new Class2({
            type: "nonoptional",
            innerType: oldShape[key]
          });
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    }
  });
  return clone(schema, def);
}
function aborted(x, startIndex = 0) {
  if (x.aborted === true)
    return true;
  for (let i = startIndex; i < x.issues.length; i++) {
    if (x.issues[i]?.continue !== true) {
      return true;
    }
  }
  return false;
}
function prefixIssues(path2, issues) {
  return issues.map((iss) => {
    var _a2;
    (_a2 = iss).path ?? (_a2.path = []);
    iss.path.unshift(path2);
    return iss;
  });
}
function unwrapMessage(message) {
  return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config2) {
  const full = { ...iss, path: iss.path ?? [] };
  if (!iss.message) {
    const message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config2.customError?.(iss)) ?? unwrapMessage(config2.localeError?.(iss)) ?? "Invalid input";
    full.message = message;
  }
  delete full.inst;
  delete full.continue;
  if (!ctx?.reportInput) {
    delete full.input;
  }
  return full;
}
function getSizableOrigin(input) {
  if (input instanceof Set)
    return "set";
  if (input instanceof Map)
    return "map";
  if (input instanceof File)
    return "file";
  return "unknown";
}
function getLengthableOrigin(input) {
  if (Array.isArray(input))
    return "array";
  if (typeof input === "string")
    return "string";
  return "unknown";
}
function parsedType(data) {
  const t = typeof data;
  switch (t) {
    case "number": {
      return Number.isNaN(data) ? "nan" : "number";
    }
    case "object": {
      if (data === null) {
        return "null";
      }
      if (Array.isArray(data)) {
        return "array";
      }
      const obj = data;
      if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) {
        return obj.constructor.name;
      }
    }
  }
  return t;
}
function issue(...args) {
  const [iss, input, inst] = args;
  if (typeof iss === "string") {
    return {
      message: iss,
      code: "custom",
      input,
      inst
    };
  }
  return { ...iss };
}
function cleanEnum(obj) {
  return Object.entries(obj).filter(([k, _]) => {
    return Number.isNaN(Number.parseInt(k, 10));
  }).map((el) => el[1]);
}
function base64ToUint8Array(base643) {
  const binaryString = atob(base643);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
function uint8ArrayToBase64(bytes) {
  let binaryString = "";
  for (let i = 0; i < bytes.length; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  return btoa(binaryString);
}
function base64urlToUint8Array(base64url3) {
  const base643 = base64url3.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - base643.length % 4) % 4);
  return base64ToUint8Array(base643 + padding);
}
function uint8ArrayToBase64url(bytes) {
  return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function hexToUint8Array(hex3) {
  const cleanHex = hex3.replace(/^0x/, "");
  if (cleanHex.length % 2 !== 0) {
    throw new Error("Invalid hex string length");
  }
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
  }
  return bytes;
}
function uint8ArrayToHex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
var Class = class {
  constructor(..._args) {
  }
};

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/core/errors.js
var initializer = (inst, def) => {
  inst.name = "$ZodError";
  Object.defineProperty(inst, "_zod", {
    value: inst._zod,
    enumerable: false
  });
  Object.defineProperty(inst, "issues", {
    value: def,
    enumerable: false
  });
  inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
  Object.defineProperty(inst, "toString", {
    value: () => inst.message,
    enumerable: false
  });
};
var $ZodError = $constructor("$ZodError", initializer);
var $ZodRealError = $constructor("$ZodError", initializer, { Parent: Error });
function flattenError(error48, mapper = (issue2) => issue2.message) {
  const fieldErrors = {};
  const formErrors = [];
  for (const sub of error48.issues) {
    if (sub.path.length > 0) {
      fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
      fieldErrors[sub.path[0]].push(mapper(sub));
    } else {
      formErrors.push(mapper(sub));
    }
  }
  return { formErrors, fieldErrors };
}
function formatError(error48, mapper = (issue2) => issue2.message) {
  const fieldErrors = { _errors: [] };
  const processError = (error49) => {
    for (const issue2 of error49.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues });
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues });
      } else if (issue2.path.length === 0) {
        fieldErrors._errors.push(mapper(issue2));
      } else {
        let curr = fieldErrors;
        let i = 0;
        while (i < issue2.path.length) {
          const el = issue2.path[i];
          const terminal = i === issue2.path.length - 1;
          if (!terminal) {
            curr[el] = curr[el] || { _errors: [] };
          } else {
            curr[el] = curr[el] || { _errors: [] };
            curr[el]._errors.push(mapper(issue2));
          }
          curr = curr[el];
          i++;
        }
      }
    }
  };
  processError(error48);
  return fieldErrors;
}
function treeifyError(error48, mapper = (issue2) => issue2.message) {
  const result = { errors: [] };
  const processError = (error49, path2 = []) => {
    var _a2, _b;
    for (const issue2 of error49.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }, issue2.path));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues }, issue2.path);
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues }, issue2.path);
      } else {
        const fullpath = [...path2, ...issue2.path];
        if (fullpath.length === 0) {
          result.errors.push(mapper(issue2));
          continue;
        }
        let curr = result;
        let i = 0;
        while (i < fullpath.length) {
          const el = fullpath[i];
          const terminal = i === fullpath.length - 1;
          if (typeof el === "string") {
            curr.properties ?? (curr.properties = {});
            (_a2 = curr.properties)[el] ?? (_a2[el] = { errors: [] });
            curr = curr.properties[el];
          } else {
            curr.items ?? (curr.items = []);
            (_b = curr.items)[el] ?? (_b[el] = { errors: [] });
            curr = curr.items[el];
          }
          if (terminal) {
            curr.errors.push(mapper(issue2));
          }
          i++;
        }
      }
    }
  };
  processError(error48);
  return result;
}
function toDotPath(_path) {
  const segs = [];
  const path2 = _path.map((seg) => typeof seg === "object" ? seg.key : seg);
  for (const seg of path2) {
    if (typeof seg === "number")
      segs.push(`[${seg}]`);
    else if (typeof seg === "symbol")
      segs.push(`[${JSON.stringify(String(seg))}]`);
    else if (/[^\w$]/.test(seg))
      segs.push(`[${JSON.stringify(seg)}]`);
    else {
      if (segs.length)
        segs.push(".");
      segs.push(seg);
    }
  }
  return segs.join("");
}
function prettifyError(error48) {
  const lines = [];
  const issues = [...error48.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
  for (const issue2 of issues) {
    lines.push(`\u2716 ${issue2.message}`);
    if (issue2.path?.length)
      lines.push(`  \u2192 at ${toDotPath(issue2.path)}`);
  }
  return lines.join("\n");
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/core/parse.js
var _parse = (_Err) => (schema, value, _ctx, _params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError();
  }
  if (result.issues.length) {
    const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, _params?.callee);
    throw e;
  }
  return result.value;
};
var parse = /* @__PURE__ */ _parse($ZodRealError);
var _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  if (result.issues.length) {
    const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, params?.callee);
    throw e;
  }
  return result.value;
};
var parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError);
var _safeParse = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError();
  }
  return result.issues.length ? {
    success: false,
    error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
var safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  return result.issues.length ? {
    success: false,
    error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
var safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError);
var _encode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _parse(_Err)(schema, value, ctx);
};
var encode = /* @__PURE__ */ _encode($ZodRealError);
var _decode = (_Err) => (schema, value, _ctx) => {
  return _parse(_Err)(schema, value, _ctx);
};
var decode = /* @__PURE__ */ _decode($ZodRealError);
var _encodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _parseAsync(_Err)(schema, value, ctx);
};
var encodeAsync = /* @__PURE__ */ _encodeAsync($ZodRealError);
var _decodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _parseAsync(_Err)(schema, value, _ctx);
};
var decodeAsync = /* @__PURE__ */ _decodeAsync($ZodRealError);
var _safeEncode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _safeParse(_Err)(schema, value, ctx);
};
var safeEncode = /* @__PURE__ */ _safeEncode($ZodRealError);
var _safeDecode = (_Err) => (schema, value, _ctx) => {
  return _safeParse(_Err)(schema, value, _ctx);
};
var safeDecode = /* @__PURE__ */ _safeDecode($ZodRealError);
var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _safeParseAsync(_Err)(schema, value, ctx);
};
var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync($ZodRealError);
var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _safeParseAsync(_Err)(schema, value, _ctx);
};
var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync($ZodRealError);

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/core/regexes.js
var regexes_exports = {};
__export(regexes_exports, {
  base64: () => base64,
  base64url: () => base64url,
  bigint: () => bigint,
  boolean: () => boolean,
  browserEmail: () => browserEmail,
  cidrv4: () => cidrv4,
  cidrv6: () => cidrv6,
  cuid: () => cuid,
  cuid2: () => cuid2,
  date: () => date,
  datetime: () => datetime,
  domain: () => domain,
  duration: () => duration,
  e164: () => e164,
  email: () => email,
  emoji: () => emoji,
  extendedDuration: () => extendedDuration,
  guid: () => guid,
  hex: () => hex,
  hostname: () => hostname,
  html5Email: () => html5Email,
  idnEmail: () => idnEmail,
  integer: () => integer,
  ipv4: () => ipv4,
  ipv6: () => ipv6,
  ksuid: () => ksuid,
  lowercase: () => lowercase,
  mac: () => mac,
  md5_base64: () => md5_base64,
  md5_base64url: () => md5_base64url,
  md5_hex: () => md5_hex,
  nanoid: () => nanoid,
  null: () => _null,
  number: () => number,
  rfc5322Email: () => rfc5322Email,
  sha1_base64: () => sha1_base64,
  sha1_base64url: () => sha1_base64url,
  sha1_hex: () => sha1_hex,
  sha256_base64: () => sha256_base64,
  sha256_base64url: () => sha256_base64url,
  sha256_hex: () => sha256_hex,
  sha384_base64: () => sha384_base64,
  sha384_base64url: () => sha384_base64url,
  sha384_hex: () => sha384_hex,
  sha512_base64: () => sha512_base64,
  sha512_base64url: () => sha512_base64url,
  sha512_hex: () => sha512_hex,
  string: () => string,
  time: () => time,
  ulid: () => ulid,
  undefined: () => _undefined,
  unicodeEmail: () => unicodeEmail,
  uppercase: () => uppercase,
  uuid: () => uuid,
  uuid4: () => uuid4,
  uuid6: () => uuid6,
  uuid7: () => uuid7,
  xid: () => xid
});
var cuid = /^[cC][^\s-]{8,}$/;
var cuid2 = /^[0-9a-z]+$/;
var ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
var xid = /^[0-9a-vA-V]{20}$/;
var ksuid = /^[A-Za-z0-9]{27}$/;
var nanoid = /^[a-zA-Z0-9_-]{21}$/;
var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
var extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
var uuid = (version2) => {
  if (!version2)
    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version2}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
var uuid4 = /* @__PURE__ */ uuid(4);
var uuid6 = /* @__PURE__ */ uuid(6);
var uuid7 = /* @__PURE__ */ uuid(7);
var email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
var idnEmail = unicodeEmail;
var browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
  return new RegExp(_emoji, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var mac = (delimiter) => {
  const escapedDelim = escapeRegex(delimiter ?? ":");
  return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
};
var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^[A-Za-z0-9_-]*$/;
var hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
var domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
var e164 = /^\+[1-9]\d{6,14}$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
var date = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
function timeSource(args) {
  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
  return regex;
}
function time(args) {
  return new RegExp(`^${timeSource(args)}$`);
}
function datetime(args) {
  const time3 = timeSource({ precision: args.precision });
  const opts = ["Z"];
  if (args.local)
    opts.push("");
  if (args.offset)
    opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
  const timeRegex = `${time3}(?:${opts.join("|")})`;
  return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var string = (params) => {
  const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
  return new RegExp(`^${regex}$`);
};
var bigint = /^-?\d+n?$/;
var integer = /^-?\d+$/;
var number = /^-?\d+(?:\.\d+)?$/;
var boolean = /^(?:true|false)$/i;
var _null = /^null$/i;
var _undefined = /^undefined$/i;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;
var hex = /^[0-9a-fA-F]*$/;
function fixedBase64(bodyLength, padding) {
  return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
}
function fixedBase64url(length) {
  return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
}
var md5_hex = /^[0-9a-fA-F]{32}$/;
var md5_base64 = /* @__PURE__ */ fixedBase64(22, "==");
var md5_base64url = /* @__PURE__ */ fixedBase64url(22);
var sha1_hex = /^[0-9a-fA-F]{40}$/;
var sha1_base64 = /* @__PURE__ */ fixedBase64(27, "=");
var sha1_base64url = /* @__PURE__ */ fixedBase64url(27);
var sha256_hex = /^[0-9a-fA-F]{64}$/;
var sha256_base64 = /* @__PURE__ */ fixedBase64(43, "=");
var sha256_base64url = /* @__PURE__ */ fixedBase64url(43);
var sha384_hex = /^[0-9a-fA-F]{96}$/;
var sha384_base64 = /* @__PURE__ */ fixedBase64(64, "");
var sha384_base64url = /* @__PURE__ */ fixedBase64url(64);
var sha512_hex = /^[0-9a-fA-F]{128}$/;
var sha512_base64 = /* @__PURE__ */ fixedBase64(86, "==");
var sha512_base64url = /* @__PURE__ */ fixedBase64url(86);

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/core/checks.js
var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
  var _a2;
  inst._zod ?? (inst._zod = {});
  inst._zod.def = def;
  (_a2 = inst._zod).onattach ?? (_a2.onattach = []);
});
var numericOriginMap = {
  number: "number",
  bigint: "bigint",
  object: "date"
};
var $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    if (def.value < curr) {
      if (def.inclusive)
        bag.maximum = def.value;
      else
        bag.exclusiveMaximum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    if (def.value > curr) {
      if (def.inclusive)
        bag.minimum = def.value;
      else
        bag.exclusiveMinimum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    var _a2;
    (_a2 = inst2._zod.bag).multipleOf ?? (_a2.multipleOf = def.value);
  });
  inst._zod.check = (payload) => {
    if (typeof payload.value !== typeof def.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    const isMultiple = typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0;
    if (isMultiple)
      return;
    payload.issues.push({
      origin: typeof payload.value,
      code: "not_multiple_of",
      divisor: def.value,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  def.format = def.format || "float64";
  const isInt = def.format?.includes("int");
  const origin = isInt ? "int" : "number";
  const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
    if (isInt)
      bag.pattern = integer;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (isInt) {
      if (!Number.isInteger(input)) {
        payload.issues.push({
          expected: origin,
          format: def.format,
          code: "invalid_type",
          continue: false,
          input,
          inst
        });
        return;
      }
      if (!Number.isSafeInteger(input)) {
        if (input > 0) {
          payload.issues.push({
            input,
            code: "too_big",
            maximum: Number.MAX_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        } else {
          payload.issues.push({
            input,
            code: "too_small",
            minimum: Number.MIN_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        }
        return;
      }
    }
    if (input < minimum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCheckBigIntFormat = /* @__PURE__ */ $constructor("$ZodCheckBigIntFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  const [minimum, maximum] = BIGINT_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (input < minimum) {
      payload.issues.push({
        origin: "bigint",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "bigint",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCheckMaxSize = /* @__PURE__ */ $constructor("$ZodCheckMaxSize", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr)
      inst2._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size <= def.maximum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMinSize = /* @__PURE__ */ $constructor("$ZodCheckMinSize", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr)
      inst2._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size >= def.minimum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckSizeEquals = /* @__PURE__ */ $constructor("$ZodCheckSizeEquals", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.minimum = def.size;
    bag.maximum = def.size;
    bag.size = def.size;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size === def.size)
      return;
    const tooBig = size > def.size;
    payload.issues.push({
      origin: getSizableOrigin(input),
      ...tooBig ? { code: "too_big", maximum: def.size } : { code: "too_small", minimum: def.size },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr)
      inst2._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length <= def.maximum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr)
      inst2._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length >= def.minimum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== void 0;
  });
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.minimum = def.length;
    bag.maximum = def.length;
    bag.length = def.length;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length === def.length)
      return;
    const origin = getLengthableOrigin(input);
    const tooBig = length > def.length;
    payload.issues.push({
      origin,
      ...tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
  var _a2, _b;
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    if (def.pattern) {
      bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
      bag.patterns.add(def.pattern);
    }
  });
  if (def.pattern)
    (_a2 = inst._zod).check ?? (_a2.check = (payload) => {
      def.pattern.lastIndex = 0;
      if (def.pattern.test(payload.value))
        return;
      payload.issues.push({
        origin: "string",
        code: "invalid_format",
        format: def.format,
        input: payload.value,
        ...def.pattern ? { pattern: def.pattern.toString() } : {},
        inst,
        continue: !def.abort
      });
    });
  else
    (_b = inst._zod).check ?? (_b.check = () => {
    });
});
var $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    def.pattern.lastIndex = 0;
    if (def.pattern.test(payload.value))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: payload.value,
      pattern: def.pattern.toString(),
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
  def.pattern ?? (def.pattern = lowercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
  def.pattern ?? (def.pattern = uppercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
  $ZodCheck.init(inst, def);
  const escapedRegex = escapeRegex(def.includes);
  const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
  def.pattern = pattern;
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.includes(def.includes, def.position))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: def.includes,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.startsWith(def.prefix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: def.prefix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.endsWith(def.suffix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: def.suffix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function handleCheckPropertyResult(result, payload, property) {
  if (result.issues.length) {
    payload.issues.push(...prefixIssues(property, result.issues));
  }
}
var $ZodCheckProperty = /* @__PURE__ */ $constructor("$ZodCheckProperty", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    const result = def.schema._zod.run({
      value: payload.value[def.property],
      issues: []
    }, {});
    if (result instanceof Promise) {
      return result.then((result2) => handleCheckPropertyResult(result2, payload, def.property));
    }
    handleCheckPropertyResult(result, payload, def.property);
    return;
  };
});
var $ZodCheckMimeType = /* @__PURE__ */ $constructor("$ZodCheckMimeType", (inst, def) => {
  $ZodCheck.init(inst, def);
  const mimeSet = new Set(def.mime);
  inst._zod.onattach.push((inst2) => {
    inst2._zod.bag.mime = def.mime;
  });
  inst._zod.check = (payload) => {
    if (mimeSet.has(payload.value.type))
      return;
    payload.issues.push({
      code: "invalid_value",
      values: def.mime,
      input: payload.value.type,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    payload.value = def.tx(payload.value);
  };
});

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/core/doc.js
var Doc = class {
  constructor(args = []) {
    this.content = [];
    this.indent = 0;
    if (this)
      this.args = args;
  }
  indented(fn) {
    this.indent += 1;
    fn(this);
    this.indent -= 1;
  }
  write(arg) {
    if (typeof arg === "function") {
      arg(this, { execution: "sync" });
      arg(this, { execution: "async" });
      return;
    }
    const content = arg;
    const lines = content.split("\n").filter((x) => x);
    const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
    const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
    for (const line of dedented) {
      this.content.push(line);
    }
  }
  compile() {
    const F = Function;
    const args = this?.args;
    const content = this?.content ?? [``];
    const lines = [...content.map((x) => `  ${x}`)];
    return new F(...args, lines.join("\n"));
  }
};

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/core/versions.js
var version = {
  major: 4,
  minor: 3,
  patch: 6
};

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/core/schemas.js
var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
  var _a2;
  inst ?? (inst = {});
  inst._zod.def = def;
  inst._zod.bag = inst._zod.bag || {};
  inst._zod.version = version;
  const checks = [...inst._zod.def.checks ?? []];
  if (inst._zod.traits.has("$ZodCheck")) {
    checks.unshift(inst);
  }
  for (const ch of checks) {
    for (const fn of ch._zod.onattach) {
      fn(inst);
    }
  }
  if (checks.length === 0) {
    (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
    inst._zod.deferred?.push(() => {
      inst._zod.run = inst._zod.parse;
    });
  } else {
    const runChecks = (payload, checks2, ctx) => {
      let isAborted = aborted(payload);
      let asyncResult;
      for (const ch of checks2) {
        if (ch._zod.def.when) {
          const shouldRun = ch._zod.def.when(payload);
          if (!shouldRun)
            continue;
        } else if (isAborted) {
          continue;
        }
        const currLen = payload.issues.length;
        const _ = ch._zod.check(payload);
        if (_ instanceof Promise && ctx?.async === false) {
          throw new $ZodAsyncError();
        }
        if (asyncResult || _ instanceof Promise) {
          asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
            await _;
            const nextLen = payload.issues.length;
            if (nextLen === currLen)
              return;
            if (!isAborted)
              isAborted = aborted(payload, currLen);
          });
        } else {
          const nextLen = payload.issues.length;
          if (nextLen === currLen)
            continue;
          if (!isAborted)
            isAborted = aborted(payload, currLen);
        }
      }
      if (asyncResult) {
        return asyncResult.then(() => {
          return payload;
        });
      }
      return payload;
    };
    const handleCanaryResult = (canary, payload, ctx) => {
      if (aborted(canary)) {
        canary.aborted = true;
        return canary;
      }
      const checkResult = runChecks(payload, checks, ctx);
      if (checkResult instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError();
        return checkResult.then((checkResult2) => inst._zod.parse(checkResult2, ctx));
      }
      return inst._zod.parse(checkResult, ctx);
    };
    inst._zod.run = (payload, ctx) => {
      if (ctx.skipChecks) {
        return inst._zod.parse(payload, ctx);
      }
      if (ctx.direction === "backward") {
        const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
        if (canary instanceof Promise) {
          return canary.then((canary2) => {
            return handleCanaryResult(canary2, payload, ctx);
          });
        }
        return handleCanaryResult(canary, payload, ctx);
      }
      const result = inst._zod.parse(payload, ctx);
      if (result instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError();
        return result.then((result2) => runChecks(result2, checks, ctx));
      }
      return runChecks(result, checks, ctx);
    };
  }
  defineLazy(inst, "~standard", () => ({
    validate: (value) => {
      try {
        const r = safeParse(inst, value);
        return r.success ? { value: r.data } : { issues: r.error?.issues };
      } catch (_) {
        return safeParseAsync(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  }));
});
var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string(inst._zod.bag);
  inst._zod.parse = (payload, _) => {
    if (def.coerce)
      try {
        payload.value = String(payload.value);
      } catch (_2) {
      }
    if (typeof payload.value === "string")
      return payload;
    payload.issues.push({
      expected: "string",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  $ZodString.init(inst, def);
});
var $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
  def.pattern ?? (def.pattern = guid);
  $ZodStringFormat.init(inst, def);
});
var $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
  if (def.version) {
    const versionMap = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    };
    const v = versionMap[def.version];
    if (v === void 0)
      throw new Error(`Invalid UUID version: "${def.version}"`);
    def.pattern ?? (def.pattern = uuid(v));
  } else
    def.pattern ?? (def.pattern = uuid());
  $ZodStringFormat.init(inst, def);
});
var $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
  def.pattern ?? (def.pattern = email);
  $ZodStringFormat.init(inst, def);
});
var $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    try {
      const trimmed = payload.value.trim();
      const url2 = new URL(trimmed);
      if (def.hostname) {
        def.hostname.lastIndex = 0;
        if (!def.hostname.test(url2.hostname)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid hostname",
            pattern: def.hostname.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (def.protocol) {
        def.protocol.lastIndex = 0;
        if (!def.protocol.test(url2.protocol.endsWith(":") ? url2.protocol.slice(0, -1) : url2.protocol)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid protocol",
            pattern: def.protocol.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (def.normalize) {
        payload.value = url2.href;
      } else {
        payload.value = trimmed;
      }
      return;
    } catch (_) {
      payload.issues.push({
        code: "invalid_format",
        format: "url",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
  def.pattern ?? (def.pattern = emoji());
  $ZodStringFormat.init(inst, def);
});
var $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
  def.pattern ?? (def.pattern = nanoid);
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
  def.pattern ?? (def.pattern = cuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
  def.pattern ?? (def.pattern = cuid2);
  $ZodStringFormat.init(inst, def);
});
var $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
  def.pattern ?? (def.pattern = ulid);
  $ZodStringFormat.init(inst, def);
});
var $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
  def.pattern ?? (def.pattern = xid);
  $ZodStringFormat.init(inst, def);
});
var $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
  def.pattern ?? (def.pattern = ksuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
  def.pattern ?? (def.pattern = datetime(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
  def.pattern ?? (def.pattern = date);
  $ZodStringFormat.init(inst, def);
});
var $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
  def.pattern ?? (def.pattern = time(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
  def.pattern ?? (def.pattern = duration);
  $ZodStringFormat.init(inst, def);
});
var $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
  def.pattern ?? (def.pattern = ipv4);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `ipv4`;
});
var $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
  def.pattern ?? (def.pattern = ipv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `ipv6`;
  inst._zod.check = (payload) => {
    try {
      new URL(`http://[${payload.value}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodMAC = /* @__PURE__ */ $constructor("$ZodMAC", (inst, def) => {
  def.pattern ?? (def.pattern = mac(def.delimiter));
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `mac`;
});
var $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv4);
  $ZodStringFormat.init(inst, def);
});
var $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    const parts = payload.value.split("/");
    try {
      if (parts.length !== 2)
        throw new Error();
      const [address, prefix] = parts;
      if (!prefix)
        throw new Error();
      const prefixNum = Number(prefix);
      if (`${prefixNum}` !== prefix)
        throw new Error();
      if (prefixNum < 0 || prefixNum > 128)
        throw new Error();
      new URL(`http://[${address}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
function isValidBase64(data) {
  if (data === "")
    return true;
  if (data.length % 4 !== 0)
    return false;
  try {
    atob(data);
    return true;
  } catch {
    return false;
  }
}
var $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
  def.pattern ?? (def.pattern = base64);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.contentEncoding = "base64";
  inst._zod.check = (payload) => {
    if (isValidBase64(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function isValidBase64URL(data) {
  if (!base64url.test(data))
    return false;
  const base643 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
  const padded = base643.padEnd(Math.ceil(base643.length / 4) * 4, "=");
  return isValidBase64(padded);
}
var $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
  def.pattern ?? (def.pattern = base64url);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.contentEncoding = "base64url";
  inst._zod.check = (payload) => {
    if (isValidBase64URL(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
  def.pattern ?? (def.pattern = e164);
  $ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
  try {
    const tokensParts = token.split(".");
    if (tokensParts.length !== 3)
      return false;
    const [header] = tokensParts;
    if (!header)
      return false;
    const parsedHeader = JSON.parse(atob(header));
    if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
      return false;
    if (!parsedHeader.alg)
      return false;
    if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
      return false;
    return true;
  } catch {
    return false;
  }
}
var $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidJWT(payload.value, def.alg))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCustomStringFormat = /* @__PURE__ */ $constructor("$ZodCustomStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (def.fn(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: def.format,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = inst._zod.bag.pattern ?? number;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Number(payload.value);
      } catch (_) {
      }
    const input = payload.value;
    if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
      return payload;
    }
    const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
    payload.issues.push({
      expected: "number",
      code: "invalid_type",
      input,
      inst,
      ...received ? { received } : {}
    });
    return payload;
  };
});
var $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
  $ZodCheckNumberFormat.init(inst, def);
  $ZodNumber.init(inst, def);
});
var $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = boolean;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Boolean(payload.value);
      } catch (_) {
      }
    const input = payload.value;
    if (typeof input === "boolean")
      return payload;
    payload.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodBigInt = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = bigint;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = BigInt(payload.value);
      } catch (_) {
      }
    if (typeof payload.value === "bigint")
      return payload;
    payload.issues.push({
      expected: "bigint",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodBigIntFormat = /* @__PURE__ */ $constructor("$ZodBigIntFormat", (inst, def) => {
  $ZodCheckBigIntFormat.init(inst, def);
  $ZodBigInt.init(inst, def);
});
var $ZodSymbol = /* @__PURE__ */ $constructor("$ZodSymbol", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "symbol")
      return payload;
    payload.issues.push({
      expected: "symbol",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodUndefined = /* @__PURE__ */ $constructor("$ZodUndefined", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _undefined;
  inst._zod.values = /* @__PURE__ */ new Set([void 0]);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "undefined",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _null;
  inst._zod.values = /* @__PURE__ */ new Set([null]);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input === null)
      return payload;
    payload.issues.push({
      expected: "null",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    payload.issues.push({
      expected: "never",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodVoid = /* @__PURE__ */ $constructor("$ZodVoid", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "void",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodDate = /* @__PURE__ */ $constructor("$ZodDate", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce) {
      try {
        payload.value = new Date(payload.value);
      } catch (_err) {
      }
    }
    const input = payload.value;
    const isDate = input instanceof Date;
    const isValidDate = isDate && !Number.isNaN(input.getTime());
    if (isValidDate)
      return payload;
    payload.issues.push({
      expected: "date",
      code: "invalid_type",
      input,
      ...isDate ? { received: "Invalid Date" } : {},
      inst
    });
    return payload;
  };
});
function handleArrayResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        expected: "array",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = Array(input.length);
    const proms = [];
    for (let i = 0; i < input.length; i++) {
      const item = input[i];
      const result = def.element._zod.run({
        value: item,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleArrayResult(result2, payload, i)));
      } else {
        handleArrayResult(result, payload, i);
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
function handlePropertyResult(result, final, key, input, isOptionalOut) {
  if (result.issues.length) {
    if (isOptionalOut && !(key in input)) {
      return;
    }
    final.issues.push(...prefixIssues(key, result.issues));
  }
  if (result.value === void 0) {
    if (key in input) {
      final.value[key] = void 0;
    }
  } else {
    final.value[key] = result.value;
  }
}
function normalizeDef(def) {
  const keys = Object.keys(def.shape);
  for (const k of keys) {
    if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) {
      throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
    }
  }
  const okeys = optionalKeys(def.shape);
  return {
    ...def,
    keys,
    keySet: new Set(keys),
    numKeys: keys.length,
    optionalKeys: new Set(okeys)
  };
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
  const unrecognized = [];
  const keySet = def.keySet;
  const _catchall = def.catchall._zod;
  const t = _catchall.def.type;
  const isOptionalOut = _catchall.optout === "optional";
  for (const key in input) {
    if (keySet.has(key))
      continue;
    if (t === "never") {
      unrecognized.push(key);
      continue;
    }
    const r = _catchall.run({ value: input[key], issues: [] }, ctx);
    if (r instanceof Promise) {
      proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalOut)));
    } else {
      handlePropertyResult(r, payload, key, input, isOptionalOut);
    }
  }
  if (unrecognized.length) {
    payload.issues.push({
      code: "unrecognized_keys",
      keys: unrecognized,
      input,
      inst
    });
  }
  if (!proms.length)
    return payload;
  return Promise.all(proms).then(() => {
    return payload;
  });
}
var $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
  $ZodType.init(inst, def);
  const desc = Object.getOwnPropertyDescriptor(def, "shape");
  if (!desc?.get) {
    const sh = def.shape;
    Object.defineProperty(def, "shape", {
      get: () => {
        const newSh = { ...sh };
        Object.defineProperty(def, "shape", {
          value: newSh
        });
        return newSh;
      }
    });
  }
  const _normalized = cached(() => normalizeDef(def));
  defineLazy(inst._zod, "propValues", () => {
    const shape = def.shape;
    const propValues = {};
    for (const key in shape) {
      const field = shape[key]._zod;
      if (field.values) {
        propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
        for (const v of field.values)
          propValues[key].add(v);
      }
    }
    return propValues;
  });
  const isObject2 = isObject;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = {};
    const proms = [];
    const shape = value.shape;
    for (const key of value.keys) {
      const el = shape[key];
      const isOptionalOut = el._zod.optout === "optional";
      const r = el._zod.run({ value: input[key], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalOut)));
      } else {
        handlePropertyResult(r, payload, key, input, isOptionalOut);
      }
    }
    if (!catchall) {
      return proms.length ? Promise.all(proms).then(() => payload) : payload;
    }
    return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
  };
});
var $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
  $ZodObject.init(inst, def);
  const superParse = inst._zod.parse;
  const _normalized = cached(() => normalizeDef(def));
  const generateFastpass = (shape) => {
    const doc = new Doc(["shape", "payload", "ctx"]);
    const normalized = _normalized.value;
    const parseStr = (key) => {
      const k = esc(key);
      return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
    };
    doc.write(`const input = payload.value;`);
    const ids = /* @__PURE__ */ Object.create(null);
    let counter = 0;
    for (const key of normalized.keys) {
      ids[key] = `key_${counter++}`;
    }
    doc.write(`const newResult = {};`);
    for (const key of normalized.keys) {
      const id = ids[key];
      const k = esc(key);
      const schema = shape[key];
      const isOptionalOut = schema?._zod?.optout === "optional";
      doc.write(`const ${id} = ${parseStr(key)};`);
      if (isOptionalOut) {
        doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
      } else {
        doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
      }
    }
    doc.write(`payload.value = newResult;`);
    doc.write(`return payload;`);
    const fn = doc.compile();
    return (payload, ctx) => fn(shape, payload, ctx);
  };
  let fastpass;
  const isObject2 = isObject;
  const jit = !globalConfig.jitless;
  const allowsEval2 = allowsEval;
  const fastEnabled = jit && allowsEval2.value;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
      if (!fastpass)
        fastpass = generateFastpass(def.shape);
      payload = fastpass(payload, ctx);
      if (!catchall)
        return payload;
      return handleCatchall([], input, payload, ctx, value, inst);
    }
    return superParse(payload, ctx);
  };
});
function handleUnionResults(results, final, inst, ctx) {
  for (const result of results) {
    if (result.issues.length === 0) {
      final.value = result.value;
      return final;
    }
  }
  const nonaborted = results.filter((r) => !aborted(r));
  if (nonaborted.length === 1) {
    final.value = nonaborted[0].value;
    return nonaborted[0];
  }
  final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  });
  return final;
}
var $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
  defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
  defineLazy(inst._zod, "values", () => {
    if (def.options.every((o) => o._zod.values)) {
      return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
    }
    return void 0;
  });
  defineLazy(inst._zod, "pattern", () => {
    if (def.options.every((o) => o._zod.pattern)) {
      const patterns = def.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
    }
    return void 0;
  });
  const single = def.options.length === 1;
  const first = def.options[0]._zod.run;
  inst._zod.parse = (payload, ctx) => {
    if (single) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        if (result.issues.length === 0)
          return result;
        results.push(result);
      }
    }
    if (!async)
      return handleUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results2) => {
      return handleUnionResults(results2, payload, inst, ctx);
    });
  };
});
function handleExclusiveUnionResults(results, final, inst, ctx) {
  const successes = results.filter((r) => r.issues.length === 0);
  if (successes.length === 1) {
    final.value = successes[0].value;
    return final;
  }
  if (successes.length === 0) {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
    });
  } else {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: [],
      inclusive: false
    });
  }
  return final;
}
var $ZodXor = /* @__PURE__ */ $constructor("$ZodXor", (inst, def) => {
  $ZodUnion.init(inst, def);
  def.inclusive = false;
  const single = def.options.length === 1;
  const first = def.options[0]._zod.run;
  inst._zod.parse = (payload, ctx) => {
    if (single) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        results.push(result);
      }
    }
    if (!async)
      return handleExclusiveUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results2) => {
      return handleExclusiveUnionResults(results2, payload, inst, ctx);
    });
  };
});
var $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
  def.inclusive = false;
  $ZodUnion.init(inst, def);
  const _super = inst._zod.parse;
  defineLazy(inst._zod, "propValues", () => {
    const propValues = {};
    for (const option of def.options) {
      const pv = option._zod.propValues;
      if (!pv || Object.keys(pv).length === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
      for (const [k, v] of Object.entries(pv)) {
        if (!propValues[k])
          propValues[k] = /* @__PURE__ */ new Set();
        for (const val of v) {
          propValues[k].add(val);
        }
      }
    }
    return propValues;
  });
  const disc = cached(() => {
    const opts = def.options;
    const map2 = /* @__PURE__ */ new Map();
    for (const o of opts) {
      const values = o._zod.propValues?.[def.discriminator];
      if (!values || values.size === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
      for (const v of values) {
        if (map2.has(v)) {
          throw new Error(`Duplicate discriminator value "${String(v)}"`);
        }
        map2.set(v, o);
      }
    }
    return map2;
  });
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isObject(input)) {
      payload.issues.push({
        code: "invalid_type",
        expected: "object",
        input,
        inst
      });
      return payload;
    }
    const opt = disc.value.get(input?.[def.discriminator]);
    if (opt) {
      return opt._zod.run(payload, ctx);
    }
    if (def.unionFallback) {
      return _super(payload, ctx);
    }
    payload.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: def.discriminator,
      input,
      path: [def.discriminator],
      inst
    });
    return payload;
  };
});
var $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    const left = def.left._zod.run({ value: input, issues: [] }, ctx);
    const right = def.right._zod.run({ value: input, issues: [] }, ctx);
    const async = left instanceof Promise || right instanceof Promise;
    if (async) {
      return Promise.all([left, right]).then(([left2, right2]) => {
        return handleIntersectionResults(payload, left2, right2);
      });
    }
    return handleIntersectionResults(payload, left, right);
  };
});
function mergeValues(a, b) {
  if (a === b) {
    return { valid: true, data: a };
  }
  if (a instanceof Date && b instanceof Date && +a === +b) {
    return { valid: true, data: a };
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const bKeys = Object.keys(b);
    const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
        };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return { valid: false, mergeErrorPath: [] };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
        };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  }
  return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
  const unrecKeys = /* @__PURE__ */ new Map();
  let unrecIssue;
  for (const iss of left.issues) {
    if (iss.code === "unrecognized_keys") {
      unrecIssue ?? (unrecIssue = iss);
      for (const k of iss.keys) {
        if (!unrecKeys.has(k))
          unrecKeys.set(k, {});
        unrecKeys.get(k).l = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  for (const iss of right.issues) {
    if (iss.code === "unrecognized_keys") {
      for (const k of iss.keys) {
        if (!unrecKeys.has(k))
          unrecKeys.set(k, {});
        unrecKeys.get(k).r = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
  if (bothKeys.length && unrecIssue) {
    result.issues.push({ ...unrecIssue, keys: bothKeys });
  }
  if (aborted(result))
    return result;
  const merged = mergeValues(left.value, right.value);
  if (!merged.valid) {
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
  }
  result.value = merged.data;
  return result;
}
var $ZodTuple = /* @__PURE__ */ $constructor("$ZodTuple", (inst, def) => {
  $ZodType.init(inst, def);
  const items = def.items;
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        input,
        inst,
        expected: "tuple",
        code: "invalid_type"
      });
      return payload;
    }
    payload.value = [];
    const proms = [];
    const reversedIndex = [...items].reverse().findIndex((item) => item._zod.optin !== "optional");
    const optStart = reversedIndex === -1 ? 0 : items.length - reversedIndex;
    if (!def.rest) {
      const tooBig = input.length > items.length;
      const tooSmall = input.length < optStart - 1;
      if (tooBig || tooSmall) {
        payload.issues.push({
          ...tooBig ? { code: "too_big", maximum: items.length, inclusive: true } : { code: "too_small", minimum: items.length },
          input,
          inst,
          origin: "array"
        });
        return payload;
      }
    }
    let i = -1;
    for (const item of items) {
      i++;
      if (i >= input.length) {
        if (i >= optStart)
          continue;
      }
      const result = item._zod.run({
        value: input[i],
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleTupleResult(result2, payload, i)));
      } else {
        handleTupleResult(result, payload, i);
      }
    }
    if (def.rest) {
      const rest = input.slice(items.length);
      for (const el of rest) {
        i++;
        const result = def.rest._zod.run({
          value: el,
          issues: []
        }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((result2) => handleTupleResult(result2, payload, i)));
        } else {
          handleTupleResult(result, payload, i);
        }
      }
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleTupleResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
var $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isPlainObject(input)) {
      payload.issues.push({
        expected: "record",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    const values = def.keyType._zod.values;
    if (values) {
      payload.value = {};
      const recordKeys = /* @__PURE__ */ new Set();
      for (const key of values) {
        if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
          recordKeys.add(typeof key === "number" ? key.toString() : key);
          const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
          if (result instanceof Promise) {
            proms.push(result.then((result2) => {
              if (result2.issues.length) {
                payload.issues.push(...prefixIssues(key, result2.issues));
              }
              payload.value[key] = result2.value;
            }));
          } else {
            if (result.issues.length) {
              payload.issues.push(...prefixIssues(key, result.issues));
            }
            payload.value[key] = result.value;
          }
        }
      }
      let unrecognized;
      for (const key in input) {
        if (!recordKeys.has(key)) {
          unrecognized = unrecognized ?? [];
          unrecognized.push(key);
        }
      }
      if (unrecognized && unrecognized.length > 0) {
        payload.issues.push({
          code: "unrecognized_keys",
          input,
          inst,
          keys: unrecognized
        });
      }
    } else {
      payload.value = {};
      for (const key of Reflect.ownKeys(input)) {
        if (key === "__proto__")
          continue;
        let keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
        if (keyResult instanceof Promise) {
          throw new Error("Async schemas not supported in object keys currently");
        }
        const checkNumericKey = typeof key === "string" && number.test(key) && keyResult.issues.length;
        if (checkNumericKey) {
          const retryResult = def.keyType._zod.run({ value: Number(key), issues: [] }, ctx);
          if (retryResult instanceof Promise) {
            throw new Error("Async schemas not supported in object keys currently");
          }
          if (retryResult.issues.length === 0) {
            keyResult = retryResult;
          }
        }
        if (keyResult.issues.length) {
          if (def.mode === "loose") {
            payload.value[key] = input[key];
          } else {
            payload.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
              input: key,
              path: [key],
              inst
            });
          }
          continue;
        }
        const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((result2) => {
            if (result2.issues.length) {
              payload.issues.push(...prefixIssues(key, result2.issues));
            }
            payload.value[keyResult.value] = result2.value;
          }));
        } else {
          if (result.issues.length) {
            payload.issues.push(...prefixIssues(key, result.issues));
          }
          payload.value[keyResult.value] = result.value;
        }
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
var $ZodMap = /* @__PURE__ */ $constructor("$ZodMap", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Map)) {
      payload.issues.push({
        expected: "map",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    payload.value = /* @__PURE__ */ new Map();
    for (const [key, value] of input) {
      const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
      const valueResult = def.valueType._zod.run({ value, issues: [] }, ctx);
      if (keyResult instanceof Promise || valueResult instanceof Promise) {
        proms.push(Promise.all([keyResult, valueResult]).then(([keyResult2, valueResult2]) => {
          handleMapResult(keyResult2, valueResult2, payload, key, input, inst, ctx);
        }));
      } else {
        handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
      }
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
  if (keyResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, keyResult.issues));
    } else {
      final.issues.push({
        code: "invalid_key",
        origin: "map",
        input,
        inst,
        issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
      });
    }
  }
  if (valueResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, valueResult.issues));
    } else {
      final.issues.push({
        origin: "map",
        code: "invalid_element",
        input,
        inst,
        key,
        issues: valueResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
      });
    }
  }
  final.value.set(keyResult.value, valueResult.value);
}
var $ZodSet = /* @__PURE__ */ $constructor("$ZodSet", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Set)) {
      payload.issues.push({
        input,
        inst,
        expected: "set",
        code: "invalid_type"
      });
      return payload;
    }
    const proms = [];
    payload.value = /* @__PURE__ */ new Set();
    for (const item of input) {
      const result = def.valueType._zod.run({ value: item, issues: [] }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleSetResult(result2, payload)));
      } else
        handleSetResult(result, payload);
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleSetResult(result, final) {
  if (result.issues.length) {
    final.issues.push(...result.issues);
  }
  final.value.add(result.value);
}
var $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
  $ZodType.init(inst, def);
  const values = getEnumValues(def.entries);
  const valuesSet = new Set(values);
  inst._zod.values = valuesSet;
  inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (valuesSet.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  if (def.values.length === 0) {
    throw new Error("Cannot create literal schema with no valid values");
  }
  const values = new Set(def.values);
  inst._zod.values = values;
  inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (values.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values: def.values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodFile = /* @__PURE__ */ $constructor("$ZodFile", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input instanceof File)
      return payload;
    payload.issues.push({
      expected: "file",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    const _out = def.transform(payload.value, payload);
    if (ctx.async) {
      const output = _out instanceof Promise ? _out : Promise.resolve(_out);
      return output.then((output2) => {
        payload.value = output2;
        return payload;
      });
    }
    if (_out instanceof Promise) {
      throw new $ZodAsyncError();
    }
    payload.value = _out;
    return payload;
  };
});
function handleOptionalResult(result, input) {
  if (result.issues.length && input === void 0) {
    return { issues: [], value: void 0 };
  }
  return result;
}
var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
  });
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    if (def.innerType._zod.optin === "optional") {
      const result = def.innerType._zod.run(payload, ctx);
      if (result instanceof Promise)
        return result.then((r) => handleOptionalResult(r, payload.value));
      return handleOptionalResult(result, payload.value);
    }
    if (payload.value === void 0) {
      return payload;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
  inst._zod.parse = (payload, ctx) => {
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
  });
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === null)
      return payload;
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === void 0) {
      payload.value = def.defaultValue;
      return payload;
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => handleDefaultResult(result2, def));
    }
    return handleDefaultResult(result, def);
  };
});
function handleDefaultResult(payload, def) {
  if (payload.value === void 0) {
    payload.value = def.defaultValue;
  }
  return payload;
}
var $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === void 0) {
      payload.value = def.defaultValue;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => {
    const v = def.innerType._zod.values;
    return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
  });
  inst._zod.parse = (payload, ctx) => {
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => handleNonOptionalResult(result2, inst));
    }
    return handleNonOptionalResult(result, inst);
  };
});
function handleNonOptionalResult(payload, inst) {
  if (!payload.issues.length && payload.value === void 0) {
    payload.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: payload.value,
      inst
    });
  }
  return payload;
}
var $ZodSuccess = /* @__PURE__ */ $constructor("$ZodSuccess", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError("ZodSuccess");
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => {
        payload.value = result2.issues.length === 0;
        return payload;
      });
    }
    payload.value = result.issues.length === 0;
    return payload;
  };
});
var $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => {
        payload.value = result2.value;
        if (result2.issues.length) {
          payload.value = def.catchValue({
            ...payload,
            error: {
              issues: result2.issues.map((iss) => finalizeIssue(iss, ctx, config()))
            },
            input: payload.value
          });
          payload.issues = [];
        }
        return payload;
      });
    }
    payload.value = result.value;
    if (result.issues.length) {
      payload.value = def.catchValue({
        ...payload,
        error: {
          issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config()))
        },
        input: payload.value
      });
      payload.issues = [];
    }
    return payload;
  };
});
var $ZodNaN = /* @__PURE__ */ $constructor("$ZodNaN", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "nan",
        code: "invalid_type"
      });
      return payload;
    }
    return payload;
  };
});
var $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right2) => handlePipeResult(right2, def.in, ctx));
      }
      return handlePipeResult(right, def.in, ctx);
    }
    const left = def.in._zod.run(payload, ctx);
    if (left instanceof Promise) {
      return left.then((left2) => handlePipeResult(left2, def.out, ctx));
    }
    return handlePipeResult(left, def.out, ctx);
  };
});
function handlePipeResult(left, next, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return next._zod.run({ value: left.value, issues: left.issues }, ctx);
}
var $ZodCodec = /* @__PURE__ */ $constructor("$ZodCodec", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    const direction = ctx.direction || "forward";
    if (direction === "forward") {
      const left = def.in._zod.run(payload, ctx);
      if (left instanceof Promise) {
        return left.then((left2) => handleCodecAResult(left2, def, ctx));
      }
      return handleCodecAResult(left, def, ctx);
    } else {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right2) => handleCodecAResult(right2, def, ctx));
      }
      return handleCodecAResult(right, def, ctx);
    }
  };
});
function handleCodecAResult(result, def, ctx) {
  if (result.issues.length) {
    result.aborted = true;
    return result;
  }
  const direction = ctx.direction || "forward";
  if (direction === "forward") {
    const transformed = def.transform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx));
    }
    return handleCodecTxResult(result, transformed, def.out, ctx);
  } else {
    const transformed = def.reverseTransform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx));
    }
    return handleCodecTxResult(result, transformed, def.in, ctx);
  }
}
function handleCodecTxResult(left, value, nextSchema, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return nextSchema._zod.run({ value, issues: left.issues }, ctx);
}
var $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
  defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then(handleReadonlyResult);
    }
    return handleReadonlyResult(result);
  };
});
function handleReadonlyResult(payload) {
  payload.value = Object.freeze(payload.value);
  return payload;
}
var $ZodTemplateLiteral = /* @__PURE__ */ $constructor("$ZodTemplateLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  const regexParts = [];
  for (const part of def.parts) {
    if (typeof part === "object" && part !== null) {
      if (!part._zod.pattern) {
        throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
      }
      const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
      if (!source)
        throw new Error(`Invalid template literal part: ${part._zod.traits}`);
      const start = source.startsWith("^") ? 1 : 0;
      const end = source.endsWith("$") ? source.length - 1 : source.length;
      regexParts.push(source.slice(start, end));
    } else if (part === null || primitiveTypes.has(typeof part)) {
      regexParts.push(escapeRegex(`${part}`));
    } else {
      throw new Error(`Invalid template literal part: ${part}`);
    }
  }
  inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "string") {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "string",
        code: "invalid_type"
      });
      return payload;
    }
    inst._zod.pattern.lastIndex = 0;
    if (!inst._zod.pattern.test(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        code: "invalid_format",
        format: def.format ?? "template_literal",
        pattern: inst._zod.pattern.source
      });
      return payload;
    }
    return payload;
  };
});
var $ZodFunction = /* @__PURE__ */ $constructor("$ZodFunction", (inst, def) => {
  $ZodType.init(inst, def);
  inst._def = def;
  inst._zod.def = def;
  inst.implement = (func) => {
    if (typeof func !== "function") {
      throw new Error("implement() must be called with a function");
    }
    return function(...args) {
      const parsedArgs = inst._def.input ? parse(inst._def.input, args) : args;
      const result = Reflect.apply(func, this, parsedArgs);
      if (inst._def.output) {
        return parse(inst._def.output, result);
      }
      return result;
    };
  };
  inst.implementAsync = (func) => {
    if (typeof func !== "function") {
      throw new Error("implementAsync() must be called with a function");
    }
    return async function(...args) {
      const parsedArgs = inst._def.input ? await parseAsync(inst._def.input, args) : args;
      const result = await Reflect.apply(func, this, parsedArgs);
      if (inst._def.output) {
        return await parseAsync(inst._def.output, result);
      }
      return result;
    };
  };
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "function") {
      payload.issues.push({
        code: "invalid_type",
        expected: "function",
        input: payload.value,
        inst
      });
      return payload;
    }
    const hasPromiseOutput = inst._def.output && inst._def.output._zod.def.type === "promise";
    if (hasPromiseOutput) {
      payload.value = inst.implementAsync(payload.value);
    } else {
      payload.value = inst.implement(payload.value);
    }
    return payload;
  };
  inst.input = (...args) => {
    const F = inst.constructor;
    if (Array.isArray(args[0])) {
      return new F({
        type: "function",
        input: new $ZodTuple({
          type: "tuple",
          items: args[0],
          rest: args[1]
        }),
        output: inst._def.output
      });
    }
    return new F({
      type: "function",
      input: args[0],
      output: inst._def.output
    });
  };
  inst.output = (output) => {
    const F = inst.constructor;
    return new F({
      type: "function",
      input: inst._def.input,
      output
    });
  };
  return inst;
});
var $ZodPromise = /* @__PURE__ */ $constructor("$ZodPromise", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({ value: inner, issues: [] }, ctx));
  };
});
var $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "innerType", () => def.getter());
  defineLazy(inst._zod, "pattern", () => inst._zod.innerType?._zod?.pattern);
  defineLazy(inst._zod, "propValues", () => inst._zod.innerType?._zod?.propValues);
  defineLazy(inst._zod, "optin", () => inst._zod.innerType?._zod?.optin ?? void 0);
  defineLazy(inst._zod, "optout", () => inst._zod.innerType?._zod?.optout ?? void 0);
  inst._zod.parse = (payload, ctx) => {
    const inner = inst._zod.innerType;
    return inner._zod.run(payload, ctx);
  };
});
var $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
  $ZodCheck.init(inst, def);
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _) => {
    return payload;
  };
  inst._zod.check = (payload) => {
    const input = payload.value;
    const r = def.fn(input);
    if (r instanceof Promise) {
      return r.then((r2) => handleRefineResult(r2, payload, input, inst));
    }
    handleRefineResult(r, payload, input, inst);
    return;
  };
});
function handleRefineResult(result, payload, input, inst) {
  if (!result) {
    const _iss = {
      code: "custom",
      input,
      inst,
      // incorporates params.error into issue reporting
      path: [...inst._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !inst._zod.def.abort
      // params: inst._zod.def.params,
    };
    if (inst._zod.def.params)
      _iss.params = inst._zod.def.params;
    payload.issues.push(issue(_iss));
  }
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/index.js
var locales_exports = {};
__export(locales_exports, {
  ar: () => ar_default,
  az: () => az_default,
  be: () => be_default,
  bg: () => bg_default,
  ca: () => ca_default,
  cs: () => cs_default,
  da: () => da_default,
  de: () => de_default,
  en: () => en_default,
  eo: () => eo_default,
  es: () => es_default,
  fa: () => fa_default,
  fi: () => fi_default,
  fr: () => fr_default,
  frCA: () => fr_CA_default,
  he: () => he_default,
  hu: () => hu_default,
  hy: () => hy_default,
  id: () => id_default,
  is: () => is_default,
  it: () => it_default,
  ja: () => ja_default,
  ka: () => ka_default,
  kh: () => kh_default,
  km: () => km_default,
  ko: () => ko_default,
  lt: () => lt_default,
  mk: () => mk_default,
  ms: () => ms_default,
  nl: () => nl_default,
  no: () => no_default,
  ota: () => ota_default,
  pl: () => pl_default,
  ps: () => ps_default,
  pt: () => pt_default,
  ru: () => ru_default,
  sl: () => sl_default,
  sv: () => sv_default,
  ta: () => ta_default,
  th: () => th_default,
  tr: () => tr_default,
  ua: () => ua_default,
  uk: () => uk_default,
  ur: () => ur_default,
  uz: () => uz_default,
  vi: () => vi_default,
  yo: () => yo_default,
  zhCN: () => zh_CN_default,
  zhTW: () => zh_TW_default
});

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/ar.js
var error = () => {
  const Sizable = {
    string: { unit: "\u062D\u0631\u0641", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
    file: { unit: "\u0628\u0627\u064A\u062A", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
    array: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
    set: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0645\u062F\u062E\u0644",
    email: "\u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
    url: "\u0631\u0627\u0628\u0637",
    emoji: "\u0625\u064A\u0645\u0648\u062C\u064A",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    date: "\u062A\u0627\u0631\u064A\u062E \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    time: "\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    duration: "\u0645\u062F\u0629 \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    ipv4: "\u0639\u0646\u0648\u0627\u0646 IPv4",
    ipv6: "\u0639\u0646\u0648\u0627\u0646 IPv6",
    cidrv4: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv4",
    cidrv6: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv6",
    base64: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64-encoded",
    base64url: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64url-encoded",
    json_string: "\u0646\u064E\u0635 \u0639\u0644\u0649 \u0647\u064A\u0626\u0629 JSON",
    e164: "\u0631\u0642\u0645 \u0647\u0627\u062A\u0641 \u0628\u0645\u0639\u064A\u0627\u0631 E.164",
    jwt: "JWT",
    template_literal: "\u0645\u062F\u062E\u0644"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 instanceof ${issue2.expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${received}`;
        }
        return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${stringifyPrimitive(issue2.values[0])}`;
        return `\u0627\u062E\u062A\u064A\u0627\u0631 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062A\u0648\u0642\u0639 \u0627\u0646\u062A\u0642\u0627\u0621 \u0623\u062D\u062F \u0647\u0630\u0647 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return ` \u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${issue2.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631"}`;
        return `\u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${issue2.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${issue2.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${issue2.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0628\u062F\u0623 \u0628\u0640 "${issue2.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0646\u062A\u0647\u064A \u0628\u0640 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u062A\u0636\u0645\u0651\u064E\u0646 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0646\u0645\u0637 ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644`;
      }
      case "not_multiple_of":
        return `\u0631\u0642\u0645 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0645\u0646 \u0645\u0636\u0627\u0639\u0641\u0627\u062A ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u0645\u0639\u0631\u0641${issue2.keys.length > 1 ? "\u0627\u062A" : ""} \u063A\u0631\u064A\u0628${issue2.keys.length > 1 ? "\u0629" : ""}: ${joinValues(issue2.keys, "\u060C ")}`;
      case "invalid_key":
        return `\u0645\u0639\u0631\u0641 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${issue2.origin}`;
      case "invalid_union":
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
      case "invalid_element":
        return `\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${issue2.origin}`;
      default:
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
    }
  };
};
function ar_default() {
  return {
    localeError: error()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/az.js
var error2 = () => {
  const Sizable = {
    string: { unit: "simvol", verb: "olmal\u0131d\u0131r" },
    file: { unit: "bayt", verb: "olmal\u0131d\u0131r" },
    array: { unit: "element", verb: "olmal\u0131d\u0131r" },
    set: { unit: "element", verb: "olmal\u0131d\u0131r" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n instanceof ${issue2.expected}, daxil olan ${received}`;
        }
        return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${expected}, daxil olan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${stringifyPrimitive(issue2.values[0])}`;
        return `Yanl\u0131\u015F se\xE7im: a\u015Fa\u011F\u0131dak\u0131lardan biri olmal\u0131d\u0131r: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue2.origin ?? "d\u0259y\u0259r"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue2.origin ?? "d\u0259y\u0259r"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Yanl\u0131\u015F m\u0259tn: "${_issue.prefix}" il\u0259 ba\u015Flamal\u0131d\u0131r`;
        if (_issue.format === "ends_with")
          return `Yanl\u0131\u015F m\u0259tn: "${_issue.suffix}" il\u0259 bitm\u0259lidir`;
        if (_issue.format === "includes")
          return `Yanl\u0131\u015F m\u0259tn: "${_issue.includes}" daxil olmal\u0131d\u0131r`;
        if (_issue.format === "regex")
          return `Yanl\u0131\u015F m\u0259tn: ${_issue.pattern} \u015Fablonuna uy\u011Fun olmal\u0131d\u0131r`;
        return `Yanl\u0131\u015F ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Yanl\u0131\u015F \u0259d\u0259d: ${issue2.divisor} il\u0259 b\xF6l\xFCn\u0259 bil\u0259n olmal\u0131d\u0131r`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan a\xE7ar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} daxilind\u0259 yanl\u0131\u015F a\xE7ar`;
      case "invalid_union":
        return "Yanl\u0131\u015F d\u0259y\u0259r";
      case "invalid_element":
        return `${issue2.origin} daxilind\u0259 yanl\u0131\u015F d\u0259y\u0259r`;
      default:
        return `Yanl\u0131\u015F d\u0259y\u0259r`;
    }
  };
};
function az_default() {
  return {
    localeError: error2()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/be.js
function getBelarusianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
var error3 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "\u0441\u0456\u043C\u0432\u0430\u043B",
        few: "\u0441\u0456\u043C\u0432\u0430\u043B\u044B",
        many: "\u0441\u0456\u043C\u0432\u0430\u043B\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    },
    array: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    },
    set: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    },
    file: {
      unit: {
        one: "\u0431\u0430\u0439\u0442",
        few: "\u0431\u0430\u0439\u0442\u044B",
        many: "\u0431\u0430\u0439\u0442\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0443\u0432\u043E\u0434",
    email: "email \u0430\u0434\u0440\u0430\u0441",
    url: "URL",
    emoji: "\u044D\u043C\u043E\u0434\u0437\u0456",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0434\u0430\u0442\u0430 \u0456 \u0447\u0430\u0441",
    date: "ISO \u0434\u0430\u0442\u0430",
    time: "ISO \u0447\u0430\u0441",
    duration: "ISO \u043F\u0440\u0430\u0446\u044F\u0433\u043B\u0430\u0441\u0446\u044C",
    ipv4: "IPv4 \u0430\u0434\u0440\u0430\u0441",
    ipv6: "IPv6 \u0430\u0434\u0440\u0430\u0441",
    cidrv4: "IPv4 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
    cidrv6: "IPv6 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
    base64: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64",
    base64url: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64url",
    json_string: "JSON \u0440\u0430\u0434\u043E\u043A",
    e164: "\u043D\u0443\u043C\u0430\u0440 E.164",
    jwt: "JWT",
    template_literal: "\u0443\u0432\u043E\u0434"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u043B\u0456\u043A",
    array: "\u043C\u0430\u0441\u0456\u045E"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F instanceof ${issue2.expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${received}`;
        }
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F ${expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F ${stringifyPrimitive(issue2.values[0])}`;
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0432\u0430\u0440\u044B\u044F\u043D\u0442: \u0447\u0430\u043A\u0430\u045E\u0441\u044F \u0430\u0434\u0437\u0456\u043D \u0437 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getBelarusianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getBelarusianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u043F\u0430\u0447\u044B\u043D\u0430\u0446\u0446\u0430 \u0437 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u0430\u043A\u0430\u043D\u0447\u0432\u0430\u0446\u0446\u0430 \u043D\u0430 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u043C\u044F\u0448\u0447\u0430\u0446\u044C "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0430\u0434\u043F\u0430\u0432\u044F\u0434\u0430\u0446\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043B\u0456\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0431\u044B\u0446\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0441\u043F\u0430\u0437\u043D\u0430\u043D\u044B ${issue2.keys.length > 1 ? "\u043A\u043B\u044E\u0447\u044B" : "\u043A\u043B\u044E\u0447"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043A\u043B\u044E\u0447 \u0443 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
      case "invalid_element":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u0430\u0435 \u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435 \u045E ${issue2.origin}`;
      default:
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434`;
    }
  };
};
function be_default() {
  return {
    localeError: error3()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/bg.js
var error4 = () => {
  const Sizable = {
    string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
    file: { unit: "\u0431\u0430\u0439\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
    array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
    set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0432\u0445\u043E\u0434",
    email: "\u0438\u043C\u0435\u0439\u043B \u0430\u0434\u0440\u0435\u0441",
    url: "URL",
    emoji: "\u0435\u043C\u043E\u0434\u0436\u0438",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0432\u0440\u0435\u043C\u0435",
    date: "ISO \u0434\u0430\u0442\u0430",
    time: "ISO \u0432\u0440\u0435\u043C\u0435",
    duration: "ISO \u043F\u0440\u043E\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E\u0441\u0442",
    ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441",
    ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441",
    cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    base64: "base64-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437",
    base64url: "base64url-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437",
    json_string: "JSON \u043D\u0438\u0437",
    e164: "E.164 \u043D\u043E\u043C\u0435\u0440",
    jwt: "JWT",
    template_literal: "\u0432\u0445\u043E\u0434"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0447\u0438\u0441\u043B\u043E",
    array: "\u043C\u0430\u0441\u0438\u0432"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D instanceof ${issue2.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${received}`;
        }
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${stringifyPrimitive(issue2.values[0])}`;
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u043E\u043F\u0446\u0438\u044F: \u043E\u0447\u0430\u043A\u0432\u0430\u043D\u043E \u0435\u0434\u043D\u043E \u043E\u0442 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430"}`;
        return `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0431\u044A\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin} \u0434\u0430 \u0431\u044A\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u0432\u0430 \u0441 "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u0432\u044A\u0440\u0448\u0432\u0430 \u0441 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0432\u043A\u043B\u044E\u0447\u0432\u0430 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0441\u044A\u0432\u043F\u0430\u0434\u0430 \u0441 ${_issue.pattern}`;
        let invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D";
        if (_issue.format === "emoji")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
        if (_issue.format === "datetime")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
        if (_issue.format === "date")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430";
        if (_issue.format === "time")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
        if (_issue.format === "duration")
          invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430";
        return `${invalid_adj} ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E \u0447\u0438\u0441\u043B\u043E: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0431\u044A\u0434\u0435 \u043A\u0440\u0430\u0442\u043D\u043E \u043D\u0430 ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0437\u043F\u043E\u0437\u043D\u0430\u0442${issue2.keys.length > 1 ? "\u0438" : ""} \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u043E\u0432\u0435" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043A\u043B\u044E\u0447 \u0432 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434";
      case "invalid_element":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u0432 ${issue2.origin}`;
      default:
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434`;
    }
  };
};
function bg_default() {
  return {
    localeError: error4()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/ca.js
var error5 = () => {
  const Sizable = {
    string: { unit: "car\xE0cters", verb: "contenir" },
    file: { unit: "bytes", verb: "contenir" },
    array: { unit: "elements", verb: "contenir" },
    set: { unit: "elements", verb: "contenir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrada",
    email: "adre\xE7a electr\xF2nica",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data i hora ISO",
    date: "data ISO",
    time: "hora ISO",
    duration: "durada ISO",
    ipv4: "adre\xE7a IPv4",
    ipv6: "adre\xE7a IPv6",
    cidrv4: "rang IPv4",
    cidrv6: "rang IPv6",
    base64: "cadena codificada en base64",
    base64url: "cadena codificada en base64url",
    json_string: "cadena JSON",
    e164: "n\xFAmero E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Tipus inv\xE0lid: s'esperava instanceof ${issue2.expected}, s'ha rebut ${received}`;
        }
        return `Tipus inv\xE0lid: s'esperava ${expected}, s'ha rebut ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Valor inv\xE0lid: s'esperava ${stringifyPrimitive(issue2.values[0])}`;
        return `Opci\xF3 inv\xE0lida: s'esperava una de ${joinValues(issue2.values, " o ")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "com a m\xE0xim" : "menys de";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} contingu\xE9s ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} fos ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "com a m\xEDnim" : "m\xE9s de";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Massa petit: s'esperava que ${issue2.origin} contingu\xE9s ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Massa petit: s'esperava que ${issue2.origin} fos ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Format inv\xE0lid: ha de comen\xE7ar amb "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Format inv\xE0lid: ha d'acabar amb "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Format inv\xE0lid: ha d'incloure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Format inv\xE0lid: ha de coincidir amb el patr\xF3 ${_issue.pattern}`;
        return `Format inv\xE0lid per a ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE0lid: ha de ser m\xFAltiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Clau${issue2.keys.length > 1 ? "s" : ""} no reconeguda${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Clau inv\xE0lida a ${issue2.origin}`;
      case "invalid_union":
        return "Entrada inv\xE0lida";
      // Could also be "Tipus d'unió invàlid" but "Entrada invàlida" is more general
      case "invalid_element":
        return `Element inv\xE0lid a ${issue2.origin}`;
      default:
        return `Entrada inv\xE0lida`;
    }
  };
};
function ca_default() {
  return {
    localeError: error5()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/cs.js
var error6 = () => {
  const Sizable = {
    string: { unit: "znak\u016F", verb: "m\xEDt" },
    file: { unit: "bajt\u016F", verb: "m\xEDt" },
    array: { unit: "prvk\u016F", verb: "m\xEDt" },
    set: { unit: "prvk\u016F", verb: "m\xEDt" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "regul\xE1rn\xED v\xFDraz",
    email: "e-mailov\xE1 adresa",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "datum a \u010Das ve form\xE1tu ISO",
    date: "datum ve form\xE1tu ISO",
    time: "\u010Das ve form\xE1tu ISO",
    duration: "doba trv\xE1n\xED ISO",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    cidrv4: "rozsah IPv4",
    cidrv6: "rozsah IPv6",
    base64: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64",
    base64url: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64url",
    json_string: "\u0159et\u011Bzec ve form\xE1tu JSON",
    e164: "\u010D\xEDslo E.164",
    jwt: "JWT",
    template_literal: "vstup"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u010D\xEDslo",
    string: "\u0159et\u011Bzec",
    function: "funkce",
    array: "pole"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no instanceof ${issue2.expected}, obdr\u017Eeno ${received}`;
        }
        return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${expected}, obdr\u017Eeno ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${stringifyPrimitive(issue2.values[0])}`;
        return `Neplatn\xE1 mo\u017Enost: o\u010Dek\xE1v\xE1na jedna z hodnot ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue2.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "prvk\u016F"}`;
        }
        return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue2.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue2.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "prvk\u016F"}`;
        }
        return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue2.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED za\u010D\xEDnat na "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED kon\u010Dit na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED obsahovat "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neplatn\xFD \u0159et\u011Bzec: mus\xED odpov\xEDdat vzoru ${_issue.pattern}`;
        return `Neplatn\xFD form\xE1t ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neplatn\xE9 \u010D\xEDslo: mus\xED b\xFDt n\xE1sobkem ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nezn\xE1m\xE9 kl\xED\u010De: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neplatn\xFD kl\xED\u010D v ${issue2.origin}`;
      case "invalid_union":
        return "Neplatn\xFD vstup";
      case "invalid_element":
        return `Neplatn\xE1 hodnota v ${issue2.origin}`;
      default:
        return `Neplatn\xFD vstup`;
    }
  };
};
function cs_default() {
  return {
    localeError: error6()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/da.js
var error7 = () => {
  const Sizable = {
    string: { unit: "tegn", verb: "havde" },
    file: { unit: "bytes", verb: "havde" },
    array: { unit: "elementer", verb: "indeholdt" },
    set: { unit: "elementer", verb: "indeholdt" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-mailadresse",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dato- og klokkesl\xE6t",
    date: "ISO-dato",
    time: "ISO-klokkesl\xE6t",
    duration: "ISO-varighed",
    ipv4: "IPv4-omr\xE5de",
    ipv6: "IPv6-omr\xE5de",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodet streng",
    base64url: "base64url-kodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "streng",
    number: "tal",
    boolean: "boolean",
    array: "liste",
    object: "objekt",
    set: "s\xE6t",
    file: "fil"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ugyldigt input: forventede instanceof ${issue2.expected}, fik ${received}`;
        }
        return `Ugyldigt input: forventede ${expected}, fik ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ugyldig v\xE6rdi: forventede ${stringifyPrimitive(issue2.values[0])}`;
        return `Ugyldigt valg: forventede en af f\xF8lgende ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing)
          return `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
        return `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing) {
          return `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `For lille: forventede ${origin} havde ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: skal starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: skal ende med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: skal indeholde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: skal matche m\xF8nsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ugyldigt tal: skal v\xE6re deleligt med ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ukendte n\xF8gler" : "Ukendt n\xF8gle"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig n\xF8gle i ${issue2.origin}`;
      case "invalid_union":
        return "Ugyldigt input: matcher ingen af de tilladte typer";
      case "invalid_element":
        return `Ugyldig v\xE6rdi i ${issue2.origin}`;
      default:
        return `Ugyldigt input`;
    }
  };
};
function da_default() {
  return {
    localeError: error7()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/de.js
var error8 = () => {
  const Sizable = {
    string: { unit: "Zeichen", verb: "zu haben" },
    file: { unit: "Bytes", verb: "zu haben" },
    array: { unit: "Elemente", verb: "zu haben" },
    set: { unit: "Elemente", verb: "zu haben" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "Eingabe",
    email: "E-Mail-Adresse",
    url: "URL",
    emoji: "Emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-Datum und -Uhrzeit",
    date: "ISO-Datum",
    time: "ISO-Uhrzeit",
    duration: "ISO-Dauer",
    ipv4: "IPv4-Adresse",
    ipv6: "IPv6-Adresse",
    cidrv4: "IPv4-Bereich",
    cidrv6: "IPv6-Bereich",
    base64: "Base64-codierter String",
    base64url: "Base64-URL-codierter String",
    json_string: "JSON-String",
    e164: "E.164-Nummer",
    jwt: "JWT",
    template_literal: "Eingabe"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "Zahl",
    array: "Array"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ung\xFCltige Eingabe: erwartet instanceof ${issue2.expected}, erhalten ${received}`;
        }
        return `Ung\xFCltige Eingabe: erwartet ${expected}, erhalten ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ung\xFCltige Eingabe: erwartet ${stringifyPrimitive(issue2.values[0])}`;
        return `Ung\xFCltige Option: erwartet eine von ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Zu gro\xDF: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
        return `Zu gro\xDF: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ist`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} hat`;
        }
        return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ist`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ung\xFCltiger String: muss mit "${_issue.prefix}" beginnen`;
        if (_issue.format === "ends_with")
          return `Ung\xFCltiger String: muss mit "${_issue.suffix}" enden`;
        if (_issue.format === "includes")
          return `Ung\xFCltiger String: muss "${_issue.includes}" enthalten`;
        if (_issue.format === "regex")
          return `Ung\xFCltiger String: muss dem Muster ${_issue.pattern} entsprechen`;
        return `Ung\xFCltig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ung\xFCltige Zahl: muss ein Vielfaches von ${issue2.divisor} sein`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Unbekannte Schl\xFCssel" : "Unbekannter Schl\xFCssel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ung\xFCltiger Schl\xFCssel in ${issue2.origin}`;
      case "invalid_union":
        return "Ung\xFCltige Eingabe";
      case "invalid_element":
        return `Ung\xFCltiger Wert in ${issue2.origin}`;
      default:
        return `Ung\xFCltige Eingabe`;
    }
  };
};
function de_default() {
  return {
    localeError: error8()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/en.js
var error9 = () => {
  const Sizable = {
    string: { unit: "characters", verb: "to have" },
    file: { unit: "bytes", verb: "to have" },
    array: { unit: "items", verb: "to have" },
    set: { unit: "items", verb: "to have" },
    map: { unit: "entries", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    // Compatibility: "nan" -> "NaN" for display
    nan: "NaN"
    // All other type names omitted - they fall back to raw values via ?? operator
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `Invalid input: expected ${expected}, received ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
        return `Invalid option: expected one of ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Too big: expected ${issue2.origin ?? "value"} to have ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Too big: expected ${issue2.origin ?? "value"} to be ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Too small: expected ${issue2.origin} to have ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Too small: expected ${issue2.origin} to be ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Invalid string: must start with "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Invalid string: must end with "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Invalid string: must include "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Invalid string: must match pattern ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${issue2.origin}`;
      case "invalid_union":
        return "Invalid input";
      case "invalid_element":
        return `Invalid value in ${issue2.origin}`;
      default:
        return `Invalid input`;
    }
  };
};
function en_default() {
  return {
    localeError: error9()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/eo.js
var error10 = () => {
  const Sizable = {
    string: { unit: "karaktrojn", verb: "havi" },
    file: { unit: "bajtojn", verb: "havi" },
    array: { unit: "elementojn", verb: "havi" },
    set: { unit: "elementojn", verb: "havi" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "enigo",
    email: "retadreso",
    url: "URL",
    emoji: "emo\u011Dio",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-datotempo",
    date: "ISO-dato",
    time: "ISO-tempo",
    duration: "ISO-da\u016Dro",
    ipv4: "IPv4-adreso",
    ipv6: "IPv6-adreso",
    cidrv4: "IPv4-rango",
    cidrv6: "IPv6-rango",
    base64: "64-ume kodita karaktraro",
    base64url: "URL-64-ume kodita karaktraro",
    json_string: "JSON-karaktraro",
    e164: "E.164-nombro",
    jwt: "JWT",
    template_literal: "enigo"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombro",
    array: "tabelo",
    null: "senvalora"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Nevalida enigo: atendi\u011Dis instanceof ${issue2.expected}, ricevi\u011Dis ${received}`;
        }
        return `Nevalida enigo: atendi\u011Dis ${expected}, ricevi\u011Dis ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Nevalida enigo: atendi\u011Dis ${stringifyPrimitive(issue2.values[0])}`;
        return `Nevalida opcio: atendi\u011Dis unu el ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Tro granda: atendi\u011Dis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
        return `Tro granda: atendi\u011Dis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Tro malgranda: atendi\u011Dis ke ${issue2.origin} havu ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Tro malgranda: atendi\u011Dis ke ${issue2.origin} estu ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Nevalida karaktraro: devas komenci\u011Di per "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nevalida karaktraro: devas fini\u011Di per "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
        return `Nevalida ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nevalida nombro: devas esti oblo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nekonata${issue2.keys.length > 1 ? "j" : ""} \u015Dlosilo${issue2.keys.length > 1 ? "j" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Nevalida \u015Dlosilo en ${issue2.origin}`;
      case "invalid_union":
        return "Nevalida enigo";
      case "invalid_element":
        return `Nevalida valoro en ${issue2.origin}`;
      default:
        return `Nevalida enigo`;
    }
  };
};
function eo_default() {
  return {
    localeError: error10()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/es.js
var error11 = () => {
  const Sizable = {
    string: { unit: "caracteres", verb: "tener" },
    file: { unit: "bytes", verb: "tener" },
    array: { unit: "elementos", verb: "tener" },
    set: { unit: "elementos", verb: "tener" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrada",
    email: "direcci\xF3n de correo electr\xF3nico",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "fecha y hora ISO",
    date: "fecha ISO",
    time: "hora ISO",
    duration: "duraci\xF3n ISO",
    ipv4: "direcci\xF3n IPv4",
    ipv6: "direcci\xF3n IPv6",
    cidrv4: "rango IPv4",
    cidrv6: "rango IPv6",
    base64: "cadena codificada en base64",
    base64url: "URL codificada en base64",
    json_string: "cadena JSON",
    e164: "n\xFAmero E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "texto",
    number: "n\xFAmero",
    boolean: "booleano",
    array: "arreglo",
    object: "objeto",
    set: "conjunto",
    file: "archivo",
    date: "fecha",
    bigint: "n\xFAmero grande",
    symbol: "s\xEDmbolo",
    undefined: "indefinido",
    null: "nulo",
    function: "funci\xF3n",
    map: "mapa",
    record: "registro",
    tuple: "tupla",
    enum: "enumeraci\xF3n",
    union: "uni\xF3n",
    literal: "literal",
    promise: "promesa",
    void: "vac\xEDo",
    never: "nunca",
    unknown: "desconocido",
    any: "cualquiera"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entrada inv\xE1lida: se esperaba instanceof ${issue2.expected}, recibido ${received}`;
        }
        return `Entrada inv\xE1lida: se esperaba ${expected}, recibido ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrada inv\xE1lida: se esperaba ${stringifyPrimitive(issue2.values[0])}`;
        return `Opci\xF3n inv\xE1lida: se esperaba una de ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing)
          return `Demasiado grande: se esperaba que ${origin ?? "valor"} tuviera ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Demasiado grande: se esperaba que ${origin ?? "valor"} fuera ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing) {
          return `Demasiado peque\xF1o: se esperaba que ${origin} tuviera ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Demasiado peque\xF1o: se esperaba que ${origin} fuera ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Cadena inv\xE1lida: debe comenzar con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Cadena inv\xE1lida: debe terminar en "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Cadena inv\xE1lida: debe incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Cadena inv\xE1lida: debe coincidir con el patr\xF3n ${_issue.pattern}`;
        return `Inv\xE1lido ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE1lido: debe ser m\xFAltiplo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Llave${issue2.keys.length > 1 ? "s" : ""} desconocida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Llave inv\xE1lida en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      case "invalid_union":
        return "Entrada inv\xE1lida";
      case "invalid_element":
        return `Valor inv\xE1lido en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      default:
        return `Entrada inv\xE1lida`;
    }
  };
};
function es_default() {
  return {
    localeError: error11()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/fa.js
var error12 = () => {
  const Sizable = {
    string: { unit: "\u06A9\u0627\u0631\u0627\u06A9\u062A\u0631", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
    file: { unit: "\u0628\u0627\u06CC\u062A", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
    array: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
    set: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0648\u0631\u0648\u062F\u06CC",
    email: "\u0622\u062F\u0631\u0633 \u0627\u06CC\u0645\u06CC\u0644",
    url: "URL",
    emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u062A\u0627\u0631\u06CC\u062E \u0648 \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
    date: "\u062A\u0627\u0631\u06CC\u062E \u0627\u06CC\u0632\u0648",
    time: "\u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
    duration: "\u0645\u062F\u062A \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
    ipv4: "IPv4 \u0622\u062F\u0631\u0633",
    ipv6: "IPv6 \u0622\u062F\u0631\u0633",
    cidrv4: "IPv4 \u062F\u0627\u0645\u0646\u0647",
    cidrv6: "IPv6 \u062F\u0627\u0645\u0646\u0647",
    base64: "base64-encoded \u0631\u0634\u062A\u0647",
    base64url: "base64url-encoded \u0631\u0634\u062A\u0647",
    json_string: "JSON \u0631\u0634\u062A\u0647",
    e164: "E.164 \u0639\u062F\u062F",
    jwt: "JWT",
    template_literal: "\u0648\u0631\u0648\u062F\u06CC"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0639\u062F\u062F",
    array: "\u0622\u0631\u0627\u06CC\u0647"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A instanceof ${issue2.expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${received} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
        }
        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${received} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
      }
      case "invalid_value":
        if (issue2.values.length === 1) {
          return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${stringifyPrimitive(issue2.values[0])} \u0645\u06CC\u200C\u0628\u0648\u062F`;
        }
        return `\u06AF\u0632\u06CC\u0646\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A \u06CC\u06A9\u06CC \u0627\u0632 ${joinValues(issue2.values, "|")} \u0645\u06CC\u200C\u0628\u0648\u062F`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue2.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631"} \u0628\u0627\u0634\u062F`;
        }
        return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue2.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0628\u0627\u0634\u062F`;
        }
        return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.prefix}" \u0634\u0631\u0648\u0639 \u0634\u0648\u062F`;
        }
        if (_issue.format === "ends_with") {
          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.suffix}" \u062A\u0645\u0627\u0645 \u0634\u0648\u062F`;
        }
        if (_issue.format === "includes") {
          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0634\u0627\u0645\u0644 "${_issue.includes}" \u0628\u0627\u0634\u062F`;
        }
        if (_issue.format === "regex") {
          return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 \u0627\u0644\u06AF\u0648\u06CC ${_issue.pattern} \u0645\u0637\u0627\u0628\u0642\u062A \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F`;
        }
        return `${FormatDictionary[_issue.format] ?? issue2.format} \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
      }
      case "not_multiple_of":
        return `\u0639\u062F\u062F \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0645\u0636\u0631\u0628 ${issue2.divisor} \u0628\u0627\u0634\u062F`;
      case "unrecognized_keys":
        return `\u06A9\u0644\u06CC\u062F${issue2.keys.length > 1 ? "\u0647\u0627\u06CC" : ""} \u0646\u0627\u0634\u0646\u0627\u0633: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u06A9\u0644\u06CC\u062F \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0631 ${issue2.origin}`;
      case "invalid_union":
        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
      case "invalid_element":
        return `\u0645\u0642\u062F\u0627\u0631 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u062F\u0631 ${issue2.origin}`;
      default:
        return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
    }
  };
};
function fa_default() {
  return {
    localeError: error12()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/fi.js
var error13 = () => {
  const Sizable = {
    string: { unit: "merkki\xE4", subject: "merkkijonon" },
    file: { unit: "tavua", subject: "tiedoston" },
    array: { unit: "alkiota", subject: "listan" },
    set: { unit: "alkiota", subject: "joukon" },
    number: { unit: "", subject: "luvun" },
    bigint: { unit: "", subject: "suuren kokonaisluvun" },
    int: { unit: "", subject: "kokonaisluvun" },
    date: { unit: "", subject: "p\xE4iv\xE4m\xE4\xE4r\xE4n" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "s\xE4\xE4nn\xF6llinen lauseke",
    email: "s\xE4hk\xF6postiosoite",
    url: "URL-osoite",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-aikaleima",
    date: "ISO-p\xE4iv\xE4m\xE4\xE4r\xE4",
    time: "ISO-aika",
    duration: "ISO-kesto",
    ipv4: "IPv4-osoite",
    ipv6: "IPv6-osoite",
    cidrv4: "IPv4-alue",
    cidrv6: "IPv6-alue",
    base64: "base64-koodattu merkkijono",
    base64url: "base64url-koodattu merkkijono",
    json_string: "JSON-merkkijono",
    e164: "E.164-luku",
    jwt: "JWT",
    template_literal: "templaattimerkkijono"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Virheellinen tyyppi: odotettiin instanceof ${issue2.expected}, oli ${received}`;
        }
        return `Virheellinen tyyppi: odotettiin ${expected}, oli ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Virheellinen sy\xF6te: t\xE4ytyy olla ${stringifyPrimitive(issue2.values[0])}`;
        return `Virheellinen valinta: t\xE4ytyy olla yksi seuraavista: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Liian suuri: ${sizing.subject} t\xE4ytyy olla ${adj}${issue2.maximum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian suuri: arvon t\xE4ytyy olla ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Liian pieni: ${sizing.subject} t\xE4ytyy olla ${adj}${issue2.minimum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian pieni: arvon t\xE4ytyy olla ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Virheellinen sy\xF6te: t\xE4ytyy alkaa "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Virheellinen sy\xF6te: t\xE4ytyy loppua "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Virheellinen sy\xF6te: t\xE4ytyy sis\xE4lt\xE4\xE4 "${_issue.includes}"`;
        if (_issue.format === "regex") {
          return `Virheellinen sy\xF6te: t\xE4ytyy vastata s\xE4\xE4nn\xF6llist\xE4 lauseketta ${_issue.pattern}`;
        }
        return `Virheellinen ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Virheellinen luku: t\xE4ytyy olla luvun ${issue2.divisor} monikerta`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return "Virheellinen avain tietueessa";
      case "invalid_union":
        return "Virheellinen unioni";
      case "invalid_element":
        return "Virheellinen arvo joukossa";
      default:
        return `Virheellinen sy\xF6te`;
    }
  };
};
function fi_default() {
  return {
    localeError: error13()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/fr.js
var error14 = () => {
  const Sizable = {
    string: { unit: "caract\xE8res", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "\xE9l\xE9ments", verb: "avoir" },
    set: { unit: "\xE9l\xE9ments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entr\xE9e",
    email: "adresse e-mail",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date et heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "dur\xE9e ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "cha\xEEne encod\xE9e en base64",
    base64url: "cha\xEEne encod\xE9e en base64url",
    json_string: "cha\xEEne JSON",
    e164: "num\xE9ro E.164",
    jwt: "JWT",
    template_literal: "entr\xE9e"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombre",
    array: "tableau"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entr\xE9e invalide : instanceof ${issue2.expected} attendu, ${received} re\xE7u`;
        }
        return `Entr\xE9e invalide : ${expected} attendu, ${received} re\xE7u`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entr\xE9e invalide : ${stringifyPrimitive(issue2.values[0])} attendu`;
        return `Option invalide : une valeur parmi ${joinValues(issue2.values, "|")} attendue`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop grand : ${issue2.origin ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\xE9l\xE9ment(s)"}`;
        return `Trop grand : ${issue2.origin ?? "valeur"} doit \xEAtre ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Trop petit : ${issue2.origin} doit ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Trop petit : ${issue2.origin} doit \xEAtre ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Cha\xEEne invalide : doit commencer par "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Cha\xEEne invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Cha\xEEne invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Cha\xEEne invalide : doit correspondre au mod\xE8le ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return `Entr\xE9e invalide`;
    }
  };
};
function fr_default() {
  return {
    localeError: error14()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/fr-CA.js
var error15 = () => {
  const Sizable = {
    string: { unit: "caract\xE8res", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "\xE9l\xE9ments", verb: "avoir" },
    set: { unit: "\xE9l\xE9ments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entr\xE9e",
    email: "adresse courriel",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date-heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "dur\xE9e ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "cha\xEEne encod\xE9e en base64",
    base64url: "cha\xEEne encod\xE9e en base64url",
    json_string: "cha\xEEne JSON",
    e164: "num\xE9ro E.164",
    jwt: "JWT",
    template_literal: "entr\xE9e"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entr\xE9e invalide : attendu instanceof ${issue2.expected}, re\xE7u ${received}`;
        }
        return `Entr\xE9e invalide : attendu ${expected}, re\xE7u ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entr\xE9e invalide : attendu ${stringifyPrimitive(issue2.values[0])}`;
        return `Option invalide : attendu l'une des valeurs suivantes ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "\u2264" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} ait ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} soit ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "\u2265" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Trop petit : attendu que ${issue2.origin} ait ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Trop petit : attendu que ${issue2.origin} soit ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Cha\xEEne invalide : doit commencer par "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Cha\xEEne invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Cha\xEEne invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Cha\xEEne invalide : doit correspondre au motif ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return `Entr\xE9e invalide`;
    }
  };
};
function fr_CA_default() {
  return {
    localeError: error15()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/he.js
var error16 = () => {
  const TypeNames = {
    string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA", gender: "f" },
    number: { label: "\u05DE\u05E1\u05E4\u05E8", gender: "m" },
    boolean: { label: "\u05E2\u05E8\u05DA \u05D1\u05D5\u05DC\u05D9\u05D0\u05E0\u05D9", gender: "m" },
    bigint: { label: "BigInt", gender: "m" },
    date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA", gender: "m" },
    array: { label: "\u05DE\u05E2\u05E8\u05DA", gender: "m" },
    object: { label: "\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8", gender: "m" },
    null: { label: "\u05E2\u05E8\u05DA \u05E8\u05D9\u05E7 (null)", gender: "m" },
    undefined: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05DE\u05D5\u05D2\u05D3\u05E8 (undefined)", gender: "m" },
    symbol: { label: "\u05E1\u05D9\u05DE\u05D1\u05D5\u05DC (Symbol)", gender: "m" },
    function: { label: "\u05E4\u05D5\u05E0\u05E7\u05E6\u05D9\u05D4", gender: "f" },
    map: { label: "\u05DE\u05E4\u05D4 (Map)", gender: "f" },
    set: { label: "\u05E7\u05D1\u05D5\u05E6\u05D4 (Set)", gender: "f" },
    file: { label: "\u05E7\u05D5\u05D1\u05E5", gender: "m" },
    promise: { label: "Promise", gender: "m" },
    NaN: { label: "NaN", gender: "m" },
    unknown: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2", gender: "m" },
    value: { label: "\u05E2\u05E8\u05DA", gender: "m" }
  };
  const Sizable = {
    string: { unit: "\u05EA\u05D5\u05D5\u05D9\u05DD", shortLabel: "\u05E7\u05E6\u05E8", longLabel: "\u05D0\u05E8\u05D5\u05DA" },
    file: { unit: "\u05D1\u05D9\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
    array: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
    set: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
    number: { unit: "", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" }
    // no unit
  };
  const typeEntry = (t) => t ? TypeNames[t] : void 0;
  const typeLabel = (t) => {
    const e = typeEntry(t);
    if (e)
      return e.label;
    return t ?? TypeNames.unknown.label;
  };
  const withDefinite = (t) => `\u05D4${typeLabel(t)}`;
  const verbFor = (t) => {
    const e = typeEntry(t);
    const gender = e?.gender ?? "m";
    return gender === "f" ? "\u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05D9\u05D5\u05EA" : "\u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA";
  };
  const getSizing = (origin) => {
    if (!origin)
      return null;
    return Sizable[origin] ?? null;
  };
  const FormatDictionary = {
    regex: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    email: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC", gender: "f" },
    url: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05E8\u05E9\u05EA", gender: "f" },
    emoji: { label: "\u05D0\u05D9\u05DE\u05D5\u05D2'\u05D9", gender: "m" },
    uuid: { label: "UUID", gender: "m" },
    nanoid: { label: "nanoid", gender: "m" },
    guid: { label: "GUID", gender: "m" },
    cuid: { label: "cuid", gender: "m" },
    cuid2: { label: "cuid2", gender: "m" },
    ulid: { label: "ULID", gender: "m" },
    xid: { label: "XID", gender: "m" },
    ksuid: { label: "KSUID", gender: "m" },
    datetime: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D5\u05D6\u05DE\u05DF ISO", gender: "m" },
    date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA ISO", gender: "m" },
    time: { label: "\u05D6\u05DE\u05DF ISO", gender: "m" },
    duration: { label: "\u05DE\u05E9\u05DA \u05D6\u05DE\u05DF ISO", gender: "m" },
    ipv4: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv4", gender: "f" },
    ipv6: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv6", gender: "f" },
    cidrv4: { label: "\u05D8\u05D5\u05D5\u05D7 IPv4", gender: "m" },
    cidrv6: { label: "\u05D8\u05D5\u05D5\u05D7 IPv6", gender: "m" },
    base64: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64", gender: "f" },
    base64url: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64 \u05DC\u05DB\u05EA\u05D5\u05D1\u05D5\u05EA \u05E8\u05E9\u05EA", gender: "f" },
    json_string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA JSON", gender: "f" },
    e164: { label: "\u05DE\u05E1\u05E4\u05E8 E.164", gender: "m" },
    jwt: { label: "JWT", gender: "m" },
    ends_with: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    includes: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    lowercase: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    starts_with: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    uppercase: { label: "\u05E7\u05DC\u05D8", gender: "m" }
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expectedKey = issue2.expected;
        const expected = TypeDictionary[expectedKey ?? ""] ?? typeLabel(expectedKey);
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? TypeNames[receivedType]?.label ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA instanceof ${issue2.expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${received}`;
        }
        return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${received}`;
      }
      case "invalid_value": {
        if (issue2.values.length === 1) {
          return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05E2\u05E8\u05DA \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA ${stringifyPrimitive(issue2.values[0])}`;
        }
        const stringified = issue2.values.map((v) => stringifyPrimitive(v));
        if (issue2.values.length === 2) {
          return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${stringified[0]} \u05D0\u05D5 ${stringified[1]}`;
        }
        const lastValue = stringified[stringified.length - 1];
        const restValues = stringified.slice(0, -1).join(", ");
        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${restValues} \u05D0\u05D5 ${lastValue}`;
      }
      case "too_big": {
        const sizing = getSizing(issue2.origin);
        const subject = withDefinite(issue2.origin ?? "value");
        if (issue2.origin === "string") {
          return `${sizing?.longLabel ?? "\u05D0\u05E8\u05D5\u05DA"} \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${issue2.maximum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "\u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA" : "\u05DC\u05DB\u05DC \u05D4\u05D9\u05D5\u05EA\u05E8"}`.trim();
        }
        if (issue2.origin === "number") {
          const comparison = issue2.inclusive ? `\u05E7\u05D8\u05DF \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${issue2.maximum}` : `\u05E7\u05D8\u05DF \u05DE-${issue2.maximum}`;
          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${comparison}`;
        }
        if (issue2.origin === "array" || issue2.origin === "set") {
          const verb = issue2.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA";
          const comparison = issue2.inclusive ? `${issue2.maximum} ${sizing?.unit ?? ""} \u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA` : `\u05E4\u05D7\u05D5\u05EA \u05DE-${issue2.maximum} ${sizing?.unit ?? ""}`;
          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${comparison}`.trim();
        }
        const adj = issue2.inclusive ? "<=" : "<";
        const be = verbFor(issue2.origin ?? "value");
        if (sizing?.unit) {
          return `${sizing.longLabel} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        }
        return `${sizing?.longLabel ?? "\u05D2\u05D3\u05D5\u05DC"} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const sizing = getSizing(issue2.origin);
        const subject = withDefinite(issue2.origin ?? "value");
        if (issue2.origin === "string") {
          return `${sizing?.shortLabel ?? "\u05E7\u05E6\u05E8"} \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${issue2.minimum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "\u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8" : "\u05DC\u05E4\u05D7\u05D5\u05EA"}`.trim();
        }
        if (issue2.origin === "number") {
          const comparison = issue2.inclusive ? `\u05D2\u05D3\u05D5\u05DC \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${issue2.minimum}` : `\u05D2\u05D3\u05D5\u05DC \u05DE-${issue2.minimum}`;
          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${comparison}`;
        }
        if (issue2.origin === "array" || issue2.origin === "set") {
          const verb = issue2.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA";
          if (issue2.minimum === 1 && issue2.inclusive) {
            const singularPhrase = issue2.origin === "set" ? "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3" : "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3";
            return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${singularPhrase}`;
          }
          const comparison = issue2.inclusive ? `${issue2.minimum} ${sizing?.unit ?? ""} \u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8` : `\u05D9\u05D5\u05EA\u05E8 \u05DE-${issue2.minimum} ${sizing?.unit ?? ""}`;
          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${comparison}`.trim();
        }
        const adj = issue2.inclusive ? ">=" : ">";
        const be = verbFor(issue2.origin ?? "value");
        if (sizing?.unit) {
          return `${sizing.shortLabel} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `${sizing?.shortLabel ?? "\u05E7\u05D8\u05DF"} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC \u05D1 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD \u05D1 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05DB\u05DC\u05D5\u05DC "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D0\u05D9\u05DD \u05DC\u05EA\u05D1\u05E0\u05D9\u05EA ${_issue.pattern}`;
        const nounEntry = FormatDictionary[_issue.format];
        const noun = nounEntry?.label ?? _issue.format;
        const gender = nounEntry?.gender ?? "m";
        const adjective = gender === "f" ? "\u05EA\u05E7\u05D9\u05E0\u05D4" : "\u05EA\u05E7\u05D9\u05DF";
        return `${noun} \u05DC\u05D0 ${adjective}`;
      }
      case "not_multiple_of":
        return `\u05DE\u05E1\u05E4\u05E8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DE\u05DB\u05E4\u05DC\u05D4 \u05E9\u05DC ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u05DE\u05E4\u05EA\u05D7${issue2.keys.length > 1 ? "\u05D5\u05EA" : ""} \u05DC\u05D0 \u05DE\u05D6\u05D5\u05D4${issue2.keys.length > 1 ? "\u05D9\u05DD" : "\u05D4"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key": {
        return `\u05E9\u05D3\u05D4 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8`;
      }
      case "invalid_union":
        return "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF";
      case "invalid_element": {
        const place = withDefinite(issue2.origin ?? "array");
        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1${place}`;
      }
      default:
        return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF`;
    }
  };
};
function he_default() {
  return {
    localeError: error16()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/hu.js
var error17 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "legyen" },
    file: { unit: "byte", verb: "legyen" },
    array: { unit: "elem", verb: "legyen" },
    set: { unit: "elem", verb: "legyen" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "bemenet",
    email: "email c\xEDm",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO id\u0151b\xE9lyeg",
    date: "ISO d\xE1tum",
    time: "ISO id\u0151",
    duration: "ISO id\u0151intervallum",
    ipv4: "IPv4 c\xEDm",
    ipv6: "IPv6 c\xEDm",
    cidrv4: "IPv4 tartom\xE1ny",
    cidrv6: "IPv6 tartom\xE1ny",
    base64: "base64-k\xF3dolt string",
    base64url: "base64url-k\xF3dolt string",
    json_string: "JSON string",
    e164: "E.164 sz\xE1m",
    jwt: "JWT",
    template_literal: "bemenet"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "sz\xE1m",
    array: "t\xF6mb"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k instanceof ${issue2.expected}, a kapott \xE9rt\xE9k ${received}`;
        }
        return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${expected}, a kapott \xE9rt\xE9k ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${stringifyPrimitive(issue2.values[0])}`;
        return `\xC9rv\xE9nytelen opci\xF3: valamelyik \xE9rt\xE9k v\xE1rt ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `T\xFAl nagy: ${issue2.origin ?? "\xE9rt\xE9k"} m\xE9rete t\xFAl nagy ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elem"}`;
        return `T\xFAl nagy: a bemeneti \xE9rt\xE9k ${issue2.origin ?? "\xE9rt\xE9k"} t\xFAl nagy: ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue2.origin} m\xE9rete t\xFAl kicsi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue2.origin} t\xFAl kicsi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\xC9rv\xE9nytelen string: "${_issue.prefix}" \xE9rt\xE9kkel kell kezd\u0151dnie`;
        if (_issue.format === "ends_with")
          return `\xC9rv\xE9nytelen string: "${_issue.suffix}" \xE9rt\xE9kkel kell v\xE9gz\u0151dnie`;
        if (_issue.format === "includes")
          return `\xC9rv\xE9nytelen string: "${_issue.includes}" \xE9rt\xE9ket kell tartalmaznia`;
        if (_issue.format === "regex")
          return `\xC9rv\xE9nytelen string: ${_issue.pattern} mint\xE1nak kell megfelelnie`;
        return `\xC9rv\xE9nytelen ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\xC9rv\xE9nytelen sz\xE1m: ${issue2.divisor} t\xF6bbsz\xF6r\xF6s\xE9nek kell lennie`;
      case "unrecognized_keys":
        return `Ismeretlen kulcs${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\xC9rv\xE9nytelen kulcs ${issue2.origin}`;
      case "invalid_union":
        return "\xC9rv\xE9nytelen bemenet";
      case "invalid_element":
        return `\xC9rv\xE9nytelen \xE9rt\xE9k: ${issue2.origin}`;
      default:
        return `\xC9rv\xE9nytelen bemenet`;
    }
  };
};
function hu_default() {
  return {
    localeError: error17()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/hy.js
function getArmenianPlural(count, one, many) {
  return Math.abs(count) === 1 ? one : many;
}
function withDefiniteArticle(word) {
  if (!word)
    return "";
  const vowels = ["\u0561", "\u0565", "\u0568", "\u056B", "\u0578", "\u0578\u0582", "\u0585"];
  const lastChar = word[word.length - 1];
  return word + (vowels.includes(lastChar) ? "\u0576" : "\u0568");
}
var error18 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "\u0576\u0577\u0561\u0576",
        many: "\u0576\u0577\u0561\u0576\u0576\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    },
    file: {
      unit: {
        one: "\u0562\u0561\u0575\u0569",
        many: "\u0562\u0561\u0575\u0569\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    },
    array: {
      unit: {
        one: "\u057F\u0561\u0580\u0580",
        many: "\u057F\u0561\u0580\u0580\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    },
    set: {
      unit: {
        one: "\u057F\u0561\u0580\u0580",
        many: "\u057F\u0561\u0580\u0580\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0574\u0578\u0582\u057F\u0584",
    email: "\u0567\u056C. \u0570\u0561\u057D\u0581\u0565",
    url: "URL",
    emoji: "\u0567\u0574\u0578\u057B\u056B",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E \u0587 \u056A\u0561\u0574",
    date: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E",
    time: "ISO \u056A\u0561\u0574",
    duration: "ISO \u057F\u0587\u0578\u0572\u0578\u0582\u0569\u0575\u0578\u0582\u0576",
    ipv4: "IPv4 \u0570\u0561\u057D\u0581\u0565",
    ipv6: "IPv6 \u0570\u0561\u057D\u0581\u0565",
    cidrv4: "IPv4 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584",
    cidrv6: "IPv6 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584",
    base64: "base64 \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572",
    base64url: "base64url \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572",
    json_string: "JSON \u057F\u0578\u0572",
    e164: "E.164 \u0570\u0561\u0574\u0561\u0580",
    jwt: "JWT",
    template_literal: "\u0574\u0578\u0582\u057F\u0584"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0569\u056B\u057E",
    array: "\u0566\u0561\u0576\u0563\u057E\u0561\u056E"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 instanceof ${issue2.expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${received}`;
        }
        return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${stringifyPrimitive(issue2.values[1])}`;
        return `\u054D\u056D\u0561\u056C \u057F\u0561\u0580\u0562\u0565\u0580\u0561\u056F\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 \u0570\u0565\u057F\u0587\u0575\u0561\u056C\u0576\u0565\u0580\u056B\u0581 \u0574\u0565\u056F\u0568\u055D ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getArmenianPlural(maxValue, sizing.unit.one, sizing.unit.many);
          return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056C\u056B\u0576\u056B ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getArmenianPlural(minValue, sizing.unit.one, sizing.unit.many);
          return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin)} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin)} \u056C\u056B\u0576\u056B ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057D\u056F\u057D\u057E\u056B "${_issue.prefix}"-\u0578\u057E`;
        if (_issue.format === "ends_with")
          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0561\u057E\u0561\u0580\u057F\u057E\u056B "${_issue.suffix}"-\u0578\u057E`;
        if (_issue.format === "includes")
          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057A\u0561\u0580\u0578\u0582\u0576\u0561\u056F\u056B "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0570\u0561\u0574\u0561\u057A\u0561\u057F\u0561\u057D\u056D\u0561\u0576\u056B ${_issue.pattern} \u0571\u0587\u0561\u0579\u0561\u0583\u056B\u0576`;
        return `\u054D\u056D\u0561\u056C ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u054D\u056D\u0561\u056C \u0569\u056B\u057E\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0562\u0561\u0566\u0574\u0561\u057A\u0561\u057F\u056B\u056F \u056C\u056B\u0576\u056B ${issue2.divisor}-\u056B`;
      case "unrecognized_keys":
        return `\u0549\u0573\u0561\u0576\u0561\u0579\u057E\u0561\u056E \u0562\u0561\u0576\u0561\u056C\u056B${issue2.keys.length > 1 ? "\u0576\u0565\u0580" : ""}. ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u054D\u056D\u0561\u056C \u0562\u0561\u0576\u0561\u056C\u056B ${withDefiniteArticle(issue2.origin)}-\u0578\u0582\u0574`;
      case "invalid_union":
        return "\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574";
      case "invalid_element":
        return `\u054D\u056D\u0561\u056C \u0561\u0580\u056A\u0565\u0584 ${withDefiniteArticle(issue2.origin)}-\u0578\u0582\u0574`;
      default:
        return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574`;
    }
  };
};
function hy_default() {
  return {
    localeError: error18()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/id.js
var error19 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "memiliki" },
    file: { unit: "byte", verb: "memiliki" },
    array: { unit: "item", verb: "memiliki" },
    set: { unit: "item", verb: "memiliki" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "alamat email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "tanggal dan waktu format ISO",
    date: "tanggal format ISO",
    time: "jam format ISO",
    duration: "durasi format ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    cidrv4: "rentang alamat IPv4",
    cidrv6: "rentang alamat IPv6",
    base64: "string dengan enkode base64",
    base64url: "string dengan enkode base64url",
    json_string: "string JSON",
    e164: "angka E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input tidak valid: diharapkan instanceof ${issue2.expected}, diterima ${received}`;
        }
        return `Input tidak valid: diharapkan ${expected}, diterima ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input tidak valid: diharapkan ${stringifyPrimitive(issue2.values[0])}`;
        return `Pilihan tidak valid: diharapkan salah satu dari ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} memiliki ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} menjadi ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Terlalu kecil: diharapkan ${issue2.origin} memiliki ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: diharapkan ${issue2.origin} menjadi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak valid: harus menyertakan "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} tidak valid`;
      }
      case "not_multiple_of":
        return `Angka tidak valid: harus kelipatan dari ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak valid di ${issue2.origin}`;
      case "invalid_union":
        return "Input tidak valid";
      case "invalid_element":
        return `Nilai tidak valid di ${issue2.origin}`;
      default:
        return `Input tidak valid`;
    }
  };
};
function id_default() {
  return {
    localeError: error19()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/is.js
var error20 = () => {
  const Sizable = {
    string: { unit: "stafi", verb: "a\xF0 hafa" },
    file: { unit: "b\xE6ti", verb: "a\xF0 hafa" },
    array: { unit: "hluti", verb: "a\xF0 hafa" },
    set: { unit: "hluti", verb: "a\xF0 hafa" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "gildi",
    email: "netfang",
    url: "vefsl\xF3\xF0",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dagsetning og t\xEDmi",
    date: "ISO dagsetning",
    time: "ISO t\xEDmi",
    duration: "ISO t\xEDmalengd",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded strengur",
    base64url: "base64url-encoded strengur",
    json_string: "JSON strengur",
    e164: "E.164 t\xF6lugildi",
    jwt: "JWT",
    template_literal: "gildi"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "n\xFAmer",
    array: "fylki"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Rangt gildi: \xDE\xFA sl\xF3st inn ${received} \xFEar sem \xE1 a\xF0 vera instanceof ${issue2.expected}`;
        }
        return `Rangt gildi: \xDE\xFA sl\xF3st inn ${received} \xFEar sem \xE1 a\xF0 vera ${expected}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Rangt gildi: gert r\xE1\xF0 fyrir ${stringifyPrimitive(issue2.values[0])}`;
        return `\xD3gilt val: m\xE1 vera eitt af eftirfarandi ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin ?? "gildi"} hafi ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "hluti"}`;
        return `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin ?? "gildi"} s\xE9 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin} hafi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin} s\xE9 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\xD3gildur strengur: ver\xF0ur a\xF0 byrja \xE1 "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\xD3gildur strengur: ver\xF0ur a\xF0 enda \xE1 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\xD3gildur strengur: ver\xF0ur a\xF0 innihalda "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\xD3gildur strengur: ver\xF0ur a\xF0 fylgja mynstri ${_issue.pattern}`;
        return `Rangt ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `R\xF6ng tala: ver\xF0ur a\xF0 vera margfeldi af ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\xD3\xFEekkt ${issue2.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Rangur lykill \xED ${issue2.origin}`;
      case "invalid_union":
        return "Rangt gildi";
      case "invalid_element":
        return `Rangt gildi \xED ${issue2.origin}`;
      default:
        return `Rangt gildi`;
    }
  };
};
function is_default() {
  return {
    localeError: error20()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/it.js
var error21 = () => {
  const Sizable = {
    string: { unit: "caratteri", verb: "avere" },
    file: { unit: "byte", verb: "avere" },
    array: { unit: "elementi", verb: "avere" },
    set: { unit: "elementi", verb: "avere" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "indirizzo email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data e ora ISO",
    date: "data ISO",
    time: "ora ISO",
    duration: "durata ISO",
    ipv4: "indirizzo IPv4",
    ipv6: "indirizzo IPv6",
    cidrv4: "intervallo IPv4",
    cidrv6: "intervallo IPv6",
    base64: "stringa codificata in base64",
    base64url: "URL codificata in base64",
    json_string: "stringa JSON",
    e164: "numero E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "numero",
    array: "vettore"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input non valido: atteso instanceof ${issue2.expected}, ricevuto ${received}`;
        }
        return `Input non valido: atteso ${expected}, ricevuto ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input non valido: atteso ${stringifyPrimitive(issue2.values[0])}`;
        return `Opzione non valida: atteso uno tra ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Troppo grande: ${issue2.origin ?? "valore"} deve avere ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementi"}`;
        return `Troppo grande: ${issue2.origin ?? "valore"} deve essere ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Troppo piccolo: ${issue2.origin} deve avere ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Troppo piccolo: ${issue2.origin} deve essere ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Stringa non valida: deve includere "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Numero non valido: deve essere un multiplo di ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chiav${issue2.keys.length > 1 ? "i" : "e"} non riconosciut${issue2.keys.length > 1 ? "e" : "a"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Chiave non valida in ${issue2.origin}`;
      case "invalid_union":
        return "Input non valido";
      case "invalid_element":
        return `Valore non valido in ${issue2.origin}`;
      default:
        return `Input non valido`;
    }
  };
};
function it_default() {
  return {
    localeError: error21()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/ja.js
var error22 = () => {
  const Sizable = {
    string: { unit: "\u6587\u5B57", verb: "\u3067\u3042\u308B" },
    file: { unit: "\u30D0\u30A4\u30C8", verb: "\u3067\u3042\u308B" },
    array: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" },
    set: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u5165\u529B\u5024",
    email: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9",
    url: "URL",
    emoji: "\u7D75\u6587\u5B57",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO\u65E5\u6642",
    date: "ISO\u65E5\u4ED8",
    time: "ISO\u6642\u523B",
    duration: "ISO\u671F\u9593",
    ipv4: "IPv4\u30A2\u30C9\u30EC\u30B9",
    ipv6: "IPv6\u30A2\u30C9\u30EC\u30B9",
    cidrv4: "IPv4\u7BC4\u56F2",
    cidrv6: "IPv6\u7BC4\u56F2",
    base64: "base64\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217",
    base64url: "base64url\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217",
    json_string: "JSON\u6587\u5B57\u5217",
    e164: "E.164\u756A\u53F7",
    jwt: "JWT",
    template_literal: "\u5165\u529B\u5024"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u6570\u5024",
    array: "\u914D\u5217"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u7121\u52B9\u306A\u5165\u529B: instanceof ${issue2.expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${received}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
        }
        return `\u7121\u52B9\u306A\u5165\u529B: ${expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${received}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u7121\u52B9\u306A\u5165\u529B: ${stringifyPrimitive(issue2.values[0])}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F`;
        return `\u7121\u52B9\u306A\u9078\u629E: ${joinValues(issue2.values, "\u3001")}\u306E\u3044\u305A\u308C\u304B\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      case "too_big": {
        const adj = issue2.inclusive ? "\u4EE5\u4E0B\u3067\u3042\u308B" : "\u3088\u308A\u5C0F\u3055\u3044";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u5927\u304D\u3059\u304E\u308B\u5024: ${issue2.origin ?? "\u5024"}\u306F${issue2.maximum.toString()}${sizing.unit ?? "\u8981\u7D20"}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        return `\u5927\u304D\u3059\u304E\u308B\u5024: ${issue2.origin ?? "\u5024"}\u306F${issue2.maximum.toString()}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "\u4EE5\u4E0A\u3067\u3042\u308B" : "\u3088\u308A\u5927\u304D\u3044";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${issue2.origin}\u306F${issue2.minimum.toString()}${sizing.unit}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${issue2.origin}\u306F${issue2.minimum.toString()}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.prefix}"\u3067\u59CB\u307E\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        if (_issue.format === "ends_with")
          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.suffix}"\u3067\u7D42\u308F\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        if (_issue.format === "includes")
          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.includes}"\u3092\u542B\u3080\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        if (_issue.format === "regex")
          return `\u7121\u52B9\u306A\u6587\u5B57\u5217: \u30D1\u30BF\u30FC\u30F3${_issue.pattern}\u306B\u4E00\u81F4\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
        return `\u7121\u52B9\u306A${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u7121\u52B9\u306A\u6570\u5024: ${issue2.divisor}\u306E\u500D\u6570\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
      case "unrecognized_keys":
        return `\u8A8D\u8B58\u3055\u308C\u3066\u3044\u306A\u3044\u30AD\u30FC${issue2.keys.length > 1 ? "\u7FA4" : ""}: ${joinValues(issue2.keys, "\u3001")}`;
      case "invalid_key":
        return `${issue2.origin}\u5185\u306E\u7121\u52B9\u306A\u30AD\u30FC`;
      case "invalid_union":
        return "\u7121\u52B9\u306A\u5165\u529B";
      case "invalid_element":
        return `${issue2.origin}\u5185\u306E\u7121\u52B9\u306A\u5024`;
      default:
        return `\u7121\u52B9\u306A\u5165\u529B`;
    }
  };
};
function ja_default() {
  return {
    localeError: error22()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/ka.js
var error23 = () => {
  const Sizable = {
    string: { unit: "\u10E1\u10D8\u10DB\u10D1\u10DD\u10DA\u10DD", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
    file: { unit: "\u10D1\u10D0\u10D8\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
    array: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
    set: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0",
    email: "\u10D4\u10DA-\u10E4\u10DD\u10E1\u10E2\u10D8\u10E1 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
    url: "URL",
    emoji: "\u10D4\u10DB\u10DD\u10EF\u10D8",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8-\u10D3\u10E0\u10DD",
    date: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8",
    time: "\u10D3\u10E0\u10DD",
    duration: "\u10EE\u10D0\u10DC\u10D2\u10E0\u10EB\u10DA\u10D8\u10D5\u10DD\u10D1\u10D0",
    ipv4: "IPv4 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
    ipv6: "IPv6 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
    cidrv4: "IPv4 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8",
    cidrv6: "IPv6 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8",
    base64: "base64-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
    base64url: "base64url-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
    json_string: "JSON \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
    e164: "E.164 \u10DC\u10DD\u10DB\u10D4\u10E0\u10D8",
    jwt: "JWT",
    template_literal: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u10E0\u10D8\u10EA\u10EE\u10D5\u10D8",
    string: "\u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
    boolean: "\u10D1\u10E3\u10DA\u10D4\u10D0\u10DC\u10D8",
    function: "\u10E4\u10E3\u10DC\u10E5\u10EA\u10D8\u10D0",
    array: "\u10DB\u10D0\u10E1\u10D8\u10D5\u10D8"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 instanceof ${issue2.expected}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${received}`;
        }
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${expected}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${stringifyPrimitive(issue2.values[0])}`;
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D0\u10E0\u10D8\u10D0\u10DC\u10E2\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8\u10D0 \u10D4\u10E0\u10D7-\u10D4\u10E0\u10D7\u10D8 ${joinValues(issue2.values, "|")}-\u10D3\u10D0\u10DC`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} \u10D8\u10E7\u10DD\u10E1 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin} \u10D8\u10E7\u10DD\u10E1 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10EC\u10E7\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${_issue.prefix}"-\u10D8\u10D7`;
        }
        if (_issue.format === "ends_with")
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10DB\u10D7\u10D0\u10D5\u10E0\u10D3\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${_issue.suffix}"-\u10D8\u10D7`;
        if (_issue.format === "includes")
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1 "${_issue.includes}"-\u10E1`;
        if (_issue.format === "regex")
          return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D4\u10E1\u10D0\u10D1\u10D0\u10DB\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 \u10E8\u10D0\u10D1\u10DA\u10DD\u10DC\u10E1 ${_issue.pattern}`;
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E0\u10D8\u10EA\u10EE\u10D5\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10E7\u10DD\u10E1 ${issue2.divisor}-\u10D8\u10E1 \u10EF\u10D4\u10E0\u10D0\u10D3\u10D8`;
      case "unrecognized_keys":
        return `\u10E3\u10EA\u10DC\u10DD\u10D1\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1${issue2.keys.length > 1 ? "\u10D4\u10D1\u10D8" : "\u10D8"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1\u10D8 ${issue2.origin}-\u10E8\u10D8`;
      case "invalid_union":
        return "\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0";
      case "invalid_element":
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0 ${issue2.origin}-\u10E8\u10D8`;
      default:
        return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0`;
    }
  };
};
function ka_default() {
  return {
    localeError: error23()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/km.js
var error24 = () => {
  const Sizable = {
    string: { unit: "\u178F\u17BD\u17A2\u1780\u17D2\u179F\u179A", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
    file: { unit: "\u1794\u17C3", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
    array: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
    set: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B",
    email: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793\u17A2\u17CA\u17B8\u1798\u17C2\u179B",
    url: "URL",
    emoji: "\u179F\u1789\u17D2\u1789\u17B6\u17A2\u17B6\u179A\u1798\u17D2\u1798\u178E\u17CD",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 \u1793\u17B7\u1784\u1798\u17C9\u17C4\u1784 ISO",
    date: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 ISO",
    time: "\u1798\u17C9\u17C4\u1784 ISO",
    duration: "\u179A\u1799\u17C8\u1796\u17C1\u179B ISO",
    ipv4: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4",
    ipv6: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6",
    cidrv4: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4",
    cidrv6: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6",
    base64: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64",
    base64url: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64url",
    json_string: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A JSON",
    e164: "\u179B\u17C1\u1781 E.164",
    jwt: "JWT",
    template_literal: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u179B\u17C1\u1781",
    array: "\u17A2\u17B6\u179A\u17C1 (Array)",
    null: "\u1782\u17D2\u1798\u17B6\u1793\u178F\u1798\u17D2\u179B\u17C3 (null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A instanceof ${issue2.expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${received}`;
        }
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${stringifyPrimitive(issue2.values[0])}`;
        return `\u1787\u1798\u17D2\u179A\u17BE\u179F\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1787\u17B6\u1798\u17BD\u1799\u1780\u17D2\u1793\u17BB\u1784\u1785\u17C6\u178E\u17C4\u1798 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u1792\u17B6\u178F\u17BB"}`;
        return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin} ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1785\u17B6\u1794\u17CB\u1795\u17D2\u178F\u17BE\u1798\u178A\u17C4\u1799 "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1794\u1789\u17D2\u1785\u1794\u17CB\u178A\u17C4\u1799 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1798\u17B6\u1793 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1795\u17D2\u1782\u17BC\u1795\u17D2\u1782\u1784\u1793\u17B9\u1784\u1791\u1798\u17D2\u179A\u1784\u17CB\u178A\u17C2\u179B\u1794\u17B6\u1793\u1780\u17C6\u178E\u178F\u17CB ${_issue.pattern}`;
        return `\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u179B\u17C1\u1781\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1787\u17B6\u1796\u17A0\u17BB\u1782\u17BB\u178E\u1793\u17C3 ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u179A\u1780\u1783\u17BE\u1789\u179F\u17C4\u1798\u17B7\u1793\u179F\u17D2\u1782\u17B6\u179B\u17CB\u17D6 ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u179F\u17C4\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${issue2.origin}`;
      case "invalid_union":
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C`;
      case "invalid_element":
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${issue2.origin}`;
      default:
        return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C`;
    }
  };
};
function km_default() {
  return {
    localeError: error24()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/kh.js
function kh_default() {
  return km_default();
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/ko.js
var error25 = () => {
  const Sizable = {
    string: { unit: "\uBB38\uC790", verb: "to have" },
    file: { unit: "\uBC14\uC774\uD2B8", verb: "to have" },
    array: { unit: "\uAC1C", verb: "to have" },
    set: { unit: "\uAC1C", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\uC785\uB825",
    email: "\uC774\uBA54\uC77C \uC8FC\uC18C",
    url: "URL",
    emoji: "\uC774\uBAA8\uC9C0",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \uB0A0\uC9DC\uC2DC\uAC04",
    date: "ISO \uB0A0\uC9DC",
    time: "ISO \uC2DC\uAC04",
    duration: "ISO \uAE30\uAC04",
    ipv4: "IPv4 \uC8FC\uC18C",
    ipv6: "IPv6 \uC8FC\uC18C",
    cidrv4: "IPv4 \uBC94\uC704",
    cidrv6: "IPv6 \uBC94\uC704",
    base64: "base64 \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
    base64url: "base64url \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
    json_string: "JSON \uBB38\uC790\uC5F4",
    e164: "E.164 \uBC88\uD638",
    jwt: "JWT",
    template_literal: "\uC785\uB825"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 instanceof ${issue2.expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${received}\uC785\uB2C8\uB2E4`;
        }
        return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 ${expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${received}\uC785\uB2C8\uB2E4`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\uC798\uBABB\uB41C \uC785\uB825: \uAC12\uC740 ${stringifyPrimitive(issue2.values[0])} \uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4`;
        return `\uC798\uBABB\uB41C \uC635\uC158: ${joinValues(issue2.values, "\uB610\uB294 ")} \uC911 \uD558\uB098\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
      case "too_big": {
        const adj = issue2.inclusive ? "\uC774\uD558" : "\uBBF8\uB9CC";
        const suffix = adj === "\uBBF8\uB9CC" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4";
        const sizing = getSizing(issue2.origin);
        const unit = sizing?.unit ?? "\uC694\uC18C";
        if (sizing)
          return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${issue2.maximum.toString()}${unit} ${adj}${suffix}`;
        return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${issue2.maximum.toString()} ${adj}${suffix}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "\uC774\uC0C1" : "\uCD08\uACFC";
        const suffix = adj === "\uC774\uC0C1" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4";
        const sizing = getSizing(issue2.origin);
        const unit = sizing?.unit ?? "\uC694\uC18C";
        if (sizing) {
          return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${issue2.minimum.toString()}${unit} ${adj}${suffix}`;
        }
        return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${issue2.minimum.toString()} ${adj}${suffix}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.prefix}"(\uC73C)\uB85C \uC2DC\uC791\uD574\uC57C \uD569\uB2C8\uB2E4`;
        }
        if (_issue.format === "ends_with")
          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.suffix}"(\uC73C)\uB85C \uB05D\uB098\uC57C \uD569\uB2C8\uB2E4`;
        if (_issue.format === "includes")
          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.includes}"\uC744(\uB97C) \uD3EC\uD568\uD574\uC57C \uD569\uB2C8\uB2E4`;
        if (_issue.format === "regex")
          return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: \uC815\uADDC\uC2DD ${_issue.pattern} \uD328\uD134\uACFC \uC77C\uCE58\uD574\uC57C \uD569\uB2C8\uB2E4`;
        return `\uC798\uBABB\uB41C ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\uC798\uBABB\uB41C \uC22B\uC790: ${issue2.divisor}\uC758 \uBC30\uC218\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
      case "unrecognized_keys":
        return `\uC778\uC2DD\uD560 \uC218 \uC5C6\uB294 \uD0A4: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\uC798\uBABB\uB41C \uD0A4: ${issue2.origin}`;
      case "invalid_union":
        return `\uC798\uBABB\uB41C \uC785\uB825`;
      case "invalid_element":
        return `\uC798\uBABB\uB41C \uAC12: ${issue2.origin}`;
      default:
        return `\uC798\uBABB\uB41C \uC785\uB825`;
    }
  };
};
function ko_default() {
  return {
    localeError: error25()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/lt.js
var capitalizeFirstCharacter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
function getUnitTypeFromNumber(number4) {
  const abs = Math.abs(number4);
  const last = abs % 10;
  const last2 = abs % 100;
  if (last2 >= 11 && last2 <= 19 || last === 0)
    return "many";
  if (last === 1)
    return "one";
  return "few";
}
var error26 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "simbolis",
        few: "simboliai",
        many: "simboli\u0173"
      },
      verb: {
        smaller: {
          inclusive: "turi b\u016Bti ne ilgesn\u0117 kaip",
          notInclusive: "turi b\u016Bti trumpesn\u0117 kaip"
        },
        bigger: {
          inclusive: "turi b\u016Bti ne trumpesn\u0117 kaip",
          notInclusive: "turi b\u016Bti ilgesn\u0117 kaip"
        }
      }
    },
    file: {
      unit: {
        one: "baitas",
        few: "baitai",
        many: "bait\u0173"
      },
      verb: {
        smaller: {
          inclusive: "turi b\u016Bti ne didesnis kaip",
          notInclusive: "turi b\u016Bti ma\u017Eesnis kaip"
        },
        bigger: {
          inclusive: "turi b\u016Bti ne ma\u017Eesnis kaip",
          notInclusive: "turi b\u016Bti didesnis kaip"
        }
      }
    },
    array: {
      unit: {
        one: "element\u0105",
        few: "elementus",
        many: "element\u0173"
      },
      verb: {
        smaller: {
          inclusive: "turi tur\u0117ti ne daugiau kaip",
          notInclusive: "turi tur\u0117ti ma\u017Eiau kaip"
        },
        bigger: {
          inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip",
          notInclusive: "turi tur\u0117ti daugiau kaip"
        }
      }
    },
    set: {
      unit: {
        one: "element\u0105",
        few: "elementus",
        many: "element\u0173"
      },
      verb: {
        smaller: {
          inclusive: "turi tur\u0117ti ne daugiau kaip",
          notInclusive: "turi tur\u0117ti ma\u017Eiau kaip"
        },
        bigger: {
          inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip",
          notInclusive: "turi tur\u0117ti daugiau kaip"
        }
      }
    }
  };
  function getSizing(origin, unitType, inclusive, targetShouldBe) {
    const result = Sizable[origin] ?? null;
    if (result === null)
      return result;
    return {
      unit: result.unit[unitType],
      verb: result.verb[targetShouldBe][inclusive ? "inclusive" : "notInclusive"]
    };
  }
  const FormatDictionary = {
    regex: "\u012Fvestis",
    email: "el. pa\u0161to adresas",
    url: "URL",
    emoji: "jaustukas",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO data ir laikas",
    date: "ISO data",
    time: "ISO laikas",
    duration: "ISO trukm\u0117",
    ipv4: "IPv4 adresas",
    ipv6: "IPv6 adresas",
    cidrv4: "IPv4 tinklo prefiksas (CIDR)",
    cidrv6: "IPv6 tinklo prefiksas (CIDR)",
    base64: "base64 u\u017Ekoduota eilut\u0117",
    base64url: "base64url u\u017Ekoduota eilut\u0117",
    json_string: "JSON eilut\u0117",
    e164: "E.164 numeris",
    jwt: "JWT",
    template_literal: "\u012Fvestis"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "skai\u010Dius",
    bigint: "sveikasis skai\u010Dius",
    string: "eilut\u0117",
    boolean: "login\u0117 reik\u0161m\u0117",
    undefined: "neapibr\u0117\u017Eta reik\u0161m\u0117",
    function: "funkcija",
    symbol: "simbolis",
    array: "masyvas",
    object: "objektas",
    null: "nulin\u0117 reik\u0161m\u0117"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Gautas tipas ${received}, o tik\u0117tasi - instanceof ${issue2.expected}`;
        }
        return `Gautas tipas ${received}, o tik\u0117tasi - ${expected}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Privalo b\u016Bti ${stringifyPrimitive(issue2.values[0])}`;
        return `Privalo b\u016Bti vienas i\u0161 ${joinValues(issue2.values, "|")} pasirinkim\u0173`;
      case "too_big": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.maximum)), issue2.inclusive ?? false, "smaller");
        if (sizing?.verb)
          return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} ${sizing.verb} ${issue2.maximum.toString()} ${sizing.unit ?? "element\u0173"}`;
        const adj = issue2.inclusive ? "ne didesnis kaip" : "ma\u017Eesnis kaip";
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${adj} ${issue2.maximum.toString()} ${sizing?.unit}`;
      }
      case "too_small": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.minimum)), issue2.inclusive ?? false, "bigger");
        if (sizing?.verb)
          return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} ${sizing.verb} ${issue2.minimum.toString()} ${sizing.unit ?? "element\u0173"}`;
        const adj = issue2.inclusive ? "ne ma\u017Eesnis kaip" : "didesnis kaip";
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${adj} ${issue2.minimum.toString()} ${sizing?.unit}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Eilut\u0117 privalo prasid\u0117ti "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Eilut\u0117 privalo pasibaigti "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Eilut\u0117 privalo \u012Ftraukti "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Eilut\u0117 privalo atitikti ${_issue.pattern}`;
        return `Neteisingas ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Skai\u010Dius privalo b\u016Bti ${issue2.divisor} kartotinis.`;
      case "unrecognized_keys":
        return `Neatpa\u017Eint${issue2.keys.length > 1 ? "i" : "as"} rakt${issue2.keys.length > 1 ? "ai" : "as"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return "Rastas klaidingas raktas";
      case "invalid_union":
        return "Klaidinga \u012Fvestis";
      case "invalid_element": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi klaiding\u0105 \u012Fvest\u012F`;
      }
      default:
        return "Klaidinga \u012Fvestis";
    }
  };
};
function lt_default() {
  return {
    localeError: error26()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/mk.js
var error27 = () => {
  const Sizable = {
    string: { unit: "\u0437\u043D\u0430\u0446\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
    file: { unit: "\u0431\u0430\u0458\u0442\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
    array: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
    set: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0432\u043D\u0435\u0441",
    email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u043D\u0430 \u0435-\u043F\u043E\u0448\u0442\u0430",
    url: "URL",
    emoji: "\u0435\u043C\u043E\u045F\u0438",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0434\u0430\u0442\u0443\u043C \u0438 \u0432\u0440\u0435\u043C\u0435",
    date: "ISO \u0434\u0430\u0442\u0443\u043C",
    time: "ISO \u0432\u0440\u0435\u043C\u0435",
    duration: "ISO \u0432\u0440\u0435\u043C\u0435\u0442\u0440\u0430\u0435\u045A\u0435",
    ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441\u0430",
    ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441\u0430",
    cidrv4: "IPv4 \u043E\u043F\u0441\u0435\u0433",
    cidrv6: "IPv6 \u043E\u043F\u0441\u0435\u0433",
    base64: "base64-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430",
    base64url: "base64url-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430",
    json_string: "JSON \u043D\u0438\u0437\u0430",
    e164: "E.164 \u0431\u0440\u043E\u0458",
    jwt: "JWT",
    template_literal: "\u0432\u043D\u0435\u0441"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0431\u0440\u043E\u0458",
    array: "\u043D\u0438\u0437\u0430"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 instanceof ${issue2.expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${received}`;
        }
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
        return `\u0413\u0440\u0435\u0448\u0430\u043D\u0430 \u043E\u043F\u0446\u0438\u0458\u0430: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 \u0435\u0434\u043D\u0430 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0438\u043C\u0430 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0438"}`;
        return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0431\u0438\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin} \u0434\u0430 \u0438\u043C\u0430 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin} \u0434\u0430 \u0431\u0438\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u043D\u0443\u0432\u0430 \u0441\u043E "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u0432\u0440\u0448\u0443\u0432\u0430 \u0441\u043E "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0432\u043A\u043B\u0443\u0447\u0443\u0432\u0430 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u043E\u0434\u0433\u043E\u0430\u0440\u0430 \u043D\u0430 \u043F\u0430\u0442\u0435\u0440\u043D\u043E\u0442 ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0431\u0440\u043E\u0458: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0431\u0438\u0434\u0435 \u0434\u0435\u043B\u0438\u0432 \u0441\u043E ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D\u0438 \u043A\u043B\u0443\u0447\u0435\u0432\u0438" : "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D \u043A\u043B\u0443\u0447"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u043A\u043B\u0443\u0447 \u0432\u043E ${issue2.origin}`;
      case "invalid_union":
        return "\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441";
      case "invalid_element":
        return `\u0413\u0440\u0435\u0448\u043D\u0430 \u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442 \u0432\u043E ${issue2.origin}`;
      default:
        return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441`;
    }
  };
};
function mk_default() {
  return {
    localeError: error27()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/ms.js
var error28 = () => {
  const Sizable = {
    string: { unit: "aksara", verb: "mempunyai" },
    file: { unit: "bait", verb: "mempunyai" },
    array: { unit: "elemen", verb: "mempunyai" },
    set: { unit: "elemen", verb: "mempunyai" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "alamat e-mel",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "tarikh masa ISO",
    date: "tarikh ISO",
    time: "masa ISO",
    duration: "tempoh ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    cidrv4: "julat IPv4",
    cidrv6: "julat IPv6",
    base64: "string dikodkan base64",
    base64url: "string dikodkan base64url",
    json_string: "string JSON",
    e164: "nombor E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombor"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input tidak sah: dijangka instanceof ${issue2.expected}, diterima ${received}`;
        }
        return `Input tidak sah: dijangka ${expected}, diterima ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input tidak sah: dijangka ${stringifyPrimitive(issue2.values[0])}`;
        return `Pilihan tidak sah: dijangka salah satu daripada ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} adalah ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Terlalu kecil: dijangka ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: dijangka ${issue2.origin} adalah ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} tidak sah`;
      }
      case "not_multiple_of":
        return `Nombor tidak sah: perlu gandaan ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak sah dalam ${issue2.origin}`;
      case "invalid_union":
        return "Input tidak sah";
      case "invalid_element":
        return `Nilai tidak sah dalam ${issue2.origin}`;
      default:
        return `Input tidak sah`;
    }
  };
};
function ms_default() {
  return {
    localeError: error28()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/nl.js
var error29 = () => {
  const Sizable = {
    string: { unit: "tekens", verb: "heeft" },
    file: { unit: "bytes", verb: "heeft" },
    array: { unit: "elementen", verb: "heeft" },
    set: { unit: "elementen", verb: "heeft" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "invoer",
    email: "emailadres",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum en tijd",
    date: "ISO datum",
    time: "ISO tijd",
    duration: "ISO duur",
    ipv4: "IPv4-adres",
    ipv6: "IPv6-adres",
    cidrv4: "IPv4-bereik",
    cidrv6: "IPv6-bereik",
    base64: "base64-gecodeerde tekst",
    base64url: "base64 URL-gecodeerde tekst",
    json_string: "JSON string",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "invoer"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "getal"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ongeldige invoer: verwacht instanceof ${issue2.expected}, ontving ${received}`;
        }
        return `Ongeldige invoer: verwacht ${expected}, ontving ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ongeldige invoer: verwacht ${stringifyPrimitive(issue2.values[0])}`;
        return `Ongeldige optie: verwacht \xE9\xE9n van ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const longName = issue2.origin === "date" ? "laat" : issue2.origin === "string" ? "lang" : "groot";
        if (sizing)
          return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementen"} ${sizing.verb}`;
        return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} is`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const shortName = issue2.origin === "date" ? "vroeg" : issue2.origin === "string" ? "kort" : "klein";
        if (sizing) {
          return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        }
        return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} is`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
        }
        if (_issue.format === "ends_with")
          return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
        if (_issue.format === "includes")
          return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
        if (_issue.format === "regex")
          return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
        return `Ongeldig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ongeldig getal: moet een veelvoud van ${issue2.divisor} zijn`;
      case "unrecognized_keys":
        return `Onbekende key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ongeldige key in ${issue2.origin}`;
      case "invalid_union":
        return "Ongeldige invoer";
      case "invalid_element":
        return `Ongeldige waarde in ${issue2.origin}`;
      default:
        return `Ongeldige invoer`;
    }
  };
};
function nl_default() {
  return {
    localeError: error29()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/no.js
var error30 = () => {
  const Sizable = {
    string: { unit: "tegn", verb: "\xE5 ha" },
    file: { unit: "bytes", verb: "\xE5 ha" },
    array: { unit: "elementer", verb: "\xE5 inneholde" },
    set: { unit: "elementer", verb: "\xE5 inneholde" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-postadresse",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dato- og klokkeslett",
    date: "ISO-dato",
    time: "ISO-klokkeslett",
    duration: "ISO-varighet",
    ipv4: "IPv4-omr\xE5de",
    ipv6: "IPv6-omr\xE5de",
    cidrv4: "IPv4-spekter",
    cidrv6: "IPv6-spekter",
    base64: "base64-enkodet streng",
    base64url: "base64url-enkodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "tall",
    array: "liste"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ugyldig input: forventet instanceof ${issue2.expected}, fikk ${received}`;
        }
        return `Ugyldig input: forventet ${expected}, fikk ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ugyldig verdi: forventet ${stringifyPrimitive(issue2.values[0])}`;
        return `Ugyldig valg: forventet en av ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `For stor(t): forventet ${issue2.origin ?? "value"} til \xE5 ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
        return `For stor(t): forventet ${issue2.origin ?? "value"} til \xE5 ha ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `For lite(n): forventet ${issue2.origin} til \xE5 ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `For lite(n): forventet ${issue2.origin} til \xE5 ha ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: m\xE5 starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: m\xE5 ende med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: m\xE5 inneholde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: m\xE5 matche m\xF8nsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ugyldig tall: m\xE5 v\xE6re et multiplum av ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ukjente n\xF8kler" : "Ukjent n\xF8kkel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig n\xF8kkel i ${issue2.origin}`;
      case "invalid_union":
        return "Ugyldig input";
      case "invalid_element":
        return `Ugyldig verdi i ${issue2.origin}`;
      default:
        return `Ugyldig input`;
    }
  };
};
function no_default() {
  return {
    localeError: error30()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/ota.js
var error31 = () => {
  const Sizable = {
    string: { unit: "harf", verb: "olmal\u0131d\u0131r" },
    file: { unit: "bayt", verb: "olmal\u0131d\u0131r" },
    array: { unit: "unsur", verb: "olmal\u0131d\u0131r" },
    set: { unit: "unsur", verb: "olmal\u0131d\u0131r" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "giren",
    email: "epostag\xE2h",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO heng\xE2m\u0131",
    date: "ISO tarihi",
    time: "ISO zaman\u0131",
    duration: "ISO m\xFCddeti",
    ipv4: "IPv4 ni\u015F\xE2n\u0131",
    ipv6: "IPv6 ni\u015F\xE2n\u0131",
    cidrv4: "IPv4 menzili",
    cidrv6: "IPv6 menzili",
    base64: "base64-\u015Fifreli metin",
    base64url: "base64url-\u015Fifreli metin",
    json_string: "JSON metin",
    e164: "E.164 say\u0131s\u0131",
    jwt: "JWT",
    template_literal: "giren"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "numara",
    array: "saf",
    null: "gayb"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `F\xE2sit giren: umulan instanceof ${issue2.expected}, al\u0131nan ${received}`;
        }
        return `F\xE2sit giren: umulan ${expected}, al\u0131nan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `F\xE2sit giren: umulan ${stringifyPrimitive(issue2.values[0])}`;
        return `F\xE2sit tercih: m\xFBteberler ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Fazla b\xFCy\xFCk: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmal\u0131yd\u0131.`;
        return `Fazla b\xFCy\xFCk: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} olmal\u0131yd\u0131.`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Fazla k\xFC\xE7\xFCk: ${issue2.origin}, ${adj}${issue2.minimum.toString()} ${sizing.unit} sahip olmal\u0131yd\u0131.`;
        }
        return `Fazla k\xFC\xE7\xFCk: ${issue2.origin}, ${adj}${issue2.minimum.toString()} olmal\u0131yd\u0131.`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `F\xE2sit metin: "${_issue.prefix}" ile ba\u015Flamal\u0131.`;
        if (_issue.format === "ends_with")
          return `F\xE2sit metin: "${_issue.suffix}" ile bitmeli.`;
        if (_issue.format === "includes")
          return `F\xE2sit metin: "${_issue.includes}" ihtiv\xE2 etmeli.`;
        if (_issue.format === "regex")
          return `F\xE2sit metin: ${_issue.pattern} nak\u015F\u0131na uymal\u0131.`;
        return `F\xE2sit ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `F\xE2sit say\u0131: ${issue2.divisor} kat\u0131 olmal\u0131yd\u0131.`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan anahtar ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} i\xE7in tan\u0131nmayan anahtar var.`;
      case "invalid_union":
        return "Giren tan\u0131namad\u0131.";
      case "invalid_element":
        return `${issue2.origin} i\xE7in tan\u0131nmayan k\u0131ymet var.`;
      default:
        return `K\u0131ymet tan\u0131namad\u0131.`;
    }
  };
};
function ota_default() {
  return {
    localeError: error31()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/ps.js
var error32 = () => {
  const Sizable = {
    string: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" },
    file: { unit: "\u0628\u0627\u06CC\u067C\u0633", verb: "\u0648\u0644\u0631\u064A" },
    array: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" },
    set: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0648\u0631\u0648\u062F\u064A",
    email: "\u0628\u0631\u06CC\u069A\u0646\u0627\u0644\u06CC\u06A9",
    url: "\u06CC\u0648 \u0622\u0631 \u0627\u0644",
    emoji: "\u0627\u06CC\u0645\u0648\u062C\u064A",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u0646\u06CC\u067C\u0647 \u0627\u0648 \u0648\u062E\u062A",
    date: "\u0646\u06D0\u067C\u0647",
    time: "\u0648\u062E\u062A",
    duration: "\u0645\u0648\u062F\u0647",
    ipv4: "\u062F IPv4 \u067E\u062A\u0647",
    ipv6: "\u062F IPv6 \u067E\u062A\u0647",
    cidrv4: "\u062F IPv4 \u0633\u0627\u062D\u0647",
    cidrv6: "\u062F IPv6 \u0633\u0627\u062D\u0647",
    base64: "base64-encoded \u0645\u062A\u0646",
    base64url: "base64url-encoded \u0645\u062A\u0646",
    json_string: "JSON \u0645\u062A\u0646",
    e164: "\u062F E.164 \u0634\u0645\u06D0\u0631\u0647",
    jwt: "JWT",
    template_literal: "\u0648\u0631\u0648\u062F\u064A"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0639\u062F\u062F",
    array: "\u0627\u0631\u06D0"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F instanceof ${issue2.expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${received} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
        }
        return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${received} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
      }
      case "invalid_value":
        if (issue2.values.length === 1) {
          return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${stringifyPrimitive(issue2.values[0])} \u0648\u0627\u06CC`;
        }
        return `\u0646\u0627\u0633\u0645 \u0627\u0646\u062A\u062E\u0627\u0628: \u0628\u0627\u06CC\u062F \u06CC\u0648 \u0644\u0647 ${joinValues(issue2.values, "|")} \u0685\u062E\u0647 \u0648\u0627\u06CC`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${issue2.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631\u0648\u0646\u0647"} \u0648\u0644\u0631\u064A`;
        }
        return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${issue2.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} \u0648\u064A`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0648\u0644\u0631\u064A`;
        }
        return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} \u0648\u064A`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${_issue.prefix}" \u0633\u0631\u0647 \u067E\u06CC\u0644 \u0634\u064A`;
        }
        if (_issue.format === "ends_with") {
          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${_issue.suffix}" \u0633\u0631\u0647 \u067E\u0627\u06CC \u062A\u0647 \u0648\u0631\u0633\u064A\u0696\u064A`;
        }
        if (_issue.format === "includes") {
          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F "${_issue.includes}" \u0648\u0644\u0631\u064A`;
        }
        if (_issue.format === "regex") {
          return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F ${_issue.pattern} \u0633\u0631\u0647 \u0645\u0637\u0627\u0628\u0642\u062A \u0648\u0644\u0631\u064A`;
        }
        return `${FormatDictionary[_issue.format] ?? issue2.format} \u0646\u0627\u0633\u0645 \u062F\u06CC`;
      }
      case "not_multiple_of":
        return `\u0646\u0627\u0633\u0645 \u0639\u062F\u062F: \u0628\u0627\u06CC\u062F \u062F ${issue2.divisor} \u0645\u0636\u0631\u0628 \u0648\u064A`;
      case "unrecognized_keys":
        return `\u0646\u0627\u0633\u0645 ${issue2.keys.length > 1 ? "\u06A9\u0644\u06CC\u0689\u0648\u0646\u0647" : "\u06A9\u0644\u06CC\u0689"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u0646\u0627\u0633\u0645 \u06A9\u0644\u06CC\u0689 \u067E\u0647 ${issue2.origin} \u06A9\u06D0`;
      case "invalid_union":
        return `\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A`;
      case "invalid_element":
        return `\u0646\u0627\u0633\u0645 \u0639\u0646\u0635\u0631 \u067E\u0647 ${issue2.origin} \u06A9\u06D0`;
      default:
        return `\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A`;
    }
  };
};
function ps_default() {
  return {
    localeError: error32()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/pl.js
var error33 = () => {
  const Sizable = {
    string: { unit: "znak\xF3w", verb: "mie\u0107" },
    file: { unit: "bajt\xF3w", verb: "mie\u0107" },
    array: { unit: "element\xF3w", verb: "mie\u0107" },
    set: { unit: "element\xF3w", verb: "mie\u0107" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "wyra\u017Cenie",
    email: "adres email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data i godzina w formacie ISO",
    date: "data w formacie ISO",
    time: "godzina w formacie ISO",
    duration: "czas trwania ISO",
    ipv4: "adres IPv4",
    ipv6: "adres IPv6",
    cidrv4: "zakres IPv4",
    cidrv6: "zakres IPv6",
    base64: "ci\u0105g znak\xF3w zakodowany w formacie base64",
    base64url: "ci\u0105g znak\xF3w zakodowany w formacie base64url",
    json_string: "ci\u0105g znak\xF3w w formacie JSON",
    e164: "liczba E.164",
    jwt: "JWT",
    template_literal: "wej\u015Bcie"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "liczba",
    array: "tablica"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano instanceof ${issue2.expected}, otrzymano ${received}`;
        }
        return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${expected}, otrzymano ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${stringifyPrimitive(issue2.values[0])}`;
        return `Nieprawid\u0142owa opcja: oczekiwano jednej z warto\u015Bci ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Za du\u017Ca warto\u015B\u0107: oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element\xF3w"}`;
        }
        return `Zbyt du\u017C(y/a/e): oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Za ma\u0142a warto\u015B\u0107: oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "element\xF3w"}`;
        }
        return `Zbyt ma\u0142(y/a/e): oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zaczyna\u0107 si\u0119 od "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi ko\u0144czy\u0107 si\u0119 na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zawiera\u0107 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi odpowiada\u0107 wzorcowi ${_issue.pattern}`;
        return `Nieprawid\u0142ow(y/a/e) ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nieprawid\u0142owa liczba: musi by\u0107 wielokrotno\u015Bci\u0105 ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nierozpoznane klucze${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Nieprawid\u0142owy klucz w ${issue2.origin}`;
      case "invalid_union":
        return "Nieprawid\u0142owe dane wej\u015Bciowe";
      case "invalid_element":
        return `Nieprawid\u0142owa warto\u015B\u0107 w ${issue2.origin}`;
      default:
        return `Nieprawid\u0142owe dane wej\u015Bciowe`;
    }
  };
};
function pl_default() {
  return {
    localeError: error33()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/pt.js
var error34 = () => {
  const Sizable = {
    string: { unit: "caracteres", verb: "ter" },
    file: { unit: "bytes", verb: "ter" },
    array: { unit: "itens", verb: "ter" },
    set: { unit: "itens", verb: "ter" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "padr\xE3o",
    email: "endere\xE7o de e-mail",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data e hora ISO",
    date: "data ISO",
    time: "hora ISO",
    duration: "dura\xE7\xE3o ISO",
    ipv4: "endere\xE7o IPv4",
    ipv6: "endere\xE7o IPv6",
    cidrv4: "faixa de IPv4",
    cidrv6: "faixa de IPv6",
    base64: "texto codificado em base64",
    base64url: "URL codificada em base64",
    json_string: "texto JSON",
    e164: "n\xFAmero E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "n\xFAmero",
    null: "nulo"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Tipo inv\xE1lido: esperado instanceof ${issue2.expected}, recebido ${received}`;
        }
        return `Tipo inv\xE1lido: esperado ${expected}, recebido ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrada inv\xE1lida: esperado ${stringifyPrimitive(issue2.values[0])}`;
        return `Op\xE7\xE3o inv\xE1lida: esperada uma das ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Muito grande: esperado que ${issue2.origin ?? "valor"} tivesse ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Muito grande: esperado que ${issue2.origin ?? "valor"} fosse ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Muito pequeno: esperado que ${issue2.origin} tivesse ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Muito pequeno: esperado que ${issue2.origin} fosse ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Texto inv\xE1lido: deve come\xE7ar com "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Texto inv\xE1lido: deve terminar com "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Texto inv\xE1lido: deve incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Texto inv\xE1lido: deve corresponder ao padr\xE3o ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} inv\xE1lido`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE1lido: deve ser m\xFAltiplo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chave${issue2.keys.length > 1 ? "s" : ""} desconhecida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Chave inv\xE1lida em ${issue2.origin}`;
      case "invalid_union":
        return "Entrada inv\xE1lida";
      case "invalid_element":
        return `Valor inv\xE1lido em ${issue2.origin}`;
      default:
        return `Campo inv\xE1lido`;
    }
  };
};
function pt_default() {
  return {
    localeError: error34()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/ru.js
function getRussianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
var error35 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "\u0441\u0438\u043C\u0432\u043E\u043B",
        few: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430",
        many: "\u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"
      },
      verb: "\u0438\u043C\u0435\u0442\u044C"
    },
    file: {
      unit: {
        one: "\u0431\u0430\u0439\u0442",
        few: "\u0431\u0430\u0439\u0442\u0430",
        many: "\u0431\u0430\u0439\u0442"
      },
      verb: "\u0438\u043C\u0435\u0442\u044C"
    },
    array: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432"
      },
      verb: "\u0438\u043C\u0435\u0442\u044C"
    },
    set: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432"
      },
      verb: "\u0438\u043C\u0435\u0442\u044C"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0432\u0432\u043E\u0434",
    email: "email \u0430\u0434\u0440\u0435\u0441",
    url: "URL",
    emoji: "\u044D\u043C\u043E\u0434\u0437\u0438",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0434\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F",
    date: "ISO \u0434\u0430\u0442\u0430",
    time: "ISO \u0432\u0440\u0435\u043C\u044F",
    duration: "ISO \u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
    ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441",
    ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441",
    cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    base64: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64",
    base64url: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64url",
    json_string: "JSON \u0441\u0442\u0440\u043E\u043A\u0430",
    e164: "\u043D\u043E\u043C\u0435\u0440 E.164",
    jwt: "JWT",
    template_literal: "\u0432\u0432\u043E\u0434"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0447\u0438\u0441\u043B\u043E",
    array: "\u043C\u0430\u0441\u0441\u0438\u0432"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C instanceof ${issue2.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${received}`;
        }
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${stringifyPrimitive(issue2.values[0])}`;
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0434\u043D\u043E \u0438\u0437 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getRussianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getRussianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin} \u0431\u0443\u0434\u0435\u0442 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u0441\u044F \u0441 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u043D\u0430 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E: \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u043D${issue2.keys.length > 1 ? "\u044B\u0435" : "\u044B\u0439"} \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u0438" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043B\u044E\u0447 \u0432 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435";
      case "invalid_element":
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432 ${issue2.origin}`;
      default:
        return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435`;
    }
  };
};
function ru_default() {
  return {
    localeError: error35()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/sl.js
var error36 = () => {
  const Sizable = {
    string: { unit: "znakov", verb: "imeti" },
    file: { unit: "bajtov", verb: "imeti" },
    array: { unit: "elementov", verb: "imeti" },
    set: { unit: "elementov", verb: "imeti" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "vnos",
    email: "e-po\u0161tni naslov",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum in \u010Das",
    date: "ISO datum",
    time: "ISO \u010Das",
    duration: "ISO trajanje",
    ipv4: "IPv4 naslov",
    ipv6: "IPv6 naslov",
    cidrv4: "obseg IPv4",
    cidrv6: "obseg IPv6",
    base64: "base64 kodiran niz",
    base64url: "base64url kodiran niz",
    json_string: "JSON niz",
    e164: "E.164 \u0161tevilka",
    jwt: "JWT",
    template_literal: "vnos"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0161tevilo",
    array: "tabela"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Neveljaven vnos: pri\u010Dakovano instanceof ${issue2.expected}, prejeto ${received}`;
        }
        return `Neveljaven vnos: pri\u010Dakovano ${expected}, prejeto ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neveljaven vnos: pri\u010Dakovano ${stringifyPrimitive(issue2.values[0])}`;
        return `Neveljavna mo\u017Enost: pri\u010Dakovano eno izmed ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Preveliko: pri\u010Dakovano, da bo ${issue2.origin ?? "vrednost"} imelo ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementov"}`;
        return `Preveliko: pri\u010Dakovano, da bo ${issue2.origin ?? "vrednost"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Premajhno: pri\u010Dakovano, da bo ${issue2.origin} imelo ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Premajhno: pri\u010Dakovano, da bo ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Neveljaven niz: mora se za\u010Deti z "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Neveljaven niz: mora se kon\u010Dati z "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
        return `Neveljaven ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neveljavno \u0161tevilo: mora biti ve\u010Dkratnik ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznan${issue2.keys.length > 1 ? "i klju\u010Di" : " klju\u010D"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neveljaven klju\u010D v ${issue2.origin}`;
      case "invalid_union":
        return "Neveljaven vnos";
      case "invalid_element":
        return `Neveljavna vrednost v ${issue2.origin}`;
      default:
        return "Neveljaven vnos";
    }
  };
};
function sl_default() {
  return {
    localeError: error36()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/sv.js
var error37 = () => {
  const Sizable = {
    string: { unit: "tecken", verb: "att ha" },
    file: { unit: "bytes", verb: "att ha" },
    array: { unit: "objekt", verb: "att inneh\xE5lla" },
    set: { unit: "objekt", verb: "att inneh\xE5lla" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "regulj\xE4rt uttryck",
    email: "e-postadress",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-datum och tid",
    date: "ISO-datum",
    time: "ISO-tid",
    duration: "ISO-varaktighet",
    ipv4: "IPv4-intervall",
    ipv6: "IPv6-intervall",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodad str\xE4ng",
    base64url: "base64url-kodad str\xE4ng",
    json_string: "JSON-str\xE4ng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "mall-literal"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "antal",
    array: "lista"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ogiltig inmatning: f\xF6rv\xE4ntat instanceof ${issue2.expected}, fick ${received}`;
        }
        return `Ogiltig inmatning: f\xF6rv\xE4ntat ${expected}, fick ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ogiltig inmatning: f\xF6rv\xE4ntat ${stringifyPrimitive(issue2.values[0])}`;
        return `Ogiltigt val: f\xF6rv\xE4ntade en av ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `F\xF6r stor(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        }
        return `F\xF6r stor(t): f\xF6rv\xE4ntat ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `F\xF6r lite(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `F\xF6r lite(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ogiltig str\xE4ng: m\xE5ste b\xF6rja med "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Ogiltig str\xE4ng: m\xE5ste sluta med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ogiltig str\xE4ng: m\xE5ste inneh\xE5lla "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ogiltig str\xE4ng: m\xE5ste matcha m\xF6nstret "${_issue.pattern}"`;
        return `Ogiltig(t) ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ogiltigt tal: m\xE5ste vara en multipel av ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ok\xE4nda nycklar" : "Ok\xE4nd nyckel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ogiltig nyckel i ${issue2.origin ?? "v\xE4rdet"}`;
      case "invalid_union":
        return "Ogiltig input";
      case "invalid_element":
        return `Ogiltigt v\xE4rde i ${issue2.origin ?? "v\xE4rdet"}`;
      default:
        return `Ogiltig input`;
    }
  };
};
function sv_default() {
  return {
    localeError: error37()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/ta.js
var error38 = () => {
  const Sizable = {
    string: { unit: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
    file: { unit: "\u0BAA\u0BC8\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
    array: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
    set: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1",
    email: "\u0BAE\u0BBF\u0BA9\u0BCD\u0BA9\u0B9E\u0BCD\u0B9A\u0BB2\u0BCD \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0BA4\u0BC7\u0BA4\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
    date: "ISO \u0BA4\u0BC7\u0BA4\u0BBF",
    time: "ISO \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
    duration: "ISO \u0B95\u0BBE\u0BB2 \u0B85\u0BB3\u0BB5\u0BC1",
    ipv4: "IPv4 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
    ipv6: "IPv6 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
    cidrv4: "IPv4 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1",
    cidrv6: "IPv6 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1",
    base64: "base64-encoded \u0B9A\u0BB0\u0BAE\u0BCD",
    base64url: "base64url-encoded \u0B9A\u0BB0\u0BAE\u0BCD",
    json_string: "JSON \u0B9A\u0BB0\u0BAE\u0BCD",
    e164: "E.164 \u0B8E\u0BA3\u0BCD",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0B8E\u0BA3\u0BCD",
    array: "\u0B85\u0BA3\u0BBF",
    null: "\u0BB5\u0BC6\u0BB1\u0BC1\u0BAE\u0BC8"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 instanceof ${issue2.expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${received}`;
        }
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${stringifyPrimitive(issue2.values[0])}`;
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BAE\u0BCD: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${joinValues(issue2.values, "|")} \u0B87\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD"} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        }
        return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${adj}${issue2.maximum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        }
        return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin} ${adj}${issue2.minimum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.prefix}" \u0B87\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        if (_issue.format === "ends_with")
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.suffix}" \u0B87\u0BB2\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0B9F\u0BC8\u0BAF \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        if (_issue.format === "includes")
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.includes}" \u0B90 \u0B89\u0BB3\u0BCD\u0BB3\u0B9F\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        if (_issue.format === "regex")
          return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: ${_issue.pattern} \u0BAE\u0BC1\u0BB1\u0BC8\u0BAA\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B8E\u0BA3\u0BCD: ${issue2.divisor} \u0B87\u0BA9\u0BCD \u0BAA\u0BB2\u0BAE\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
      case "unrecognized_keys":
        return `\u0B85\u0B9F\u0BC8\u0BAF\u0BBE\u0BB3\u0BAE\u0BCD \u0BA4\u0BC6\u0BB0\u0BBF\u0BAF\u0BBE\u0BA4 \u0BB5\u0BBF\u0B9A\u0BC8${issue2.keys.length > 1 ? "\u0B95\u0BB3\u0BCD" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9A\u0BC8`;
      case "invalid_union":
        return "\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1";
      case "invalid_element":
        return `${issue2.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1`;
      default:
        return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1`;
    }
  };
};
function ta_default() {
  return {
    localeError: error38()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/th.js
var error39 = () => {
  const Sizable = {
    string: { unit: "\u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
    file: { unit: "\u0E44\u0E1A\u0E15\u0E4C", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
    array: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
    set: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19",
    email: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E2D\u0E35\u0E40\u0E21\u0E25",
    url: "URL",
    emoji: "\u0E2D\u0E34\u0E42\u0E21\u0E08\u0E34",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
    date: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E41\u0E1A\u0E1A ISO",
    time: "\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
    duration: "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
    ipv4: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv4",
    ipv6: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv6",
    cidrv4: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv4",
    cidrv6: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv6",
    base64: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64",
    base64url: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A URL",
    json_string: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A JSON",
    e164: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28 (E.164)",
    jwt: "\u0E42\u0E17\u0E40\u0E04\u0E19 JWT",
    template_literal: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02",
    array: "\u0E2D\u0E32\u0E23\u0E4C\u0E40\u0E23\u0E22\u0E4C (Array)",
    null: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E48\u0E32 (null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 instanceof ${issue2.expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${received}`;
        }
        return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u0E04\u0E48\u0E32\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${stringifyPrimitive(issue2.values[0])}`;
        return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E43\u0E19 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19" : "\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"}`;
        return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22" : "\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19\u0E15\u0E49\u0E19\u0E14\u0E49\u0E27\u0E22 "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E25\u0E07\u0E17\u0E49\u0E32\u0E22\u0E14\u0E49\u0E27\u0E22 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35 "${_issue.includes}" \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21`;
        if (_issue.format === "regex")
          return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14 ${_issue.pattern}`;
        return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E32\u0E23\u0E14\u0E49\u0E27\u0E22 ${issue2.divisor} \u0E44\u0E14\u0E49\u0E25\u0E07\u0E15\u0E31\u0E27`;
      case "unrecognized_keys":
        return `\u0E1E\u0E1A\u0E04\u0E35\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E23\u0E39\u0E49\u0E08\u0E31\u0E01: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u0E04\u0E35\u0E22\u0E4C\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${issue2.origin}`;
      case "invalid_union":
        return "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E22\u0E39\u0E40\u0E19\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E44\u0E27\u0E49";
      case "invalid_element":
        return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${issue2.origin}`;
      default:
        return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07`;
    }
  };
};
function th_default() {
  return {
    localeError: error39()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/tr.js
var error40 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "olmal\u0131" },
    file: { unit: "bayt", verb: "olmal\u0131" },
    array: { unit: "\xF6\u011Fe", verb: "olmal\u0131" },
    set: { unit: "\xF6\u011Fe", verb: "olmal\u0131" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "girdi",
    email: "e-posta adresi",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO tarih ve saat",
    date: "ISO tarih",
    time: "ISO saat",
    duration: "ISO s\xFCre",
    ipv4: "IPv4 adresi",
    ipv6: "IPv6 adresi",
    cidrv4: "IPv4 aral\u0131\u011F\u0131",
    cidrv6: "IPv6 aral\u0131\u011F\u0131",
    base64: "base64 ile \u015Fifrelenmi\u015F metin",
    base64url: "base64url ile \u015Fifrelenmi\u015F metin",
    json_string: "JSON dizesi",
    e164: "E.164 say\u0131s\u0131",
    jwt: "JWT",
    template_literal: "\u015Eablon dizesi"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ge\xE7ersiz de\u011Fer: beklenen instanceof ${issue2.expected}, al\u0131nan ${received}`;
        }
        return `Ge\xE7ersiz de\u011Fer: beklenen ${expected}, al\u0131nan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ge\xE7ersiz de\u011Fer: beklenen ${stringifyPrimitive(issue2.values[0])}`;
        return `Ge\xE7ersiz se\xE7enek: a\u015Fa\u011F\u0131dakilerden biri olmal\u0131: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\xC7ok b\xFCy\xFCk: beklenen ${issue2.origin ?? "de\u011Fer"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\xF6\u011Fe"}`;
        return `\xC7ok b\xFCy\xFCk: beklenen ${issue2.origin ?? "de\u011Fer"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\xC7ok k\xFC\xE7\xFCk: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `\xC7ok k\xFC\xE7\xFCk: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ge\xE7ersiz metin: "${_issue.prefix}" ile ba\u015Flamal\u0131`;
        if (_issue.format === "ends_with")
          return `Ge\xE7ersiz metin: "${_issue.suffix}" ile bitmeli`;
        if (_issue.format === "includes")
          return `Ge\xE7ersiz metin: "${_issue.includes}" i\xE7ermeli`;
        if (_issue.format === "regex")
          return `Ge\xE7ersiz metin: ${_issue.pattern} desenine uymal\u0131`;
        return `Ge\xE7ersiz ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ge\xE7ersiz say\u0131: ${issue2.divisor} ile tam b\xF6l\xFCnebilmeli`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan anahtar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} i\xE7inde ge\xE7ersiz anahtar`;
      case "invalid_union":
        return "Ge\xE7ersiz de\u011Fer";
      case "invalid_element":
        return `${issue2.origin} i\xE7inde ge\xE7ersiz de\u011Fer`;
      default:
        return `Ge\xE7ersiz de\u011Fer`;
    }
  };
};
function tr_default() {
  return {
    localeError: error40()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/uk.js
var error41 = () => {
  const Sizable = {
    string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
    file: { unit: "\u0431\u0430\u0439\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
    array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
    set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456",
    email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u0435\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0457 \u043F\u043E\u0448\u0442\u0438",
    url: "URL",
    emoji: "\u0435\u043C\u043E\u0434\u0437\u0456",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u0434\u0430\u0442\u0430 \u0442\u0430 \u0447\u0430\u0441 ISO",
    date: "\u0434\u0430\u0442\u0430 ISO",
    time: "\u0447\u0430\u0441 ISO",
    duration: "\u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C ISO",
    ipv4: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv4",
    ipv6: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv6",
    cidrv4: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv4",
    cidrv6: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv6",
    base64: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64",
    base64url: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64url",
    json_string: "\u0440\u044F\u0434\u043E\u043A JSON",
    e164: "\u043D\u043E\u043C\u0435\u0440 E.164",
    jwt: "JWT",
    template_literal: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0447\u0438\u0441\u043B\u043E",
    array: "\u043C\u0430\u0441\u0438\u0432"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F instanceof ${issue2.expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${received}`;
        }
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${stringifyPrimitive(issue2.values[0])}`;
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430 \u043E\u043F\u0446\u0456\u044F: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F \u043E\u0434\u043D\u0435 \u0437 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432"}`;
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} \u0431\u0443\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin} \u0431\u0443\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043F\u043E\u0447\u0438\u043D\u0430\u0442\u0438\u0441\u044F \u0437 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0437\u0430\u043A\u0456\u043D\u0447\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u043D\u0430 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043C\u0456\u0441\u0442\u0438\u0442\u0438 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0442\u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0447\u0438\u0441\u043B\u043E: \u043F\u043E\u0432\u0438\u043D\u043D\u043E \u0431\u0443\u0442\u0438 \u043A\u0440\u0430\u0442\u043D\u0438\u043C ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u043E\u0437\u043F\u0456\u0437\u043D\u0430\u043D\u0438\u0439 \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u0456" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u043A\u043B\u044E\u0447 \u0443 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456";
      case "invalid_element":
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0443 ${issue2.origin}`;
      default:
        return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456`;
    }
  };
};
function uk_default() {
  return {
    localeError: error41()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/ua.js
function ua_default() {
  return uk_default();
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/ur.js
var error42 = () => {
  const Sizable = {
    string: { unit: "\u062D\u0631\u0648\u0641", verb: "\u06C1\u0648\u0646\u0627" },
    file: { unit: "\u0628\u0627\u0626\u0679\u0633", verb: "\u06C1\u0648\u0646\u0627" },
    array: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" },
    set: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0627\u0646 \u067E\u0679",
    email: "\u0627\u06CC \u0645\u06CC\u0644 \u0627\u06CC\u0688\u0631\u06CC\u0633",
    url: "\u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644",
    emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
    uuid: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    uuidv4: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 4",
    uuidv6: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 6",
    nanoid: "\u0646\u06CC\u0646\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    guid: "\u062C\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    cuid: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    cuid2: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC 2",
    ulid: "\u06CC\u0648 \u0627\u06CC\u0644 \u0622\u0626\u06CC \u0688\u06CC",
    xid: "\u0627\u06CC\u06A9\u0633 \u0622\u0626\u06CC \u0688\u06CC",
    ksuid: "\u06A9\u06D2 \u0627\u06CC\u0633 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
    datetime: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0688\u06CC\u0679 \u0679\u0627\u0626\u0645",
    date: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u062A\u0627\u0631\u06CC\u062E",
    time: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0648\u0642\u062A",
    duration: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0645\u062F\u062A",
    ipv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0627\u06CC\u0688\u0631\u06CC\u0633",
    ipv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0627\u06CC\u0688\u0631\u06CC\u0633",
    cidrv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0631\u06CC\u0646\u062C",
    cidrv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0631\u06CC\u0646\u062C",
    base64: "\u0628\u06CC\u0633 64 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF",
    base64url: "\u0628\u06CC\u0633 64 \u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF",
    json_string: "\u062C\u06D2 \u0627\u06CC\u0633 \u0627\u0648 \u0627\u06CC\u0646 \u0633\u0679\u0631\u0646\u06AF",
    e164: "\u0627\u06CC 164 \u0646\u0645\u0628\u0631",
    jwt: "\u062C\u06D2 \u0688\u0628\u0644\u06CC\u0648 \u0679\u06CC",
    template_literal: "\u0627\u0646 \u067E\u0679"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u0646\u0645\u0628\u0631",
    array: "\u0622\u0631\u06D2",
    null: "\u0646\u0644"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: instanceof ${issue2.expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${received} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
        }
        return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${received} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${stringifyPrimitive(issue2.values[0])} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
        return `\u063A\u0644\u0637 \u0622\u067E\u0634\u0646: ${joinValues(issue2.values, "|")} \u0645\u06CC\u06BA \u0633\u06D2 \u0627\u06CC\u06A9 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${issue2.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u06D2 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0627\u0635\u0631"} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
        return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${issue2.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u0627 ${adj}${issue2.maximum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${issue2.origin} \u06A9\u06D2 ${adj}${issue2.minimum.toString()} ${sizing.unit} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
        }
        return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${issue2.origin} \u06A9\u0627 ${adj}${issue2.minimum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.prefix}" \u0633\u06D2 \u0634\u0631\u0648\u0639 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        }
        if (_issue.format === "ends_with")
          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.suffix}" \u067E\u0631 \u062E\u062A\u0645 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        if (_issue.format === "includes")
          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.includes}" \u0634\u0627\u0645\u0644 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        if (_issue.format === "regex")
          return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: \u067E\u06CC\u0679\u0631\u0646 ${_issue.pattern} \u0633\u06D2 \u0645\u06CC\u0686 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
        return `\u063A\u0644\u0637 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u063A\u0644\u0637 \u0646\u0645\u0628\u0631: ${issue2.divisor} \u06A9\u0627 \u0645\u0636\u0627\u0639\u0641 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
      case "unrecognized_keys":
        return `\u063A\u06CC\u0631 \u062A\u0633\u0644\u06CC\u0645 \u0634\u062F\u06C1 \u06A9\u06CC${issue2.keys.length > 1 ? "\u0632" : ""}: ${joinValues(issue2.keys, "\u060C ")}`;
      case "invalid_key":
        return `${issue2.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u06A9\u06CC`;
      case "invalid_union":
        return "\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679";
      case "invalid_element":
        return `${issue2.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u0648\u06CC\u0644\u06CC\u0648`;
      default:
        return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679`;
    }
  };
};
function ur_default() {
  return {
    localeError: error42()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/uz.js
var error43 = () => {
  const Sizable = {
    string: { unit: "belgi", verb: "bo\u2018lishi kerak" },
    file: { unit: "bayt", verb: "bo\u2018lishi kerak" },
    array: { unit: "element", verb: "bo\u2018lishi kerak" },
    set: { unit: "element", verb: "bo\u2018lishi kerak" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "kirish",
    email: "elektron pochta manzili",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO sana va vaqti",
    date: "ISO sana",
    time: "ISO vaqt",
    duration: "ISO davomiylik",
    ipv4: "IPv4 manzil",
    ipv6: "IPv6 manzil",
    mac: "MAC manzil",
    cidrv4: "IPv4 diapazon",
    cidrv6: "IPv6 diapazon",
    base64: "base64 kodlangan satr",
    base64url: "base64url kodlangan satr",
    json_string: "JSON satr",
    e164: "E.164 raqam",
    jwt: "JWT",
    template_literal: "kirish"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "raqam",
    array: "massiv"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Noto\u2018g\u2018ri kirish: kutilgan instanceof ${issue2.expected}, qabul qilingan ${received}`;
        }
        return `Noto\u2018g\u2018ri kirish: kutilgan ${expected}, qabul qilingan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Noto\u2018g\u2018ri kirish: kutilgan ${stringifyPrimitive(issue2.values[0])}`;
        return `Noto\u2018g\u2018ri variant: quyidagilardan biri kutilgan ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        }
        return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Noto\u2018g\u2018ri satr: "${_issue.prefix}" bilan boshlanishi kerak`;
        if (_issue.format === "ends_with")
          return `Noto\u2018g\u2018ri satr: "${_issue.suffix}" bilan tugashi kerak`;
        if (_issue.format === "includes")
          return `Noto\u2018g\u2018ri satr: "${_issue.includes}" ni o\u2018z ichiga olishi kerak`;
        if (_issue.format === "regex")
          return `Noto\u2018g\u2018ri satr: ${_issue.pattern} shabloniga mos kelishi kerak`;
        return `Noto\u2018g\u2018ri ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Noto\u2018g\u2018ri raqam: ${issue2.divisor} ning karralisi bo\u2018lishi kerak`;
      case "unrecognized_keys":
        return `Noma\u2019lum kalit${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} dagi kalit noto\u2018g\u2018ri`;
      case "invalid_union":
        return "Noto\u2018g\u2018ri kirish";
      case "invalid_element":
        return `${issue2.origin} da noto\u2018g\u2018ri qiymat`;
      default:
        return `Noto\u2018g\u2018ri kirish`;
    }
  };
};
function uz_default() {
  return {
    localeError: error43()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/vi.js
var error44 = () => {
  const Sizable = {
    string: { unit: "k\xFD t\u1EF1", verb: "c\xF3" },
    file: { unit: "byte", verb: "c\xF3" },
    array: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" },
    set: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u0111\u1EA7u v\xE0o",
    email: "\u0111\u1ECBa ch\u1EC9 email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ng\xE0y gi\u1EDD ISO",
    date: "ng\xE0y ISO",
    time: "gi\u1EDD ISO",
    duration: "kho\u1EA3ng th\u1EDDi gian ISO",
    ipv4: "\u0111\u1ECBa ch\u1EC9 IPv4",
    ipv6: "\u0111\u1ECBa ch\u1EC9 IPv6",
    cidrv4: "d\u1EA3i IPv4",
    cidrv6: "d\u1EA3i IPv6",
    base64: "chu\u1ED7i m\xE3 h\xF3a base64",
    base64url: "chu\u1ED7i m\xE3 h\xF3a base64url",
    json_string: "chu\u1ED7i JSON",
    e164: "s\u1ED1 E.164",
    jwt: "JWT",
    template_literal: "\u0111\u1EA7u v\xE0o"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "s\u1ED1",
    array: "m\u1EA3ng"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i instanceof ${issue2.expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${received}`;
        }
        return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${stringifyPrimitive(issue2.values[0])}`;
        return `T\xF9y ch\u1ECDn kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i m\u1ED9t trong c\xE1c gi\xE1 tr\u1ECB ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${issue2.origin ?? "gi\xE1 tr\u1ECB"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "ph\u1EA7n t\u1EED"}`;
        return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${issue2.origin ?? "gi\xE1 tr\u1ECB"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i k\u1EBFt th\xFAc b\u1EB1ng "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i bao g\u1ED3m "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i kh\u1EDBp v\u1EDBi m\u1EABu ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} kh\xF4ng h\u1EE3p l\u1EC7`;
      }
      case "not_multiple_of":
        return `S\u1ED1 kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i l\xE0 b\u1ED9i s\u1ED1 c\u1EE7a ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kh\xF3a kh\xF4ng \u0111\u01B0\u1EE3c nh\u1EADn d\u1EA1ng: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kh\xF3a kh\xF4ng h\u1EE3p l\u1EC7 trong ${issue2.origin}`;
      case "invalid_union":
        return "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7";
      case "invalid_element":
        return `Gi\xE1 tr\u1ECB kh\xF4ng h\u1EE3p l\u1EC7 trong ${issue2.origin}`;
      default:
        return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7`;
    }
  };
};
function vi_default() {
  return {
    localeError: error44()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/zh-CN.js
var error45 = () => {
  const Sizable = {
    string: { unit: "\u5B57\u7B26", verb: "\u5305\u542B" },
    file: { unit: "\u5B57\u8282", verb: "\u5305\u542B" },
    array: { unit: "\u9879", verb: "\u5305\u542B" },
    set: { unit: "\u9879", verb: "\u5305\u542B" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u8F93\u5165",
    email: "\u7535\u5B50\u90AE\u4EF6",
    url: "URL",
    emoji: "\u8868\u60C5\u7B26\u53F7",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO\u65E5\u671F\u65F6\u95F4",
    date: "ISO\u65E5\u671F",
    time: "ISO\u65F6\u95F4",
    duration: "ISO\u65F6\u957F",
    ipv4: "IPv4\u5730\u5740",
    ipv6: "IPv6\u5730\u5740",
    cidrv4: "IPv4\u7F51\u6BB5",
    cidrv6: "IPv6\u7F51\u6BB5",
    base64: "base64\u7F16\u7801\u5B57\u7B26\u4E32",
    base64url: "base64url\u7F16\u7801\u5B57\u7B26\u4E32",
    json_string: "JSON\u5B57\u7B26\u4E32",
    e164: "E.164\u53F7\u7801",
    jwt: "JWT",
    template_literal: "\u8F93\u5165"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "\u6570\u5B57",
    array: "\u6570\u7EC4",
    null: "\u7A7A\u503C(null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B instanceof ${issue2.expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${received}`;
        }
        return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${stringifyPrimitive(issue2.values[0])}`;
        return `\u65E0\u6548\u9009\u9879\uFF1A\u671F\u671B\u4EE5\u4E0B\u4E4B\u4E00 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${issue2.origin ?? "\u503C"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u4E2A\u5143\u7D20"}`;
        return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${issue2.origin ?? "\u503C"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${_issue.prefix}" \u5F00\u5934`;
        if (_issue.format === "ends_with")
          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${_issue.suffix}" \u7ED3\u5C3E`;
        if (_issue.format === "includes")
          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u5305\u542B "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u6EE1\u8DB3\u6B63\u5219\u8868\u8FBE\u5F0F ${_issue.pattern}`;
        return `\u65E0\u6548${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u65E0\u6548\u6570\u5B57\uFF1A\u5FC5\u987B\u662F ${issue2.divisor} \u7684\u500D\u6570`;
      case "unrecognized_keys":
        return `\u51FA\u73B0\u672A\u77E5\u7684\u952E(key): ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} \u4E2D\u7684\u952E(key)\u65E0\u6548`;
      case "invalid_union":
        return "\u65E0\u6548\u8F93\u5165";
      case "invalid_element":
        return `${issue2.origin} \u4E2D\u5305\u542B\u65E0\u6548\u503C(value)`;
      default:
        return `\u65E0\u6548\u8F93\u5165`;
    }
  };
};
function zh_CN_default() {
  return {
    localeError: error45()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/zh-TW.js
var error46 = () => {
  const Sizable = {
    string: { unit: "\u5B57\u5143", verb: "\u64C1\u6709" },
    file: { unit: "\u4F4D\u5143\u7D44", verb: "\u64C1\u6709" },
    array: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" },
    set: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u8F38\u5165",
    email: "\u90F5\u4EF6\u5730\u5740",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u65E5\u671F\u6642\u9593",
    date: "ISO \u65E5\u671F",
    time: "ISO \u6642\u9593",
    duration: "ISO \u671F\u9593",
    ipv4: "IPv4 \u4F4D\u5740",
    ipv6: "IPv6 \u4F4D\u5740",
    cidrv4: "IPv4 \u7BC4\u570D",
    cidrv6: "IPv6 \u7BC4\u570D",
    base64: "base64 \u7DE8\u78BC\u5B57\u4E32",
    base64url: "base64url \u7DE8\u78BC\u5B57\u4E32",
    json_string: "JSON \u5B57\u4E32",
    e164: "E.164 \u6578\u503C",
    jwt: "JWT",
    template_literal: "\u8F38\u5165"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA instanceof ${issue2.expected}\uFF0C\u4F46\u6536\u5230 ${received}`;
        }
        return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${expected}\uFF0C\u4F46\u6536\u5230 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${stringifyPrimitive(issue2.values[0])}`;
        return `\u7121\u6548\u7684\u9078\u9805\uFF1A\u9810\u671F\u70BA\u4EE5\u4E0B\u5176\u4E2D\u4E4B\u4E00 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${issue2.origin ?? "\u503C"} \u61C9\u70BA ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u500B\u5143\u7D20"}`;
        return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${issue2.origin ?? "\u503C"} \u61C9\u70BA ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${issue2.origin} \u61C9\u70BA ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${issue2.origin} \u61C9\u70BA ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${_issue.prefix}" \u958B\u982D`;
        }
        if (_issue.format === "ends_with")
          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${_issue.suffix}" \u7D50\u5C3E`;
        if (_issue.format === "includes")
          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u5305\u542B "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u7B26\u5408\u683C\u5F0F ${_issue.pattern}`;
        return `\u7121\u6548\u7684 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u7121\u6548\u7684\u6578\u5B57\uFF1A\u5FC5\u9808\u70BA ${issue2.divisor} \u7684\u500D\u6578`;
      case "unrecognized_keys":
        return `\u7121\u6CD5\u8B58\u5225\u7684\u9375\u503C${issue2.keys.length > 1 ? "\u5011" : ""}\uFF1A${joinValues(issue2.keys, "\u3001")}`;
      case "invalid_key":
        return `${issue2.origin} \u4E2D\u6709\u7121\u6548\u7684\u9375\u503C`;
      case "invalid_union":
        return "\u7121\u6548\u7684\u8F38\u5165\u503C";
      case "invalid_element":
        return `${issue2.origin} \u4E2D\u6709\u7121\u6548\u7684\u503C`;
      default:
        return `\u7121\u6548\u7684\u8F38\u5165\u503C`;
    }
  };
};
function zh_TW_default() {
  return {
    localeError: error46()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/locales/yo.js
var error47 = () => {
  const Sizable = {
    string: { unit: "\xE0mi", verb: "n\xED" },
    file: { unit: "bytes", verb: "n\xED" },
    array: { unit: "nkan", verb: "n\xED" },
    set: { unit: "nkan", verb: "n\xED" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9",
    email: "\xE0d\xEDr\u1EB9\u0301s\xEC \xECm\u1EB9\u0301l\xEC",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\xE0k\xF3k\xF2 ISO",
    date: "\u1ECDj\u1ECD\u0301 ISO",
    time: "\xE0k\xF3k\xF2 ISO",
    duration: "\xE0k\xF3k\xF2 t\xF3 p\xE9 ISO",
    ipv4: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv4",
    ipv6: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv6",
    cidrv4: "\xE0gb\xE8gb\xE8 IPv4",
    cidrv6: "\xE0gb\xE8gb\xE8 IPv6",
    base64: "\u1ECD\u0300r\u1ECD\u0300 t\xED a k\u1ECD\u0301 n\xED base64",
    base64url: "\u1ECD\u0300r\u1ECD\u0300 base64url",
    json_string: "\u1ECD\u0300r\u1ECD\u0300 JSON",
    e164: "n\u1ECD\u0301mb\xE0 E.164",
    jwt: "JWT",
    template_literal: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "n\u1ECD\u0301mb\xE0",
    array: "akop\u1ECD"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi instanceof ${issue2.expected}, \xE0m\u1ECD\u0300 a r\xED ${received}`;
        }
        return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${expected}, \xE0m\u1ECD\u0300 a r\xED ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${stringifyPrimitive(issue2.values[0])}`;
        return `\xC0\u1E63\xE0y\xE0n a\u1E63\xEC\u1E63e: yan \u1ECD\u0300kan l\xE1ra ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${issue2.origin ?? "iye"} ${sizing.verb} ${adj}${issue2.maximum} ${sizing.unit}`;
        return `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 ${adj}${issue2.maximum}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum} ${sizing.unit}`;
        return `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 ${adj}${issue2.minimum}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\u1EB9\u0300r\u1EB9\u0300 p\u1EB9\u0300l\xFA "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 par\xED p\u1EB9\u0300l\xFA "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 n\xED "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\xE1 \xE0p\u1EB9\u1EB9r\u1EB9 mu ${_issue.pattern}`;
        return `A\u1E63\xEC\u1E63e: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `N\u1ECD\u0301mb\xE0 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 j\u1EB9\u0301 \xE8y\xE0 p\xEDp\xEDn ti ${issue2.divisor}`;
      case "unrecognized_keys":
        return `B\u1ECDt\xECn\xEC \xE0\xECm\u1ECD\u0300: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `B\u1ECDt\xECn\xEC a\u1E63\xEC\u1E63e n\xEDn\xFA ${issue2.origin}`;
      case "invalid_union":
        return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
      case "invalid_element":
        return `Iye a\u1E63\xEC\u1E63e n\xEDn\xFA ${issue2.origin}`;
      default:
        return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
    }
  };
};
function yo_default() {
  return {
    localeError: error47()
  };
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/core/registries.js
var _a;
var $output = Symbol("ZodOutput");
var $input = Symbol("ZodInput");
var $ZodRegistry = class {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap();
    this._idmap = /* @__PURE__ */ new Map();
  }
  add(schema, ..._meta) {
    const meta3 = _meta[0];
    this._map.set(schema, meta3);
    if (meta3 && typeof meta3 === "object" && "id" in meta3) {
      this._idmap.set(meta3.id, schema);
    }
    return this;
  }
  clear() {
    this._map = /* @__PURE__ */ new WeakMap();
    this._idmap = /* @__PURE__ */ new Map();
    return this;
  }
  remove(schema) {
    const meta3 = this._map.get(schema);
    if (meta3 && typeof meta3 === "object" && "id" in meta3) {
      this._idmap.delete(meta3.id);
    }
    this._map.delete(schema);
    return this;
  }
  get(schema) {
    const p = schema._zod.parent;
    if (p) {
      const pm = { ...this.get(p) ?? {} };
      delete pm.id;
      const f = { ...pm, ...this._map.get(schema) };
      return Object.keys(f).length ? f : void 0;
    }
    return this._map.get(schema);
  }
  has(schema) {
    return this._map.has(schema);
  }
};
function registry() {
  return new $ZodRegistry();
}
(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
var globalRegistry = globalThis.__zod_globalRegistry;

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function _string(Class2, params) {
  return new Class2({
    type: "string",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedString(Class2, params) {
  return new Class2({
    type: "string",
    coerce: true,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _email(Class2, params) {
  return new Class2({
    type: "string",
    format: "email",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _guid(Class2, params) {
  return new Class2({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v4",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v6",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv7(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v7",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _url(Class2, params) {
  return new Class2({
    type: "string",
    format: "url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _emoji2(Class2, params) {
  return new Class2({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _nanoid(Class2, params) {
  return new Class2({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cuid2(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ulid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _xid(Class2, params) {
  return new Class2({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ksuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ipv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _ipv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _mac(Class2, params) {
  return new Class2({
    type: "string",
    format: "mac",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cidrv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _cidrv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _base64(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _base64url(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _e164(Class2, params) {
  return new Class2({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _jwt(Class2, params) {
  return new Class2({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
var TimePrecision = {
  Any: null,
  Minute: -1,
  Second: 0,
  Millisecond: 3,
  Microsecond: 6
};
// @__NO_SIDE_EFFECTS__
function _isoDateTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: false,
    local: false,
    precision: null,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoDate(Class2, params) {
  return new Class2({
    type: "string",
    format: "date",
    check: "string_format",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoDuration(Class2, params) {
  return new Class2({
    type: "string",
    format: "duration",
    check: "string_format",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _number(Class2, params) {
  return new Class2({
    type: "number",
    checks: [],
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedNumber(Class2, params) {
  return new Class2({
    type: "number",
    coerce: true,
    checks: [],
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _int(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "safeint",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _float32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float32",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _float64(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float64",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _int32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "int32",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uint32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "uint32",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _boolean(Class2, params) {
  return new Class2({
    type: "boolean",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedBoolean(Class2, params) {
  return new Class2({
    type: "boolean",
    coerce: true,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _bigint(Class2, params) {
  return new Class2({
    type: "bigint",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedBigint(Class2, params) {
  return new Class2({
    type: "bigint",
    coerce: true,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _int64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "int64",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uint64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "uint64",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _symbol(Class2, params) {
  return new Class2({
    type: "symbol",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _undefined2(Class2, params) {
  return new Class2({
    type: "undefined",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _null2(Class2, params) {
  return new Class2({
    type: "null",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _any(Class2) {
  return new Class2({
    type: "any"
  });
}
// @__NO_SIDE_EFFECTS__
function _unknown(Class2) {
  return new Class2({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function _never(Class2, params) {
  return new Class2({
    type: "never",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _void(Class2, params) {
  return new Class2({
    type: "void",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _date(Class2, params) {
  return new Class2({
    type: "date",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedDate(Class2, params) {
  return new Class2({
    type: "date",
    coerce: true,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _nan(Class2, params) {
  return new Class2({
    type: "nan",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _lt(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
// @__NO_SIDE_EFFECTS__
function _lte(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
// @__NO_SIDE_EFFECTS__
function _gt(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
// @__NO_SIDE_EFFECTS__
function _gte(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
// @__NO_SIDE_EFFECTS__
function _positive(params) {
  return /* @__PURE__ */ _gt(0, params);
}
// @__NO_SIDE_EFFECTS__
function _negative(params) {
  return /* @__PURE__ */ _lt(0, params);
}
// @__NO_SIDE_EFFECTS__
function _nonpositive(params) {
  return /* @__PURE__ */ _lte(0, params);
}
// @__NO_SIDE_EFFECTS__
function _nonnegative(params) {
  return /* @__PURE__ */ _gte(0, params);
}
// @__NO_SIDE_EFFECTS__
function _multipleOf(value, params) {
  return new $ZodCheckMultipleOf({
    check: "multiple_of",
    ...normalizeParams(params),
    value
  });
}
// @__NO_SIDE_EFFECTS__
function _maxSize(maximum, params) {
  return new $ZodCheckMaxSize({
    check: "max_size",
    ...normalizeParams(params),
    maximum
  });
}
// @__NO_SIDE_EFFECTS__
function _minSize(minimum, params) {
  return new $ZodCheckMinSize({
    check: "min_size",
    ...normalizeParams(params),
    minimum
  });
}
// @__NO_SIDE_EFFECTS__
function _size(size, params) {
  return new $ZodCheckSizeEquals({
    check: "size_equals",
    ...normalizeParams(params),
    size
  });
}
// @__NO_SIDE_EFFECTS__
function _maxLength(maximum, params) {
  const ch = new $ZodCheckMaxLength({
    check: "max_length",
    ...normalizeParams(params),
    maximum
  });
  return ch;
}
// @__NO_SIDE_EFFECTS__
function _minLength(minimum, params) {
  return new $ZodCheckMinLength({
    check: "min_length",
    ...normalizeParams(params),
    minimum
  });
}
// @__NO_SIDE_EFFECTS__
function _length(length, params) {
  return new $ZodCheckLengthEquals({
    check: "length_equals",
    ...normalizeParams(params),
    length
  });
}
// @__NO_SIDE_EFFECTS__
function _regex(pattern, params) {
  return new $ZodCheckRegex({
    check: "string_format",
    format: "regex",
    ...normalizeParams(params),
    pattern
  });
}
// @__NO_SIDE_EFFECTS__
function _lowercase(params) {
  return new $ZodCheckLowerCase({
    check: "string_format",
    format: "lowercase",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _uppercase(params) {
  return new $ZodCheckUpperCase({
    check: "string_format",
    format: "uppercase",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _includes(includes, params) {
  return new $ZodCheckIncludes({
    check: "string_format",
    format: "includes",
    ...normalizeParams(params),
    includes
  });
}
// @__NO_SIDE_EFFECTS__
function _startsWith(prefix, params) {
  return new $ZodCheckStartsWith({
    check: "string_format",
    format: "starts_with",
    ...normalizeParams(params),
    prefix
  });
}
// @__NO_SIDE_EFFECTS__
function _endsWith(suffix, params) {
  return new $ZodCheckEndsWith({
    check: "string_format",
    format: "ends_with",
    ...normalizeParams(params),
    suffix
  });
}
// @__NO_SIDE_EFFECTS__
function _property(property, schema, params) {
  return new $ZodCheckProperty({
    check: "property",
    property,
    schema,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _mime(types, params) {
  return new $ZodCheckMimeType({
    check: "mime_type",
    mime: types,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _overwrite(tx) {
  return new $ZodCheckOverwrite({
    check: "overwrite",
    tx
  });
}
// @__NO_SIDE_EFFECTS__
function _normalize(form) {
  return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
}
// @__NO_SIDE_EFFECTS__
function _trim() {
  return /* @__PURE__ */ _overwrite((input) => input.trim());
}
// @__NO_SIDE_EFFECTS__
function _toLowerCase() {
  return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function _toUpperCase() {
  return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function _slugify() {
  return /* @__PURE__ */ _overwrite((input) => slugify(input));
}
// @__NO_SIDE_EFFECTS__
function _array(Class2, element, params) {
  return new Class2({
    type: "array",
    element,
    // get element() {
    //   return element;
    // },
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _union(Class2, options, params) {
  return new Class2({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
function _xor(Class2, options, params) {
  return new Class2({
    type: "union",
    options,
    inclusive: false,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _discriminatedUnion(Class2, discriminator, options, params) {
  return new Class2({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _intersection(Class2, left, right) {
  return new Class2({
    type: "intersection",
    left,
    right
  });
}
// @__NO_SIDE_EFFECTS__
function _tuple(Class2, items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new Class2({
    type: "tuple",
    items,
    rest,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _record(Class2, keyType, valueType, params) {
  return new Class2({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _map(Class2, keyType, valueType, params) {
  return new Class2({
    type: "map",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _set(Class2, valueType, params) {
  return new Class2({
    type: "set",
    valueType,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _enum(Class2, values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _nativeEnum(Class2, entries, params) {
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _literal(Class2, value, params) {
  return new Class2({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _file(Class2, params) {
  return new Class2({
    type: "file",
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _transform(Class2, fn) {
  return new Class2({
    type: "transform",
    transform: fn
  });
}
// @__NO_SIDE_EFFECTS__
function _optional(Class2, innerType) {
  return new Class2({
    type: "optional",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _nullable(Class2, innerType) {
  return new Class2({
    type: "nullable",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _default(Class2, innerType, defaultValue) {
  return new Class2({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
// @__NO_SIDE_EFFECTS__
function _nonoptional(Class2, innerType, params) {
  return new Class2({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _success(Class2, innerType) {
  return new Class2({
    type: "success",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _catch(Class2, innerType, catchValue) {
  return new Class2({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
// @__NO_SIDE_EFFECTS__
function _pipe(Class2, in_, out) {
  return new Class2({
    type: "pipe",
    in: in_,
    out
  });
}
// @__NO_SIDE_EFFECTS__
function _readonly(Class2, innerType) {
  return new Class2({
    type: "readonly",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _templateLiteral(Class2, parts, params) {
  return new Class2({
    type: "template_literal",
    parts,
    ...normalizeParams(params)
  });
}
// @__NO_SIDE_EFFECTS__
function _lazy(Class2, getter) {
  return new Class2({
    type: "lazy",
    getter
  });
}
// @__NO_SIDE_EFFECTS__
function _promise(Class2, innerType) {
  return new Class2({
    type: "promise",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _custom(Class2, fn, _params) {
  const norm = normalizeParams(_params);
  norm.abort ?? (norm.abort = true);
  const schema = new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...norm
  });
  return schema;
}
// @__NO_SIDE_EFFECTS__
function _refine(Class2, fn, _params) {
  const schema = new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...normalizeParams(_params)
  });
  return schema;
}
// @__NO_SIDE_EFFECTS__
function _superRefine(fn) {
  const ch = /* @__PURE__ */ _check((payload) => {
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(issue(issue2, payload.value, ch._zod.def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = ch);
        _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
        payload.issues.push(issue(_issue));
      }
    };
    return fn(payload.value, payload);
  });
  return ch;
}
// @__NO_SIDE_EFFECTS__
function _check(fn, params) {
  const ch = new $ZodCheck({
    check: "custom",
    ...normalizeParams(params)
  });
  ch._zod.check = fn;
  return ch;
}
// @__NO_SIDE_EFFECTS__
function describe(description) {
  const ch = new $ZodCheck({ check: "describe" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, description });
    }
  ];
  ch._zod.check = () => {
  };
  return ch;
}
// @__NO_SIDE_EFFECTS__
function meta(metadata) {
  const ch = new $ZodCheck({ check: "meta" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, ...metadata });
    }
  ];
  ch._zod.check = () => {
  };
  return ch;
}
// @__NO_SIDE_EFFECTS__
function _stringbool(Classes, _params) {
  const params = normalizeParams(_params);
  let truthyArray = params.truthy ?? ["true", "1", "yes", "on", "y", "enabled"];
  let falsyArray = params.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
  if (params.case !== "sensitive") {
    truthyArray = truthyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
    falsyArray = falsyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
  }
  const truthySet = new Set(truthyArray);
  const falsySet = new Set(falsyArray);
  const _Codec = Classes.Codec ?? $ZodCodec;
  const _Boolean = Classes.Boolean ?? $ZodBoolean;
  const _String = Classes.String ?? $ZodString;
  const stringSchema = new _String({ type: "string", error: params.error });
  const booleanSchema = new _Boolean({ type: "boolean", error: params.error });
  const codec2 = new _Codec({
    type: "pipe",
    in: stringSchema,
    out: booleanSchema,
    transform: ((input, payload) => {
      let data = input;
      if (params.case !== "sensitive")
        data = data.toLowerCase();
      if (truthySet.has(data)) {
        return true;
      } else if (falsySet.has(data)) {
        return false;
      } else {
        payload.issues.push({
          code: "invalid_value",
          expected: "stringbool",
          values: [...truthySet, ...falsySet],
          input: payload.value,
          inst: codec2,
          continue: false
        });
        return {};
      }
    }),
    reverseTransform: ((input, _payload) => {
      if (input === true) {
        return truthyArray[0] || "true";
      } else {
        return falsyArray[0] || "false";
      }
    }),
    error: params.error
  });
  return codec2;
}
// @__NO_SIDE_EFFECTS__
function _stringFormat(Class2, format, fnOrRegex, _params = {}) {
  const params = normalizeParams(_params);
  const def = {
    ...normalizeParams(_params),
    check: "string_format",
    type: "string",
    format,
    fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
    ...params
  };
  if (fnOrRegex instanceof RegExp) {
    def.pattern = fnOrRegex;
  }
  const inst = new Class2(def);
  return inst;
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/core/to-json-schema.js
function initializeContext(params) {
  let target = params?.target ?? "draft-2020-12";
  if (target === "draft-4")
    target = "draft-04";
  if (target === "draft-7")
    target = "draft-07";
  return {
    processors: params.processors ?? {},
    metadataRegistry: params?.metadata ?? globalRegistry,
    target,
    unrepresentable: params?.unrepresentable ?? "throw",
    override: params?.override ?? (() => {
    }),
    io: params?.io ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    cycles: params?.cycles ?? "ref",
    reused: params?.reused ?? "inline",
    external: params?.external ?? void 0
  };
}
function process2(schema, ctx, _params = { path: [], schemaPath: [] }) {
  var _a2;
  const def = schema._zod.def;
  const seen = ctx.seen.get(schema);
  if (seen) {
    seen.count++;
    const isCycle = _params.schemaPath.includes(schema);
    if (isCycle) {
      seen.cycle = _params.path;
    }
    return seen.schema;
  }
  const result = { schema: {}, count: 1, cycle: void 0, path: _params.path };
  ctx.seen.set(schema, result);
  const overrideSchema = schema._zod.toJSONSchema?.();
  if (overrideSchema) {
    result.schema = overrideSchema;
  } else {
    const params = {
      ..._params,
      schemaPath: [..._params.schemaPath, schema],
      path: _params.path
    };
    if (schema._zod.processJSONSchema) {
      schema._zod.processJSONSchema(ctx, result.schema, params);
    } else {
      const _json = result.schema;
      const processor = ctx.processors[def.type];
      if (!processor) {
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
      }
      processor(schema, ctx, _json, params);
    }
    const parent = schema._zod.parent;
    if (parent) {
      if (!result.ref)
        result.ref = parent;
      process2(parent, ctx, params);
      ctx.seen.get(parent).isParent = true;
    }
  }
  const meta3 = ctx.metadataRegistry.get(schema);
  if (meta3)
    Object.assign(result.schema, meta3);
  if (ctx.io === "input" && isTransforming(schema)) {
    delete result.schema.examples;
    delete result.schema.default;
  }
  if (ctx.io === "input" && result.schema._prefault)
    (_a2 = result.schema).default ?? (_a2.default = result.schema._prefault);
  delete result.schema._prefault;
  const _result = ctx.seen.get(schema);
  return _result.schema;
}
function extractDefs(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const idToSchema = /* @__PURE__ */ new Map();
  for (const entry of ctx.seen.entries()) {
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      const existing = idToSchema.get(id);
      if (existing && existing !== entry[0]) {
        throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      }
      idToSchema.set(id, entry[0]);
    }
  }
  const makeURI = (entry) => {
    const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
    if (ctx.external) {
      const externalId = ctx.external.registry.get(entry[0])?.id;
      const uriGenerator = ctx.external.uri ?? ((id2) => id2);
      if (externalId) {
        return { ref: uriGenerator(externalId) };
      }
      const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
      entry[1].defId = id;
      return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
    }
    if (entry[1] === root) {
      return { ref: "#" };
    }
    const uriPrefix = `#`;
    const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
    const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
    return { defId, ref: defUriPrefix + defId };
  };
  const extractToDef = (entry) => {
    if (entry[1].schema.$ref) {
      return;
    }
    const seen = entry[1];
    const { ref, defId } = makeURI(entry);
    seen.def = { ...seen.schema };
    if (defId)
      seen.defId = defId;
    const schema2 = seen.schema;
    for (const key in schema2) {
      delete schema2[key];
    }
    schema2.$ref = ref;
  };
  if (ctx.cycles === "throw") {
    for (const entry of ctx.seen.entries()) {
      const seen = entry[1];
      if (seen.cycle) {
        throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
      }
    }
  }
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (schema === entry[0]) {
      extractToDef(entry);
      continue;
    }
    if (ctx.external) {
      const ext = ctx.external.registry.get(entry[0])?.id;
      if (schema !== entry[0] && ext) {
        extractToDef(entry);
        continue;
      }
    }
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      extractToDef(entry);
      continue;
    }
    if (seen.cycle) {
      extractToDef(entry);
      continue;
    }
    if (seen.count > 1) {
      if (ctx.reused === "ref") {
        extractToDef(entry);
        continue;
      }
    }
  }
}
function finalize(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const flattenRef = (zodSchema) => {
    const seen = ctx.seen.get(zodSchema);
    if (seen.ref === null)
      return;
    const schema2 = seen.def ?? seen.schema;
    const _cached = { ...schema2 };
    const ref = seen.ref;
    seen.ref = null;
    if (ref) {
      flattenRef(ref);
      const refSeen = ctx.seen.get(ref);
      const refSchema = refSeen.schema;
      if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
        schema2.allOf = schema2.allOf ?? [];
        schema2.allOf.push(refSchema);
      } else {
        Object.assign(schema2, refSchema);
      }
      Object.assign(schema2, _cached);
      const isParentRef = zodSchema._zod.parent === ref;
      if (isParentRef) {
        for (const key in schema2) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (!(key in _cached)) {
            delete schema2[key];
          }
        }
      }
      if (refSchema.$ref && refSeen.def) {
        for (const key in schema2) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (key in refSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(refSeen.def[key])) {
            delete schema2[key];
          }
        }
      }
    }
    const parent = zodSchema._zod.parent;
    if (parent && parent !== ref) {
      flattenRef(parent);
      const parentSeen = ctx.seen.get(parent);
      if (parentSeen?.schema.$ref) {
        schema2.$ref = parentSeen.schema.$ref;
        if (parentSeen.def) {
          for (const key in schema2) {
            if (key === "$ref" || key === "allOf")
              continue;
            if (key in parentSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(parentSeen.def[key])) {
              delete schema2[key];
            }
          }
        }
      }
    }
    ctx.override({
      zodSchema,
      jsonSchema: schema2,
      path: seen.path ?? []
    });
  };
  for (const entry of [...ctx.seen.entries()].reverse()) {
    flattenRef(entry[0]);
  }
  const result = {};
  if (ctx.target === "draft-2020-12") {
    result.$schema = "https://json-schema.org/draft/2020-12/schema";
  } else if (ctx.target === "draft-07") {
    result.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (ctx.target === "draft-04") {
    result.$schema = "http://json-schema.org/draft-04/schema#";
  } else if (ctx.target === "openapi-3.0") {
  } else {
  }
  if (ctx.external?.uri) {
    const id = ctx.external.registry.get(schema)?.id;
    if (!id)
      throw new Error("Schema is missing an `id` property");
    result.$id = ctx.external.uri(id);
  }
  Object.assign(result, root.def ?? root.schema);
  const defs = ctx.external?.defs ?? {};
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (seen.def && seen.defId) {
      defs[seen.defId] = seen.def;
    }
  }
  if (ctx.external) {
  } else {
    if (Object.keys(defs).length > 0) {
      if (ctx.target === "draft-2020-12") {
        result.$defs = defs;
      } else {
        result.definitions = defs;
      }
    }
  }
  try {
    const finalized = JSON.parse(JSON.stringify(result));
    Object.defineProperty(finalized, "~standard", {
      value: {
        ...schema["~standard"],
        jsonSchema: {
          input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
          output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
        }
      },
      enumerable: false,
      writable: false
    });
    return finalized;
  } catch (_err) {
    throw new Error("Error converting schema to JSON.");
  }
}
function isTransforming(_schema, _ctx) {
  const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
  if (ctx.seen.has(_schema))
    return false;
  ctx.seen.add(_schema);
  const def = _schema._zod.def;
  if (def.type === "transform")
    return true;
  if (def.type === "array")
    return isTransforming(def.element, ctx);
  if (def.type === "set")
    return isTransforming(def.valueType, ctx);
  if (def.type === "lazy")
    return isTransforming(def.getter(), ctx);
  if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") {
    return isTransforming(def.innerType, ctx);
  }
  if (def.type === "intersection") {
    return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
  }
  if (def.type === "record" || def.type === "map") {
    return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
  }
  if (def.type === "pipe") {
    return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
  }
  if (def.type === "object") {
    for (const key in def.shape) {
      if (isTransforming(def.shape[key], ctx))
        return true;
    }
    return false;
  }
  if (def.type === "union") {
    for (const option of def.options) {
      if (isTransforming(option, ctx))
        return true;
    }
    return false;
  }
  if (def.type === "tuple") {
    for (const item of def.items) {
      if (isTransforming(item, ctx))
        return true;
    }
    if (def.rest && isTransforming(def.rest, ctx))
      return true;
    return false;
  }
  return false;
}
var createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
  const ctx = initializeContext({ ...params, processors });
  process2(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};
var createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
  const { libraryOptions, target } = params ?? {};
  const ctx = initializeContext({ ...libraryOptions ?? {}, target, io, processors });
  process2(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/core/json-schema-processors.js
var formatMap = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
};
var stringProcessor = (schema, ctx, _json, _params) => {
  const json2 = _json;
  json2.type = "string";
  const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
  if (typeof minimum === "number")
    json2.minLength = minimum;
  if (typeof maximum === "number")
    json2.maxLength = maximum;
  if (format) {
    json2.format = formatMap[format] ?? format;
    if (json2.format === "")
      delete json2.format;
    if (format === "time") {
      delete json2.format;
    }
  }
  if (contentEncoding)
    json2.contentEncoding = contentEncoding;
  if (patterns && patterns.size > 0) {
    const regexes = [...patterns];
    if (regexes.length === 1)
      json2.pattern = regexes[0].source;
    else if (regexes.length > 1) {
      json2.allOf = [
        ...regexes.map((regex) => ({
          ...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
          pattern: regex.source
        }))
      ];
    }
  }
};
var numberProcessor = (schema, ctx, _json, _params) => {
  const json2 = _json;
  const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
  if (typeof format === "string" && format.includes("int"))
    json2.type = "integer";
  else
    json2.type = "number";
  if (typeof exclusiveMinimum === "number") {
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json2.minimum = exclusiveMinimum;
      json2.exclusiveMinimum = true;
    } else {
      json2.exclusiveMinimum = exclusiveMinimum;
    }
  }
  if (typeof minimum === "number") {
    json2.minimum = minimum;
    if (typeof exclusiveMinimum === "number" && ctx.target !== "draft-04") {
      if (exclusiveMinimum >= minimum)
        delete json2.minimum;
      else
        delete json2.exclusiveMinimum;
    }
  }
  if (typeof exclusiveMaximum === "number") {
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json2.maximum = exclusiveMaximum;
      json2.exclusiveMaximum = true;
    } else {
      json2.exclusiveMaximum = exclusiveMaximum;
    }
  }
  if (typeof maximum === "number") {
    json2.maximum = maximum;
    if (typeof exclusiveMaximum === "number" && ctx.target !== "draft-04") {
      if (exclusiveMaximum <= maximum)
        delete json2.maximum;
      else
        delete json2.exclusiveMaximum;
    }
  }
  if (typeof multipleOf === "number")
    json2.multipleOf = multipleOf;
};
var booleanProcessor = (_schema, _ctx, json2, _params) => {
  json2.type = "boolean";
};
var bigintProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("BigInt cannot be represented in JSON Schema");
  }
};
var symbolProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Symbols cannot be represented in JSON Schema");
  }
};
var nullProcessor = (_schema, ctx, json2, _params) => {
  if (ctx.target === "openapi-3.0") {
    json2.type = "string";
    json2.nullable = true;
    json2.enum = [null];
  } else {
    json2.type = "null";
  }
};
var undefinedProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Undefined cannot be represented in JSON Schema");
  }
};
var voidProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Void cannot be represented in JSON Schema");
  }
};
var neverProcessor = (_schema, _ctx, json2, _params) => {
  json2.not = {};
};
var anyProcessor = (_schema, _ctx, _json, _params) => {
};
var unknownProcessor = (_schema, _ctx, _json, _params) => {
};
var dateProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Date cannot be represented in JSON Schema");
  }
};
var enumProcessor = (schema, _ctx, json2, _params) => {
  const def = schema._zod.def;
  const values = getEnumValues(def.entries);
  if (values.every((v) => typeof v === "number"))
    json2.type = "number";
  if (values.every((v) => typeof v === "string"))
    json2.type = "string";
  json2.enum = values;
};
var literalProcessor = (schema, ctx, json2, _params) => {
  const def = schema._zod.def;
  const vals = [];
  for (const val of def.values) {
    if (val === void 0) {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
      } else {
      }
    } else if (typeof val === "bigint") {
      if (ctx.unrepresentable === "throw") {
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      } else {
        vals.push(Number(val));
      }
    } else {
      vals.push(val);
    }
  }
  if (vals.length === 0) {
  } else if (vals.length === 1) {
    const val = vals[0];
    json2.type = val === null ? "null" : typeof val;
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json2.enum = [val];
    } else {
      json2.const = val;
    }
  } else {
    if (vals.every((v) => typeof v === "number"))
      json2.type = "number";
    if (vals.every((v) => typeof v === "string"))
      json2.type = "string";
    if (vals.every((v) => typeof v === "boolean"))
      json2.type = "boolean";
    if (vals.every((v) => v === null))
      json2.type = "null";
    json2.enum = vals;
  }
};
var nanProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("NaN cannot be represented in JSON Schema");
  }
};
var templateLiteralProcessor = (schema, _ctx, json2, _params) => {
  const _json = json2;
  const pattern = schema._zod.pattern;
  if (!pattern)
    throw new Error("Pattern not found in template literal");
  _json.type = "string";
  _json.pattern = pattern.source;
};
var fileProcessor = (schema, _ctx, json2, _params) => {
  const _json = json2;
  const file2 = {
    type: "string",
    format: "binary",
    contentEncoding: "binary"
  };
  const { minimum, maximum, mime } = schema._zod.bag;
  if (minimum !== void 0)
    file2.minLength = minimum;
  if (maximum !== void 0)
    file2.maxLength = maximum;
  if (mime) {
    if (mime.length === 1) {
      file2.contentMediaType = mime[0];
      Object.assign(_json, file2);
    } else {
      Object.assign(_json, file2);
      _json.anyOf = mime.map((m) => ({ contentMediaType: m }));
    }
  } else {
    Object.assign(_json, file2);
  }
};
var successProcessor = (_schema, _ctx, json2, _params) => {
  json2.type = "boolean";
};
var customProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Custom types cannot be represented in JSON Schema");
  }
};
var functionProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Function types cannot be represented in JSON Schema");
  }
};
var transformProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Transforms cannot be represented in JSON Schema");
  }
};
var mapProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Map cannot be represented in JSON Schema");
  }
};
var setProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Set cannot be represented in JSON Schema");
  }
};
var arrayProcessor = (schema, ctx, _json, params) => {
  const json2 = _json;
  const def = schema._zod.def;
  const { minimum, maximum } = schema._zod.bag;
  if (typeof minimum === "number")
    json2.minItems = minimum;
  if (typeof maximum === "number")
    json2.maxItems = maximum;
  json2.type = "array";
  json2.items = process2(def.element, ctx, { ...params, path: [...params.path, "items"] });
};
var objectProcessor = (schema, ctx, _json, params) => {
  const json2 = _json;
  const def = schema._zod.def;
  json2.type = "object";
  json2.properties = {};
  const shape = def.shape;
  for (const key in shape) {
    json2.properties[key] = process2(shape[key], ctx, {
      ...params,
      path: [...params.path, "properties", key]
    });
  }
  const allKeys = new Set(Object.keys(shape));
  const requiredKeys = new Set([...allKeys].filter((key) => {
    const v = def.shape[key]._zod;
    if (ctx.io === "input") {
      return v.optin === void 0;
    } else {
      return v.optout === void 0;
    }
  }));
  if (requiredKeys.size > 0) {
    json2.required = Array.from(requiredKeys);
  }
  if (def.catchall?._zod.def.type === "never") {
    json2.additionalProperties = false;
  } else if (!def.catchall) {
    if (ctx.io === "output")
      json2.additionalProperties = false;
  } else if (def.catchall) {
    json2.additionalProperties = process2(def.catchall, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
};
var unionProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  const isExclusive = def.inclusive === false;
  const options = def.options.map((x, i) => process2(x, ctx, {
    ...params,
    path: [...params.path, isExclusive ? "oneOf" : "anyOf", i]
  }));
  if (isExclusive) {
    json2.oneOf = options;
  } else {
    json2.anyOf = options;
  }
};
var intersectionProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  const a = process2(def.left, ctx, {
    ...params,
    path: [...params.path, "allOf", 0]
  });
  const b = process2(def.right, ctx, {
    ...params,
    path: [...params.path, "allOf", 1]
  });
  const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
  const allOf = [
    ...isSimpleIntersection(a) ? a.allOf : [a],
    ...isSimpleIntersection(b) ? b.allOf : [b]
  ];
  json2.allOf = allOf;
};
var tupleProcessor = (schema, ctx, _json, params) => {
  const json2 = _json;
  const def = schema._zod.def;
  json2.type = "array";
  const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
  const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
  const prefixItems = def.items.map((x, i) => process2(x, ctx, {
    ...params,
    path: [...params.path, prefixPath, i]
  }));
  const rest = def.rest ? process2(def.rest, ctx, {
    ...params,
    path: [...params.path, restPath, ...ctx.target === "openapi-3.0" ? [def.items.length] : []]
  }) : null;
  if (ctx.target === "draft-2020-12") {
    json2.prefixItems = prefixItems;
    if (rest) {
      json2.items = rest;
    }
  } else if (ctx.target === "openapi-3.0") {
    json2.items = {
      anyOf: prefixItems
    };
    if (rest) {
      json2.items.anyOf.push(rest);
    }
    json2.minItems = prefixItems.length;
    if (!rest) {
      json2.maxItems = prefixItems.length;
    }
  } else {
    json2.items = prefixItems;
    if (rest) {
      json2.additionalItems = rest;
    }
  }
  const { minimum, maximum } = schema._zod.bag;
  if (typeof minimum === "number")
    json2.minItems = minimum;
  if (typeof maximum === "number")
    json2.maxItems = maximum;
};
var recordProcessor = (schema, ctx, _json, params) => {
  const json2 = _json;
  const def = schema._zod.def;
  json2.type = "object";
  const keyType = def.keyType;
  const keyBag = keyType._zod.bag;
  const patterns = keyBag?.patterns;
  if (def.mode === "loose" && patterns && patterns.size > 0) {
    const valueSchema = process2(def.valueType, ctx, {
      ...params,
      path: [...params.path, "patternProperties", "*"]
    });
    json2.patternProperties = {};
    for (const pattern of patterns) {
      json2.patternProperties[pattern.source] = valueSchema;
    }
  } else {
    if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
      json2.propertyNames = process2(def.keyType, ctx, {
        ...params,
        path: [...params.path, "propertyNames"]
      });
    }
    json2.additionalProperties = process2(def.valueType, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
  const keyValues = keyType._zod.values;
  if (keyValues) {
    const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
    if (validKeyValues.length > 0) {
      json2.required = validKeyValues;
    }
  }
};
var nullableProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  const inner = process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  if (ctx.target === "openapi-3.0") {
    seen.ref = def.innerType;
    json2.nullable = true;
  } else {
    json2.anyOf = [inner, { type: "null" }];
  }
};
var nonoptionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var defaultProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json2.default = JSON.parse(JSON.stringify(def.defaultValue));
};
var prefaultProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  if (ctx.io === "input")
    json2._prefault = JSON.parse(JSON.stringify(def.defaultValue));
};
var catchProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  let catchValue;
  try {
    catchValue = def.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  json2.default = catchValue;
};
var pipeProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  const innerType = ctx.io === "input" ? def.in._zod.def.type === "transform" ? def.out : def.in : def.out;
  process2(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var readonlyProcessor = (schema, ctx, json2, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json2.readOnly = true;
};
var promiseProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var optionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process2(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var lazyProcessor = (schema, ctx, _json, params) => {
  const innerType = schema._zod.innerType;
  process2(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var allProcessors = {
  string: stringProcessor,
  number: numberProcessor,
  boolean: booleanProcessor,
  bigint: bigintProcessor,
  symbol: symbolProcessor,
  null: nullProcessor,
  undefined: undefinedProcessor,
  void: voidProcessor,
  never: neverProcessor,
  any: anyProcessor,
  unknown: unknownProcessor,
  date: dateProcessor,
  enum: enumProcessor,
  literal: literalProcessor,
  nan: nanProcessor,
  template_literal: templateLiteralProcessor,
  file: fileProcessor,
  success: successProcessor,
  custom: customProcessor,
  function: functionProcessor,
  transform: transformProcessor,
  map: mapProcessor,
  set: setProcessor,
  array: arrayProcessor,
  object: objectProcessor,
  union: unionProcessor,
  intersection: intersectionProcessor,
  tuple: tupleProcessor,
  record: recordProcessor,
  nullable: nullableProcessor,
  nonoptional: nonoptionalProcessor,
  default: defaultProcessor,
  prefault: prefaultProcessor,
  catch: catchProcessor,
  pipe: pipeProcessor,
  readonly: readonlyProcessor,
  promise: promiseProcessor,
  optional: optionalProcessor,
  lazy: lazyProcessor
};
function toJSONSchema(input, params) {
  if ("_idmap" in input) {
    const registry2 = input;
    const ctx2 = initializeContext({ ...params, processors: allProcessors });
    const defs = {};
    for (const entry of registry2._idmap.entries()) {
      const [_, schema] = entry;
      process2(schema, ctx2);
    }
    const schemas = {};
    const external = {
      registry: registry2,
      uri: params?.uri,
      defs
    };
    ctx2.external = external;
    for (const entry of registry2._idmap.entries()) {
      const [key, schema] = entry;
      extractDefs(ctx2, schema);
      schemas[key] = finalize(ctx2, schema);
    }
    if (Object.keys(defs).length > 0) {
      const defsSegment = ctx2.target === "draft-2020-12" ? "$defs" : "definitions";
      schemas.__shared = {
        [defsSegment]: defs
      };
    }
    return { schemas };
  }
  const ctx = initializeContext({ ...params, processors: allProcessors });
  process2(input, ctx);
  extractDefs(ctx, input);
  return finalize(ctx, input);
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/core/json-schema-generator.js
var JSONSchemaGenerator = class {
  /** @deprecated Access via ctx instead */
  get metadataRegistry() {
    return this.ctx.metadataRegistry;
  }
  /** @deprecated Access via ctx instead */
  get target() {
    return this.ctx.target;
  }
  /** @deprecated Access via ctx instead */
  get unrepresentable() {
    return this.ctx.unrepresentable;
  }
  /** @deprecated Access via ctx instead */
  get override() {
    return this.ctx.override;
  }
  /** @deprecated Access via ctx instead */
  get io() {
    return this.ctx.io;
  }
  /** @deprecated Access via ctx instead */
  get counter() {
    return this.ctx.counter;
  }
  set counter(value) {
    this.ctx.counter = value;
  }
  /** @deprecated Access via ctx instead */
  get seen() {
    return this.ctx.seen;
  }
  constructor(params) {
    let normalizedTarget = params?.target ?? "draft-2020-12";
    if (normalizedTarget === "draft-4")
      normalizedTarget = "draft-04";
    if (normalizedTarget === "draft-7")
      normalizedTarget = "draft-07";
    this.ctx = initializeContext({
      processors: allProcessors,
      target: normalizedTarget,
      ...params?.metadata && { metadata: params.metadata },
      ...params?.unrepresentable && { unrepresentable: params.unrepresentable },
      ...params?.override && { override: params.override },
      ...params?.io && { io: params.io }
    });
  }
  /**
   * Process a schema to prepare it for JSON Schema generation.
   * This must be called before emit().
   */
  process(schema, _params = { path: [], schemaPath: [] }) {
    return process2(schema, this.ctx, _params);
  }
  /**
   * Emit the final JSON Schema after processing.
   * Must call process() first.
   */
  emit(schema, _params) {
    if (_params) {
      if (_params.cycles)
        this.ctx.cycles = _params.cycles;
      if (_params.reused)
        this.ctx.reused = _params.reused;
      if (_params.external)
        this.ctx.external = _params.external;
    }
    extractDefs(this.ctx, schema);
    const result = finalize(this.ctx, schema);
    const { "~standard": _, ...plainResult } = result;
    return plainResult;
  }
};

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/core/json-schema.js
var json_schema_exports = {};

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/classic/schemas.js
var schemas_exports2 = {};
__export(schemas_exports2, {
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBase64: () => ZodBase64,
  ZodBase64URL: () => ZodBase64URL,
  ZodBigInt: () => ZodBigInt,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBoolean: () => ZodBoolean,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCUID: () => ZodCUID,
  ZodCUID2: () => ZodCUID2,
  ZodCatch: () => ZodCatch,
  ZodCodec: () => ZodCodec,
  ZodCustom: () => ZodCustom,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodE164: () => ZodE164,
  ZodEmail: () => ZodEmail,
  ZodEmoji: () => ZodEmoji,
  ZodEnum: () => ZodEnum,
  ZodExactOptional: () => ZodExactOptional,
  ZodFile: () => ZodFile,
  ZodFunction: () => ZodFunction,
  ZodGUID: () => ZodGUID,
  ZodIPv4: () => ZodIPv4,
  ZodIPv6: () => ZodIPv6,
  ZodIntersection: () => ZodIntersection,
  ZodJWT: () => ZodJWT,
  ZodKSUID: () => ZodKSUID,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMAC: () => ZodMAC,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNanoID: () => ZodNanoID,
  ZodNever: () => ZodNever,
  ZodNonOptional: () => ZodNonOptional,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodPipe: () => ZodPipe,
  ZodPrefault: () => ZodPrefault,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodStringFormat: () => ZodStringFormat,
  ZodSuccess: () => ZodSuccess,
  ZodSymbol: () => ZodSymbol,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodTransform: () => ZodTransform,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodULID: () => ZodULID,
  ZodURL: () => ZodURL,
  ZodUUID: () => ZodUUID,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  ZodXID: () => ZodXID,
  ZodXor: () => ZodXor,
  _ZodString: () => _ZodString,
  _default: () => _default2,
  _function: () => _function,
  any: () => any,
  array: () => array,
  base64: () => base642,
  base64url: () => base64url2,
  bigint: () => bigint2,
  boolean: () => boolean2,
  catch: () => _catch2,
  check: () => check,
  cidrv4: () => cidrv42,
  cidrv6: () => cidrv62,
  codec: () => codec,
  cuid: () => cuid3,
  cuid2: () => cuid22,
  custom: () => custom,
  date: () => date3,
  describe: () => describe2,
  discriminatedUnion: () => discriminatedUnion,
  e164: () => e1642,
  email: () => email2,
  emoji: () => emoji2,
  enum: () => _enum2,
  exactOptional: () => exactOptional,
  file: () => file,
  float32: () => float32,
  float64: () => float64,
  function: () => _function,
  guid: () => guid2,
  hash: () => hash,
  hex: () => hex2,
  hostname: () => hostname2,
  httpUrl: () => httpUrl,
  instanceof: () => _instanceof,
  int: () => int,
  int32: () => int32,
  int64: () => int64,
  intersection: () => intersection,
  ipv4: () => ipv42,
  ipv6: () => ipv62,
  json: () => json,
  jwt: () => jwt,
  keyof: () => keyof,
  ksuid: () => ksuid2,
  lazy: () => lazy,
  literal: () => literal,
  looseObject: () => looseObject,
  looseRecord: () => looseRecord,
  mac: () => mac2,
  map: () => map,
  meta: () => meta2,
  nan: () => nan,
  nanoid: () => nanoid2,
  nativeEnum: () => nativeEnum,
  never: () => never,
  nonoptional: () => nonoptional,
  null: () => _null3,
  nullable: () => nullable,
  nullish: () => nullish2,
  number: () => number2,
  object: () => object,
  optional: () => optional,
  partialRecord: () => partialRecord,
  pipe: () => pipe,
  prefault: () => prefault,
  preprocess: () => preprocess,
  promise: () => promise,
  readonly: () => readonly,
  record: () => record,
  refine: () => refine,
  set: () => set,
  strictObject: () => strictObject,
  string: () => string2,
  stringFormat: () => stringFormat,
  stringbool: () => stringbool,
  success: () => success,
  superRefine: () => superRefine,
  symbol: () => symbol,
  templateLiteral: () => templateLiteral,
  transform: () => transform,
  tuple: () => tuple,
  uint32: () => uint32,
  uint64: () => uint64,
  ulid: () => ulid2,
  undefined: () => _undefined3,
  union: () => union,
  unknown: () => unknown,
  url: () => url,
  uuid: () => uuid2,
  uuidv4: () => uuidv4,
  uuidv6: () => uuidv6,
  uuidv7: () => uuidv7,
  void: () => _void2,
  xid: () => xid2,
  xor: () => xor
});

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/classic/checks.js
var checks_exports2 = {};
__export(checks_exports2, {
  endsWith: () => _endsWith,
  gt: () => _gt,
  gte: () => _gte,
  includes: () => _includes,
  length: () => _length,
  lowercase: () => _lowercase,
  lt: () => _lt,
  lte: () => _lte,
  maxLength: () => _maxLength,
  maxSize: () => _maxSize,
  mime: () => _mime,
  minLength: () => _minLength,
  minSize: () => _minSize,
  multipleOf: () => _multipleOf,
  negative: () => _negative,
  nonnegative: () => _nonnegative,
  nonpositive: () => _nonpositive,
  normalize: () => _normalize,
  overwrite: () => _overwrite,
  positive: () => _positive,
  property: () => _property,
  regex: () => _regex,
  size: () => _size,
  slugify: () => _slugify,
  startsWith: () => _startsWith,
  toLowerCase: () => _toLowerCase,
  toUpperCase: () => _toUpperCase,
  trim: () => _trim,
  uppercase: () => _uppercase
});

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/classic/iso.js
var iso_exports = {};
__export(iso_exports, {
  ZodISODate: () => ZodISODate,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODuration: () => ZodISODuration,
  ZodISOTime: () => ZodISOTime,
  date: () => date2,
  datetime: () => datetime2,
  duration: () => duration2,
  time: () => time2
});
var ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
  $ZodISODateTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function datetime2(params) {
  return _isoDateTime(ZodISODateTime, params);
}
var ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
  $ZodISODate.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function date2(params) {
  return _isoDate(ZodISODate, params);
}
var ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
  $ZodISOTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function time2(params) {
  return _isoTime(ZodISOTime, params);
}
var ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
  $ZodISODuration.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function duration2(params) {
  return _isoDuration(ZodISODuration, params);
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/classic/errors.js
var initializer2 = (inst, issues) => {
  $ZodError.init(inst, issues);
  inst.name = "ZodError";
  Object.defineProperties(inst, {
    format: {
      value: (mapper) => formatError(inst, mapper)
      // enumerable: false,
    },
    flatten: {
      value: (mapper) => flattenError(inst, mapper)
      // enumerable: false,
    },
    addIssue: {
      value: (issue2) => {
        inst.issues.push(issue2);
        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (issues2) => {
        inst.issues.push(...issues2);
        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return inst.issues.length === 0;
      }
      // enumerable: false,
    }
  });
};
var ZodError = $constructor("ZodError", initializer2);
var ZodRealError = $constructor("ZodError", initializer2, {
  Parent: Error
});

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/classic/parse.js
var parse2 = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync2 = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse2 = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync2 = /* @__PURE__ */ _safeParseAsync(ZodRealError);
var encode2 = /* @__PURE__ */ _encode(ZodRealError);
var decode2 = /* @__PURE__ */ _decode(ZodRealError);
var encodeAsync2 = /* @__PURE__ */ _encodeAsync(ZodRealError);
var decodeAsync2 = /* @__PURE__ */ _decodeAsync(ZodRealError);
var safeEncode2 = /* @__PURE__ */ _safeEncode(ZodRealError);
var safeDecode2 = /* @__PURE__ */ _safeDecode(ZodRealError);
var safeEncodeAsync2 = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
var safeDecodeAsync2 = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/classic/schemas.js
var ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
  $ZodType.init(inst, def);
  Object.assign(inst["~standard"], {
    jsonSchema: {
      input: createStandardJSONSchemaMethod(inst, "input"),
      output: createStandardJSONSchemaMethod(inst, "output")
    }
  });
  inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
  inst.def = def;
  inst.type = def.type;
  Object.defineProperty(inst, "_def", { value: def });
  inst.check = (...checks) => {
    return inst.clone(util_exports.mergeDefs(def, {
      checks: [
        ...def.checks ?? [],
        ...checks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
      ]
    }), {
      parent: true
    });
  };
  inst.with = inst.check;
  inst.clone = (def2, params) => clone(inst, def2, params);
  inst.brand = () => inst;
  inst.register = ((reg, meta3) => {
    reg.add(inst, meta3);
    return inst;
  });
  inst.parse = (data, params) => parse2(inst, data, params, { callee: inst.parse });
  inst.safeParse = (data, params) => safeParse2(inst, data, params);
  inst.parseAsync = async (data, params) => parseAsync2(inst, data, params, { callee: inst.parseAsync });
  inst.safeParseAsync = async (data, params) => safeParseAsync2(inst, data, params);
  inst.spa = inst.safeParseAsync;
  inst.encode = (data, params) => encode2(inst, data, params);
  inst.decode = (data, params) => decode2(inst, data, params);
  inst.encodeAsync = async (data, params) => encodeAsync2(inst, data, params);
  inst.decodeAsync = async (data, params) => decodeAsync2(inst, data, params);
  inst.safeEncode = (data, params) => safeEncode2(inst, data, params);
  inst.safeDecode = (data, params) => safeDecode2(inst, data, params);
  inst.safeEncodeAsync = async (data, params) => safeEncodeAsync2(inst, data, params);
  inst.safeDecodeAsync = async (data, params) => safeDecodeAsync2(inst, data, params);
  inst.refine = (check2, params) => inst.check(refine(check2, params));
  inst.superRefine = (refinement) => inst.check(superRefine(refinement));
  inst.overwrite = (fn) => inst.check(_overwrite(fn));
  inst.optional = () => optional(inst);
  inst.exactOptional = () => exactOptional(inst);
  inst.nullable = () => nullable(inst);
  inst.nullish = () => optional(nullable(inst));
  inst.nonoptional = (params) => nonoptional(inst, params);
  inst.array = () => array(inst);
  inst.or = (arg) => union([inst, arg]);
  inst.and = (arg) => intersection(inst, arg);
  inst.transform = (tx) => pipe(inst, transform(tx));
  inst.default = (def2) => _default2(inst, def2);
  inst.prefault = (def2) => prefault(inst, def2);
  inst.catch = (params) => _catch2(inst, params);
  inst.pipe = (target) => pipe(inst, target);
  inst.readonly = () => readonly(inst);
  inst.describe = (description) => {
    const cl = inst.clone();
    globalRegistry.add(cl, { description });
    return cl;
  };
  Object.defineProperty(inst, "description", {
    get() {
      return globalRegistry.get(inst)?.description;
    },
    configurable: true
  });
  inst.meta = (...args) => {
    if (args.length === 0) {
      return globalRegistry.get(inst);
    }
    const cl = inst.clone();
    globalRegistry.add(cl, args[0]);
    return cl;
  };
  inst.isOptional = () => inst.safeParse(void 0).success;
  inst.isNullable = () => inst.safeParse(null).success;
  inst.apply = (fn) => fn(inst);
  return inst;
});
var _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => stringProcessor(inst, ctx, json2, params);
  const bag = inst._zod.bag;
  inst.format = bag.format ?? null;
  inst.minLength = bag.minimum ?? null;
  inst.maxLength = bag.maximum ?? null;
  inst.regex = (...args) => inst.check(_regex(...args));
  inst.includes = (...args) => inst.check(_includes(...args));
  inst.startsWith = (...args) => inst.check(_startsWith(...args));
  inst.endsWith = (...args) => inst.check(_endsWith(...args));
  inst.min = (...args) => inst.check(_minLength(...args));
  inst.max = (...args) => inst.check(_maxLength(...args));
  inst.length = (...args) => inst.check(_length(...args));
  inst.nonempty = (...args) => inst.check(_minLength(1, ...args));
  inst.lowercase = (params) => inst.check(_lowercase(params));
  inst.uppercase = (params) => inst.check(_uppercase(params));
  inst.trim = () => inst.check(_trim());
  inst.normalize = (...args) => inst.check(_normalize(...args));
  inst.toLowerCase = () => inst.check(_toLowerCase());
  inst.toUpperCase = () => inst.check(_toUpperCase());
  inst.slugify = () => inst.check(_slugify());
});
var ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  _ZodString.init(inst, def);
  inst.email = (params) => inst.check(_email(ZodEmail, params));
  inst.url = (params) => inst.check(_url(ZodURL, params));
  inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
  inst.emoji = (params) => inst.check(_emoji2(ZodEmoji, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
  inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
  inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
  inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
  inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
  inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
  inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
  inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
  inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
  inst.xid = (params) => inst.check(_xid(ZodXID, params));
  inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
  inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
  inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
  inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
  inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
  inst.e164 = (params) => inst.check(_e164(ZodE164, params));
  inst.datetime = (params) => inst.check(datetime2(params));
  inst.date = (params) => inst.check(date2(params));
  inst.time = (params) => inst.check(time2(params));
  inst.duration = (params) => inst.check(duration2(params));
});
function string2(params) {
  return _string(ZodString, params);
}
var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  _ZodString.init(inst, def);
});
var ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
  $ZodEmail.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function email2(params) {
  return _email(ZodEmail, params);
}
var ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
  $ZodGUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function guid2(params) {
  return _guid(ZodGUID, params);
}
var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
  $ZodUUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function uuid2(params) {
  return _uuid(ZodUUID, params);
}
function uuidv4(params) {
  return _uuidv4(ZodUUID, params);
}
function uuidv6(params) {
  return _uuidv6(ZodUUID, params);
}
function uuidv7(params) {
  return _uuidv7(ZodUUID, params);
}
var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
  $ZodURL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function url(params) {
  return _url(ZodURL, params);
}
function httpUrl(params) {
  return _url(ZodURL, {
    protocol: /^https?$/,
    hostname: regexes_exports.domain,
    ...util_exports.normalizeParams(params)
  });
}
var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
  $ZodEmoji.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function emoji2(params) {
  return _emoji2(ZodEmoji, params);
}
var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
  $ZodNanoID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function nanoid2(params) {
  return _nanoid(ZodNanoID, params);
}
var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
  $ZodCUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cuid3(params) {
  return _cuid(ZodCUID, params);
}
var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
  $ZodCUID2.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cuid22(params) {
  return _cuid2(ZodCUID2, params);
}
var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
  $ZodULID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ulid2(params) {
  return _ulid(ZodULID, params);
}
var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
  $ZodXID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function xid2(params) {
  return _xid(ZodXID, params);
}
var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
  $ZodKSUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ksuid2(params) {
  return _ksuid(ZodKSUID, params);
}
var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
  $ZodIPv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ipv42(params) {
  return _ipv4(ZodIPv4, params);
}
var ZodMAC = /* @__PURE__ */ $constructor("ZodMAC", (inst, def) => {
  $ZodMAC.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function mac2(params) {
  return _mac(ZodMAC, params);
}
var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
  $ZodIPv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ipv62(params) {
  return _ipv6(ZodIPv6, params);
}
var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
  $ZodCIDRv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cidrv42(params) {
  return _cidrv4(ZodCIDRv4, params);
}
var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
  $ZodCIDRv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cidrv62(params) {
  return _cidrv6(ZodCIDRv6, params);
}
var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
  $ZodBase64.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function base642(params) {
  return _base64(ZodBase64, params);
}
var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
  $ZodBase64URL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function base64url2(params) {
  return _base64url(ZodBase64URL, params);
}
var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
  $ZodE164.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function e1642(params) {
  return _e164(ZodE164, params);
}
var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
  $ZodJWT.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function jwt(params) {
  return _jwt(ZodJWT, params);
}
var ZodCustomStringFormat = /* @__PURE__ */ $constructor("ZodCustomStringFormat", (inst, def) => {
  $ZodCustomStringFormat.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function stringFormat(format, fnOrRegex, _params = {}) {
  return _stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
}
function hostname2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hostname", regexes_exports.hostname, _params);
}
function hex2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hex", regexes_exports.hex, _params);
}
function hash(alg, params) {
  const enc = params?.enc ?? "hex";
  const format = `${alg}_${enc}`;
  const regex = regexes_exports[format];
  if (!regex)
    throw new Error(`Unrecognized hash format: ${format}`);
  return _stringFormat(ZodCustomStringFormat, format, regex, params);
}
var ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
  $ZodNumber.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => numberProcessor(inst, ctx, json2, params);
  inst.gt = (value, params) => inst.check(_gt(value, params));
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.lt = (value, params) => inst.check(_lt(value, params));
  inst.lte = (value, params) => inst.check(_lte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  inst.int = (params) => inst.check(int(params));
  inst.safe = (params) => inst.check(int(params));
  inst.positive = (params) => inst.check(_gt(0, params));
  inst.nonnegative = (params) => inst.check(_gte(0, params));
  inst.negative = (params) => inst.check(_lt(0, params));
  inst.nonpositive = (params) => inst.check(_lte(0, params));
  inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
  inst.step = (value, params) => inst.check(_multipleOf(value, params));
  inst.finite = () => inst;
  const bag = inst._zod.bag;
  inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
  inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
  inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
  inst.isFinite = true;
  inst.format = bag.format ?? null;
});
function number2(params) {
  return _number(ZodNumber, params);
}
var ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
  $ZodNumberFormat.init(inst, def);
  ZodNumber.init(inst, def);
});
function int(params) {
  return _int(ZodNumberFormat, params);
}
function float32(params) {
  return _float32(ZodNumberFormat, params);
}
function float64(params) {
  return _float64(ZodNumberFormat, params);
}
function int32(params) {
  return _int32(ZodNumberFormat, params);
}
function uint32(params) {
  return _uint32(ZodNumberFormat, params);
}
var ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
  $ZodBoolean.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => booleanProcessor(inst, ctx, json2, params);
});
function boolean2(params) {
  return _boolean(ZodBoolean, params);
}
var ZodBigInt = /* @__PURE__ */ $constructor("ZodBigInt", (inst, def) => {
  $ZodBigInt.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => bigintProcessor(inst, ctx, json2, params);
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.gt = (value, params) => inst.check(_gt(value, params));
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.lt = (value, params) => inst.check(_lt(value, params));
  inst.lte = (value, params) => inst.check(_lte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  inst.positive = (params) => inst.check(_gt(BigInt(0), params));
  inst.negative = (params) => inst.check(_lt(BigInt(0), params));
  inst.nonpositive = (params) => inst.check(_lte(BigInt(0), params));
  inst.nonnegative = (params) => inst.check(_gte(BigInt(0), params));
  inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
  const bag = inst._zod.bag;
  inst.minValue = bag.minimum ?? null;
  inst.maxValue = bag.maximum ?? null;
  inst.format = bag.format ?? null;
});
function bigint2(params) {
  return _bigint(ZodBigInt, params);
}
var ZodBigIntFormat = /* @__PURE__ */ $constructor("ZodBigIntFormat", (inst, def) => {
  $ZodBigIntFormat.init(inst, def);
  ZodBigInt.init(inst, def);
});
function int64(params) {
  return _int64(ZodBigIntFormat, params);
}
function uint64(params) {
  return _uint64(ZodBigIntFormat, params);
}
var ZodSymbol = /* @__PURE__ */ $constructor("ZodSymbol", (inst, def) => {
  $ZodSymbol.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => symbolProcessor(inst, ctx, json2, params);
});
function symbol(params) {
  return _symbol(ZodSymbol, params);
}
var ZodUndefined = /* @__PURE__ */ $constructor("ZodUndefined", (inst, def) => {
  $ZodUndefined.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => undefinedProcessor(inst, ctx, json2, params);
});
function _undefined3(params) {
  return _undefined2(ZodUndefined, params);
}
var ZodNull = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
  $ZodNull.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => nullProcessor(inst, ctx, json2, params);
});
function _null3(params) {
  return _null2(ZodNull, params);
}
var ZodAny = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
  $ZodAny.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => anyProcessor(inst, ctx, json2, params);
});
function any() {
  return _any(ZodAny);
}
var ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
  $ZodUnknown.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => unknownProcessor(inst, ctx, json2, params);
});
function unknown() {
  return _unknown(ZodUnknown);
}
var ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
  $ZodNever.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => neverProcessor(inst, ctx, json2, params);
});
function never(params) {
  return _never(ZodNever, params);
}
var ZodVoid = /* @__PURE__ */ $constructor("ZodVoid", (inst, def) => {
  $ZodVoid.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => voidProcessor(inst, ctx, json2, params);
});
function _void2(params) {
  return _void(ZodVoid, params);
}
var ZodDate = /* @__PURE__ */ $constructor("ZodDate", (inst, def) => {
  $ZodDate.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => dateProcessor(inst, ctx, json2, params);
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  const c = inst._zod.bag;
  inst.minDate = c.minimum ? new Date(c.minimum) : null;
  inst.maxDate = c.maximum ? new Date(c.maximum) : null;
});
function date3(params) {
  return _date(ZodDate, params);
}
var ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
  $ZodArray.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => arrayProcessor(inst, ctx, json2, params);
  inst.element = def.element;
  inst.min = (minLength, params) => inst.check(_minLength(minLength, params));
  inst.nonempty = (params) => inst.check(_minLength(1, params));
  inst.max = (maxLength, params) => inst.check(_maxLength(maxLength, params));
  inst.length = (len, params) => inst.check(_length(len, params));
  inst.unwrap = () => inst.element;
});
function array(element, params) {
  return _array(ZodArray, element, params);
}
function keyof(schema) {
  const shape = schema._zod.def.shape;
  return _enum2(Object.keys(shape));
}
var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
  $ZodObjectJIT.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => objectProcessor(inst, ctx, json2, params);
  util_exports.defineLazy(inst, "shape", () => {
    return def.shape;
  });
  inst.keyof = () => _enum2(Object.keys(inst._zod.def.shape));
  inst.catchall = (catchall) => inst.clone({ ...inst._zod.def, catchall });
  inst.passthrough = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.loose = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.strict = () => inst.clone({ ...inst._zod.def, catchall: never() });
  inst.strip = () => inst.clone({ ...inst._zod.def, catchall: void 0 });
  inst.extend = (incoming) => {
    return util_exports.extend(inst, incoming);
  };
  inst.safeExtend = (incoming) => {
    return util_exports.safeExtend(inst, incoming);
  };
  inst.merge = (other) => util_exports.merge(inst, other);
  inst.pick = (mask) => util_exports.pick(inst, mask);
  inst.omit = (mask) => util_exports.omit(inst, mask);
  inst.partial = (...args) => util_exports.partial(ZodOptional, inst, args[0]);
  inst.required = (...args) => util_exports.required(ZodNonOptional, inst, args[0]);
});
function object(shape, params) {
  const def = {
    type: "object",
    shape: shape ?? {},
    ...util_exports.normalizeParams(params)
  };
  return new ZodObject(def);
}
function strictObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: never(),
    ...util_exports.normalizeParams(params)
  });
}
function looseObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: unknown(),
    ...util_exports.normalizeParams(params)
  });
}
var ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => unionProcessor(inst, ctx, json2, params);
  inst.options = def.options;
});
function union(options, params) {
  return new ZodUnion({
    type: "union",
    options,
    ...util_exports.normalizeParams(params)
  });
}
var ZodXor = /* @__PURE__ */ $constructor("ZodXor", (inst, def) => {
  ZodUnion.init(inst, def);
  $ZodXor.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => unionProcessor(inst, ctx, json2, params);
  inst.options = def.options;
});
function xor(options, params) {
  return new ZodXor({
    type: "union",
    options,
    inclusive: false,
    ...util_exports.normalizeParams(params)
  });
}
var ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
  ZodUnion.init(inst, def);
  $ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
  return new ZodDiscriminatedUnion({
    type: "union",
    options,
    discriminator,
    ...util_exports.normalizeParams(params)
  });
}
var ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
  $ZodIntersection.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => intersectionProcessor(inst, ctx, json2, params);
});
function intersection(left, right) {
  return new ZodIntersection({
    type: "intersection",
    left,
    right
  });
}
var ZodTuple = /* @__PURE__ */ $constructor("ZodTuple", (inst, def) => {
  $ZodTuple.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => tupleProcessor(inst, ctx, json2, params);
  inst.rest = (rest) => inst.clone({
    ...inst._zod.def,
    rest
  });
});
function tuple(items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new ZodTuple({
    type: "tuple",
    items,
    rest,
    ...util_exports.normalizeParams(params)
  });
}
var ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
  $ZodRecord.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => recordProcessor(inst, ctx, json2, params);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
function partialRecord(keyType, valueType, params) {
  const k = clone(keyType);
  k._zod.values = void 0;
  return new ZodRecord({
    type: "record",
    keyType: k,
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
function looseRecord(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    mode: "loose",
    ...util_exports.normalizeParams(params)
  });
}
var ZodMap = /* @__PURE__ */ $constructor("ZodMap", (inst, def) => {
  $ZodMap.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => mapProcessor(inst, ctx, json2, params);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
  inst.min = (...args) => inst.check(_minSize(...args));
  inst.nonempty = (params) => inst.check(_minSize(1, params));
  inst.max = (...args) => inst.check(_maxSize(...args));
  inst.size = (...args) => inst.check(_size(...args));
});
function map(keyType, valueType, params) {
  return new ZodMap({
    type: "map",
    keyType,
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
var ZodSet = /* @__PURE__ */ $constructor("ZodSet", (inst, def) => {
  $ZodSet.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => setProcessor(inst, ctx, json2, params);
  inst.min = (...args) => inst.check(_minSize(...args));
  inst.nonempty = (params) => inst.check(_minSize(1, params));
  inst.max = (...args) => inst.check(_maxSize(...args));
  inst.size = (...args) => inst.check(_size(...args));
});
function set(valueType, params) {
  return new ZodSet({
    type: "set",
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
var ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
  $ZodEnum.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => enumProcessor(inst, ctx, json2, params);
  inst.enum = def.entries;
  inst.options = Object.values(def.entries);
  const keys = new Set(Object.keys(def.entries));
  inst.extract = (values, params) => {
    const newEntries = {};
    for (const value of values) {
      if (keys.has(value)) {
        newEntries[value] = def.entries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...util_exports.normalizeParams(params),
      entries: newEntries
    });
  };
  inst.exclude = (values, params) => {
    const newEntries = { ...def.entries };
    for (const value of values) {
      if (keys.has(value)) {
        delete newEntries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...util_exports.normalizeParams(params),
      entries: newEntries
    });
  };
});
function _enum2(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodEnum({
    type: "enum",
    entries,
    ...util_exports.normalizeParams(params)
  });
}
function nativeEnum(entries, params) {
  return new ZodEnum({
    type: "enum",
    entries,
    ...util_exports.normalizeParams(params)
  });
}
var ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
  $ZodLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => literalProcessor(inst, ctx, json2, params);
  inst.values = new Set(def.values);
  Object.defineProperty(inst, "value", {
    get() {
      if (def.values.length > 1) {
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      }
      return def.values[0];
    }
  });
});
function literal(value, params) {
  return new ZodLiteral({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...util_exports.normalizeParams(params)
  });
}
var ZodFile = /* @__PURE__ */ $constructor("ZodFile", (inst, def) => {
  $ZodFile.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => fileProcessor(inst, ctx, json2, params);
  inst.min = (size, params) => inst.check(_minSize(size, params));
  inst.max = (size, params) => inst.check(_maxSize(size, params));
  inst.mime = (types, params) => inst.check(_mime(Array.isArray(types) ? types : [types], params));
});
function file(params) {
  return _file(ZodFile, params);
}
var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
  $ZodTransform.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => transformProcessor(inst, ctx, json2, params);
  inst._zod.parse = (payload, _ctx) => {
    if (_ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(util_exports.issue(issue2, payload.value, def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = inst);
        payload.issues.push(util_exports.issue(_issue));
      }
    };
    const output = def.transform(payload.value, payload);
    if (output instanceof Promise) {
      return output.then((output2) => {
        payload.value = output2;
        return payload;
      });
    }
    payload.value = output;
    return payload;
  };
});
function transform(fn) {
  return new ZodTransform({
    type: "transform",
    transform: fn
  });
}
var ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => optionalProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
  return new ZodOptional({
    type: "optional",
    innerType
  });
}
var ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
  $ZodExactOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => optionalProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
  return new ZodExactOptional({
    type: "optional",
    innerType
  });
}
var ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
  $ZodNullable.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => nullableProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
  return new ZodNullable({
    type: "nullable",
    innerType
  });
}
function nullish2(innerType) {
  return optional(nullable(innerType));
}
var ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
  $ZodDefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => defaultProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeDefault = inst.unwrap;
});
function _default2(innerType, defaultValue) {
  return new ZodDefault({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
    }
  });
}
var ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
  $ZodPrefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => prefaultProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
  return new ZodPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
    }
  });
}
var ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
  $ZodNonOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => nonoptionalProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
  return new ZodNonOptional({
    type: "nonoptional",
    innerType,
    ...util_exports.normalizeParams(params)
  });
}
var ZodSuccess = /* @__PURE__ */ $constructor("ZodSuccess", (inst, def) => {
  $ZodSuccess.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => successProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function success(innerType) {
  return new ZodSuccess({
    type: "success",
    innerType
  });
}
var ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
  $ZodCatch.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => catchProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeCatch = inst.unwrap;
});
function _catch2(innerType, catchValue) {
  return new ZodCatch({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
var ZodNaN = /* @__PURE__ */ $constructor("ZodNaN", (inst, def) => {
  $ZodNaN.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => nanProcessor(inst, ctx, json2, params);
});
function nan(params) {
  return _nan(ZodNaN, params);
}
var ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
  $ZodPipe.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => pipeProcessor(inst, ctx, json2, params);
  inst.in = def.in;
  inst.out = def.out;
});
function pipe(in_, out) {
  return new ZodPipe({
    type: "pipe",
    in: in_,
    out
    // ...util.normalizeParams(params),
  });
}
var ZodCodec = /* @__PURE__ */ $constructor("ZodCodec", (inst, def) => {
  ZodPipe.init(inst, def);
  $ZodCodec.init(inst, def);
});
function codec(in_, out, params) {
  return new ZodCodec({
    type: "pipe",
    in: in_,
    out,
    transform: params.decode,
    reverseTransform: params.encode
  });
}
var ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
  $ZodReadonly.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => readonlyProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
  return new ZodReadonly({
    type: "readonly",
    innerType
  });
}
var ZodTemplateLiteral = /* @__PURE__ */ $constructor("ZodTemplateLiteral", (inst, def) => {
  $ZodTemplateLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => templateLiteralProcessor(inst, ctx, json2, params);
});
function templateLiteral(parts, params) {
  return new ZodTemplateLiteral({
    type: "template_literal",
    parts,
    ...util_exports.normalizeParams(params)
  });
}
var ZodLazy = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
  $ZodLazy.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => lazyProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
  return new ZodLazy({
    type: "lazy",
    getter
  });
}
var ZodPromise = /* @__PURE__ */ $constructor("ZodPromise", (inst, def) => {
  $ZodPromise.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => promiseProcessor(inst, ctx, json2, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function promise(innerType) {
  return new ZodPromise({
    type: "promise",
    innerType
  });
}
var ZodFunction = /* @__PURE__ */ $constructor("ZodFunction", (inst, def) => {
  $ZodFunction.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => functionProcessor(inst, ctx, json2, params);
});
function _function(params) {
  return new ZodFunction({
    type: "function",
    input: Array.isArray(params?.input) ? tuple(params?.input) : params?.input ?? array(unknown()),
    output: params?.output ?? unknown()
  });
}
var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
  $ZodCustom.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json2, params) => customProcessor(inst, ctx, json2, params);
});
function check(fn) {
  const ch = new $ZodCheck({
    check: "custom"
    // ...util.normalizeParams(params),
  });
  ch._zod.check = fn;
  return ch;
}
function custom(fn, _params) {
  return _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
  return _refine(ZodCustom, fn, _params);
}
function superRefine(fn) {
  return _superRefine(fn);
}
var describe2 = describe;
var meta2 = meta;
function _instanceof(cls, params = {}) {
  const inst = new ZodCustom({
    type: "custom",
    check: "custom",
    fn: (data) => data instanceof cls,
    abort: true,
    ...util_exports.normalizeParams(params)
  });
  inst._zod.bag.Class = cls;
  inst._zod.check = (payload) => {
    if (!(payload.value instanceof cls)) {
      payload.issues.push({
        code: "invalid_type",
        expected: cls.name,
        input: payload.value,
        inst,
        path: [...inst._zod.def.path ?? []]
      });
    }
  };
  return inst;
}
var stringbool = (...args) => _stringbool({
  Codec: ZodCodec,
  Boolean: ZodBoolean,
  String: ZodString
}, ...args);
function json(params) {
  const jsonSchema = lazy(() => {
    return union([string2(params), number2(), boolean2(), _null3(), array(jsonSchema), record(string2(), jsonSchema)]);
  });
  return jsonSchema;
}
function preprocess(fn, schema) {
  return pipe(transform(fn), schema);
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/classic/compat.js
var ZodIssueCode = {
  invalid_type: "invalid_type",
  too_big: "too_big",
  too_small: "too_small",
  invalid_format: "invalid_format",
  not_multiple_of: "not_multiple_of",
  unrecognized_keys: "unrecognized_keys",
  invalid_union: "invalid_union",
  invalid_key: "invalid_key",
  invalid_element: "invalid_element",
  invalid_value: "invalid_value",
  custom: "custom"
};
function setErrorMap(map2) {
  config({
    customError: map2
  });
}
function getErrorMap() {
  return config().customError;
}
var ZodFirstPartyTypeKind;
/* @__PURE__ */ (function(ZodFirstPartyTypeKind2) {
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/classic/from-json-schema.js
var z = {
  ...schemas_exports2,
  ...checks_exports2,
  iso: iso_exports
};
var RECOGNIZED_KEYS = /* @__PURE__ */ new Set([
  // Schema identification
  "$schema",
  "$ref",
  "$defs",
  "definitions",
  // Core schema keywords
  "$id",
  "id",
  "$comment",
  "$anchor",
  "$vocabulary",
  "$dynamicRef",
  "$dynamicAnchor",
  // Type
  "type",
  "enum",
  "const",
  // Composition
  "anyOf",
  "oneOf",
  "allOf",
  "not",
  // Object
  "properties",
  "required",
  "additionalProperties",
  "patternProperties",
  "propertyNames",
  "minProperties",
  "maxProperties",
  // Array
  "items",
  "prefixItems",
  "additionalItems",
  "minItems",
  "maxItems",
  "uniqueItems",
  "contains",
  "minContains",
  "maxContains",
  // String
  "minLength",
  "maxLength",
  "pattern",
  "format",
  // Number
  "minimum",
  "maximum",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "multipleOf",
  // Already handled metadata
  "description",
  "default",
  // Content
  "contentEncoding",
  "contentMediaType",
  "contentSchema",
  // Unsupported (error-throwing)
  "unevaluatedItems",
  "unevaluatedProperties",
  "if",
  "then",
  "else",
  "dependentSchemas",
  "dependentRequired",
  // OpenAPI
  "nullable",
  "readOnly"
]);
function detectVersion(schema, defaultTarget) {
  const $schema = schema.$schema;
  if ($schema === "https://json-schema.org/draft/2020-12/schema") {
    return "draft-2020-12";
  }
  if ($schema === "http://json-schema.org/draft-07/schema#") {
    return "draft-7";
  }
  if ($schema === "http://json-schema.org/draft-04/schema#") {
    return "draft-4";
  }
  return defaultTarget ?? "draft-2020-12";
}
function resolveRef(ref, ctx) {
  if (!ref.startsWith("#")) {
    throw new Error("External $ref is not supported, only local refs (#/...) are allowed");
  }
  const path2 = ref.slice(1).split("/").filter(Boolean);
  if (path2.length === 0) {
    return ctx.rootSchema;
  }
  const defsKey = ctx.version === "draft-2020-12" ? "$defs" : "definitions";
  if (path2[0] === defsKey) {
    const key = path2[1];
    if (!key || !ctx.defs[key]) {
      throw new Error(`Reference not found: ${ref}`);
    }
    return ctx.defs[key];
  }
  throw new Error(`Reference not found: ${ref}`);
}
function convertBaseSchema(schema, ctx) {
  if (schema.not !== void 0) {
    if (typeof schema.not === "object" && Object.keys(schema.not).length === 0) {
      return z.never();
    }
    throw new Error("not is not supported in Zod (except { not: {} } for never)");
  }
  if (schema.unevaluatedItems !== void 0) {
    throw new Error("unevaluatedItems is not supported");
  }
  if (schema.unevaluatedProperties !== void 0) {
    throw new Error("unevaluatedProperties is not supported");
  }
  if (schema.if !== void 0 || schema.then !== void 0 || schema.else !== void 0) {
    throw new Error("Conditional schemas (if/then/else) are not supported");
  }
  if (schema.dependentSchemas !== void 0 || schema.dependentRequired !== void 0) {
    throw new Error("dependentSchemas and dependentRequired are not supported");
  }
  if (schema.$ref) {
    const refPath = schema.$ref;
    if (ctx.refs.has(refPath)) {
      return ctx.refs.get(refPath);
    }
    if (ctx.processing.has(refPath)) {
      return z.lazy(() => {
        if (!ctx.refs.has(refPath)) {
          throw new Error(`Circular reference not resolved: ${refPath}`);
        }
        return ctx.refs.get(refPath);
      });
    }
    ctx.processing.add(refPath);
    const resolved = resolveRef(refPath, ctx);
    const zodSchema2 = convertSchema(resolved, ctx);
    ctx.refs.set(refPath, zodSchema2);
    ctx.processing.delete(refPath);
    return zodSchema2;
  }
  if (schema.enum !== void 0) {
    const enumValues = schema.enum;
    if (ctx.version === "openapi-3.0" && schema.nullable === true && enumValues.length === 1 && enumValues[0] === null) {
      return z.null();
    }
    if (enumValues.length === 0) {
      return z.never();
    }
    if (enumValues.length === 1) {
      return z.literal(enumValues[0]);
    }
    if (enumValues.every((v) => typeof v === "string")) {
      return z.enum(enumValues);
    }
    const literalSchemas = enumValues.map((v) => z.literal(v));
    if (literalSchemas.length < 2) {
      return literalSchemas[0];
    }
    return z.union([literalSchemas[0], literalSchemas[1], ...literalSchemas.slice(2)]);
  }
  if (schema.const !== void 0) {
    return z.literal(schema.const);
  }
  const type = schema.type;
  if (Array.isArray(type)) {
    const typeSchemas = type.map((t) => {
      const typeSchema = { ...schema, type: t };
      return convertBaseSchema(typeSchema, ctx);
    });
    if (typeSchemas.length === 0) {
      return z.never();
    }
    if (typeSchemas.length === 1) {
      return typeSchemas[0];
    }
    return z.union(typeSchemas);
  }
  if (!type) {
    return z.any();
  }
  let zodSchema;
  switch (type) {
    case "string": {
      let stringSchema = z.string();
      if (schema.format) {
        const format = schema.format;
        if (format === "email") {
          stringSchema = stringSchema.check(z.email());
        } else if (format === "uri" || format === "uri-reference") {
          stringSchema = stringSchema.check(z.url());
        } else if (format === "uuid" || format === "guid") {
          stringSchema = stringSchema.check(z.uuid());
        } else if (format === "date-time") {
          stringSchema = stringSchema.check(z.iso.datetime());
        } else if (format === "date") {
          stringSchema = stringSchema.check(z.iso.date());
        } else if (format === "time") {
          stringSchema = stringSchema.check(z.iso.time());
        } else if (format === "duration") {
          stringSchema = stringSchema.check(z.iso.duration());
        } else if (format === "ipv4") {
          stringSchema = stringSchema.check(z.ipv4());
        } else if (format === "ipv6") {
          stringSchema = stringSchema.check(z.ipv6());
        } else if (format === "mac") {
          stringSchema = stringSchema.check(z.mac());
        } else if (format === "cidr") {
          stringSchema = stringSchema.check(z.cidrv4());
        } else if (format === "cidr-v6") {
          stringSchema = stringSchema.check(z.cidrv6());
        } else if (format === "base64") {
          stringSchema = stringSchema.check(z.base64());
        } else if (format === "base64url") {
          stringSchema = stringSchema.check(z.base64url());
        } else if (format === "e164") {
          stringSchema = stringSchema.check(z.e164());
        } else if (format === "jwt") {
          stringSchema = stringSchema.check(z.jwt());
        } else if (format === "emoji") {
          stringSchema = stringSchema.check(z.emoji());
        } else if (format === "nanoid") {
          stringSchema = stringSchema.check(z.nanoid());
        } else if (format === "cuid") {
          stringSchema = stringSchema.check(z.cuid());
        } else if (format === "cuid2") {
          stringSchema = stringSchema.check(z.cuid2());
        } else if (format === "ulid") {
          stringSchema = stringSchema.check(z.ulid());
        } else if (format === "xid") {
          stringSchema = stringSchema.check(z.xid());
        } else if (format === "ksuid") {
          stringSchema = stringSchema.check(z.ksuid());
        }
      }
      if (typeof schema.minLength === "number") {
        stringSchema = stringSchema.min(schema.minLength);
      }
      if (typeof schema.maxLength === "number") {
        stringSchema = stringSchema.max(schema.maxLength);
      }
      if (schema.pattern) {
        stringSchema = stringSchema.regex(new RegExp(schema.pattern));
      }
      zodSchema = stringSchema;
      break;
    }
    case "number":
    case "integer": {
      let numberSchema = type === "integer" ? z.number().int() : z.number();
      if (typeof schema.minimum === "number") {
        numberSchema = numberSchema.min(schema.minimum);
      }
      if (typeof schema.maximum === "number") {
        numberSchema = numberSchema.max(schema.maximum);
      }
      if (typeof schema.exclusiveMinimum === "number") {
        numberSchema = numberSchema.gt(schema.exclusiveMinimum);
      } else if (schema.exclusiveMinimum === true && typeof schema.minimum === "number") {
        numberSchema = numberSchema.gt(schema.minimum);
      }
      if (typeof schema.exclusiveMaximum === "number") {
        numberSchema = numberSchema.lt(schema.exclusiveMaximum);
      } else if (schema.exclusiveMaximum === true && typeof schema.maximum === "number") {
        numberSchema = numberSchema.lt(schema.maximum);
      }
      if (typeof schema.multipleOf === "number") {
        numberSchema = numberSchema.multipleOf(schema.multipleOf);
      }
      zodSchema = numberSchema;
      break;
    }
    case "boolean": {
      zodSchema = z.boolean();
      break;
    }
    case "null": {
      zodSchema = z.null();
      break;
    }
    case "object": {
      const shape = {};
      const properties = schema.properties || {};
      const requiredSet = new Set(schema.required || []);
      for (const [key, propSchema] of Object.entries(properties)) {
        const propZodSchema = convertSchema(propSchema, ctx);
        shape[key] = requiredSet.has(key) ? propZodSchema : propZodSchema.optional();
      }
      if (schema.propertyNames) {
        const keySchema = convertSchema(schema.propertyNames, ctx);
        const valueSchema = schema.additionalProperties && typeof schema.additionalProperties === "object" ? convertSchema(schema.additionalProperties, ctx) : z.any();
        if (Object.keys(shape).length === 0) {
          zodSchema = z.record(keySchema, valueSchema);
          break;
        }
        const objectSchema2 = z.object(shape).passthrough();
        const recordSchema = z.looseRecord(keySchema, valueSchema);
        zodSchema = z.intersection(objectSchema2, recordSchema);
        break;
      }
      if (schema.patternProperties) {
        const patternProps = schema.patternProperties;
        const patternKeys = Object.keys(patternProps);
        const looseRecords = [];
        for (const pattern of patternKeys) {
          const patternValue = convertSchema(patternProps[pattern], ctx);
          const keySchema = z.string().regex(new RegExp(pattern));
          looseRecords.push(z.looseRecord(keySchema, patternValue));
        }
        const schemasToIntersect = [];
        if (Object.keys(shape).length > 0) {
          schemasToIntersect.push(z.object(shape).passthrough());
        }
        schemasToIntersect.push(...looseRecords);
        if (schemasToIntersect.length === 0) {
          zodSchema = z.object({}).passthrough();
        } else if (schemasToIntersect.length === 1) {
          zodSchema = schemasToIntersect[0];
        } else {
          let result = z.intersection(schemasToIntersect[0], schemasToIntersect[1]);
          for (let i = 2; i < schemasToIntersect.length; i++) {
            result = z.intersection(result, schemasToIntersect[i]);
          }
          zodSchema = result;
        }
        break;
      }
      const objectSchema = z.object(shape);
      if (schema.additionalProperties === false) {
        zodSchema = objectSchema.strict();
      } else if (typeof schema.additionalProperties === "object") {
        zodSchema = objectSchema.catchall(convertSchema(schema.additionalProperties, ctx));
      } else {
        zodSchema = objectSchema.passthrough();
      }
      break;
    }
    case "array": {
      const prefixItems = schema.prefixItems;
      const items = schema.items;
      if (prefixItems && Array.isArray(prefixItems)) {
        const tupleItems = prefixItems.map((item) => convertSchema(item, ctx));
        const rest = items && typeof items === "object" && !Array.isArray(items) ? convertSchema(items, ctx) : void 0;
        if (rest) {
          zodSchema = z.tuple(tupleItems).rest(rest);
        } else {
          zodSchema = z.tuple(tupleItems);
        }
        if (typeof schema.minItems === "number") {
          zodSchema = zodSchema.check(z.minLength(schema.minItems));
        }
        if (typeof schema.maxItems === "number") {
          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
        }
      } else if (Array.isArray(items)) {
        const tupleItems = items.map((item) => convertSchema(item, ctx));
        const rest = schema.additionalItems && typeof schema.additionalItems === "object" ? convertSchema(schema.additionalItems, ctx) : void 0;
        if (rest) {
          zodSchema = z.tuple(tupleItems).rest(rest);
        } else {
          zodSchema = z.tuple(tupleItems);
        }
        if (typeof schema.minItems === "number") {
          zodSchema = zodSchema.check(z.minLength(schema.minItems));
        }
        if (typeof schema.maxItems === "number") {
          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
        }
      } else if (items !== void 0) {
        const element = convertSchema(items, ctx);
        let arraySchema = z.array(element);
        if (typeof schema.minItems === "number") {
          arraySchema = arraySchema.min(schema.minItems);
        }
        if (typeof schema.maxItems === "number") {
          arraySchema = arraySchema.max(schema.maxItems);
        }
        zodSchema = arraySchema;
      } else {
        zodSchema = z.array(z.any());
      }
      break;
    }
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
  if (schema.description) {
    zodSchema = zodSchema.describe(schema.description);
  }
  if (schema.default !== void 0) {
    zodSchema = zodSchema.default(schema.default);
  }
  return zodSchema;
}
function convertSchema(schema, ctx) {
  if (typeof schema === "boolean") {
    return schema ? z.any() : z.never();
  }
  let baseSchema = convertBaseSchema(schema, ctx);
  const hasExplicitType = schema.type || schema.enum !== void 0 || schema.const !== void 0;
  if (schema.anyOf && Array.isArray(schema.anyOf)) {
    const options = schema.anyOf.map((s) => convertSchema(s, ctx));
    const anyOfUnion = z.union(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, anyOfUnion) : anyOfUnion;
  }
  if (schema.oneOf && Array.isArray(schema.oneOf)) {
    const options = schema.oneOf.map((s) => convertSchema(s, ctx));
    const oneOfUnion = z.xor(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, oneOfUnion) : oneOfUnion;
  }
  if (schema.allOf && Array.isArray(schema.allOf)) {
    if (schema.allOf.length === 0) {
      baseSchema = hasExplicitType ? baseSchema : z.any();
    } else {
      let result = hasExplicitType ? baseSchema : convertSchema(schema.allOf[0], ctx);
      const startIdx = hasExplicitType ? 0 : 1;
      for (let i = startIdx; i < schema.allOf.length; i++) {
        result = z.intersection(result, convertSchema(schema.allOf[i], ctx));
      }
      baseSchema = result;
    }
  }
  if (schema.nullable === true && ctx.version === "openapi-3.0") {
    baseSchema = z.nullable(baseSchema);
  }
  if (schema.readOnly === true) {
    baseSchema = z.readonly(baseSchema);
  }
  const extraMeta = {};
  const coreMetadataKeys = ["$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor"];
  for (const key of coreMetadataKeys) {
    if (key in schema) {
      extraMeta[key] = schema[key];
    }
  }
  const contentMetadataKeys = ["contentEncoding", "contentMediaType", "contentSchema"];
  for (const key of contentMetadataKeys) {
    if (key in schema) {
      extraMeta[key] = schema[key];
    }
  }
  for (const key of Object.keys(schema)) {
    if (!RECOGNIZED_KEYS.has(key)) {
      extraMeta[key] = schema[key];
    }
  }
  if (Object.keys(extraMeta).length > 0) {
    ctx.registry.add(baseSchema, extraMeta);
  }
  return baseSchema;
}
function fromJSONSchema(schema, params) {
  if (typeof schema === "boolean") {
    return schema ? z.any() : z.never();
  }
  const version2 = detectVersion(schema, params?.defaultTarget);
  const defs = schema.$defs || schema.definitions || {};
  const ctx = {
    version: version2,
    defs,
    refs: /* @__PURE__ */ new Map(),
    processing: /* @__PURE__ */ new Set(),
    rootSchema: schema,
    registry: params?.registry ?? globalRegistry
  };
  return convertSchema(schema, ctx);
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/classic/coerce.js
var coerce_exports = {};
__export(coerce_exports, {
  bigint: () => bigint3,
  boolean: () => boolean3,
  date: () => date4,
  number: () => number3,
  string: () => string3
});
function string3(params) {
  return _coercedString(ZodString, params);
}
function number3(params) {
  return _coercedNumber(ZodNumber, params);
}
function boolean3(params) {
  return _coercedBoolean(ZodBoolean, params);
}
function bigint3(params) {
  return _coercedBigint(ZodBigInt, params);
}
function date4(params) {
  return _coercedDate(ZodDate, params);
}

// node_modules/.bun/zod@4.3.6/node_modules/zod/v4/classic/external.js
config(en_default());

// node_modules/.bun/zod@4.3.6/node_modules/zod/index.js
var zod_default = external_exports;

// packages/core/src/schema/camera.ts
var Vector3Schema = external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]);
var CameraSchema = external_exports.object({
  position: Vector3Schema,
  target: Vector3Schema,
  mode: external_exports.enum(["perspective", "orthographic"]).default("perspective"),
  fov: external_exports.number().optional(),
  // For perspective
  zoom: external_exports.number().optional()
  // For orthographic
});

// packages/core/src/schema/base.ts
var customId = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 16);
var Material = external_exports.string().optional();
var generateId = (prefix) => `${prefix}_${customId()}`;
var objectId = (prefix) => {
  const schema = external_exports.templateLiteral([`${prefix}_`, external_exports.string()]);
  return schema.default(() => generateId(prefix));
};
var nodeType = (type) => external_exports.literal(type).default(type);
var BaseNode = external_exports.object({
  object: external_exports.literal("node").default("node"),
  id: external_exports.string(),
  // objectId('node'), @Aymericr: Thing is if we specify objectId here, when using BaseNode.extend, TS complains that the id is not assignable to the more specific type in the extended node
  type: nodeType("node"),
  name: external_exports.string().optional(),
  parentId: external_exports.string().nullable().default(null),
  visible: external_exports.boolean().optional().default(true),
  camera: CameraSchema.optional(),
  metadata: external_exports.json().optional().default({})
});

// packages/core/src/schema/collections.ts
var generateCollectionId = () => generateId("collection");

// node_modules/.bun/dedent@1.7.2/node_modules/dedent/dist/dedent.mjs
function ownKeys(object2, enumerableOnly) {
  var keys = Object.keys(object2);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object2);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object2, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var dedent = createDedent({});
var dedent_default = dedent;
function createDedent(options) {
  dedent2.withOptions = (newOptions) => createDedent(_objectSpread(_objectSpread({}, options), newOptions));
  return dedent2;
  function dedent2(strings, ...values) {
    const raw = typeof strings === "string" ? [strings] : strings.raw;
    const {
      alignValues = false,
      escapeSpecialCharacters = Array.isArray(strings),
      trimWhitespace = true
    } = options;
    let result = "";
    for (let i = 0; i < raw.length; i++) {
      let next = raw[i];
      if (escapeSpecialCharacters) {
        next = next.replace(/\\\n[ \t]*/g, "").replace(/\\`/g, "`").replace(/\\\$/g, "$").replace(/\\\{/g, "{");
      }
      result += next;
      if (i < values.length) {
        const value = alignValues ? alignValue(values[i], result) : values[i];
        result += value;
      }
    }
    const lines = result.split("\n");
    let mindent = null;
    for (const l of lines) {
      const m = l.match(/^(\s+)\S+/);
      if (m) {
        const indent = m[1].length;
        if (!mindent) {
          mindent = indent;
        } else {
          mindent = Math.min(mindent, indent);
        }
      }
    }
    if (mindent !== null) {
      const m = mindent;
      result = lines.map((l) => l[0] === " " || l[0] === "	" ? l.slice(m) : l).join("\n");
    }
    if (trimWhitespace) {
      result = result.trim();
    }
    if (escapeSpecialCharacters) {
      result = result.replace(/\\n/g, "\n").replace(/\\t/g, "	").replace(/\\r/g, "\r").replace(/\\v/g, "\v").replace(/\\b/g, "\b").replace(/\\f/g, "\f").replace(/\\0/g, "\0").replace(/\\x([\da-fA-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/\\u\{([\da-fA-F]{1,6})\}/g, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/\\u([\da-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
    }
    if (typeof Bun !== "undefined") {
      result = result.replace(
        // Matches e.g. \\u{1f60a} or \\u5F1F
        /\\u(?:\{([\da-fA-F]{1,6})\}|([\da-fA-F]{4}))/g,
        (_, braced, unbraced) => {
          var _ref;
          const hex3 = (_ref = braced !== null && braced !== void 0 ? braced : unbraced) !== null && _ref !== void 0 ? _ref : "";
          return String.fromCodePoint(parseInt(hex3, 16));
        }
      );
    }
    return result;
  }
}
function alignValue(value, precedingText) {
  if (typeof value !== "string" || !value.includes("\n")) {
    return value;
  }
  const currentLine = precedingText.slice(precedingText.lastIndexOf("\n") + 1);
  const indentMatch = currentLine.match(/^(\s+)/);
  if (indentMatch) {
    const indent = indentMatch[1];
    return value.replace(/\n/g, `
${indent}`);
  }
  return value;
}

// packages/core/src/schema/nodes/item.ts
var toggleControlSchema = external_exports.object({
  kind: external_exports.literal("toggle"),
  label: external_exports.string().optional(),
  default: external_exports.boolean().optional()
});
var sliderControlSchema = external_exports.object({
  kind: external_exports.literal("slider"),
  label: external_exports.string(),
  min: external_exports.number(),
  max: external_exports.number(),
  step: external_exports.number().default(1),
  unit: external_exports.string().optional(),
  displayMode: external_exports.enum(["slider", "stepper", "dial"]).default("slider"),
  default: external_exports.number().optional()
});
var temperatureControlSchema = external_exports.object({
  kind: external_exports.literal("temperature"),
  label: external_exports.string().default("Temperature"),
  min: external_exports.number().default(16),
  max: external_exports.number().default(30),
  unit: external_exports.enum(["C", "F"]).default("C"),
  default: external_exports.number().optional()
});
var controlSchema = external_exports.discriminatedUnion("kind", [
  toggleControlSchema,
  sliderControlSchema,
  temperatureControlSchema
]);
var animationEffectSchema = external_exports.object({
  kind: external_exports.literal("animation"),
  clips: external_exports.object({
    on: external_exports.string().optional(),
    off: external_exports.string().optional(),
    loop: external_exports.string().optional()
  })
});
var lightEffectSchema = external_exports.object({
  kind: external_exports.literal("light"),
  color: external_exports.string().default("#ffffff"),
  intensityRange: external_exports.tuple([external_exports.number(), external_exports.number()]),
  distance: external_exports.number().optional(),
  offset: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([0, 0, 0])
});
var effectSchema = external_exports.discriminatedUnion("kind", [animationEffectSchema, lightEffectSchema]);
var interactiveSchema = external_exports.object({
  controls: external_exports.array(controlSchema).default([]),
  effects: external_exports.array(effectSchema).default([])
});
var assetSchema = external_exports.object({
  id: external_exports.string(),
  category: external_exports.string(),
  name: external_exports.string(),
  thumbnail: external_exports.string(),
  src: external_exports.string(),
  dimensions: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([1, 1, 1]),
  // [w, h, d]
  attachTo: external_exports.enum(["wall", "wall-side", "ceiling"]).optional(),
  tags: external_exports.array(external_exports.string()).optional(),
  // These are "Corrective" transforms to normalize the GLB
  offset: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([0, 0, 0]),
  rotation: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([0, 0, 0]),
  scale: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([1, 1, 1]),
  surface: external_exports.object({
    height: external_exports.number()
    // where things rest
  }).optional(),
  // undefined = can't place things on it
  interactive: interactiveSchema.optional()
});
var ItemNode = BaseNode.extend({
  id: objectId("item"),
  type: nodeType("item"),
  position: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([0, 0, 0]),
  rotation: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([0, 0, 0]),
  scale: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([1, 1, 1]),
  side: external_exports.enum(["front", "back"]).optional(),
  children: external_exports.array(objectId("item")).default([]),
  // Wall attachment properties (only used when asset.attachTo is "wall" or "wall-side")
  wallId: external_exports.string().optional(),
  wallT: external_exports.number().optional(),
  // 0-1 parametric position along wall
  // Denormalized references to collections this node belongs to
  collectionIds: external_exports.array(external_exports.custom()).optional(),
  asset: assetSchema
}).describe(dedent_default`Item node - used to represent a item in the building
  - position: position in level coordinate system (or parent coordinate system if attached)
  - rotation: rotation in level coordinate system (or parent coordinate system if attached)
  - asset: asset data
    - category: category of the item
    - dimensions: size in level coordinate system
    - src: url of the model
    - attachTo: where to attach the item (wall, wall-side, ceiling)
    - offset: corrective position offset for the model
    - rotation: corrective rotation for the model
    - scale: corrective scale for the model
    - tags: tags associated with the item
`);
function getScaledDimensions(item) {
  const [w, h, d] = item.asset.dimensions;
  const [sx, sy, sz] = item.scale;
  return [w * sx, h * sy, d * sz];
}

// packages/core/src/schema/nodes/ceiling.ts
var CeilingNode = BaseNode.extend({
  id: objectId("ceiling"),
  type: nodeType("ceiling"),
  children: external_exports.array(ItemNode.shape.id).default([]),
  // Specific props
  // Polygon boundary - array of [x, z] coordinates defining the ceiling
  polygon: external_exports.array(external_exports.tuple([external_exports.number(), external_exports.number()])),
  holes: external_exports.array(external_exports.array(external_exports.tuple([external_exports.number(), external_exports.number()]))).default([]),
  height: external_exports.number().default(2.5)
  // Height in meters
}).describe(
  dedent_default`
  Ceiling node - used to represent a ceiling in the building
  - polygon: array of [x, z] points defining the ceiling boundary
  - holes: array of polygons representing holes in the ceiling
  `
);

// packages/core/src/schema/nodes/guide.ts
var GuideNode = BaseNode.extend({
  id: objectId("guide"),
  type: nodeType("guide"),
  url: external_exports.string(),
  position: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([0, 0, 0]),
  rotation: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([0, 0, 0]),
  scale: external_exports.number().default(1),
  opacity: external_exports.number().min(0).max(100).default(50)
});

// packages/core/src/schema/nodes/roof-segment.ts
var RoofType = external_exports.enum(["hip", "gable", "shed", "gambrel", "dutch", "mansard", "flat"]);
var RoofSegmentNode = BaseNode.extend({
  id: objectId("rseg"),
  type: nodeType("roof-segment"),
  // Position relative to parent roof group
  position: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([0, 0, 0]),
  // Rotation around Y axis in radians
  rotation: external_exports.number().default(0),
  // Roof shape type
  roofType: RoofType.default("gable"),
  // Footprint dimensions
  width: external_exports.number().default(8),
  depth: external_exports.number().default(6),
  // Vertical dimensions
  wallHeight: external_exports.number().default(0.5),
  roofHeight: external_exports.number().default(2.5),
  // Structure thicknesses
  wallThickness: external_exports.number().default(0.1),
  deckThickness: external_exports.number().default(0.1),
  overhang: external_exports.number().default(0.3),
  shingleThickness: external_exports.number().default(0.05)
}).describe(
  dedent_default`
  Roof segment node - an individual roof module within a roof group.
  Each segment generates a complete architectural volume (walls + roof).
  Multiple segments can be combined to form complex roof shapes.
  - roofType: hip, gable, shed, gambrel, dutch, mansard, flat
  - width/depth: footprint dimensions
  - wallHeight: height of walls below the roof
  - roofHeight: height of the roof peak above the walls
  - wallThickness/deckThickness: structural thicknesses
  - overhang: eave overhang distance
  - shingleThickness: outer shingle layer thickness
  `
);

// packages/core/src/schema/nodes/roof.ts
var RoofNode = BaseNode.extend({
  id: objectId("roof"),
  type: nodeType("roof"),
  // Position of the roof group center
  position: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([0, 0, 0]),
  // Rotation around Y axis in radians
  rotation: external_exports.number().default(0),
  // Child roof segment IDs
  children: external_exports.array(RoofSegmentNode.shape.id).default([])
}).describe(
  dedent_default`
  Roof node - a container for roof segments.
  Acts as a group that holds one or more RoofSegmentNodes.
  When not being edited, segments are visually combined into a single solid.
  - position: center position of the roof group
  - rotation: rotation around Y axis
  - children: array of RoofSegmentNode IDs
  `
);

// packages/core/src/schema/nodes/scan.ts
var ScanNode = BaseNode.extend({
  id: objectId("scan"),
  type: nodeType("scan"),
  url: external_exports.string(),
  position: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([0, 0, 0]),
  rotation: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([0, 0, 0]),
  scale: external_exports.number().default(1),
  opacity: external_exports.number().min(0).max(100).default(100)
});

// packages/core/src/schema/nodes/slab.ts
var SlabNode = BaseNode.extend({
  id: objectId("slab"),
  type: nodeType("slab"),
  // Specific props
  // Polygon boundary - array of [x, z] coordinates defining the slab
  polygon: external_exports.array(external_exports.tuple([external_exports.number(), external_exports.number()])),
  holes: external_exports.array(external_exports.array(external_exports.tuple([external_exports.number(), external_exports.number()]))).default([]),
  elevation: external_exports.number().default(0.05)
  // Elevation in meters
}).describe(
  dedent_default`
  Slab node - used to represent a slab/floor in the building
  - polygon: array of [x, z] points defining the slab boundary
  - elevation: elevation in meters
  `
);

// packages/core/src/schema/nodes/wall.ts
var WallNode = BaseNode.extend({
  id: objectId("wall"),
  type: nodeType("wall"),
  children: external_exports.array(ItemNode.shape.id).default([]),
  // Specific props
  thickness: external_exports.number().optional(),
  height: external_exports.number().optional(),
  // e.g., start/end points for path
  start: external_exports.tuple([external_exports.number(), external_exports.number()]),
  end: external_exports.tuple([external_exports.number(), external_exports.number()]),
  // Space detection for cutaway mode
  frontSide: external_exports.enum(["interior", "exterior", "unknown"]).default("unknown"),
  backSide: external_exports.enum(["interior", "exterior", "unknown"]).default("unknown")
}).describe(
  dedent_default`
  Wall node - used to represent a wall in the building
  - thickness: thickness in meters
  - height: height in meters
  - start: start point of the wall in level coordinate system
  - end: end point of the wall in level coordinate system
  - size: size of the wall in grid units
  - frontSide: whether the front side faces interior, exterior, or unknown
  - backSide: whether the back side faces interior, exterior, or unknown
  `
);

// packages/core/src/schema/nodes/zone.ts
var ZoneNode = BaseNode.extend({
  id: objectId("zone"),
  type: nodeType("zone"),
  name: external_exports.string(),
  // Polygon boundary - array of [x, z] coordinates defining the zone
  polygon: external_exports.array(external_exports.tuple([external_exports.number(), external_exports.number()])),
  // Visual styling
  color: external_exports.string().default("#3b82f6"),
  // Default blue
  metadata: external_exports.json().optional().default({})
}).describe(
  dedent_default`
  Zone schema - a polygon zone attached to a level
  - object: "zone"
  - id: zone id
  - levelId: level this zone is attached to
  - name: zone name
  - polygon: array of [x, z] points defining the zone boundary
  - color: hex color for visual styling
  - metadata: zone metadata (optional)
  `
);

// packages/core/src/schema/nodes/level.ts
var LevelNode = BaseNode.extend({
  id: objectId("level"),
  type: nodeType("level"),
  children: external_exports.array(
    external_exports.union([
      WallNode.shape.id,
      ZoneNode.shape.id,
      SlabNode.shape.id,
      CeilingNode.shape.id,
      RoofNode.shape.id,
      ScanNode.shape.id,
      GuideNode.shape.id
    ])
  ).default([]),
  // Specific props
  level: external_exports.number().default(0)
}).describe(
  dedent_default`
  Level node - used to represent a level in the building
  - children: array of floor, wall, ceiling, roof, item nodes
  - level: level number
  `
);

// packages/core/src/schema/nodes/building.ts
var BuildingNode = BaseNode.extend({
  id: objectId("building"),
  type: nodeType("building"),
  children: external_exports.array(LevelNode.shape.id).default([]),
  position: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([0, 0, 0]),
  rotation: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([0, 0, 0])
}).describe(
  dedent_default`
  Building node - used to represent a building
  - position: position in site coordinate system
  - rotation: rotation in site coordinate system
  - children: array of level nodes (each level is a tree of floor and wall nodes) 
  `
);

// packages/core/src/schema/nodes/door.ts
var DoorSegment = external_exports.object({
  type: external_exports.enum(["panel", "glass", "empty"]),
  heightRatio: external_exports.number(),
  // Each segment controls its own column split
  columnRatios: external_exports.array(external_exports.number()).default([1]),
  dividerThickness: external_exports.number().default(0.03),
  // panel-specific
  panelDepth: external_exports.number().default(0.01),
  // + raised, - recessed
  panelInset: external_exports.number().default(0.04)
});
var DoorNode = BaseNode.extend({
  id: objectId("door"),
  type: nodeType("door"),
  position: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([0, 0, 0]),
  rotation: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([0, 0, 0]),
  side: external_exports.enum(["front", "back"]).optional(),
  wallId: external_exports.string().optional(),
  // Overall dimensions
  width: external_exports.number().default(0.9),
  height: external_exports.number().default(2.1),
  // Frame
  frameThickness: external_exports.number().default(0.05),
  frameDepth: external_exports.number().default(0.07),
  threshold: external_exports.boolean().default(true),
  thresholdHeight: external_exports.number().default(0.02),
  // Swing
  hingesSide: external_exports.enum(["left", "right"]).default("left"),
  swingDirection: external_exports.enum(["inward", "outward"]).default("inward"),
  // Leaf segments — stacked top to bottom, each with its own column split
  segments: external_exports.array(DoorSegment).default([
    {
      type: "panel",
      heightRatio: 0.4,
      columnRatios: [1],
      dividerThickness: 0.03,
      panelDepth: 0.01,
      panelInset: 0.04
    },
    {
      type: "panel",
      heightRatio: 0.6,
      columnRatios: [1],
      dividerThickness: 0.03,
      panelDepth: 0.01,
      panelInset: 0.04
    }
  ]),
  // Handle
  handle: external_exports.boolean().default(true),
  handleHeight: external_exports.number().default(1.05),
  handleSide: external_exports.enum(["left", "right"]).default("right"),
  // Leaf inner margin — space between leaf edge and segment content area [x, y]
  contentPadding: external_exports.tuple([external_exports.number(), external_exports.number()]).default([0.04, 0.04]),
  // Emergency / commercial hardware
  doorCloser: external_exports.boolean().default(false),
  panicBar: external_exports.boolean().default(false),
  panicBarHeight: external_exports.number().default(1)
}).describe(dedent_default`Door node - a parametric door placed on a wall
  - position: center of the door in wall-local coordinate system (Y = height/2, always at floor)
  - segments: rows stacked top to bottom, each defining its own columnRatios
  - type 'empty' = flush flat fill, 'panel' = raised/recessed panel, 'glass' = glazed
  - hingesSide/swingDirection: which way the door opens
  - doorCloser/panicBar: commercial and emergency hardware options
`);

// packages/core/src/schema/nodes/site.ts
var PropertyLineData = external_exports.object({
  type: external_exports.literal("polygon"),
  points: external_exports.array(external_exports.tuple([external_exports.number(), external_exports.number()]))
});
var SiteNode = BaseNode.extend({
  id: objectId("site"),
  type: nodeType("site"),
  // Specific props
  polygon: PropertyLineData.optional().default({
    type: "polygon",
    // Default 30x30 square centered at origin
    points: [
      [-15, -15],
      [15, -15],
      [15, 15],
      [-15, 15]
    ]
  }),
  // terrain: TerrainData,
  children: external_exports.array(external_exports.discriminatedUnion("type", [BuildingNode, ItemNode])).default([BuildingNode.parse({})])
}).describe(
  dedent_default`
  Site node - used to represent a site
  - polygon: polygon data
  - children: array of building and item nodes
  `
);

// packages/core/src/schema/nodes/window.ts
var WindowNode = BaseNode.extend({
  id: objectId("window"),
  type: nodeType("window"),
  // Position in wall-local coordinate system (center of window)
  position: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([0, 0, 0]),
  rotation: external_exports.tuple([external_exports.number(), external_exports.number(), external_exports.number()]).default([0, 0, 0]),
  side: external_exports.enum(["front", "back"]).optional(),
  // Wall reference
  wallId: external_exports.string().optional(),
  // Overall dimensions
  width: external_exports.number().default(1.5),
  height: external_exports.number().default(1.5),
  // Frame
  frameThickness: external_exports.number().default(0.05),
  frameDepth: external_exports.number().default(0.07),
  // Divisions — ratios allow non-uniform panes
  // [0.5, 0.5] = two equal panes
  // [0.6, 0.4] = one larger, one smaller
  // [1] = single pane (no division)
  columnRatios: external_exports.array(external_exports.number()).default([1]),
  rowRatios: external_exports.array(external_exports.number()).default([1]),
  columnDividerThickness: external_exports.number().default(0.03),
  rowDividerThickness: external_exports.number().default(0.03),
  // Sill
  sill: external_exports.boolean().default(true),
  sillDepth: external_exports.number().default(0.08),
  sillThickness: external_exports.number().default(0.03)
}).describe(dedent_default`Window node - a parametric window placed on a wall
  - position: center of the window in wall-local coordinate system
  - width/height: overall outer dimensions
  - frameThickness: width of the frame members
  - frameDepth: how deep the frame sits within the wall
  - columnRatios/rowRatios: pane division ratios
  - sill: whether to show a window sill
`);

// packages/core/src/schema/types.ts
var AnyNode = zod_default.discriminatedUnion("type", [
  SiteNode,
  BuildingNode,
  LevelNode,
  WallNode,
  ItemNode,
  ZoneNode,
  SlabNode,
  CeilingNode,
  RoofNode,
  RoofSegmentNode,
  ScanNode,
  GuideNode,
  WindowNode,
  DoorNode
]);

// node_modules/.bun/zustand@5.0.11+10f197a4cef36846/node_modules/zustand/esm/vanilla.mjs
var createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial2, replace) => {
    const nextState = typeof partial2 === "function" ? partial2(state) : partial2;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
var createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);

// node_modules/.bun/zustand@5.0.11+10f197a4cef36846/node_modules/zustand/esm/react.mjs
import React from "react";
var identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    React.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
var createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
var create = ((createState) => createState ? createImpl(createState) : createImpl);

// node_modules/.bun/zundo@2.3.0+ad22669cd9a3bf7a/node_modules/zundo/dist/index.js
var temporalStateCreator = (userSet, userGet, options) => {
  const stateCreator = (set2, get) => {
    return {
      pastStates: options?.pastStates || [],
      futureStates: options?.futureStates || [],
      undo: (steps = 1) => {
        if (get().pastStates.length) {
          const currentState = options?.partialize?.(userGet()) || userGet();
          const statesToApply = get().pastStates.splice(-steps, steps);
          const nextState = statesToApply.shift();
          userSet(nextState);
          set2({
            pastStates: get().pastStates,
            futureStates: get().futureStates.concat(
              options?.diff?.(currentState, nextState) || currentState,
              statesToApply.reverse()
            )
          });
        }
      },
      redo: (steps = 1) => {
        if (get().futureStates.length) {
          const currentState = options?.partialize?.(userGet()) || userGet();
          const statesToApply = get().futureStates.splice(-steps, steps);
          const nextState = statesToApply.shift();
          userSet(nextState);
          set2({
            pastStates: get().pastStates.concat(
              options?.diff?.(currentState, nextState) || currentState,
              statesToApply.reverse()
            ),
            futureStates: get().futureStates
          });
        }
      },
      clear: () => set2({ pastStates: [], futureStates: [] }),
      isTracking: true,
      pause: () => set2({ isTracking: false }),
      resume: () => set2({ isTracking: true }),
      setOnSave: (_onSave) => set2({ _onSave }),
      // Internal properties
      _onSave: options?.onSave,
      _handleSet: (pastState, replace, currentState, deltaState) => {
        if (options?.limit && get().pastStates.length >= options?.limit) {
          get().pastStates.shift();
        }
        get()._onSave?.(pastState, currentState);
        set2({
          pastStates: get().pastStates.concat(deltaState || pastState),
          futureStates: []
        });
      }
    };
  };
  return stateCreator;
};
var temporal = (config2, options) => {
  const configWithTemporal = (set2, get, store) => {
    store.temporal = createStore(
      options?.wrapTemporal?.(temporalStateCreator(set2, get, options)) || temporalStateCreator(set2, get, options)
    );
    const curriedHandleSet = options?.handleSet?.(
      store.temporal.getState()._handleSet
    ) || store.temporal.getState()._handleSet;
    const temporalHandleSet = (pastState) => {
      if (!store.temporal.getState().isTracking) return;
      const currentState = options?.partialize?.(get()) || get();
      const deltaState = options?.diff?.(pastState, currentState);
      if (
        // Don't call handleSet if state hasn't changed, as determined by diff fn or equality fn
        !// If the user has provided a diff function but nothing has been changed, deltaState will be null
        (deltaState === null || // If the user has provided an equality function, use it
        options?.equality?.(pastState, currentState))
      ) {
        curriedHandleSet(
          pastState,
          void 0,
          currentState,
          deltaState
        );
      }
    };
    const setState = store.setState;
    store.setState = (...args) => {
      const pastState = options?.partialize?.(get()) || get();
      setState(...args);
      temporalHandleSet(pastState);
    };
    return config2(
      // Modify the set function to call the userlandSet function
      (...args) => {
        const pastState = options?.partialize?.(get()) || get();
        set2(...args);
        temporalHandleSet(pastState);
      },
      get,
      store
    );
  };
  return configWithTemporal;
};

// packages/core/src/store/actions/node-actions.ts
var createNodesAction = (set2, get, ops) => {
  set2((state) => {
    const nextNodes = { ...state.nodes };
    const nextRootIds = [...state.rootNodeIds];
    for (const { node, parentId } of ops) {
      const newNode = {
        ...node,
        parentId: parentId ?? null
      };
      nextNodes[newNode.id] = newNode;
      if (parentId && nextNodes[parentId]) {
        const parent = nextNodes[parentId];
        if ("children" in parent && Array.isArray(parent.children)) {
          nextNodes[parentId] = {
            ...parent,
            // Use Set to prevent duplicate IDs if createNode is called twice
            children: Array.from(/* @__PURE__ */ new Set([...parent.children, newNode.id]))
            // We don't verify child types here
          };
        }
      } else if (!parentId) {
        if (!nextRootIds.includes(newNode.id)) {
          nextRootIds.push(newNode.id);
        }
      }
    }
    return { nodes: nextNodes, rootNodeIds: nextRootIds };
  });
  ops.forEach(({ node, parentId }) => {
    get().markDirty(node.id);
    if (parentId) get().markDirty(parentId);
  });
};
var updateNodesAction = (set2, get, updates) => {
  const parentsToUpdate = /* @__PURE__ */ new Set();
  set2((state) => {
    const nextNodes = { ...state.nodes };
    for (const { id, data } of updates) {
      const currentNode = nextNodes[id];
      if (!currentNode) continue;
      if (data.parentId !== void 0 && data.parentId !== currentNode.parentId) {
        const oldParentId = currentNode.parentId;
        if (oldParentId && nextNodes[oldParentId]) {
          const oldParent = nextNodes[oldParentId];
          nextNodes[oldParent.id] = {
            ...oldParent,
            children: oldParent.children.filter((childId) => childId !== id)
          };
          parentsToUpdate.add(oldParent.id);
        }
        const newParentId = data.parentId;
        if (newParentId && nextNodes[newParentId]) {
          const newParent = nextNodes[newParentId];
          nextNodes[newParent.id] = {
            ...newParent,
            children: Array.from(/* @__PURE__ */ new Set([...newParent.children, id]))
          };
          parentsToUpdate.add(newParent.id);
        }
      }
      nextNodes[id] = { ...nextNodes[id], ...data };
    }
    return { nodes: nextNodes };
  });
  requestAnimationFrame(() => {
    updates.forEach((u) => {
      get().markDirty(u.id);
    });
    parentsToUpdate.forEach((pId) => {
      get().markDirty(pId);
    });
  });
};
var deleteNodesAction = (set2, get, ids) => {
  const parentsToMarkDirty = /* @__PURE__ */ new Set();
  set2((state) => {
    const nextNodes = { ...state.nodes };
    const nextCollections = { ...state.collections };
    let nextRootIds = [...state.rootNodeIds];
    for (const id of ids) {
      const node = nextNodes[id];
      if (!node) continue;
      const parentId = node.parentId;
      if (parentId && nextNodes[parentId]) {
        const parent = nextNodes[parentId];
        if (parent.children) {
          nextNodes[parent.id] = {
            ...parent,
            children: parent.children.filter((cid) => cid !== id)
          };
          parentsToMarkDirty.add(parent.id);
        }
      }
      nextRootIds = nextRootIds.filter((rid) => rid !== id);
      if ("collectionIds" in node && node.collectionIds) {
        for (const cid of node.collectionIds) {
          const col = nextCollections[cid];
          if (col) {
            nextCollections[cid] = { ...col, nodeIds: col.nodeIds.filter((nid) => nid !== id) };
          }
        }
      }
      delete nextNodes[id];
      if ("children" in node && node.children.length > 0) {
        get().deleteNodes(node.children);
      }
    }
    return { nodes: nextNodes, rootNodeIds: nextRootIds, collections: nextCollections };
  });
  parentsToMarkDirty.forEach((parentId) => {
    get().markDirty(parentId);
    const parent = get().nodes[parentId];
    if (parent && "children" in parent && Array.isArray(parent.children)) {
      for (const childId of parent.children) {
        get().markDirty(childId);
      }
    }
  });
};

// packages/core/src/store/use-scene.ts
function migrateNodes(nodes) {
  const patchedNodes = { ...nodes };
  for (const [id, node] of Object.entries(patchedNodes)) {
    if (node.type === "item" && !("scale" in node)) {
      patchedNodes[id] = { ...node, scale: [1, 1, 1] };
    }
    if (node.type === "roof" && !("children" in node)) {
      const oldRoof = node;
      const suffix = id.includes("_") ? id.split("_")[1] : Math.random().toString(36).slice(2);
      const segmentId = `rseg_${suffix}`;
      const segment = {
        object: "node",
        id: segmentId,
        type: "roof-segment",
        parentId: id,
        visible: oldRoof.visible ?? true,
        metadata: {},
        position: [0, 0, 0],
        rotation: 0,
        roofType: "gable",
        width: oldRoof.length ?? 8,
        depth: (oldRoof.leftWidth ?? 2.2) + (oldRoof.rightWidth ?? 2.2),
        wallHeight: 0,
        roofHeight: oldRoof.height ?? 2.5,
        wallThickness: 0.1,
        deckThickness: 0.1,
        overhang: 0.3,
        shingleThickness: 0.05
      };
      patchedNodes[segmentId] = segment;
      patchedNodes[id] = {
        ...oldRoof,
        children: [segmentId]
      };
    }
  }
  return patchedNodes;
}
var useScene = create()(
  temporal(
    (set2, get) => ({
      // 1. Flat dictionary of all nodes
      nodes: {},
      // 2. Root node IDs
      rootNodeIds: [],
      // 3. Dirty set
      dirtyNodes: /* @__PURE__ */ new Set(),
      // 4. Collections
      collections: {},
      unloadScene: () => {
        set2({
          nodes: {},
          rootNodeIds: [],
          dirtyNodes: /* @__PURE__ */ new Set(),
          collections: {}
        });
      },
      clearScene: () => {
        get().unloadScene();
        get().loadScene();
      },
      setScene: (nodes, rootNodeIds) => {
        const patchedNodes = migrateNodes(nodes);
        set2({
          nodes: patchedNodes,
          rootNodeIds,
          dirtyNodes: /* @__PURE__ */ new Set()
        });
        Object.values(patchedNodes).forEach((node) => {
          get().markDirty(node.id);
        });
      },
      loadScene: () => {
        if (get().rootNodeIds.length > 0) {
          Object.values(get().nodes).forEach((node) => {
            get().markDirty(node.id);
          });
          return;
        }
        const level0 = LevelNode.parse({
          level: 0,
          children: []
        });
        const building = BuildingNode.parse({
          children: [level0.id]
        });
        const site = SiteNode.parse({
          children: [building]
        });
        const nodes = {
          [site.id]: site,
          [building.id]: building,
          [level0.id]: level0
        };
        const rootNodeIds = [site.id];
        set2({ nodes, rootNodeIds });
      },
      markDirty: (id) => {
        get().dirtyNodes.add(id);
      },
      clearDirty: (id) => {
        get().dirtyNodes.delete(id);
      },
      createNodes: (ops) => createNodesAction(set2, get, ops),
      createNode: (node, parentId) => createNodesAction(set2, get, [{ node, parentId }]),
      updateNodes: (updates) => updateNodesAction(set2, get, updates),
      updateNode: (id, data) => updateNodesAction(set2, get, [{ id, data }]),
      // --- DELETE ---
      deleteNodes: (ids) => deleteNodesAction(set2, get, ids),
      deleteNode: (id) => deleteNodesAction(set2, get, [id]),
      // --- COLLECTIONS ---
      createCollection: (name, nodeIds = []) => {
        const id = generateCollectionId();
        const collection = { id, name, nodeIds };
        set2((state) => {
          const nextCollections = { ...state.collections, [id]: collection };
          const nextNodes = { ...state.nodes };
          for (const nodeId of nodeIds) {
            const node = nextNodes[nodeId];
            if (!node) continue;
            const existing = ("collectionIds" in node ? node.collectionIds : void 0) ?? [];
            nextNodes[nodeId] = { ...node, collectionIds: [...existing, id] };
          }
          return { collections: nextCollections, nodes: nextNodes };
        });
        return id;
      },
      deleteCollection: (id) => {
        set2((state) => {
          const col = state.collections[id];
          const nextCollections = { ...state.collections };
          delete nextCollections[id];
          const nextNodes = { ...state.nodes };
          for (const nodeId of col?.nodeIds ?? []) {
            const node = nextNodes[nodeId];
            if (!(node && "collectionIds" in node)) continue;
            nextNodes[nodeId] = {
              ...node,
              collectionIds: node.collectionIds.filter((cid) => cid !== id)
            };
          }
          return { collections: nextCollections, nodes: nextNodes };
        });
      },
      updateCollection: (id, data) => {
        set2((state) => {
          const col = state.collections[id];
          if (!col) return state;
          return { collections: { ...state.collections, [id]: { ...col, ...data } } };
        });
      },
      addToCollection: (id, nodeId) => {
        set2((state) => {
          const col = state.collections[id];
          if (!col || col.nodeIds.includes(nodeId)) return state;
          const nextCollections = {
            ...state.collections,
            [id]: { ...col, nodeIds: [...col.nodeIds, nodeId] }
          };
          const node = state.nodes[nodeId];
          if (!node) return { collections: nextCollections };
          const existing = ("collectionIds" in node ? node.collectionIds : void 0) ?? [];
          const nextNodes = {
            ...state.nodes,
            [nodeId]: { ...node, collectionIds: [...existing, id] }
          };
          return { collections: nextCollections, nodes: nextNodes };
        });
      },
      removeFromCollection: (id, nodeId) => {
        set2((state) => {
          const col = state.collections[id];
          if (!col) return state;
          const nextCollections = {
            ...state.collections,
            [id]: { ...col, nodeIds: col.nodeIds.filter((n) => n !== nodeId) }
          };
          const node = state.nodes[nodeId];
          if (!(node && "collectionIds" in node)) return { collections: nextCollections };
          const nextNodes = {
            ...state.nodes,
            [nodeId]: {
              ...node,
              collectionIds: node.collectionIds.filter((cid) => cid !== id)
            }
          };
          return { collections: nextCollections, nodes: nextNodes };
        });
      }
    }),
    {
      partialize: (state) => {
        const { nodes, rootNodeIds, collections } = state;
        return { nodes, rootNodeIds, collections };
      },
      limit: 50
      // Limit to last 50 actions
    }
  )
);
var use_scene_default = useScene;
var prevPastLength = 0;
var prevFutureLength = 0;
var prevNodesSnapshot = null;
function clearSceneHistory() {
  useScene.temporal.getState().clear();
  prevPastLength = 0;
  prevFutureLength = 0;
  prevNodesSnapshot = null;
}
useScene.temporal.subscribe((state) => {
  const currentPastLength = state.pastStates.length;
  const currentFutureLength = state.futureStates.length;
  const didUndo = currentFutureLength > prevFutureLength;
  const didRedo = currentPastLength > prevPastLength && currentFutureLength < prevFutureLength;
  if (didUndo || didRedo) {
    const snapshotBefore = prevNodesSnapshot;
    requestAnimationFrame(() => {
      const currentNodes = useScene.getState().nodes;
      const { markDirty } = useScene.getState();
      if (snapshotBefore) {
        for (const [id, node] of Object.entries(currentNodes)) {
          if (snapshotBefore[id] !== node) {
            markDirty(id);
            if (node.parentId) markDirty(node.parentId);
          }
        }
        for (const [id, node] of Object.entries(snapshotBefore)) {
          if (!currentNodes[id]) {
            if (node.parentId) markDirty(node.parentId);
          }
        }
      } else {
        for (const node of Object.values(currentNodes)) {
          markDirty(node.id);
        }
      }
    });
  }
  prevPastLength = currentPastLength;
  prevFutureLength = currentFutureLength;
  prevNodesSnapshot = useScene.getState().nodes;
});

// packages/core/src/harness-index.ts
function pointInPolygon(px, pz, polygon) {
  let inside = false;
  const n = polygon.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = polygon[i][0];
    const zi = polygon[i][1];
    const xj = polygon[j][0];
    const zj = polygon[j][1];
    if (zi > pz !== zj > pz && px < (xj - xi) * (pz - zi) / (zj - zi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

// node_modules/.bun/zustand@5.0.11+10f197a4cef36846/node_modules/zustand/esm/middleware.mjs
function createJSONStorage(getStorage, options) {
  let storage;
  try {
    storage = getStorage();
  } catch (e) {
    return;
  }
  const persistStorage = {
    getItem: (name) => {
      var _a2;
      const parse3 = (str2) => {
        if (str2 === null) {
          return null;
        }
        return JSON.parse(str2, options == null ? void 0 : options.reviver);
      };
      const str = (_a2 = storage.getItem(name)) != null ? _a2 : null;
      if (str instanceof Promise) {
        return str.then(parse3);
      }
      return parse3(str);
    },
    setItem: (name, newValue) => storage.setItem(name, JSON.stringify(newValue, options == null ? void 0 : options.replacer)),
    removeItem: (name) => storage.removeItem(name)
  };
  return persistStorage;
}
var toThenable = (fn) => (input) => {
  try {
    const result = fn(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e);
      }
    };
  }
};
var persistImpl = (config2, baseOptions) => (set2, get, api) => {
  let options = {
    storage: createJSONStorage(() => window.localStorage),
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  let hydrationVersion = 0;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage = options.storage;
  if (!storage) {
    return config2(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
        );
        set2(...args);
      },
      get,
      api
    );
  }
  const setItem = () => {
    const state = options.partialize({ ...get() });
    return storage.setItem(options.name, {
      state,
      version: options.version
    });
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    return setItem();
  };
  const configResult = config2(
    (...args) => {
      set2(...args);
      return setItem();
    },
    get,
    api
  );
  api.getInitialState = () => configResult;
  let stateFromStorage;
  const hydrate = () => {
    var _a2, _b;
    if (!storage) return;
    const currentVersion = ++hydrationVersion;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => {
      var _a22;
      return cb((_a22 = get()) != null ? _a22 : configResult);
    });
    const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a2 = get()) != null ? _a2 : configResult)) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            const migration = options.migrate(
              deserializedStorageValue.state,
              deserializedStorageValue.version
            );
            if (migration instanceof Promise) {
              return migration.then((result) => [true, result]);
            }
            return [true, migration];
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return [false, deserializedStorageValue.state];
        }
      }
      return [false, void 0];
    }).then((migrationResult) => {
      var _a22;
      if (currentVersion !== hydrationVersion) {
        return;
      }
      const [migrated, migratedState] = migrationResult;
      stateFromStorage = options.merge(
        migratedState,
        (_a22 = get()) != null ? _a22 : configResult
      );
      set2(stateFromStorage, true);
      if (migrated) {
        return setItem();
      }
    }).then(() => {
      if (currentVersion !== hydrationVersion) {
        return;
      }
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      stateFromStorage = get();
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e) => {
      if (currentVersion !== hydrationVersion) {
        return;
      }
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.storage) {
        storage = newOptions.storage;
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options.name);
    },
    getOptions: () => options,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    },
    onFinishHydration: (cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }
  };
  if (!options.skipHydration) {
    hydrate();
  }
  return stateFromStorage || configResult;
};
var persist = persistImpl;

// packages/viewer/src/store/use-viewer.ts
var useViewer = create()(
  persist(
    (set2) => ({
      selection: { buildingId: null, levelId: null, zoneId: null, selectedIds: [] },
      hoveredId: null,
      setHoveredId: (id) => set2({ hoveredId: id }),
      cameraMode: "perspective",
      setCameraMode: (mode) => set2({ cameraMode: mode }),
      theme: "light",
      setTheme: (theme) => set2({ theme }),
      levelMode: "stacked",
      setLevelMode: (mode) => set2({ levelMode: mode }),
      wallMode: "up",
      setWallMode: (mode) => set2({ wallMode: mode }),
      showScans: true,
      setShowScans: (show) => set2((state) => {
        const projectPreferences = { ...state.projectPreferences || {} };
        if (state.projectId) {
          projectPreferences[state.projectId] = {
            ...projectPreferences[state.projectId] || {},
            showScans: show
          };
        }
        return { showScans: show, projectPreferences };
      }),
      showGuides: true,
      setShowGuides: (show) => set2((state) => {
        const projectPreferences = { ...state.projectPreferences || {} };
        if (state.projectId) {
          projectPreferences[state.projectId] = {
            ...projectPreferences[state.projectId] || {},
            showGuides: show
          };
        }
        return { showGuides: show, projectPreferences };
      }),
      showGrid: true,
      setShowGrid: (show) => set2((state) => {
        const projectPreferences = { ...state.projectPreferences || {} };
        if (state.projectId) {
          projectPreferences[state.projectId] = {
            ...projectPreferences[state.projectId] || {},
            showGrid: show
          };
        }
        return { showGrid: show, projectPreferences };
      }),
      projectId: null,
      setProjectId: (id) => set2((state) => {
        if (!id) return { projectId: id };
        const prefs = state.projectPreferences?.[id] || {};
        return {
          projectId: id,
          showScans: prefs.showScans ?? true,
          showGuides: prefs.showGuides ?? true,
          showGrid: prefs.showGrid ?? true
        };
      }),
      projectPreferences: {},
      setSelection: (updates) => set2((state) => {
        const newSelection = { ...state.selection, ...updates };
        if (updates.buildingId !== void 0) {
          if (updates.levelId === void 0) newSelection.levelId = null;
          if (updates.zoneId === void 0) newSelection.zoneId = null;
          if (updates.selectedIds === void 0) newSelection.selectedIds = [];
        }
        if (updates.levelId !== void 0) {
          if (updates.zoneId === void 0) newSelection.zoneId = null;
          if (updates.selectedIds === void 0) newSelection.selectedIds = [];
        }
        if (updates.zoneId !== void 0) {
          if (updates.selectedIds === void 0) newSelection.selectedIds = [];
        }
        return { selection: newSelection };
      }),
      resetSelection: () => set2({
        selection: {
          buildingId: null,
          levelId: null,
          zoneId: null,
          selectedIds: []
        }
      }),
      outliner: { selectedObjects: [], hoveredObjects: [] },
      exportScene: null,
      setExportScene: (fn) => set2({ exportScene: fn }),
      debugColors: false,
      setDebugColors: (enabled) => set2({ debugColors: enabled }),
      cameraDragging: false,
      setCameraDragging: (dragging) => set2({ cameraDragging: dragging })
    }),
    {
      name: "viewer-preferences",
      partialize: (state) => ({
        cameraMode: state.cameraMode,
        theme: state.theme,
        levelMode: state.levelMode,
        wallMode: state.wallMode,
        projectPreferences: state.projectPreferences
      })
    }
  )
);
var use_viewer_default = useViewer;

// packages/editor/src/components/ui/item-catalog/catalog-items.tsx
var CATALOG_ITEMS = [
  {
    id: "tesla",
    category: "outdoor",
    tags: ["floor", "garage"],
    name: "Tesla",
    thumbnail: "/items/tesla/thumbnail.webp",
    src: "/items/tesla/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [2, 1.7, 5]
  },
  {
    id: "ev-wall-charger",
    category: "appliance",
    tags: ["wall", "garage"],
    name: "Ev-wall-charger",
    thumbnail: "/items/ev-wall-charger/thumbnail.webp",
    src: "/items/ev-wall-charger/model.glb",
    scale: [1, 1, 1],
    offset: [-0.07, 0.4, 0.15],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.8, 0.5],
    attachTo: "wall"
  },
  {
    id: "pillar",
    category: "outdoor",
    tags: ["structure", "fencing"],
    name: "Pillar",
    thumbnail: "/items/pillar/thumbnail.webp",
    src: "/items/pillar/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 1.3, 0.5]
  },
  {
    id: "high-fence",
    category: "outdoor",
    tags: ["fencing"],
    name: "High Fence",
    thumbnail: "/items/high-fence/thumbnail.webp",
    src: "/items/high-fence/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0.01, 0],
    rotation: [0, 0, 0],
    dimensions: [4, 4.1, 0.5]
  },
  {
    id: "medium-fence",
    category: "outdoor",
    tags: ["fencing"],
    name: "Medium Fence",
    thumbnail: "/items/medium-fence/thumbnail.webp",
    src: "/items/medium-fence/model.glb",
    scale: [0.49, 0.49, 0.49],
    offset: [0, 0.01, 0],
    rotation: [0, 0, 0],
    dimensions: [2, 2, 0.5]
  },
  {
    id: "low-fence",
    category: "outdoor",
    tags: ["fencing"],
    name: "Low Fence",
    thumbnail: "/items/low-fence/thumbnail.webp",
    src: "/items/low-fence/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0.01, 0],
    rotation: [0, 0, 0],
    dimensions: [2, 0.8, 0.5]
  },
  {
    id: "bush",
    category: "outdoor",
    tags: ["vegetation"],
    name: "Bush",
    thumbnail: "/items/bush/thumbnail.webp",
    src: "/items/bush/model.glb",
    scale: [0.96, 0.96, 0.96],
    offset: [-0.14, 0.01, -0.13],
    rotation: [0, 0, 0],
    dimensions: [3, 1.1, 1]
  },
  {
    id: "fir-tree",
    category: "outdoor",
    tags: ["vegetation"],
    name: "Fir",
    thumbnail: "/items/fir-tree/thumbnail.webp",
    src: "/items/fir-tree/model.glb",
    scale: [1, 1, 1],
    offset: [-0.01, 0.05, -0.07],
    rotation: [0, 0, 0],
    dimensions: [0.5, 3, 0.5]
  },
  {
    id: "tree",
    category: "outdoor",
    tags: ["vegetation"],
    name: "Tree",
    thumbnail: "/items/tree/thumbnail.webp",
    src: "/items/tree/model.glb",
    scale: [0.65, 0.65, 0.65],
    offset: [-0.02, 0.17, -0.04],
    rotation: [0, 0, 0],
    dimensions: [1, 5, 1]
  },
  {
    id: "palm",
    category: "outdoor",
    tags: ["vegetation"],
    name: "Palm",
    thumbnail: "/items/palm/thumbnail.webp",
    src: "/items/palm/model.glb",
    scale: [0.37, 0.37, 0.37],
    offset: [0, 0, 0.02],
    rotation: [0, 0, 0],
    dimensions: [1, 4.5, 1]
  },
  {
    id: "patio-umbrella",
    category: "outdoor",
    tags: ["leisure", "floor"],
    name: "Patio Umbrella",
    thumbnail: "/items/patio-umbrella/thumbnail.webp",
    src: "/items/patio-umbrella/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 3.7, 0.5]
  },
  {
    id: "sunbed",
    category: "outdoor",
    tags: ["leisure", "seating", "floor"],
    name: "Sunbed",
    thumbnail: "/items/sunbed/thumbnail.webp",
    src: "/items/sunbed/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0.04, 0],
    rotation: [0, 0, 0],
    dimensions: [1, 1.2, 1.5]
  },
  {
    id: "window-double",
    category: "window",
    tags: ["wall"],
    name: "Double Window",
    thumbnail: "/items/window-double/thumbnail.webp",
    src: "/items/window-double/model.glb",
    scale: [0.81, 0.81, 0.81],
    offset: [0, -0.32, 0],
    rotation: [0, 3.14, 0],
    dimensions: [1.5, 1.5, 0.5],
    attachTo: "wall"
  },
  {
    id: "window-simple",
    category: "window",
    tags: ["wall"],
    name: "Simple Window",
    thumbnail: "/items/window-simple/thumbnail.webp",
    src: "/items/window-simple/model.glb",
    scale: [1, 1, 1],
    offset: [1.06, -0.21, 0.05],
    rotation: [0, 3.14, 0],
    dimensions: [1.5, 2, 0.5],
    attachTo: "wall"
  },
  {
    id: "window-rectangle",
    category: "window",
    tags: ["wall"],
    name: "Rectangle Window",
    thumbnail: "/items/window-rectangle/thumbnail.webp",
    src: "/items/window-rectangle/model.glb",
    scale: [0.81, 0.81, 0.81],
    offset: [-1.41, -0.28, 0.08],
    rotation: [0, 3.14, 0],
    dimensions: [2.5, 1.5, 0.5],
    attachTo: "wall"
  },
  {
    id: "door-bar",
    category: "door",
    tags: ["wall"],
    name: "Door with bar",
    thumbnail: "/items/door-bar/thumbnail.webp",
    src: "/items/door-bar/model.glb",
    scale: [1, 1, 1],
    offset: [-0.48, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1.5, 2.5, 0.5],
    attachTo: "wall"
  },
  {
    id: "glass-door",
    category: "door",
    tags: ["wall"],
    name: "Glass Door",
    thumbnail: "/items/glass-door/thumbnail.webp",
    src: "/items/glass-door/model.glb",
    scale: [0.9, 0.9, 0.9],
    offset: [-0.52, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1.5, 2.5, 0.4],
    attachTo: "wall"
  },
  {
    id: "door",
    category: "door",
    tags: ["wall"],
    name: "Door",
    thumbnail: "/items/door/thumbnail.webp",
    src: "/items/door/model.glb",
    scale: [0.79, 0.79, 0.79],
    offset: [-0.43, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1.5, 2, 0.4],
    attachTo: "wall"
  },
  {
    id: "parking-spot",
    category: "outdoor",
    tags: ["leisure", "floor"],
    name: "Parking Spot",
    thumbnail: "/items/parking-spot/thumbnail.webp",
    src: "/items/parking-spot/model.glb",
    scale: [0.9, 1, 0.78],
    offset: [0, 0, 0.01],
    rotation: [0, 0, 0],
    dimensions: [5, 1, 2.5]
  },
  {
    id: "outdoor-playhouse",
    category: "outdoor",
    tags: ["leisure", "kids", "floor"],
    name: "Outdoor Playhouse",
    thumbnail: "/items/outdoor-playhouse/thumbnail.webp",
    src: "/items/outdoor-playhouse/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.5, 1]
  },
  {
    id: "skate",
    category: "outdoor",
    tags: ["leisure", "kids", "floor"],
    name: "Skate",
    thumbnail: "/items/skate/thumbnail.webp",
    src: "/items/skate/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1, 0.2, 0.5]
  },
  {
    id: "scooter",
    category: "outdoor",
    tags: ["leisure", "kids", "floor"],
    name: "Scooter",
    thumbnail: "/items/scooter/thumbnail.webp",
    src: "/items/scooter/model.glb",
    scale: [1, 1, 1],
    offset: [0.11, 0, 0.17],
    rotation: [0, 0, 0],
    dimensions: [1, 0.9, 0.5]
  },
  {
    id: "basket-hoop",
    category: "outdoor",
    tags: ["leisure", "sports", "floor"],
    name: "Basket Hoop",
    thumbnail: "/items/basket-hoop/thumbnail.webp",
    src: "/items/basket-hoop/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1, 1.8, 1]
  },
  {
    id: "ball",
    category: "outdoor",
    tags: ["leisure", "sports", "floor"],
    name: "Ball",
    thumbnail: "/items/ball/thumbnail.webp",
    src: "/items/ball/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0.12, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.3, 0.5]
  },
  {
    id: "wine-bottle",
    category: "kitchen",
    tags: ["countertop", "decor"],
    name: "Wine Bottle",
    thumbnail: "/items/wine-bottle/thumbnail.webp",
    src: "/items/wine-bottle/model.glb",
    scale: [1, 1, 1],
    offset: [-0.05, 0, 0.01],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.4, 0.5]
  },
  {
    id: "fruits",
    category: "kitchen",
    tags: ["countertop", "decor"],
    name: "Fruits",
    thumbnail: "/items/fruits/thumbnail.webp",
    src: "/items/fruits/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.3, 0.5]
  },
  {
    id: "cutting-board",
    category: "kitchen",
    tags: ["countertop"],
    name: "Cutting Board",
    thumbnail: "/items/cutting-board/thumbnail.webp",
    src: "/items/cutting-board/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.1, 0.5]
  },
  {
    id: "frying-pan",
    category: "kitchen",
    tags: ["countertop"],
    name: "Frying Pan",
    thumbnail: "/items/frying-pan/thumbnail.webp",
    src: "/items/frying-pan/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.1, 1]
  },
  {
    id: "kitchen-utensils",
    category: "kitchen",
    tags: ["countertop"],
    name: "Kitchen Utensils",
    thumbnail: "/items/kitchen-utensils/thumbnail.webp",
    src: "/items/kitchen-utensils/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.5, 0.5]
  },
  {
    id: "microwave",
    category: "kitchen",
    tags: ["countertop", "electronics"],
    name: "Microwave",
    thumbnail: "/items/microwave/thumbnail.webp",
    src: "/items/microwave/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, -0.03],
    rotation: [0, 0, 0],
    dimensions: [1, 0.3, 0.5]
  },
  {
    id: "stove",
    category: "kitchen",
    tags: ["floor", "large"],
    name: "Stove",
    thumbnail: "/items/stove/thumbnail.webp",
    src: "/items/stove/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, -0.05],
    rotation: [0, 0, 0],
    dimensions: [1, 1, 1]
  },
  {
    id: "fridge",
    category: "kitchen",
    tags: ["floor", "large"],
    name: "Fridge",
    thumbnail: "/items/fridge/thumbnail.webp",
    src: "/items/fridge/model.glb",
    scale: [1, 1, 1],
    offset: [0.01, 0, -0.05],
    rotation: [0, 0, 0],
    dimensions: [1, 2, 1]
  },
  {
    id: "hood",
    category: "kitchen",
    tags: ["wall"],
    name: "Hood",
    thumbnail: "/items/hood/thumbnail.webp",
    src: "/items/hood/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0.52, 0.01],
    rotation: [0, 0, 0],
    dimensions: [1.5, 1, 1.1],
    attachTo: "wall-side"
  },
  {
    id: "kitchen-shelf",
    category: "kitchen",
    tags: ["wall", "storage"],
    name: "Kitchen Shelf",
    thumbnail: "/items/kitchen-shelf/thumbnail.webp",
    src: "/items/kitchen-shelf/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0.52, 0.01],
    rotation: [0, 0, 0],
    dimensions: [2.5, 1, 1.1],
    attachTo: "wall-side"
  },
  {
    id: "kitchen-counter",
    category: "kitchen",
    tags: ["floor", "large", "storage"],
    name: "Kitchen Counter",
    thumbnail: "/items/kitchen-counter/thumbnail.webp",
    src: "/items/kitchen-counter/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [2, 0.8, 1],
    surface: {
      height: 0.75
    }
  },
  {
    id: "kitchen-cabinet",
    category: "kitchen",
    tags: ["floor", "large", "storage"],
    name: "Kitchen Cabinet",
    thumbnail: "/items/kitchen-cabinet/thumbnail.webp",
    src: "/items/kitchen-cabinet/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [2, 1.1, 1],
    surface: {
      height: 1.1
    }
  },
  {
    id: "kitchen",
    category: "kitchen",
    tags: ["floor", "large"],
    name: "Kitchen",
    thumbnail: "/items/kitchen/thumbnail.webp",
    src: "/items/kitchen/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [2.5, 1.1, 1]
  },
  {
    id: "toilet-paper",
    category: "bathroom",
    tags: ["wall", "decor"],
    name: "Toilet Paper",
    thumbnail: "/items/toilet-paper/thumbnail.webp",
    src: "/items/toilet-paper/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0.19, 0.12],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.5, 0.5],
    attachTo: "wall-side"
  },
  {
    id: "shower-rug",
    category: "bathroom",
    tags: ["floor", "decor"],
    name: "Shower Rug",
    thumbnail: "/items/shower-rug/thumbnail.webp",
    src: "/items/shower-rug/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1, 0.1, 0.5]
  },
  {
    id: "laundry-bag",
    category: "bathroom",
    tags: ["floor"],
    name: "Laundry Bag",
    thumbnail: "/items/laundry-bag/thumbnail.webp",
    src: "/items/laundry-bag/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.8, 0.5]
  },
  {
    id: "drying-rack",
    category: "bathroom",
    tags: ["floor"],
    name: "Drying Rack",
    thumbnail: "/items/drying-rack/thumbnail.webp",
    src: "/items/drying-rack/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [2, 1.1, 1]
  },
  {
    id: "washing-machine",
    category: "bathroom",
    tags: ["floor", "large", "electronics"],
    name: "Washing Machine",
    thumbnail: "/items/washing-machine/thumbnail.webp",
    src: "/items/washing-machine/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1, 1, 1]
  },
  {
    id: "toilet",
    category: "bathroom",
    tags: ["floor", "large"],
    name: "Toilet",
    thumbnail: "/items/toilet/thumbnail.webp",
    src: "/items/toilet/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, -0.23],
    rotation: [0, 0, 0],
    dimensions: [1, 0.9, 1]
  },
  {
    id: "shower-square",
    category: "bathroom",
    tags: ["floor", "large"],
    name: "Squared Shower",
    thumbnail: "/items/shower-square/thumbnail.webp",
    src: "/items/shower-square/model.glb",
    scale: [1, 1, 1],
    offset: [0.41, 0, -0.42],
    rotation: [0, 0, 0],
    dimensions: [1, 2, 1]
  },
  {
    id: "shower-angle",
    category: "bathroom",
    tags: ["floor", "large"],
    name: "Angle Shower",
    thumbnail: "/items/shower-angle/thumbnail.webp",
    src: "/items/shower-angle/model.glb",
    scale: [1, 1, 1],
    offset: [0.41, 0, -0.42],
    rotation: [0, 0, 0],
    dimensions: [1, 2, 1]
  },
  {
    id: "bathtub",
    category: "bathroom",
    tags: ["floor", "large"],
    name: "Bathtub",
    thumbnail: "/items/bathtub/thumbnail.webp",
    src: "/items/bathtub/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0.01],
    rotation: [0, 0, 0],
    dimensions: [2.5, 0.8, 1.5]
  },
  {
    id: "bathroom-sink",
    category: "bathroom",
    tags: ["floor", "large"],
    name: "Bathroom Sink",
    thumbnail: "/items/bathroom-sink/thumbnail.webp",
    src: "/items/bathroom-sink/model.glb",
    scale: [1, 1, 1],
    offset: [0.11, 0, 0.02],
    rotation: [0, 0, 0],
    dimensions: [2, 1, 1.5]
  },
  {
    id: "ceiling-fan",
    category: "appliance",
    tags: ["ceiling", "climate"],
    name: "Ceiling fan",
    thumbnail: "/items/ceiling-fan/thumbnail.webp",
    src: "/items/ceiling-fan/model.glb",
    scale: [1, 1, 1],
    offset: [-0.12, 0.49, 0],
    rotation: [0, 0, 0],
    dimensions: [1, 0.5, 1.5],
    attachTo: "ceiling",
    interactive: {
      effects: [
        {
          kind: "animation",
          clips: {
            on: "On"
          }
        }
      ],
      controls: [
        {
          kind: "toggle"
        }
      ]
    }
  },
  {
    id: "electric-panel",
    category: "appliance",
    tags: ["wall", "electrical"],
    name: "Electric Panel",
    thumbnail: "/items/electric-panel/thumbnail.webp",
    src: "/items/electric-panel/model.glb",
    scale: [0.61, 0.74, 0.7],
    offset: [0, 0, 0.06],
    rotation: [0, 0, 0],
    dimensions: [0.5, 1, 0.3],
    attachTo: "wall-side"
  },
  {
    id: "sprinkler",
    category: "appliance",
    tags: ["ceiling", "safety"],
    name: "Sprinkler",
    thumbnail: "/items/sprinkler/thumbnail.webp",
    src: "/items/sprinkler/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0.45, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.5, 0.5],
    attachTo: "ceiling"
  },
  {
    id: "smoke-detector",
    category: "appliance",
    tags: ["ceiling", "safety"],
    name: "Smoke Detector",
    thumbnail: "/items/smoke-detector/thumbnail.webp",
    src: "/items/smoke-detector/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0.49, 0],
    rotation: [Math.PI, 0, 0],
    dimensions: [0.5, 0.5, 0.5],
    attachTo: "ceiling"
  },
  {
    id: "fire-detector",
    category: "appliance",
    tags: ["wall", "safety"],
    name: "Fire Detector",
    thumbnail: "/items/fire-detector/thumbnail.webp",
    src: "/items/fire-detector/model.glb",
    scale: [0.9, 1.4, 0.7],
    offset: [0.02, 0.05, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.5, 0.3],
    attachTo: "wall"
  },
  {
    id: "exit-sign",
    category: "appliance",
    tags: ["wall", "safety"],
    name: "Exit Sign",
    thumbnail: "/items/exit-sign/thumbnail.webp",
    src: "/items/exit-sign/model.glb",
    scale: [0.6, 0.5, 0.7],
    offset: [0, 0.04, 0.05],
    rotation: [0, 0, 0],
    dimensions: [1, 0.5, 0.3],
    attachTo: "wall-side"
  },
  {
    id: "hydrant",
    category: "appliance",
    tags: ["floor", "safety"],
    name: "Hydrant",
    thumbnail: "/items/hydrant/thumbnail.webp",
    src: "/items/hydrant/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1, 0.9, 1]
  },
  {
    id: "alarm-keypad",
    category: "appliance",
    tags: ["wall", "safety", "electrical"],
    name: "Alarm Keypad",
    thumbnail: "/items/alarm-keypad/thumbnail.webp",
    src: "/items/alarm-keypad/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.1, 0.5]
  },
  {
    id: "thermostat",
    category: "appliance",
    tags: ["wall", "climate", "electrical"],
    name: "Thermostat",
    thumbnail: "/items/thermostat/thumbnail.webp",
    src: "/items/thermostat/model.glb",
    scale: [2.08, 2.1, 2.59],
    offset: [0, 0, 0.01],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.5, 0.1],
    attachTo: "wall-side"
  },
  {
    id: "air-conditioning",
    category: "appliance",
    tags: ["wall", "climate"],
    name: "Air Conditioning",
    thumbnail: "/items/air-conditioning/thumbnail.webp",
    src: "/items/air-conditioning/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0.37, 0.21],
    rotation: [0, 0, 0],
    dimensions: [2, 1, 0.9],
    attachTo: "wall-side"
  },
  {
    id: "ac-block",
    category: "appliance",
    tags: ["floor", "climate"],
    name: "AC block",
    thumbnail: "/items/ac-block/thumbnail.webp",
    src: "/items/ac-block/model.glb",
    scale: [0.79, 0.79, 0.79],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1.1, 1, 1.1]
  },
  {
    id: "toaster",
    category: "appliance",
    tags: ["countertop", "electronics"],
    name: "Toaster",
    thumbnail: "/items/toaster/thumbnail.webp",
    src: "/items/toaster/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.3, 0.5]
  },
  {
    id: "sewing-machine",
    category: "appliance",
    tags: ["countertop", "electronics"],
    name: "Sewing Machine",
    thumbnail: "/items/sewing-machine/thumbnail.webp",
    src: "/items/sewing-machine/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1, 0.7, 0.5]
  },
  {
    id: "kettle",
    category: "appliance",
    tags: ["countertop", "electronics"],
    name: "Kettle",
    thumbnail: "/items/kettle/thumbnail.webp",
    src: "/items/kettle/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.3, 0.5]
  },
  {
    id: "iron",
    category: "appliance",
    tags: ["countertop", "electronics"],
    name: "Iron",
    thumbnail: "/items/iron/thumbnail.webp",
    src: "/items/iron/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.3, 0.5]
  },
  {
    id: "coffee-machine",
    category: "appliance",
    tags: ["countertop", "electronics"],
    name: "Coffee Machine",
    thumbnail: "/items/coffee-machine/thumbnail.webp",
    src: "/items/coffee-machine/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, -0.03],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.3, 0.5]
  },
  {
    id: "television",
    category: "appliance",
    tags: ["floor", "electronics"],
    name: "Television",
    thumbnail: "/items/television/thumbnail.webp",
    src: "/items/television/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [2, 1.1, 0.5]
  },
  {
    id: "computer",
    category: "appliance",
    tags: ["countertop", "electronics"],
    name: "Computer",
    thumbnail: "/items/computer/thumbnail.webp",
    src: "/items/computer/model.glb",
    scale: [1, 1, 1],
    offset: [0.01, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1, 0.5, 0.5]
  },
  {
    id: "stereo-speaker",
    category: "appliance",
    tags: ["floor", "electronics"],
    name: "Stereo Speaker",
    thumbnail: "/items/stereo-speaker/thumbnail.webp",
    src: "/items/stereo-speaker/model.glb",
    scale: [1, 1, 1],
    offset: [0.02, 0, -0.01],
    rotation: [0, 0, 0],
    dimensions: [0.5, 1.1, 0.5]
  },
  {
    id: "threadmill",
    category: "furniture",
    tags: ["floor", "fitness"],
    name: "Threadmill",
    thumbnail: "/items/threadmill/thumbnail.webp",
    src: "/items/threadmill/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [2.5, 1.5, 1]
  },
  {
    id: "barbell-stand",
    category: "furniture",
    tags: ["floor", "fitness"],
    name: "Barbell Stand",
    thumbnail: "/items/barbell-stand/thumbnail.webp",
    src: "/items/barbell-stand/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1.5, 1.3, 2]
  },
  {
    id: "barbell",
    category: "furniture",
    tags: ["floor", "fitness"],
    name: "Barbell",
    thumbnail: "/items/barbell/thumbnail.webp",
    src: "/items/barbell/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.4, 2]
  },
  {
    id: "toy",
    category: "furniture",
    tags: ["floor", "kids", "decor"],
    name: "Toy",
    thumbnail: "/items/toy/thumbnail.webp",
    src: "/items/toy/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.5, 0.5]
  },
  {
    id: "car-toy",
    category: "furniture",
    tags: ["floor", "kids", "decor"],
    name: "Car Toy",
    thumbnail: "/items/car-toy/thumbnail.webp",
    src: "/items/car-toy/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.4, 1]
  },
  {
    id: "easel",
    category: "furniture",
    tags: ["floor", "decor"],
    name: "Easel",
    thumbnail: "/items/easel/thumbnail.webp",
    src: "/items/easel/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1.5, 2.3, 1]
  },
  {
    id: "pool-table",
    category: "furniture",
    tags: ["floor", "leisure"],
    name: "Pool table",
    thumbnail: "/items/pool-table/thumbnail.webp",
    src: "/items/pool-table/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [2.5, 1, 4]
  },
  {
    id: "guitar",
    category: "furniture",
    tags: ["floor", "decor"],
    name: "Guitar",
    thumbnail: "/items/guitar/thumbnail.webp",
    src: "/items/guitar/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0.32, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 1.2, 0.5]
  },
  {
    id: "piano",
    category: "furniture",
    tags: ["floor", "decor"],
    name: "Piano",
    thumbnail: "/items/piano/thumbnail.webp",
    src: "/items/piano/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [2, 1.5, 1]
  },
  {
    id: "round-carpet",
    category: "furniture",
    tags: ["floor", "decor"],
    name: "Round Carpet",
    thumbnail: "/items/round-carpet/thumbnail.webp",
    src: "/items/round-carpet/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [2.5, 0.1, 2.5]
  },
  {
    id: "rectangular-carpet",
    category: "furniture",
    tags: ["floor", "decor"],
    name: "Rectangular Carpet",
    thumbnail: "/items/rectangular-carpet/thumbnail.webp",
    src: "/items/rectangular-carpet/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [3, 0.1, 2]
  },
  {
    id: "cactus",
    category: "furniture",
    tags: ["floor", "decor", "vegetation"],
    name: "Cactus",
    thumbnail: "/items/cactus/thumbnail.webp",
    src: "/items/cactus/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.4, 0.5]
  },
  {
    id: "small-indoor-plant",
    category: "furniture",
    tags: ["countertop", "decor", "vegetation"],
    name: "Small Plant",
    thumbnail: "/items/small-indoor-plant/thumbnail.webp",
    src: "/items/small-indoor-plant/model.glb",
    scale: [1, 1, 1],
    offset: [-0.01, 0, 0.01],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.7, 0.5]
  },
  {
    id: "indoor-plant",
    category: "furniture",
    tags: ["floor", "decor", "vegetation"],
    name: "Indoor Plant",
    thumbnail: "/items/indoor-plant/thumbnail.webp",
    src: "/items/indoor-plant/model.glb",
    scale: [1, 1, 1],
    offset: [-0.05, 0, 0.07],
    rotation: [0, 0, 0],
    dimensions: [1, 1.7, 1]
  },
  {
    id: "ironing-board",
    category: "furniture",
    tags: ["floor"],
    name: "Ironing Board",
    thumbnail: "/items/ironing-board/thumbnail.webp",
    src: "/items/ironing-board/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1.5, 1, 1]
  },
  {
    id: "coat-rack",
    category: "furniture",
    tags: ["floor", "storage"],
    name: "Coat Rack",
    thumbnail: "/items/coat-rack/thumbnail.webp",
    src: "/items/coat-rack/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 1.8, 0.5]
  },
  {
    id: "trash-bin",
    category: "furniture",
    tags: ["floor"],
    name: "Trash Bin",
    thumbnail: "/items/trash-bin/thumbnail.webp",
    src: "/items/trash-bin/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.6, 0.5]
  },
  {
    id: "round-mirror",
    category: "furniture",
    tags: ["wall", "decor"],
    name: "Rounded Mirror",
    thumbnail: "/items/round-mirror/thumbnail.webp",
    src: "/items/round-mirror/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0.32, 0],
    rotation: [0, 0, 0],
    dimensions: [1, 1, 0.1],
    attachTo: "wall-side"
  },
  {
    id: "picture",
    category: "furniture",
    tags: ["wall", "decor"],
    name: "Picture",
    thumbnail: "/items/picture/thumbnail.webp",
    src: "/items/picture/model.glb",
    scale: [1, 1, 1],
    offset: [0.02, 0.45, 0.01],
    rotation: [0, 0, 0],
    dimensions: [2, 1, 0.2],
    attachTo: "wall-side"
  },
  {
    id: "books",
    category: "furniture",
    tags: ["countertop", "decor"],
    name: "Books",
    thumbnail: "/items/books/thumbnail.webp",
    src: "/items/books/model.glb",
    scale: [1, 1, 1],
    offset: [-0.08, 0, 0.02],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.3, 0.5]
  },
  {
    id: "column",
    category: "furniture",
    tags: ["floor", "structure"],
    name: "Column",
    thumbnail: "/items/column/thumbnail.webp",
    src: "/items/column/model.glb",
    scale: [1, 1, 1],
    offset: [0, 1.26, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 2.6, 0.5]
  },
  {
    id: "stairs",
    category: "furniture",
    tags: ["floor", "structure"],
    name: "Stairs",
    thumbnail: "/items/stairs/thumbnail.webp",
    src: "/items/stairs/model.glb",
    scale: [0.61, 0.61, 0.61],
    offset: [0, 0.03, 1.8],
    rotation: [0, 0, 0],
    dimensions: [1.5, 2.5, 3.5]
  },
  // {
  //   id: "suspended-fireplace",
  //   category: "furniture",
  //   tags: ["ceiling", "decor"],
  //   name: "Suspended Fireplace",
  //   thumbnail: "/items/suspended-fireplace/thumbnail.webp",
  //   src: "/items/suspended-fireplace/model.glb",
  //   scale: [1, 1, 1],
  //   offset: [0, 0.45, 0],
  //   rotation: [0, 0, 0],
  //   dimensions: [0.5, 0.5, 0.5],
  //   attachTo: "ceiling",
  // },
  {
    id: "tv-stand",
    category: "furniture",
    tags: ["floor", "storage"],
    name: "TV Stand",
    thumbnail: "/items/tv-stand/thumbnail.webp",
    src: "/items/tv-stand/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0.21, 0],
    rotation: [0, 0, 0],
    dimensions: [2, 0.4, 0.5],
    surface: {
      height: 0.36
    }
  },
  {
    id: "shelf",
    category: "furniture",
    tags: ["wall", "storage"],
    name: "Shelf",
    thumbnail: "/items/shelf/thumbnail.webp",
    src: "/items/shelf/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0.1, 0.01],
    rotation: [0, 0, 0],
    dimensions: [1, 0.5, 0.7],
    attachTo: "wall-side",
    surface: {
      height: 0.12
    }
  },
  {
    id: "bookshelf",
    category: "furniture",
    tags: ["floor", "storage"],
    name: "Bookshelf",
    thumbnail: "/items/bookshelf/thumbnail.webp",
    src: "/items/bookshelf/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1, 2, 0.5]
  },
  {
    id: "ceiling-lamp",
    category: "furniture",
    tags: ["ceiling", "lighting"],
    name: "Ceiling Lamp",
    thumbnail: "/items/ceiling-lamp/thumbnail.webp",
    src: "/items/ceiling-lamp/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0.98, 0],
    rotation: [0, 0, 0],
    dimensions: [1, 1, 1],
    attachTo: "ceiling",
    interactive: {
      controls: [
        {
          kind: "toggle"
        },
        {
          kind: "slider",
          label: "Intensity",
          min: 0,
          max: 100,
          unit: "%",
          displayMode: "dial",
          default: 100
        }
      ],
      effects: [
        {
          kind: "light",
          intensityRange: [0, 2],
          color: "#ffffff",
          offset: [0, -0.5, 0]
        }
      ]
    }
  },
  {
    id: "recessed-light",
    category: "furniture",
    tags: ["ceiling", "lighting"],
    name: "Recessed Light",
    thumbnail: "/items/recessed-light/thumbnail.webp",
    src: "/items/recessed-light/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0.094, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.1, 0.5],
    attachTo: "ceiling",
    interactive: {
      controls: [
        {
          kind: "toggle"
        },
        {
          kind: "slider",
          label: "Intensity",
          min: 0,
          max: 100,
          unit: "%",
          displayMode: "dial",
          default: 100
        }
      ],
      effects: [
        {
          kind: "light",
          intensityRange: [0, 2],
          color: "#ffffff",
          offset: [0, -0.1, 0]
        }
      ]
    }
  },
  {
    id: "floor-lamp",
    category: "furniture",
    tags: ["floor", "lighting"],
    name: "Floor Lamp",
    thumbnail: "/items/floor-lamp/thumbnail.webp",
    src: "/items/floor-lamp/model.glb",
    scale: [1, 1, 1],
    offset: [0.04, 0, 0.02],
    rotation: [0, 0, 0],
    dimensions: [1, 1.9, 1],
    interactive: {
      controls: [
        {
          kind: "toggle"
        },
        {
          kind: "slider",
          label: "Intensity",
          min: 0,
          max: 100,
          unit: "%",
          displayMode: "dial",
          default: 100
        }
      ],
      effects: [
        {
          kind: "light",
          intensityRange: [0, 2],
          color: "#ffffff",
          offset: [0, 1.4, 0]
        }
      ]
    }
  },
  {
    id: "table-lamp",
    category: "furniture",
    tags: ["countertop", "lighting"],
    name: "Table Lamp",
    thumbnail: "/items/table-lamp/thumbnail.webp",
    src: "/items/table-lamp/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.8, 1]
  },
  {
    id: "closet",
    category: "furniture",
    tags: ["floor", "storage", "bedroom"],
    name: "Closet",
    thumbnail: "/items/closet/thumbnail.webp",
    src: "/items/closet/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, -0.01],
    rotation: [0, 0, 0],
    dimensions: [2, 2.5, 1]
  },
  {
    id: "dresser",
    category: "furniture",
    tags: ["floor", "storage", "bedroom"],
    name: "Dresser",
    thumbnail: "/items/dresser/thumbnail.webp",
    src: "/items/dresser/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1.5, 0.8, 1],
    surface: {
      height: 0.8
    }
  },
  {
    id: "bunkbed",
    category: "furniture",
    tags: ["floor", "bedroom"],
    name: "Bunkbed",
    thumbnail: "/items/bunkbed/thumbnail.webp",
    src: "/items/bunkbed/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, -0.09],
    rotation: [0, 0, 0],
    dimensions: [2, 1.6, 1.5]
  },
  {
    id: "double-bed",
    category: "furniture",
    tags: ["floor", "bedroom"],
    name: "Double Bed",
    thumbnail: "/items/double-bed/thumbnail.webp",
    src: "/items/double-bed/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, -0.03],
    rotation: [0, 0, 0],
    dimensions: [2, 0.8, 2.5]
  },
  {
    id: "single-bed",
    category: "furniture",
    tags: ["floor", "bedroom"],
    name: "Single Bed",
    thumbnail: "/items/single-bed/thumbnail.webp",
    src: "/items/single-bed/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1.5, 0.7, 2.5]
  },
  {
    id: "sofa",
    category: "furniture",
    tags: ["floor", "seating"],
    name: "Sofa",
    thumbnail: "/items/sofa/thumbnail.webp",
    src: "/items/sofa/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0.04],
    rotation: [0, 0, 0],
    dimensions: [2.5, 0.8, 1.5]
  },
  {
    id: "lounge-chair",
    category: "furniture",
    tags: ["floor", "seating"],
    name: "Lounge Chair",
    thumbnail: "/items/lounge-chair/thumbnail.webp",
    src: "/items/lounge-chair/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0.09],
    rotation: [0, 0, 0],
    dimensions: [1, 1.1, 1.5]
  },
  {
    id: "stool",
    category: "furniture",
    tags: ["floor", "seating"],
    name: "Stool",
    thumbnail: "/items/stool/thumbnail.webp",
    src: "/items/stool/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1, 1.2, 1]
  },
  {
    id: "dining-chair",
    category: "furniture",
    tags: ["floor", "seating"],
    name: "Dining Chair",
    thumbnail: "/items/dining-chair/thumbnail.webp",
    src: "/items/dining-chair/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [0.5, 1, 0.5]
  },
  {
    id: "office-chair",
    category: "furniture",
    tags: ["floor", "seating"],
    name: "Office Chair",
    thumbnail: "/items/office-chair/thumbnail.webp",
    src: "/items/office-chair/model.glb",
    scale: [1, 1, 1],
    offset: [0.01, 0, 0.03],
    rotation: [0, 0, 0],
    dimensions: [1, 1.2, 1]
  },
  {
    id: "livingroom-chair",
    category: "furniture",
    tags: ["floor", "seating"],
    name: "Livingroom Chair",
    thumbnail: "/items/livingroom-chair/thumbnail.webp",
    src: "/items/livingroom-chair/model.glb",
    scale: [1, 1, 1],
    offset: [0.01, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [1.5, 0.8, 1.5]
  },
  {
    id: "bedside-table",
    category: "furniture",
    tags: ["floor", "bedroom"],
    name: "Bedside Table",
    thumbnail: "/items/bedside-table/thumbnail.webp",
    src: "/items/bedside-table/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, -0.01],
    rotation: [0, 0, 0],
    dimensions: [0.5, 0.5, 0.5],
    surface: {
      height: 0.5
    }
  },
  {
    id: "coffee-table",
    category: "furniture",
    tags: ["floor", "table"],
    name: "Coffee Table",
    thumbnail: "/items/coffee-table/thumbnail.webp",
    src: "/items/coffee-table/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [2, 0.4, 1.5],
    surface: {
      height: 0.3
    }
  },
  {
    id: "office-table",
    category: "furniture",
    tags: ["floor", "table"],
    name: "Office Table",
    thumbnail: "/items/office-table/thumbnail.webp",
    src: "/items/office-table/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, 0],
    rotation: [0, 0, 0],
    dimensions: [2, 0.8, 1],
    surface: {
      height: 0.75
    }
  },
  {
    id: "dining-table",
    category: "furniture",
    tags: ["floor", "table"],
    name: "Dining Table",
    thumbnail: "/items/dining-table/thumbnail.webp",
    src: "/items/dining-table/model.glb",
    scale: [1, 1, 1],
    offset: [0, 0, -0.01],
    rotation: [0, 0, 0],
    dimensions: [2.5, 0.8, 1],
    surface: {
      height: 0.8
    }
  }
];

// packages/editor/src/lib/agent/furniture-constraints.ts
function round3(v) {
  return Math.round(v * 1e3) / 1e3;
}
function polygonBounds2D(polygon) {
  const xs = polygon.map((p) => p[0]);
  const zs = polygon.map((p) => p[1]);
  return {
    minX: round3(Math.min(...xs)),
    minZ: round3(Math.min(...zs)),
    maxX: round3(Math.max(...xs)),
    maxZ: round3(Math.max(...zs))
  };
}
function polygonArea2D(polygon) {
  let area = 0;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    area += (polygon[j][0] + polygon[i][0]) * (polygon[j][1] - polygon[i][1]);
  }
  return round3(Math.abs(area) / 2);
}
function pointInPolygon2D(x, z2, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, zi] = polygon[i];
    const [xj, zj] = polygon[j];
    if (zi > z2 !== zj > z2 && x < (xj - xi) * (z2 - zi) / (zj - zi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}
function bboxForFurniture(position, dimensions, rotationDeg) {
  const rot = (Math.round(rotationDeg) % 360 + 360) % 360;
  const isRotated = rot === 90 || rot === 270;
  const worldW = isRotated ? dimensions[2] : dimensions[0];
  const worldD = isRotated ? dimensions[0] : dimensions[2];
  return {
    minX: round3(position[0] - worldW / 2),
    minZ: round3(position[2] - worldD / 2),
    maxX: round3(position[0] + worldW / 2),
    maxZ: round3(position[2] + worldD / 2)
  };
}
function expandBBox2D(bbox, amount) {
  return {
    minX: round3(bbox.minX - amount),
    minZ: round3(bbox.minZ - amount),
    maxX: round3(bbox.maxX + amount),
    maxZ: round3(bbox.maxZ + amount)
  };
}
function bboxOverlaps2D(a, b) {
  return a.maxX > b.minX && a.minX < b.maxX && a.maxZ > b.minZ && a.minZ < b.maxZ;
}
function bboxArea2D(bbox) {
  return round3(Math.max(0, bbox.maxX - bbox.minX) * Math.max(0, bbox.maxZ - bbox.minZ));
}
function bboxInsideBounds2D(bbox, bounds, margin = 0) {
  return bbox.minX >= bounds.minX + margin && bbox.maxX <= bounds.maxX - margin && bbox.minZ >= bounds.minZ + margin && bbox.maxZ <= bounds.maxZ - margin;
}
function bboxCornersInsidePolygon2D(bbox, polygon, margin = 0) {
  return [
    [bbox.minX + margin, bbox.minZ + margin],
    [bbox.maxX - margin, bbox.minZ + margin],
    [bbox.maxX - margin, bbox.maxZ - margin],
    [bbox.minX + margin, bbox.maxZ - margin]
  ].every(([x, z2]) => pointInPolygon2D(x, z2, polygon));
}
function segmentBBox2D(from, to, width) {
  const minX = Math.min(from[0], to[0]) - width / 2;
  const maxX = Math.max(from[0], to[0]) + width / 2;
  const minZ = Math.min(from[1], to[1]) - width / 2;
  const maxZ = Math.max(from[1], to[1]) + width / 2;
  return { minX: round3(minX), minZ: round3(minZ), maxX: round3(maxX), maxZ: round3(maxZ) };
}
function buildFurnitureConstraintModel(args) {
  const roomBounds = args.bounds ?? polygonBounds2D(args.polygon);
  const inset = args.interiorInset ?? 0.08;
  const usableBounds = {
    minX: round3(roomBounds.minX + inset),
    minZ: round3(roomBounds.minZ + inset),
    maxX: round3(roomBounds.maxX - inset),
    maxZ: round3(roomBounds.maxZ - inset)
  };
  const roomCenter = [
    (roomBounds.minX + roomBounds.maxX) / 2,
    (roomBounds.minZ + roomBounds.maxZ) / 2
  ];
  const blockedZones = [];
  const clearPathCandidates = [];
  const nodes = args.nodes ?? {};
  const doorCenters = [];
  for (const wall of args.walls ?? []) {
    if (!wall.start || !wall.end) continue;
    const dx = wall.end[0] - wall.start[0];
    const dz = wall.end[1] - wall.start[1];
    const len = Math.sqrt(dx * dx + dz * dz);
    if (len < 0.01) continue;
    const dirX = dx / len;
    const dirZ = dz / len;
    const normX = -dirZ;
    const normZ = dirX;
    const mid = [(wall.start[0] + wall.end[0]) / 2, (wall.start[1] + wall.end[1]) / 2];
    const insideSign = (roomCenter[0] - mid[0]) * normX + (roomCenter[1] - mid[1]) * normZ >= 0 ? 1 : -1;
    for (const childId of wall.children ?? []) {
      const child = nodes[childId];
      if (!child || child.type !== "door" && child.type !== "window") continue;
      const localX = Array.isArray(child.position) ? child.position[0] : len / 2;
      const width = child.width ?? (child.type === "door" ? 0.9 : 1.5);
      const centerX = wall.start[0] + dirX * localX;
      const centerZ = wall.start[1] + dirZ * localX;
      const along = width / 2 + 0.25;
      const depth = child.type === "door" ? args.doorClearanceDepth ?? 0.9 : args.windowAccessDepth ?? 0.45;
      const p1 = [centerX - dirX * along, centerZ - dirZ * along];
      const p2 = [centerX + dirX * along, centerZ + dirZ * along];
      const p3 = [p2[0] + normX * insideSign * depth, p2[1] + normZ * insideSign * depth];
      const p4 = [p1[0] + normX * insideSign * depth, p1[1] + normZ * insideSign * depth];
      const xs = [p1[0], p2[0], p3[0], p4[0]];
      const zs = [p1[1], p2[1], p3[1], p4[1]];
      blockedZones.push({
        minX: round3(Math.min(...xs)),
        minZ: round3(Math.min(...zs)),
        maxX: round3(Math.max(...xs)),
        maxZ: round3(Math.max(...zs)),
        reason: child.type === "door" ? "door_clearance" : "window_access",
        nodeId: child.id
      });
      if (child.type === "door") doorCenters.push({ point: [centerX, centerZ], id: child.id });
    }
  }
  for (const item of [...args.existingItems ?? [], ...args.plannedItems ?? []]) {
    if (!item.position || !item.dimensions) continue;
    blockedZones.push({
      ...expandBBox2D(bboxForFurniture(item.position, item.dimensions, item.rotationDeg ?? 0), 0.05),
      reason: item.reason ?? "existing_furniture",
      nodeId: item.id
    });
  }
  const pathWidth = args.pathWidth ?? 0.65;
  for (const door of doorCenters) {
    clearPathCandidates.push({
      ...segmentBBox2D(door.point, roomCenter, pathWidth),
      from: [round3(door.point[0]), round3(door.point[1])],
      to: [round3(roomCenter[0]), round3(roomCenter[1])],
      reason: "door_to_room_center",
      nodeId: door.id
    });
  }
  for (let i = 0; i < doorCenters.length; i++) {
    for (let j = i + 1; j < doorCenters.length; j++) {
      const a = doorCenters[i];
      const b = doorCenters[j];
      clearPathCandidates.push({
        ...segmentBBox2D(a.point, b.point, pathWidth),
        from: [round3(a.point[0]), round3(a.point[1])],
        to: [round3(b.point[0]), round3(b.point[1])],
        reason: "door_to_door",
        nodeId: a.id
      });
    }
  }
  const blockedArea = round3(blockedZones.reduce((sum, zone) => sum + bboxArea2D(zone), 0));
  const usableArea = round3(Math.max(0, polygonArea2D(args.polygon) - blockedArea));
  const constraintFailures = usableArea <= 0 ? ["no_usable_area"] : [];
  return {
    roomBounds,
    usableBounds,
    roomArea: polygonArea2D(args.polygon),
    usableArea,
    blockedZones,
    clearPathCandidates,
    constraintSummary: {
      usableArea,
      blockedArea,
      blockedZones,
      clearPathCandidates,
      constraintFailures
    }
  };
}

// packages/editor/src/lib/agent/spatial-validator.ts
var CODE_PROFILES = {
  residential_default: {
    name: "residential_default",
    snapThreshold: 0.05,
    furnitureMargin: 0.1,
    openingMargin: 0.05,
    minDoorClearWidth: 0.8,
    minCorridorWidth: 1.1,
    minRoomWidth: 1.8,
    maxRoomAspectRatio: 3,
    minDaylightRatio: 0.08,
    minWindowSillHeight: 0.15,
    minDoorClearance: 0.5,
    minUsableArea: 2,
    minBedroomArea: 6,
    minBedroomWidth: 2.1,
    minLivingArea: 10,
    minLivingWidth: 2.7,
    minKitchenArea: 3.5,
    minKitchenWidth: 1.5,
    minBathroomArea: 2,
    minEntryClearWidth: 1,
    minFurnitureClearPath: 0.6,
    minOpeningEdgeClearance: 0.2,
    minOpeningSpacing: 0.2,
    minFallProtectionSillHeight: 0.75,
    minWetroomAdjacencyDistance: 1.2
  },
  china_residential: {
    name: "china_residential",
    snapThreshold: 0.05,
    furnitureMargin: 0.1,
    openingMargin: 0.05,
    minDoorClearWidth: 0.8,
    minCorridorWidth: 1.1,
    minRoomWidth: 1.8,
    maxRoomAspectRatio: 3,
    minDaylightRatio: 0.1,
    minWindowSillHeight: 0.15,
    minDoorClearance: 0.5,
    minUsableArea: 2,
    minBedroomArea: 7,
    minBedroomWidth: 2.4,
    minLivingArea: 12,
    minLivingWidth: 3,
    minKitchenArea: 4,
    minKitchenWidth: 1.5,
    minBathroomArea: 2.5,
    minEntryClearWidth: 1.1,
    minFurnitureClearPath: 0.65,
    minOpeningEdgeClearance: 0.25,
    minOpeningSpacing: 0.25,
    minFallProtectionSillHeight: 0.9,
    minWetroomAdjacencyDistance: 1.2
  }
};
function resolveCodeProfile(codeProfile) {
  if (codeProfile && codeProfile in CODE_PROFILES) {
    return CODE_PROFILES[codeProfile];
  }
  return CODE_PROFILES.residential_default;
}
function dist2D(a, b) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}
function wallLength(w) {
  return dist2D(w.start, w.end);
}
function polygonCentroid(poly) {
  let cx = 0;
  let cz = 0;
  for (const [x, z2] of poly) {
    cx += x;
    cz += z2;
  }
  return [cx / poly.length, cz / poly.length];
}
function closestPointOnPolygonEdge(px, pz, polygon) {
  let bestDist = Infinity;
  let bestPoint = [px, pz];
  const n = polygon.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const [ax, az] = polygon[i];
    const [bx, bz] = polygon[j];
    const dx = bx - ax;
    const dz = bz - az;
    const lenSq = dx * dx + dz * dz;
    if (lenSq < 1e-10) continue;
    let t = ((px - ax) * dx + (pz - az) * dz) / lenSq;
    t = Math.max(0, Math.min(1, t));
    const cx = ax + t * dx;
    const cz = az + t * dz;
    const d = Math.sqrt((px - cx) ** 2 + (pz - cz) ** 2);
    if (d < bestDist) {
      bestDist = d;
      bestPoint = [cx, cz];
    }
  }
  return bestPoint;
}
function snapWallEndpoints(walls, issues, profile) {
  const { updateNode } = use_scene_default.getState();
  const endpoints = [];
  for (const w of walls) {
    endpoints.push({ wallId: w.id, which: "start", point: [...w.start] });
    endpoints.push({ wallId: w.id, which: "end", point: [...w.end] });
  }
  const snapped = /* @__PURE__ */ new Set();
  for (let i = 0; i < endpoints.length; i++) {
    for (let j = i + 1; j < endpoints.length; j++) {
      const a = endpoints[i];
      const b = endpoints[j];
      if (a.wallId === b.wallId) continue;
      const d = dist2D(a.point, b.point);
      if (d > 1e-3 && d < profile.snapThreshold) {
        const key = `${b.wallId}-${b.which}`;
        if (snapped.has(key)) continue;
        snapped.add(key);
        updateNode(b.wallId, {
          [b.which]: [...a.point]
        });
        issues.push({
          type: "snap",
          severity: "fixed",
          ruleId: "geometry.wall_endpoint_snap",
          nodeId: b.wallId,
          message: `Wall ${b.which} snapped to nearby endpoint (gap: ${(d * 100).toFixed(1)}cm)`
        });
      }
    }
  }
}
function validateFurnitureBounds(items, slabs, issues, profile) {
  if (slabs.length === 0) return;
  const { updateNode } = use_scene_default.getState();
  for (const item of items) {
    if (item.asset.attachTo === "wall" || item.asset.attachTo === "wall-side" || item.asset.attachTo === "ceiling") {
      continue;
    }
    const [x, _y, z2] = item.position;
    let insideAnySlab = false;
    for (const slab of slabs) {
      if (pointInPolygon(x, z2, slab.polygon)) {
        insideAnySlab = true;
        break;
      }
    }
    if (!insideAnySlab) {
      issues.push({
        type: "bounds",
        severity: "warning",
        ruleId: "furniture.out_of_room_bounds",
        nodeId: item.id,
        message: `Item "${item.asset.name}" was placed outside every room slab before auto-correction.`
      });
      let nearestSlab = slabs[0];
      let nearestDist = Infinity;
      for (const slab of slabs) {
        const c = polygonCentroid(slab.polygon);
        const d = dist2D([x, z2], c);
        if (d < nearestDist) {
          nearestDist = d;
          nearestSlab = slab;
        }
      }
      const polygon = nearestSlab.polygon;
      const centroid = polygonCentroid(polygon);
      const edgePoint = closestPointOnPolygonEdge(x, z2, polygon);
      const toCenter = [centroid[0] - edgePoint[0], centroid[1] - edgePoint[1]];
      const toCenterLen = Math.sqrt(toCenter[0] ** 2 + toCenter[1] ** 2);
      const nudge = toCenterLen > 0.01 ? [
        edgePoint[0] + toCenter[0] / toCenterLen * profile.furnitureMargin,
        edgePoint[1] + toCenter[1] / toCenterLen * profile.furnitureMargin
      ] : [edgePoint[0], edgePoint[1]];
      updateNode(item.id, {
        position: [nudge[0], item.position[1], nudge[1]]
      });
      issues.push({
        type: "bounds",
        severity: "fixed",
        ruleId: "furniture.inside_slab",
        nodeId: item.id,
        message: `Item "${item.asset.name}" was outside room, nudged inside`
      });
    }
  }
}
function validateDoorWindowFit(walls, nodes, issues, profile) {
  const { updateNode } = use_scene_default.getState();
  for (const wall of walls) {
    const wLen = wallLength(wall);
    if (wLen < 0.1) continue;
    for (const childId of wall.children) {
      const child = nodes[childId];
      if (!child) continue;
      if (child.type === "door") {
        const door = child;
        const doorWidth = door.width ?? 0.9;
        const halfDoor = doorWidth / 2;
        const localX = door.position[0];
        const minX = halfDoor + profile.openingMargin;
        const maxX = wLen - halfDoor - profile.openingMargin;
        if (minX > maxX) {
          issues.push({
            type: "bounds",
            severity: "warning",
            ruleId: "opening.fits_wall",
            nodeId: door.id,
            message: `Door too wide for wall (door: ${doorWidth.toFixed(2)}m, wall: ${wLen.toFixed(2)}m)`
          });
          continue;
        }
        if (localX < minX || localX > maxX) {
          const clampedX = Math.max(minX, Math.min(maxX, localX));
          updateNode(door.id, {
            position: [clampedX, door.position[1], door.position[2]]
          });
          issues.push({
            type: "bounds",
            severity: "fixed",
            ruleId: "opening.fits_wall",
            nodeId: door.id,
            message: `Door position clamped to fit within wall (${localX.toFixed(2)} \u2192 ${clampedX.toFixed(2)})`
          });
        }
      } else if (child.type === "window") {
        const win = child;
        const winWidth = win.width ?? 1.5;
        const halfWin = winWidth / 2;
        const localX = win.position[0];
        const minX = halfWin + profile.openingMargin;
        const maxX = wLen - halfWin - profile.openingMargin;
        if (minX > maxX) {
          issues.push({
            type: "bounds",
            severity: "warning",
            ruleId: "opening.fits_wall",
            nodeId: win.id,
            message: `Window too wide for wall (window: ${winWidth.toFixed(2)}m, wall: ${wLen.toFixed(2)}m)`
          });
          continue;
        }
        if (localX < minX || localX > maxX) {
          const clampedX = Math.max(minX, Math.min(maxX, localX));
          updateNode(win.id, {
            position: [clampedX, win.position[1], win.position[2]]
          });
          issues.push({
            type: "bounds",
            severity: "fixed",
            ruleId: "opening.fits_wall",
            nodeId: win.id,
            message: `Window position clamped to fit within wall (${localX.toFixed(2)} \u2192 ${clampedX.toFixed(2)})`
          });
        }
      }
    }
  }
}
function detectWallGaps(walls, issues, profile) {
  for (const w of walls) {
    for (const other of walls) {
      if (w.id === other.id) continue;
      for (const which of ["start", "end"]) {
        const pt = w[which];
        const dx = other.end[0] - other.start[0];
        const dz = other.end[1] - other.start[1];
        const lenSq = dx * dx + dz * dz;
        if (lenSq < 1e-10) continue;
        const t = ((pt[0] - other.start[0]) * dx + (pt[1] - other.start[1]) * dz) / lenSq;
        if (t < 0.05 || t > 0.95) continue;
        const projX = other.start[0] + t * dx;
        const projZ = other.start[1] + t * dz;
        const d = Math.sqrt((pt[0] - projX) ** 2 + (pt[1] - projZ) ** 2);
        if (d > 1e-3 && d < profile.snapThreshold * 2) {
          issues.push({
            type: "gap",
            severity: "warning",
            ruleId: "geometry.wall_gap",
            nodeId: w.id,
            message: `Wall ${which} is ${(d * 100).toFixed(1)}cm from wall body (possible T-junction gap)`
          });
        }
      }
    }
  }
}
function polygonArea(poly) {
  let area = 0;
  const n = poly.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += poly[i][0] * poly[j][1] - poly[j][0] * poly[i][1];
  }
  return Math.abs(area / 2);
}
function polygonBounds(poly) {
  const xs = poly.map((p) => p[0]);
  const zs = poly.map((p) => p[1]);
  const minX = Math.min(...xs);
  const minZ = Math.min(...zs);
  const maxX = Math.max(...xs);
  const maxZ = Math.max(...zs);
  return {
    minX,
    minZ,
    maxX,
    maxZ,
    width: maxX - minX,
    depth: maxZ - minZ
  };
}
function polygonsIntersect(a, b) {
  if (a.length < 3 || b.length < 3) return false;
  for (const pt of a) {
    if (pointInPolygon(pt[0], pt[1], b)) return true;
  }
  for (const pt of b) {
    if (pointInPolygon(pt[0], pt[1], a)) return true;
  }
  return false;
}
function pointToSegmentDistance(point, start, end) {
  const dx = end[0] - start[0];
  const dz = end[1] - start[1];
  const lenSq = dx * dx + dz * dz;
  if (lenSq < 1e-10) return dist2D(point, start);
  const t = Math.max(
    0,
    Math.min(1, ((point[0] - start[0]) * dx + (point[1] - start[1]) * dz) / lenSq)
  );
  return dist2D(point, [start[0] + t * dx, start[1] + t * dz]);
}
function inferRoomUse(name, metadata) {
  if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
    const roomType = metadata.roomType;
    if (typeof roomType === "string") {
      const normalized2 = normalizeRoomUse(roomType);
      if (normalized2) return normalized2;
    }
  }
  const normalized = normalizeRoomUse(name ?? "");
  return normalized ?? "other";
}
function normalizeRoomUse(value) {
  const lower = value.toLowerCase();
  if (/卧|bed|master|kids|guest/.test(lower)) return "bedroom";
  if (/客|起居|living|lounge/.test(lower)) return "living";
  if (/厨|kitchen/.test(lower)) return "kitchen";
  if (/卫|浴|厕|bath|toilet|washroom/.test(lower)) return "bathroom";
  if (/餐|dining/.test(lower)) return "dining";
  if (/阳台|balcony/.test(lower)) return "balcony";
  if (/走廊|过道|hall|corridor/.test(lower)) return "corridor";
  if (/玄关|entry|foyer/.test(lower)) return "entry";
  return null;
}
function collectZonesBySlab(slabs, zones) {
  const result = /* @__PURE__ */ new Map();
  for (const slab of slabs) result.set(slab.id, []);
  for (const slab of slabs) {
    if (slab.polygon.length < 3) continue;
    const slabCentroid = polygonCentroid(slab.polygon);
    for (const zone of zones) {
      if (zone.polygon.length < 3) continue;
      const zoneCentroid = polygonCentroid(zone.polygon);
      if (pointInPolygon(zoneCentroid[0], zoneCentroid[1], slab.polygon) || pointInPolygon(slabCentroid[0], slabCentroid[1], zone.polygon) || polygonsIntersect(slab.polygon, zone.polygon)) {
        result.get(slab.id)?.push(zone);
      }
    }
  }
  return result;
}
function roomUsesForSlab(slab, zonesBySlab) {
  const uses = /* @__PURE__ */ new Set();
  for (const zone of zonesBySlab.get(slab.id) ?? []) {
    uses.add(inferRoomUse(zone.name, zone.metadata));
  }
  return uses;
}
function hasVentilationStrategy(use, windows, items) {
  if (windows.length > 0) return true;
  if (use === "kitchen") {
    return items.some((item) => item.asset.category === "kitchen" && /hood|exhaust|vent/i.test(`${item.asset.id} ${item.asset.name}`));
  }
  if (use === "bathroom") {
    return items.some((item) => /fan|exhaust|vent|dryer/i.test(`${item.asset.id} ${item.asset.name}`));
  }
  return false;
}
function minDistanceBetweenPolygons(a, b) {
  if (polygonsIntersect(a, b)) return 0;
  let best = Infinity;
  for (let i = 0; i < a.length; i++) {
    const a0 = a[i];
    const a1 = a[(i + 1) % a.length];
    for (const pt of b) best = Math.min(best, pointToSegmentDistance(pt, a0, a1));
  }
  for (let i = 0; i < b.length; i++) {
    const b0 = b[i];
    const b1 = b[(i + 1) % b.length];
    for (const pt of a) best = Math.min(best, pointToSegmentDistance(pt, b0, b1));
  }
  return best;
}
function slabTouchesExterior(slab, walls) {
  if (slab.polygon.length < 3) return false;
  for (const point of slab.polygon) {
    for (const wall of walls) {
      if (pointToSegmentDistance(point, wall.start, wall.end) <= 0.2) {
        return true;
      }
    }
  }
  return false;
}
function wallOpeningWorldPoint(wall, localX) {
  const dx = wall.end[0] - wall.start[0];
  const dz = wall.end[1] - wall.start[1];
  const len = Math.sqrt(dx * dx + dz * dz);
  if (len < 1e-3) return null;
  return [
    wall.start[0] + dx / len * localX,
    wall.start[1] + dz / len * localX
  ];
}
function openingServesSlab(point, wall, slab) {
  const dx = wall.end[0] - wall.start[0];
  const dz = wall.end[1] - wall.start[1];
  const len = Math.sqrt(dx * dx + dz * dz);
  if (len < 1e-3) return false;
  const normX = -dz / len;
  const normZ = dx / len;
  const probeDistance = (wall.thickness ?? 0.15) / 2 + 0.2;
  const p1 = [
    point[0] + normX * probeDistance,
    point[1] + normZ * probeDistance
  ];
  const p2 = [
    point[0] - normX * probeDistance,
    point[1] - normZ * probeDistance
  ];
  return pointInPolygon(p1[0], p1[1], slab.polygon) || pointInPolygon(p2[0], p2[1], slab.polygon);
}
function collectWindowsBySlab(slabs, walls, nodes) {
  const result = /* @__PURE__ */ new Map();
  for (const slab of slabs) result.set(slab.id, []);
  for (const wall of walls) {
    for (const childId of wall.children) {
      const child = nodes[childId];
      if (child?.type !== "window") continue;
      const win = child;
      const point = wallOpeningWorldPoint(wall, win.position[0]);
      if (!point) continue;
      for (const slab of slabs) {
        if (openingServesSlab(point, wall, slab)) {
          result.get(slab.id)?.push(win);
        }
      }
    }
  }
  return result;
}
function collectDoorsBySlab(slabs, walls, nodes) {
  const result = /* @__PURE__ */ new Map();
  for (const slab of slabs) result.set(slab.id, []);
  for (const wall of walls) {
    for (const childId of wall.children) {
      const child = nodes[childId];
      if (child?.type !== "door") continue;
      const door = child;
      const point = wallOpeningWorldPoint(wall, door.position[0]);
      if (!point) continue;
      for (const slab of slabs) {
        if (openingServesSlab(point, wall, slab)) {
          result.get(slab.id)?.push(door);
        }
      }
    }
  }
  return result;
}
function detectDoorWindowOverlap(walls, nodes, issues) {
  for (const wall of walls) {
    const openings = [];
    for (const childId of wall.children) {
      const child = nodes[childId];
      if (!child) continue;
      let width = 0;
      let localX = 0;
      if (child.type === "door") {
        width = child.width ?? 0.9;
        localX = child.position[0];
      } else if (child.type === "window") {
        width = child.width ?? 1.5;
        localX = child.position[0];
      } else {
        continue;
      }
      openings.push({
        id: child.id,
        minX: localX - width / 2,
        maxX: localX + width / 2
      });
    }
    for (let i = 0; i < openings.length; i++) {
      for (let j = i + 1; j < openings.length; j++) {
        const a = openings[i];
        const b = openings[j];
        if (a.maxX > b.minX && a.minX < b.maxX) {
          issues.push({
            type: "overlap",
            severity: "warning",
            ruleId: "opening.overlap",
            nodeId: a.id,
            message: `Opening overlaps with another opening on the same wall`
          });
        }
      }
    }
  }
}
function validateFurnitureCollision(items, issues) {
  const floorItems = items.filter((i) => i.asset.attachTo !== "wall" && i.asset.attachTo !== "wall-side" && i.asset.attachTo !== "ceiling");
  for (let i = 0; i < floorItems.length; i++) {
    for (let j = i + 1; j < floorItems.length; j++) {
      const a = floorItems[i];
      const b = floorItems[j];
      const dist = dist2D([a.position[0], a.position[2]], [b.position[0], b.position[2]]);
      const dimA = getScaledDimensions(a);
      const dimB = getScaledDimensions(b);
      const radiusA = Math.max(dimA[0], dimA[2]) / 2;
      const radiusB = Math.max(dimB[0], dimB[2]) / 2;
      if (dist < (radiusA + radiusB) * 0.8) {
        issues.push({
          type: "overlap",
          severity: "warning",
          ruleId: "furniture.collision",
          nodeId: a.id,
          message: `Furniture "${a.asset.name}" might be colliding with "${b.asset.name}"`
        });
      }
    }
  }
}
function validateFurnitureUseClearance(items, walls, slabs, nodes, issues, profile) {
  const floorItems = items.filter((i) => i.asset.attachTo !== "wall" && i.asset.attachTo !== "wall-side" && i.asset.attachTo !== "ceiling");
  const itemBoxes = floorItems.map((item) => {
    const dim = getScaledDimensions(item);
    return {
      item,
      bbox: {
        minX: item.position[0] - dim[0] / 2,
        minZ: item.position[2] - dim[2] / 2,
        maxX: item.position[0] + dim[0] / 2,
        maxZ: item.position[2] + dim[2] / 2
      },
      useBox: {
        minX: item.position[0] - dim[0] / 2 - profile.minFurnitureClearPath,
        minZ: item.position[2] - dim[2] / 2 - profile.minFurnitureClearPath,
        maxX: item.position[0] + dim[0] / 2 + profile.minFurnitureClearPath,
        maxZ: item.position[2] + dim[2] / 2 + profile.minFurnitureClearPath
      }
    };
  });
  for (let i = 0; i < itemBoxes.length; i++) {
    for (let j = i + 1; j < itemBoxes.length; j++) {
      const a = itemBoxes[i];
      const b = itemBoxes[j];
      if (a.useBox.maxX > b.bbox.minX && a.useBox.minX < b.bbox.maxX && a.useBox.maxZ > b.bbox.minZ && a.useBox.minZ < b.bbox.maxZ) {
        issues.push({
          type: "overlap",
          severity: "warning",
          ruleId: "furniture.insufficient_use_clearance",
          nodeId: a.item.id,
          message: `Furniture "${a.item.asset.name}" does not leave enough usable clearance near "${b.item.asset.name}".`
        });
        issues.push({
          type: "overlap",
          severity: "info",
          ruleId: "furniture.use_clearance",
          nodeId: a.item.id,
          message: `Furniture "${a.item.asset.name}" has a use-clearance conflict near "${b.item.asset.name}".`
        });
      }
    }
  }
  for (const wall of walls) {
    const wallLen = wallLength(wall);
    if (wallLen < 0.01) continue;
    const dirX = (wall.end[0] - wall.start[0]) / wallLen;
    const dirZ = (wall.end[1] - wall.start[1]) / wallLen;
    for (const childId of wall.children) {
      const child = nodes[childId];
      if (!child || child.type !== "window") continue;
      const window2 = child;
      const localX = window2.position[0];
      const width = window2.width ?? 1.5;
      const wx = wall.start[0] + dirX * localX;
      const wz = wall.start[1] + dirZ * localX;
      for (const item of floorItems) {
        const dim = getScaledDimensions(item);
        const canSitBelowWindow = dim[1] <= 0.8 && ["tv-stand", "coffee-table", "stool", "dining-chair", "office-chair"].includes(item.asset.id);
        if (canSitBelowWindow) continue;
        const radius = Math.max(dim[0], dim[2]) / 2;
        const distance = dist2D([wx, wz], [item.position[0], item.position[2]]);
        if (distance < width / 2 + radius + 0.35) {
          issues.push({
            type: "overlap",
            severity: "warning",
            ruleId: "furniture.blocks_window",
            nodeId: item.id,
            message: `Furniture "${item.asset.name}" blocks access/daylight near a window.`
          });
        }
      }
    }
  }
  validateFurnitureMainPaths(items, walls, slabs, nodes, issues, profile);
  validateFurnitureRelationships(items, issues);
}
function itemBBox(item) {
  const dim = getScaledDimensions(item);
  const rotationDeg = Math.round((item.rotation?.[1] ?? 0) * 180 / Math.PI);
  return bboxForFurniture(item.position, dim, rotationDeg);
}
function validateFurnitureMainPaths(items, walls, slabs, nodes, issues, profile) {
  const floorItems = items.filter((i) => i.asset.attachTo !== "wall" && i.asset.attachTo !== "wall-side" && i.asset.attachTo !== "ceiling");
  for (const slab of slabs) {
    if (slab.polygon.length < 3) continue;
    const bounds = polygonBounds2D(slab.polygon);
    const roomItems = floorItems.filter((item) => pointInPolygon(item.position[0], item.position[2], slab.polygon));
    const model = buildFurnitureConstraintModel({
      polygon: slab.polygon,
      bounds,
      walls,
      nodes,
      pathWidth: profile.minFurnitureClearPath
    });
    for (const item of roomItems) {
      const dim = getScaledDimensions(item);
      const isMajorBlocker = Math.max(dim[0], dim[2]) >= 0.75 && !["sofa", "lounge-chair", "livingroom-chair", "tv-stand", "coffee-table", "stool", "dining-chair", "office-chair", "floor-lamp", "small-indoor-plant"].includes(item.asset.id);
      if (!isMajorBlocker) continue;
      const bbox = expandBBox2D(itemBBox(item), 0.05);
      if (model.clearPathCandidates.some((path2) => bboxOverlaps2D(bbox, path2))) {
        issues.push({
          type: "overlap",
          severity: "warning",
          ruleId: "furniture.blocks_main_path",
          nodeId: item.id,
          message: `Furniture "${item.asset.name}" blocks a main circulation path from the door into the room.`
        });
      }
    }
  }
}
function validateFurnitureRelationships(items, issues) {
  const floorItems = items.filter((i) => i.asset.attachTo !== "wall" && i.asset.attachTo !== "wall-side" && i.asset.attachTo !== "ceiling");
  const byCatalog = new Map(floorItems.map((item) => [item.asset.id, item]));
  const sofa = byCatalog.get("sofa");
  const tv = byCatalog.get("tv-stand");
  const coffee = byCatalog.get("coffee-table");
  if (sofa && tv) {
    const alignedX = Math.abs(sofa.position[0] - tv.position[0]) < 1.6;
    const separatedZ = Math.abs(sofa.position[2] - tv.position[2]) > 1.4;
    if (!alignedX || !separatedZ) {
      issues.push({
        type: "code",
        severity: "warning",
        ruleId: "furniture.relationship_conflict",
        nodeId: sofa.id,
        message: "Living room sofa and TV stand are not arranged as a usable viewing relationship."
      });
    }
  }
  if (sofa && tv && coffee) {
    const betweenZ = coffee.position[2] > Math.min(sofa.position[2], tv.position[2]) && coffee.position[2] < Math.max(sofa.position[2], tv.position[2]);
    const alignedX = Math.abs(coffee.position[0] - (sofa.position[0] + tv.position[0]) / 2) < 1.3;
    if (!betweenZ || !alignedX) {
      issues.push({
        type: "code",
        severity: "warning",
        ruleId: "furniture.relationship_conflict",
        nodeId: coffee.id,
        message: "Coffee table should sit between the sofa and TV zone with usable access around it."
      });
    }
  }
}
function validatePhysicsAndStructure(items, slabs, walls, nodes, issues) {
  const { updateNode } = use_scene_default.getState();
  for (const item of items) {
    if (item.asset.attachTo === "wall" || item.asset.attachTo === "wall-side" || item.asset.attachTo === "ceiling") continue;
    let highestElevation = 0;
    for (const slab of slabs) {
      if (slab.polygon.length >= 3 && pointInPolygon(item.position[0], item.position[2], slab.polygon)) {
        highestElevation = Math.max(highestElevation, slab.elevation ?? 0.05);
      }
    }
    if (Math.abs(item.position[1] - highestElevation) > 0.02) {
      updateNode(item.id, {
        position: [item.position[0], highestElevation, item.position[2]]
      });
      issues.push({
        type: "bounds",
        severity: "fixed",
        ruleId: "furniture.floor_level",
        nodeId: item.id,
        message: `Furniture "${item.asset.name}" was floating, snapped to floor level (${highestElevation.toFixed(2)}m)`
      });
    }
  }
  for (const wall of walls) {
    const wallHeight = wall.height ?? 2.8;
    for (const childId of wall.children) {
      const child = nodes[childId];
      if (!child) continue;
      if (child.type === "door") {
        const door = child;
        if ((door.height ?? 2.1) > wallHeight) {
          updateNode(door.id, { height: wallHeight - 0.1 });
          issues.push({
            type: "bounds",
            severity: "fixed",
            ruleId: "opening.height_fits_wall",
            nodeId: door.id,
            message: `Door height exceeded wall height, scaled down`
          });
        }
      } else if (child.type === "window") {
        const win = child;
        const topEdge = (win.position[1] ?? 0.9) + (win.height ?? 1.5) / 2;
        if (topEdge > wallHeight) {
          issues.push({
            type: "bounds",
            severity: "warning",
            ruleId: "opening.height_fits_wall",
            nodeId: win.id,
            message: `Window top edge (${topEdge.toFixed(2)}m) exceeds wall height (${wallHeight.toFixed(2)}m)`
          });
        }
      }
    }
  }
  for (const slab of slabs) {
    if (slab.polygon.length < 3) continue;
    const area = polygonArea(slab.polygon);
    if (area > 64) {
      issues.push({
        type: "info",
        severity: "info",
        ruleId: "structure.large_span",
        nodeId: slab.id,
        message: `Large slab detected (${area.toFixed(1)} sqm). Ensure adequate structural support.`
      });
    }
  }
}
function validateArchitectureDesign(items, slabs, walls, zones, nodes, issues, profile) {
  const windowsBySlab = collectWindowsBySlab(slabs, walls, nodes);
  const zonesBySlab = collectZonesBySlab(slabs, zones);
  for (const slab of slabs) {
    if (slab.polygon.length < 3) continue;
    const bounds = polygonBounds(slab.polygon);
    const area = polygonArea(slab.polygon);
    const windows = windowsBySlab.get(slab.id) ?? [];
    const windowArea = windows.reduce((sum, win) => sum + (win.width ?? 1.5) * (win.height ?? 1.5), 0);
    const daylightRatio = area > 0 ? windowArea / area : 0;
    const shortSide = Math.min(bounds.width, bounds.depth);
    const longSide = Math.max(bounds.width, bounds.depth);
    const aspectRatio = shortSide > 0 ? longSide / shortSide : Infinity;
    const isLikelyCorridor = longSide >= 3 && shortSide <= 1.6;
    const roomUses = roomUsesForSlab(slab, zonesBySlab);
    const isMainSpace = roomUses.has("bedroom") || roomUses.has("living") || roomUses.has("dining");
    if (area >= 8 && windows.length === 0) {
      issues.push({
        type: "code",
        severity: "warning",
        ruleId: "room.daylight_ratio",
        nodeId: slab.id,
        message: `Room/slab ${slab.id} has no associated exterior window. Add daylight/ventilation before furnishing.`
      });
    } else if (area >= 8 && daylightRatio < profile.minDaylightRatio) {
      issues.push({
        type: "code",
        severity: "warning",
        ruleId: "room.daylight_ratio",
        nodeId: slab.id,
        message: `Room/slab ${slab.id} daylight ratio is low (${(daylightRatio * 100).toFixed(1)}%). Add or enlarge windows.`
      });
    }
    if (isMainSpace && area >= 6 && daylightRatio < profile.minDaylightRatio) {
      issues.push({
        type: "code",
        severity: "warning",
        ruleId: "room.main_space_daylight",
        nodeId: slab.id,
        message: `Main residential space daylight ratio is ${(daylightRatio * 100).toFixed(1)}%; target at least ${(profile.minDaylightRatio * 100).toFixed(0)}%.`
      });
    }
    if (roomUses.has("kitchen") && !hasVentilationStrategy("kitchen", windows, items)) {
      issues.push({
        type: "code",
        severity: "warning",
        ruleId: "room.kitchen_ventilation",
        nodeId: slab.id,
        message: `Kitchen zone has no exterior window or modeled mechanical ventilation strategy.`
      });
    }
    if (roomUses.has("bathroom") && !hasVentilationStrategy("bathroom", windows, items)) {
      issues.push({
        type: "code",
        severity: "warning",
        ruleId: "room.bathroom_ventilation",
        nodeId: slab.id,
        message: `Bathroom zone has no exterior window or modeled mechanical ventilation strategy.`
      });
    }
    if (!isLikelyCorridor && area >= 4 && shortSide < profile.minRoomWidth) {
      issues.push({
        type: "code",
        severity: "warning",
        ruleId: "room.min_width",
        nodeId: slab.id,
        message: `Usable room is too narrow (${shortSide.toFixed(2)}m). Keep normal rooms at least ${profile.minRoomWidth.toFixed(1)}m wide; use hallway semantics for narrower spaces.`
      });
    }
    if (area >= 6 && aspectRatio > profile.maxRoomAspectRatio && shortSide < profile.minCorridorWidth) {
      issues.push({
        type: "code",
        severity: "warning",
        ruleId: "room.aspect_ratio",
        nodeId: slab.id,
        message: `Room proportion is extreme (${aspectRatio.toFixed(1)}:1). Rebalance dimensions or model it as a corridor.`
      });
    }
    if (area >= 8 && !slabTouchesExterior(slab, walls)) {
      issues.push({
        type: "code",
        severity: "warning",
        ruleId: "room.exterior_edge",
        nodeId: slab.id,
        message: `Enclosed room appears to have no exterior edge for natural light/ventilation.`
      });
    }
  }
}
function checkCirculationAndSafety(levelId, walls, slabs, items, zones, nodes, issues, profile) {
  const levelNode = nodes[levelId];
  const isGroundLevel = levelNode && levelNode.type === "level" && levelNode.level === 0;
  const doorInfos = [];
  for (const wall of walls) {
    const dx = wall.end[0] - wall.start[0];
    const dz = wall.end[1] - wall.start[1];
    const len = Math.sqrt(dx * dx + dz * dz);
    if (len < 1e-3) continue;
    const dirX = dx / len;
    const dirZ = dz / len;
    const normX = -dirZ;
    const normZ = dirX;
    for (const childId of wall.children) {
      const child = nodes[childId];
      if (child && child.type === "door") {
        const door = child;
        const localX = door.position[0];
        const worldX = wall.start[0] + dirX * localX;
        const worldZ = wall.start[1] + dirZ * localX;
        doorInfos.push({
          id: door.id,
          worldX,
          worldZ,
          normX,
          normZ,
          width: door.width ?? 0.9
        });
      }
    }
  }
  const floorItems = items.filter((i) => i.asset.attachTo !== "wall" && i.asset.attachTo !== "wall-side" && i.asset.attachTo !== "ceiling");
  for (const door of doorInfos) {
    for (const item of floorItems) {
      const dist = dist2D([door.worldX, door.worldZ], [item.position[0], item.position[2]]);
      const dim = getScaledDimensions(item);
      const itemRadius2 = Math.max(dim[0], dim[2]) / 2;
      const clearance = dist - door.width / 2 - itemRadius2;
      const requiredClearance = door.width / 2 + profile.minDoorClearance + itemRadius2;
      if (dist < requiredClearance) {
        issues.push({
          type: "overlap",
          severity: "warning",
          ruleId: "furniture.door_clearance",
          nodeId: item.id,
          message: `Furniture "${item.asset.name}" is blocking the door (clearance < ${profile.minDoorClearance.toFixed(1)}m).`
        });
      }
      if (clearance < profile.minFurnitureClearPath) {
        issues.push({
          type: "overlap",
          severity: "warning",
          ruleId: "circulation.furniture_clear_path",
          nodeId: item.id,
          message: `Furniture "${item.asset.name}" leaves only ${clearance.toFixed(2)}m clear circulation near a doorway.`
        });
      }
    }
  }
  const zonesBySlab = collectZonesBySlab(slabs, zones);
  for (const slab of slabs) {
    if (slab.polygon.length < 3) continue;
    const uses = roomUsesForSlab(slab, zonesBySlab);
    const bounds = polygonBounds(slab.polygon);
    const shortSide = Math.min(bounds.width, bounds.depth);
    if ((uses.has("entry") || uses.has("corridor")) && shortSide < profile.minEntryClearWidth) {
      issues.push({
        type: "code",
        severity: "warning",
        ruleId: "circulation.entry_clear_width",
        nodeId: slab.id,
        message: `Entry/circulation clear width is ${shortSide.toFixed(2)}m; target at least ${profile.minEntryClearWidth.toFixed(2)}m.`
      });
    }
  }
  if (!isGroundLevel) {
    for (const door of doorInfos) {
      const pt1 = [door.worldX + door.normX * 0.5, door.worldZ + door.normZ * 0.5];
      const pt2 = [door.worldX - door.normX * 0.5, door.worldZ - door.normZ * 0.5];
      let pt1InSlab = false;
      let pt2InSlab = false;
      for (const slab of slabs) {
        if (slab.polygon.length >= 3) {
          if (pointInPolygon(pt1[0], pt1[1], slab.polygon)) pt1InSlab = true;
          if (pointInPolygon(pt2[0], pt2[1], slab.polygon)) pt2InSlab = true;
        }
      }
      if (pt1InSlab && !pt2InSlab || !pt1InSlab && pt2InSlab) {
        issues.push({
          type: "code",
          severity: "warning",
          ruleId: "door.upper_floor_fall_hazard",
          nodeId: door.id,
          message: `Exterior door detected on an upper floor without a balcony/slab outside. Fall hazard!`
        });
      }
    }
  }
}
function validateBuildingCodeBasics(walls, slabs, zones, nodes, issues, profile) {
  const doorsBySlab = collectDoorsBySlab(slabs, walls, nodes);
  const zonesBySlab = collectZonesBySlab(slabs, zones);
  for (const wall of walls) {
    const wallLen = wallLength(wall);
    const openings = [];
    for (const childId of wall.children) {
      const child = nodes[childId];
      if (!child) continue;
      if (child.type === "door") {
        const door = child;
        const doorWidth = door.width ?? 0.9;
        const minX = door.position[0] - doorWidth / 2;
        const maxX = door.position[0] + doorWidth / 2;
        openings.push({ id: door.id, minX, maxX });
        if (doorWidth < profile.minDoorClearWidth) {
          issues.push({
            type: "code",
            severity: "warning",
            ruleId: "door.clear_width",
            nodeId: door.id,
            message: `Door width ${doorWidth.toFixed(2)}m is below the ${profile.minDoorClearWidth.toFixed(2)}m minimum clear-width target.`
          });
        }
        if (wallLen > 0 && doorWidth > wallLen * 0.75) {
          issues.push({
            type: "code",
            severity: "warning",
            ruleId: "door.wall_ratio",
            nodeId: door.id,
            message: `Door consumes too much of a short wall (${doorWidth.toFixed(2)}m door on ${wallLen.toFixed(2)}m wall).`
          });
        }
        if (minX < profile.minOpeningEdgeClearance || wallLen - maxX < profile.minOpeningEdgeClearance) {
          issues.push({
            type: "code",
            severity: "warning",
            ruleId: "opening.edge_clearance",
            nodeId: door.id,
            message: `Door is too close to a wall end; keep at least ${profile.minOpeningEdgeClearance.toFixed(2)}m edge clearance.`
          });
        }
      }
      if (child.type === "window") {
        const win = child;
        const winWidth = win.width ?? 1.5;
        const minX = win.position[0] - winWidth / 2;
        const maxX = win.position[0] + winWidth / 2;
        openings.push({ id: win.id, minX, maxX });
        const sillCenter = win.position[1];
        const winHeight = win.height ?? 1.5;
        const sillBottom = sillCenter - winHeight / 2;
        if (minX < profile.minOpeningEdgeClearance || wallLen - maxX < profile.minOpeningEdgeClearance) {
          issues.push({
            type: "code",
            severity: "warning",
            ruleId: "opening.edge_clearance",
            nodeId: win.id,
            message: `Window is too close to a wall end; keep at least ${profile.minOpeningEdgeClearance.toFixed(2)}m edge clearance.`
          });
        }
        if (sillBottom < profile.minWindowSillHeight) {
          issues.push({
            type: "code",
            severity: "warning",
            ruleId: "window.sill_height",
            nodeId: win.id,
            message: `Window sill is low (${sillBottom.toFixed(2)}m). Check fall protection or raise sill height.`
          });
        }
        if (sillBottom + 1e-6 < profile.minFallProtectionSillHeight) {
          issues.push({
            type: "code",
            severity: "warning",
            ruleId: "window.fall_protection",
            nodeId: win.id,
            message: `Window sill bottom is ${sillBottom.toFixed(2)}m; add fall protection or raise to ${profile.minFallProtectionSillHeight.toFixed(2)}m.`
          });
        }
      }
    }
    openings.sort((a, b) => a.minX - b.minX);
    for (let i = 1; i < openings.length; i++) {
      const prev = openings[i - 1];
      const current = openings[i];
      const spacing = current.minX - prev.maxX;
      if (spacing >= 0 && spacing < profile.minOpeningSpacing) {
        issues.push({
          type: "code",
          severity: "warning",
          ruleId: "opening.min_spacing",
          nodeId: current.id,
          message: `Adjacent openings are only ${spacing.toFixed(2)}m apart; keep at least ${profile.minOpeningSpacing.toFixed(2)}m between openings.`
        });
      }
    }
  }
  for (const slab of slabs) {
    if (slab.polygon.length < 3) continue;
    const bounds = polygonBounds(slab.polygon);
    const shortSide = Math.min(bounds.width, bounds.depth);
    const longSide = Math.max(bounds.width, bounds.depth);
    const area = polygonArea(slab.polygon);
    const isLikelyCorridor = longSide >= 3 && shortSide <= 1.6;
    const roomUses = roomUsesForSlab(slab, zonesBySlab);
    if (isLikelyCorridor && shortSide < profile.minCorridorWidth) {
      issues.push({
        type: "code",
        severity: "warning",
        ruleId: "corridor.min_width",
        nodeId: slab.id,
        message: `Corridor clear width is about ${shortSide.toFixed(2)}m; keep circulation at least ${profile.minCorridorWidth.toFixed(2)}m wide.`
      });
    }
    if (area > 0 && area < profile.minUsableArea) {
      issues.push({
        type: "code",
        severity: "warning",
        ruleId: "room.min_area",
        nodeId: slab.id,
        message: `Room/slab area is only ${area.toFixed(1)} sqm, which is too small for a usable enclosed space.`
      });
    }
    if (roomUses.has("bedroom")) {
      if (area < profile.minBedroomArea) {
        issues.push({
          type: "code",
          severity: "warning",
          ruleId: "room.bedroom_min_area",
          nodeId: slab.id,
          message: `Bedroom area is ${area.toFixed(1)} sqm; target at least ${profile.minBedroomArea.toFixed(1)} sqm.`
        });
      }
      if (shortSide < profile.minBedroomWidth) {
        issues.push({
          type: "code",
          severity: "warning",
          ruleId: "room.bedroom_min_width",
          nodeId: slab.id,
          message: `Bedroom short side is ${shortSide.toFixed(2)}m; target at least ${profile.minBedroomWidth.toFixed(2)}m.`
        });
      }
    }
    if (roomUses.has("living") && area < profile.minLivingArea) {
      issues.push({
        type: "code",
        severity: "warning",
        ruleId: "room.living_min_area",
        nodeId: slab.id,
        message: `Living room area is ${area.toFixed(1)} sqm; target at least ${profile.minLivingArea.toFixed(1)} sqm.`
      });
    }
    if (roomUses.has("living") && shortSide < profile.minLivingWidth) {
      issues.push({
        type: "code",
        severity: "warning",
        ruleId: "room.living_min_width",
        nodeId: slab.id,
        message: `Living room short side is ${shortSide.toFixed(2)}m; target at least ${profile.minLivingWidth.toFixed(2)}m.`
      });
    }
    if (roomUses.has("kitchen")) {
      if (area < profile.minKitchenArea) {
        issues.push({
          type: "code",
          severity: "warning",
          ruleId: "room.kitchen_min_area",
          nodeId: slab.id,
          message: `Kitchen area is ${area.toFixed(1)} sqm; target at least ${profile.minKitchenArea.toFixed(1)} sqm.`
        });
      }
      if (shortSide < profile.minKitchenWidth) {
        issues.push({
          type: "code",
          severity: "warning",
          ruleId: "room.kitchen_min_width",
          nodeId: slab.id,
          message: `Kitchen short side is ${shortSide.toFixed(2)}m; target at least ${profile.minKitchenWidth.toFixed(2)}m.`
        });
      }
    }
    if (roomUses.has("bathroom") && area < profile.minBathroomArea) {
      issues.push({
        type: "code",
        severity: "warning",
        ruleId: "room.bathroom_min_area",
        nodeId: slab.id,
        message: `Bathroom area is ${area.toFixed(1)} sqm; target at least ${profile.minBathroomArea.toFixed(1)} sqm.`
      });
    }
    if (!isLikelyCorridor && area >= 4 && (doorsBySlab.get(slab.id)?.length ?? 0) === 0) {
      issues.push({
        type: "code",
        severity: "warning",
        ruleId: "room.has_door",
        nodeId: slab.id,
        message: `Room/slab ${slab.id} has no associated door/opening. Add a doorway for circulation.`
      });
    }
  }
  validateWetroomAdjacency(slabs, zonesBySlab, issues, profile);
}
function validateWetroomAdjacency(slabs, zonesBySlab, issues, profile) {
  const wetSlabs = slabs.filter((slab) => {
    const uses = roomUsesForSlab(slab, zonesBySlab);
    return uses.has("kitchen") || uses.has("bathroom");
  });
  for (const slab of wetSlabs) {
    const uses = roomUsesForSlab(slab, zonesBySlab);
    if (uses.has("kitchen") && wetSlabs.some((other) => other.id !== slab.id && roomUsesForSlab(other, zonesBySlab).has("bathroom"))) {
      continue;
    }
    if (uses.has("bathroom") && wetSlabs.some((other) => other.id !== slab.id && roomUsesForSlab(other, zonesBySlab).has("kitchen"))) {
      continue;
    }
    const nearest = wetSlabs.filter((other) => other.id !== slab.id).reduce((best, other) => Math.min(best, minDistanceBetweenPolygons(slab.polygon, other.polygon)), Infinity);
    if (nearest > profile.minWetroomAdjacencyDistance) {
      issues.push({
        type: "info",
        severity: "info",
        ruleId: "wetroom.adjacency_hint",
        nodeId: slab.id,
        message: `Wet room is isolated from other wet rooms; group kitchen/bathroom plumbing when possible.`
      });
    }
  }
}
function detectSlabOverlaps(slabs, issues) {
  for (let i = 0; i < slabs.length; i++) {
    for (let j = i + 1; j < slabs.length; j++) {
      const a = slabs[i];
      const b = slabs[j];
      if (a.polygon.length < 3 || b.polygon.length < 3) continue;
      let overlap = false;
      for (const pt of a.polygon) {
        if (pointInPolygon(pt[0], pt[1], b.polygon)) {
          overlap = true;
          break;
        }
      }
      if (!overlap) {
        for (const pt of b.polygon) {
          if (pointInPolygon(pt[0], pt[1], a.polygon)) {
            overlap = true;
            break;
          }
        }
      }
      if (overlap) {
        issues.push({
          type: "overlap",
          severity: "warning",
          ruleId: "geometry.slab_overlap",
          nodeId: a.id,
          message: `Room/Slab footprint overlaps with another room. Ensure they are adjacent, not intersecting.`
        });
      }
    }
  }
}
function validateAndCorrectScene(levelId, codeProfile) {
  const { nodes } = use_scene_default.getState();
  const issues = [];
  const profile = resolveCodeProfile(codeProfile);
  const walls = [];
  const slabs = [];
  const items = [];
  const zones = [];
  function isOnLevel(node) {
    if (node.parentId === levelId) return true;
    if (!node.parentId) return false;
    const parent = nodes[node.parentId];
    return parent ? parent.parentId === levelId : false;
  }
  for (const node of Object.values(nodes)) {
    if (!isOnLevel(node)) continue;
    if (node.type === "wall") walls.push(node);
    else if (node.type === "slab") slabs.push(node);
    else if (node.type === "item") items.push(node);
    else if (node.type === "zone") zones.push(node);
  }
  snapWallEndpoints(walls, issues, profile);
  validateDoorWindowFit(walls, nodes, issues, profile);
  validateFurnitureBounds(items, slabs, issues, profile);
  detectWallGaps(walls, issues, profile);
  detectDoorWindowOverlap(walls, nodes, issues);
  validateFurnitureCollision(items, issues);
  validateFurnitureUseClearance(items, walls, slabs, nodes, issues, profile);
  validatePhysicsAndStructure(items, slabs, walls, nodes, issues);
  validateArchitectureDesign(items, slabs, walls, zones, nodes, issues, profile);
  checkCirculationAndSafety(levelId, walls, slabs, items, zones, nodes, issues, profile);
  detectSlabOverlaps(slabs, issues);
  validateBuildingCodeBasics(walls, slabs, zones, nodes, issues, profile);
  const fixedCount = issues.filter((i) => i.severity === "fixed").length;
  const warningCount = issues.filter((i) => i.severity === "warning").length;
  const blockingCount = issues.filter((i) => i.severity === "warning" && (i.type === "code" || i.type === "bounds" || i.type === "gap" || i.type === "overlap")).length;
  return { issues, fixedCount, warningCount, blockingCount, codeProfile: profile.name };
}
function formatValidationReport(result) {
  const blocking = result.blockingCount > 0;
  const issueSummary = result.issues.reduce((acc, issue2) => {
    acc[issue2.type] = (acc[issue2.type] ?? 0) + 1;
    return acc;
  }, {});
  const ruleSummary = result.issues.reduce((acc, issue2) => {
    acc[issue2.ruleId] = (acc[issue2.ruleId] ?? 0) + 1;
    return acc;
  }, {});
  const blockingRuleIds = Array.from(new Set(result.issues.filter((i) => i.severity === "warning" && (i.type === "code" || i.type === "bounds" || i.type === "gap" || i.type === "overlap")).map((i) => i.ruleId)));
  const repairHints = buildRepairHints(result.issues);
  if (result.issues.length === 0) {
    return JSON.stringify({
      valid: true,
      blocking: false,
      fixedCount: 0,
      warningCount: 0,
      blockingCount: 0,
      codeProfile: result.codeProfile,
      issueSummary: {},
      ruleSummary: {},
      blockingRuleIds: [],
      repairHints: [],
      issues: [],
      message: "No spatial or building-code issues found",
      nextAction: "Continue to the next staged generation phase."
    });
  }
  return JSON.stringify({
    valid: !blocking,
    blocking,
    fixedCount: result.fixedCount,
    warningCount: result.warningCount,
    blockingCount: result.blockingCount,
    codeProfile: result.codeProfile,
    issueSummary,
    ruleSummary,
    blockingRuleIds,
    repairHints,
    issues: result.issues.map((i) => ({
      type: i.type,
      severity: i.severity,
      ruleId: i.ruleId,
      nodeId: i.nodeId,
      message: i.message
    })),
    nextAction: blocking ? "Fix blocking warnings before continuing to furniture, roof, decoration, or finalization." : "Only informational issues remain; continue to the next staged generation phase."
  });
}
function buildRepairHints(issues) {
  const hints = /* @__PURE__ */ new Map();
  for (const issue2 of issues) {
    if (!(issue2.severity === "warning" && (issue2.type === "code" || issue2.type === "bounds" || issue2.type === "gap" || issue2.type === "overlap"))) {
      continue;
    }
    const hint = repairHintForIssue(issue2);
    hints.set(`${hint.ruleId}:${hint.nodeId}`, hint);
  }
  return Array.from(hints.values());
}
function repairHintForIssue(issue2) {
  switch (issue2.ruleId) {
    case "door.clear_width":
      return {
        ruleId: issue2.ruleId,
        nodeId: issue2.nodeId,
        preferredTools: ["modify_node"],
        suggestedAction: "Increase the door width to meet the clear-width threshold.",
        targetMetrics: { minWidthMeters: 0.8 }
      };
    case "corridor.min_width":
    case "circulation.entry_clear_width":
      return {
        ruleId: issue2.ruleId,
        nodeId: issue2.nodeId,
        preferredTools: ["move_nodes", "modify_node", "create_hallway"],
        suggestedAction: "Widen the circulation space or recreate the hallway/entry with a larger clear width.",
        targetMetrics: { minClearWidthMeters: 1.1 }
      };
    case "room.daylight_ratio":
    case "room.main_space_daylight":
      return {
        ruleId: issue2.ruleId,
        nodeId: issue2.nodeId,
        preferredTools: ["add_window_to_wall", "auto_align_windows", "create_window"],
        suggestedAction: "Add or enlarge exterior windows for this main room before furnishing.",
        targetMetrics: { minDaylightRatio: 0.1 }
      };
    case "room.has_door":
      return {
        ruleId: issue2.ruleId,
        nodeId: issue2.nodeId,
        preferredTools: ["add_door_to_wall", "create_door"],
        suggestedAction: "Add a usable door to the room boundary."
      };
    case "geometry.slab_overlap":
      return {
        ruleId: issue2.ruleId,
        nodeId: issue2.nodeId,
        preferredTools: ["move_nodes", "delete_node", "create_room", "create_polygon_room"],
        suggestedAction: "Move or recreate the overlapping room slabs so they are adjacent or separated, not overlapping."
      };
    case "opening.overlap":
    case "opening.edge_clearance":
    case "opening.min_spacing":
      return {
        ruleId: issue2.ruleId,
        nodeId: issue2.nodeId,
        preferredTools: ["modify_node", "move_nodes", "auto_align_windows", "add_window_to_wall"],
        suggestedAction: "Move openings away from wall ends and each other, or use auto alignment on suitable exterior walls.",
        targetMetrics: { minEdgeClearanceMeters: 0.25, minOpeningSpacingMeters: 0.25 }
      };
    case "furniture.door_clearance":
    case "circulation.furniture_clear_path":
    case "furniture.out_of_room_bounds":
    case "furniture.use_clearance":
    case "furniture.blocks_main_path":
    case "furniture.relationship_conflict":
    case "furniture.insufficient_use_clearance":
    case "furniture.blocks_window":
      return {
        ruleId: issue2.ruleId,
        nodeId: issue2.nodeId,
        preferredTools: ["place_furniture_solved", "suggest_furniture_layout", "move_nodes"],
        suggestedAction: "Re-solve the furniture layout so items avoid room bounds, doors, windows, collisions, and use-clearance conflicts.",
        targetMetrics: { minClearanceMeters: 0.65 }
      };
    case "room.kitchen_ventilation":
    case "room.bathroom_ventilation":
      return {
        ruleId: issue2.ruleId,
        nodeId: issue2.nodeId,
        preferredTools: ["add_window_to_wall", "auto_align_windows", "create_window"],
        suggestedAction: "Add an exterior window or ventilation opening for the wet/service room."
      };
    case "window.fall_protection":
      return {
        ruleId: issue2.ruleId,
        nodeId: issue2.nodeId,
        preferredTools: ["modify_node"],
        suggestedAction: "Raise the sill height or change the window dimensions before treating the model as code-ready.",
        targetMetrics: { minSillHeightMeters: 0.9 }
      };
    default:
      return {
        ruleId: issue2.ruleId,
        nodeId: issue2.nodeId,
        preferredTools: ["modify_node", "move_nodes"],
        suggestedAction: "Adjust the referenced geometry or metadata, then validate again before moving to the next phase."
      };
  }
}

// packages/editor/src/lib/agent/executor.ts
var lastValidationReport = null;
function round32(v) {
  return Math.round(v * 1e3) / 1e3;
}
function compactIds(values) {
  return values.filter((value) => typeof value === "string" && value.length > 0);
}
function isRecordLike(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function createdByType(entries) {
  return Object.fromEntries(
    Object.entries(entries).map(([type, values]) => [type, compactIds(values)]).filter(([, ids]) => ids.length > 0)
  );
}
function polygonBounds2(polygon) {
  const xs = polygon.map((p) => p[0]);
  const zs = polygon.map((p) => p[1]);
  return {
    minX: round32(Math.min(...xs)),
    minZ: round32(Math.min(...zs)),
    maxX: round32(Math.max(...xs)),
    maxZ: round32(Math.max(...zs))
  };
}
function polygonArea2(polygon) {
  let area = 0;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    area += (polygon[j][0] + polygon[i][0]) * (polygon[j][1] - polygon[i][1]);
  }
  return round32(Math.abs(area) / 2);
}
var recentWallIds = [];
function getActiveLevelId() {
  const { selection } = use_viewer_default.getState();
  return selection.levelId ?? null;
}
function findFirstLevelId() {
  const { nodes } = use_scene_default.getState();
  for (const node of Object.values(nodes)) {
    if (node.type === "level") return node.id;
  }
  return null;
}
function getLevelId() {
  const active = getActiveLevelId();
  if (active) return active;
  const first = findFirstLevelId();
  if (first) return first;
  throw new Error("No level found in scene");
}
function executeToolCall(name, args) {
  try {
    switch (name) {
      case "create_walls":
        return createWalls(args);
      case "create_slab":
        return createSlab(args);
      case "create_door":
        return createDoor(args);
      case "create_window":
        return createWindow(args);
      case "create_room":
        return createRoom(args);
      case "create_ceiling":
        return createCeiling(args);
      case "create_zone":
        return createZone(args);
      case "create_roof":
        return createRoof(args);
      case "create_apartment":
        return createApartment(args);
      case "create_l_shaped_room":
        return createLShapedRoom(args);
      case "modify_node":
        return modifyNode(args);
      case "delete_node":
        return deleteNode(args);
      case "delete_all_on_level":
        return deleteAllOnLevel();
      case "get_scene_info":
        return getSceneInfo();
      case "undo":
        return undoAction();
      case "redo":
        return redoAction();
      case "select_node":
        return selectNode(args);
      case "move_nodes":
        return moveNodes(args);
      case "add_door_to_wall":
        return addDoorToWall(args);
      case "add_window_to_wall":
        return addWindowToWall(args);
      case "batch_modify_nodes":
        return batchModifyNodes(args);
      case "create_polygon_room":
        return createPolygonRoom(args);
      case "place_furniture":
        return placeFurniture(args);
      case "suggest_furniture_layout":
        return suggestFurnitureLayout(args);
      case "place_furniture_solved":
        return placeFurnitureSolved(args);
      case "place_in_room":
        return placeInRoom(args);
      case "place_against_wall":
        return placeAgainstWall(args);
      case "furnish_room":
        return furnishRoom(args);
      case "create_hallway":
        return createHallway(args);
      case "list_furniture":
        return listFurniture();
      case "create_building_shell":
        return createBuildingShell(args);
      case "create_furnished_apartment":
        return createFurnishedApartment(args);
      case "mirror_room":
        return mirrorRoom(args);
      case "add_level":
        return addLevel(args);
      case "switch_level":
        return switchLevel(args);
      case "delete_level":
        return deleteLevel(args);
      case "rename_level":
        return renameLevel(args);
      case "duplicate_level":
        return duplicateLevel(args);
      case "list_levels":
        return listLevels();
      case "place_wall_item":
        return placeWallItem(args);
      case "place_ceiling_item":
        return placeCeilingItem(args);
      case "validate_scene":
        return validateScene(args);
      case "auto_align_windows":
        return autoAlignWindows(args);
      case "build_staircase":
        return buildStaircase(args);
      default:
        return JSON.stringify({
          success: false,
          error: `Unknown tool: ${name}`,
          tool: name,
          nextAction: "Call get_scene_info or use one of the tools exposed in the current Agent Run Policy."
        });
    }
  } catch (err) {
    return JSON.stringify({
      success: false,
      error: String(err),
      tool: name,
      nextAction: "Inspect the error, then retry with valid arguments or choose a safer staged tool."
    });
  }
}
function createWalls(args) {
  const levelId = getLevelId();
  const wallDefs = args.walls;
  if (!wallDefs || !Array.isArray(wallDefs) || wallDefs.length === 0) {
    return JSON.stringify({ error: "walls array is required and must not be empty" });
  }
  for (let i = 0; i < wallDefs.length; i++) {
    const w = wallDefs[i];
    if (!w.start || !w.end || w.start.length !== 2 || w.end.length !== 2) {
      return JSON.stringify({ error: `Wall ${i}: start and end must be [x, z] arrays` });
    }
    if (w.start[0] === w.end[0] && w.start[1] === w.end[1]) {
      return JSON.stringify({ error: `Wall ${i}: start and end are the same point` });
    }
  }
  const createdIds = [];
  const ops = [];
  for (const def of wallDefs) {
    const wall = WallNode.parse({
      start: def.start,
      end: def.end,
      ...def.thickness != null ? { thickness: def.thickness } : {},
      ...def.height != null ? { height: def.height } : {}
    });
    ops.push({ node: wall, parentId: levelId });
    createdIds.push(wall.id);
  }
  use_scene_default.getState().createNodes(ops);
  recentWallIds = createdIds;
  const walls = ops.map((op, i) => {
    const w = op.node;
    const dx = w.end[0] - w.start[0];
    const dz = w.end[1] - w.start[1];
    const length = Math.sqrt(dx * dx + dz * dz);
    let orientation;
    if (Math.abs(dz) < 0.01) orientation = "horizontal";
    else if (Math.abs(dx) < 0.01) orientation = "vertical";
    else orientation = "diagonal";
    return {
      id: w.id,
      index: i,
      start: w.start,
      end: w.end,
      length: Math.round(length * 1e3) / 1e3,
      orientation,
      thickness: w.thickness ?? 0.15,
      height: w.height ?? 3
    };
  });
  return JSON.stringify({
    success: true,
    wallIds: createdIds,
    count: createdIds.length,
    walls
  });
}
function createSlab(args) {
  const levelId = getLevelId();
  const polygon = args.polygon;
  const elevation = args.elevation ?? 0.05;
  const slab = SlabNode.parse({ polygon, elevation });
  use_scene_default.getState().createNode(slab, levelId);
  return JSON.stringify({
    success: true,
    slabId: slab.id
  });
}
function createDoor(args) {
  const wallIndex = args.wallIndex;
  if (wallIndex < 0 || wallIndex >= recentWallIds.length) {
    return JSON.stringify({
      error: `Wall index ${wallIndex} out of range. Recently created ${recentWallIds.length} walls.`
    });
  }
  const wallId = recentWallIds[wallIndex];
  const wall = use_scene_default.getState().nodes[wallId];
  if (!wall) {
    return JSON.stringify({ error: `Wall ${wallId} not found` });
  }
  const t = args.position_t ?? 0.5;
  const wallLen = Math.sqrt(
    (wall.end[0] - wall.start[0]) ** 2 + (wall.end[1] - wall.start[1]) ** 2
  );
  const xPos = t * wallLen;
  const doorHeight = args.height ?? 2.1;
  const yPos = doorHeight / 2;
  const door = DoorNode.parse({
    wallId,
    position: [xPos, yPos, 0],
    ...args.width != null ? { width: args.width } : {},
    ...args.height != null ? { height: args.height } : {}
  });
  use_scene_default.getState().createNode(door, wallId);
  return JSON.stringify({
    success: true,
    doorId: door.id,
    wallId
  });
}
function createWindow(args) {
  const wallIndex = args.wallIndex;
  if (wallIndex < 0 || wallIndex >= recentWallIds.length) {
    return JSON.stringify({
      error: `Wall index ${wallIndex} out of range. Recently created ${recentWallIds.length} walls.`
    });
  }
  const wallId = recentWallIds[wallIndex];
  const wall = use_scene_default.getState().nodes[wallId];
  if (!wall) {
    return JSON.stringify({ error: `Wall ${wallId} not found` });
  }
  const t = args.position_t ?? 0.5;
  const wallLen = Math.sqrt(
    (wall.end[0] - wall.start[0]) ** 2 + (wall.end[1] - wall.start[1]) ** 2
  );
  const xPos = t * wallLen;
  const sillHeight = args.sillHeight ?? 0.9;
  const winHeight = args.height ?? 1.5;
  const yPos = sillHeight + winHeight / 2;
  const window2 = WindowNode.parse({
    wallId,
    position: [xPos, yPos, 0],
    ...args.width != null ? { width: args.width } : {},
    ...args.height != null ? { height: args.height } : {}
  });
  use_scene_default.getState().createNode(window2, wallId);
  return JSON.stringify({
    success: true,
    windowId: window2.id,
    wallId
  });
}
function createRoom(args) {
  const width = args.width;
  const depth = args.depth;
  if (!width || width <= 0) return JSON.stringify({ error: "width must be a positive number" });
  if (!depth || depth <= 0) return JSON.stringify({ error: "depth must be a positive number" });
  const origin = args.origin ?? [0, 0];
  const wallHeight = args.wallHeight;
  const wallThickness = args.wallThickness;
  const addDoor = args.addDoor ?? true;
  const doorWall = args.doorWall ?? "front";
  const addWindows = args.addWindows ?? false;
  const addCeiling = args.addCeiling ?? false;
  const ceilingHeight = args.ceilingHeight ?? (wallHeight ? wallHeight - 0.3 : 2.5);
  const [ox, oz] = origin;
  const x1 = ox;
  const z1 = oz;
  const x2 = ox + width;
  const z2 = oz + depth;
  const wallDefs = [
    { start: [x1, z1], end: [x2, z1] },
    // front
    { start: [x2, z1], end: [x2, z2] },
    // right
    { start: [x2, z2], end: [x1, z2] },
    // back
    { start: [x1, z2], end: [x1, z1] }
    // left
  ];
  const wallArgs = {
    walls: wallDefs.map((w) => ({
      ...w,
      ...wallHeight != null ? { height: wallHeight } : {},
      ...wallThickness != null ? { thickness: wallThickness } : {}
    }))
  };
  const wallResult = JSON.parse(createWalls(wallArgs));
  const t = (wallThickness ?? 0.15) / 2;
  const slabPolygon = [
    [x1 + t, z1 + t],
    [x2 - t, z1 + t],
    [x2 - t, z2 - t],
    [x1 + t, z2 - t]
  ];
  const slabResult = JSON.parse(createSlab({ polygon: slabPolygon }));
  const halfT = t;
  const gap = 0.05;
  const spatialContext = {
    roomBounds: {
      minX: round32(x1),
      minZ: round32(z1),
      maxX: round32(x2),
      maxZ: round32(z2)
    },
    interiorBounds: {
      minX: round32(x1 + halfT + gap),
      minZ: round32(z1 + halfT + gap),
      maxX: round32(x2 - halfT - gap),
      maxZ: round32(z2 - halfT - gap)
    },
    wallsByFace: {
      south: { id: wallResult.wallIds?.[0], start: [x1, z1], end: [x2, z1], length: round32(width) },
      east: { id: wallResult.wallIds?.[1], start: [x2, z1], end: [x2, z2], length: round32(depth) },
      north: { id: wallResult.wallIds?.[2], start: [x2, z2], end: [x1, z2], length: round32(width) },
      west: { id: wallResult.wallIds?.[3], start: [x1, z2], end: [x1, z1], length: round32(depth) }
    },
    slabPolygon
  };
  const results = {
    success: true,
    walls: wallResult,
    slab: slabResult,
    createdNodeIds: compactIds([
      ...Array.isArray(wallResult.wallIds) ? wallResult.wallIds : [],
      slabResult.slabId
    ]),
    createdByType: createdByType({
      wall: Array.isArray(wallResult.wallIds) ? wallResult.wallIds : [],
      slab: [slabResult.slabId]
    }),
    spatialContext,
    usableBounds: spatialContext.interiorBounds,
    candidateWalls: spatialContext.wallsByFace,
    suggestedNextTools: ["create_zone", "add_door_to_wall", "add_window_to_wall", "validate_scene"]
  };
  if (addDoor) {
    const wallIndexMap = {
      front: 0,
      right: 1,
      back: 2,
      left: 3
    };
    const doorResult = JSON.parse(
      createDoor({
        wallIndex: wallIndexMap[doorWall] ?? 0,
        position_t: 0.5
      })
    );
    results.door = doorResult;
    results.createdNodeIds = compactIds([...results.createdNodeIds, doorResult.doorId]);
    results.createdByType = {
      ...results.createdByType,
      door: compactIds([doorResult.doorId])
    };
  }
  if (addWindows) {
    const doorWallIndex = { front: 0, right: 1, back: 2, left: 3 }[doorWall] ?? 0;
    const windowResults = [];
    for (let i = 0; i < 4; i++) {
      if (i === doorWallIndex) continue;
      const wResult = JSON.parse(
        createWindow({ wallIndex: i, position_t: 0.5 })
      );
      windowResults.push(wResult);
    }
    results.windows = windowResults;
    results.createdNodeIds = compactIds([
      ...results.createdNodeIds,
      ...windowResults.map((result) => isRecordLike(result) ? result.windowId : void 0)
    ]);
    results.createdByType = {
      ...results.createdByType,
      window: compactIds(windowResults.map((result) => isRecordLike(result) ? result.windowId : void 0))
    };
  }
  if (addCeiling) {
    const ceilingPolygon = [
      [x1 + t, z1 + t],
      [x2 - t, z1 + t],
      [x2 - t, z2 - t],
      [x1 + t, z2 - t]
    ];
    const ceilingResult = JSON.parse(
      createCeiling({ polygon: ceilingPolygon, height: ceilingHeight })
    );
    results.ceiling = ceilingResult;
    results.createdNodeIds = compactIds([...results.createdNodeIds, ceilingResult.ceilingId]);
    results.createdByType = {
      ...results.createdByType,
      ceiling: compactIds([ceilingResult.ceilingId])
    };
  }
  return JSON.stringify(results);
}
function createCeiling(args) {
  const levelId = getLevelId();
  const polygon = args.polygon;
  const height = args.height ?? 2.5;
  if (!polygon || !Array.isArray(polygon) || polygon.length < 3) {
    return JSON.stringify({ error: "polygon must have at least 3 [x, z] points" });
  }
  for (let i = 0; i < polygon.length; i++) {
    const pt = polygon[i];
    if (!pt || !Array.isArray(pt) || pt.length !== 2) {
      return JSON.stringify({ error: `polygon point ${i} must be [x, z]` });
    }
  }
  const ceiling = CeilingNode.parse({ polygon, height });
  use_scene_default.getState().createNode(ceiling, levelId);
  return JSON.stringify({
    success: true,
    ceilingId: ceiling.id,
    height
  });
}
function createZone(args) {
  const levelId = getLevelId();
  const name = args.name;
  const polygon = args.polygon;
  const color = args.color ?? "#3b82f6";
  const roomType = args.roomType;
  const zone = ZoneNode.parse({
    name,
    polygon,
    color,
    ...roomType ? { metadata: { roomType } } : {}
  });
  use_scene_default.getState().createNode(zone, levelId);
  return JSON.stringify({
    success: true,
    zoneId: zone.id,
    name,
    ...roomType ? { roomType } : {},
    createdNodeIds: [zone.id],
    createdByType: { zone: [zone.id] },
    spatialContext: {
      polygon,
      bounds: polygonBounds2(polygon),
      area: polygonArea2(polygon),
      roomType: roomType ?? null
    },
    usableBounds: polygonBounds2(polygon),
    suggestedNextTools: ["validate_scene", "add_door_to_wall", "add_window_to_wall"]
  });
}
function createRoof(args) {
  const levelId = getLevelId();
  const position = args.position ?? [0, 0, 0];
  const rotationDeg = args.rotation ?? 0;
  const rotationRad = rotationDeg * Math.PI / 180;
  const roofType = args.roofType ?? "gable";
  const width = args.width ?? 8;
  const depth = args.depth ?? 6;
  const wallHeight = args.wallHeight ?? 0.5;
  const roofHeight = args.roofHeight ?? 2.5;
  const overhang = args.overhang ?? 0.3;
  const segment = RoofSegmentNode.parse({
    roofType,
    width,
    depth,
    wallHeight,
    roofHeight,
    overhang
  });
  const roof = RoofNode.parse({
    position,
    rotation: rotationRad,
    children: [segment.id]
  });
  use_scene_default.getState().createNodes([
    { node: roof, parentId: levelId },
    { node: segment, parentId: roof.id }
  ]);
  return JSON.stringify({
    success: true,
    roofId: roof.id,
    segmentId: segment.id,
    roofType
  });
}
function createApartment(args) {
  const origin = args.origin ?? [0, 0];
  const rooms = args.rooms;
  const wallHeight = args.wallHeight;
  const wallThickness = args.wallThickness ?? 0.15;
  const maxRowWidth = args.maxRowWidth ?? 20;
  const results = [];
  const allCreatedIds = [];
  const allByType = {};
  const roomContexts = [];
  let curX = origin[0];
  let curZ = origin[1];
  let rowMaxDepth = 0;
  for (const room of rooms) {
    if (curX - origin[0] + room.width > maxRowWidth && curX !== origin[0]) {
      curZ += rowMaxDepth;
      curX = origin[0];
      rowMaxDepth = 0;
    }
    const roomResult = JSON.parse(
      createRoom({
        origin: [curX, curZ],
        width: room.width,
        depth: room.depth,
        wallHeight,
        wallThickness,
        addDoor: room.hasDoor ?? true,
        doorWall: "front",
        addWindows: room.hasWindow ?? false
      })
    );
    const t = wallThickness / 2;
    const zoneResult = JSON.parse(
      createZone({
        name: room.name,
        roomType: room.roomType,
        polygon: [
          [curX + t, curZ + t],
          [curX + room.width - t, curZ + t],
          [curX + room.width - t, curZ + room.depth - t],
          [curX + t, curZ + room.depth - t]
        ]
      })
    );
    const createdNodeIds = Array.isArray(roomResult.createdNodeIds) ? roomResult.createdNodeIds : [];
    const zoneIds = compactIds([zoneResult.zoneId]);
    allCreatedIds.push(...compactIds([...createdNodeIds, ...zoneIds]));
    for (const [type, ids] of Object.entries({
      ...isRecordLike(roomResult.createdByType) ? roomResult.createdByType : {},
      zone: zoneIds
    })) {
      allByType[type] = [...allByType[type] ?? [], ...compactIds(Array.isArray(ids) ? ids : [])];
    }
    roomContexts.push({
      name: room.name,
      roomType: room.roomType ?? null,
      slabId: isRecordLike(roomResult.slab) ? roomResult.slab.slabId : void 0,
      zoneId: zoneResult.zoneId,
      spatialContext: roomResult.spatialContext,
      candidateWalls: roomResult.candidateWalls
    });
    results.push({
      room: room.name,
      ...roomResult,
      zone: zoneResult
    });
    curX += room.width;
    rowMaxDepth = Math.max(rowMaxDepth, room.depth);
  }
  return JSON.stringify({
    success: true,
    roomCount: rooms.length,
    rooms: results,
    createdNodeIds: allCreatedIds,
    createdByType: allByType,
    spatialContext: {
      origin,
      maxRowWidth,
      rooms: roomContexts
    },
    suggestedNextTools: ["validate_scene", "add_window_to_wall", "auto_align_windows", "place_in_room"]
  });
}
function createLShapedRoom(args) {
  const origin = args.origin ?? [0, 0];
  const mainW = args.mainWidth;
  const mainD = args.mainDepth;
  const wingW = args.wingWidth;
  const wingD = args.wingDepth;
  if (!mainW || mainW <= 0) return JSON.stringify({ error: "mainWidth must be positive" });
  if (!mainD || mainD <= 0) return JSON.stringify({ error: "mainDepth must be positive" });
  if (!wingW || wingW <= 0) return JSON.stringify({ error: "wingWidth must be positive" });
  if (!wingD || wingD <= 0) return JSON.stringify({ error: "wingDepth must be positive" });
  if (wingW > mainW) return JSON.stringify({ error: "wingWidth should be <= mainWidth for proper L-shape" });
  const wallHeight = args.wallHeight;
  const addDoor = args.addDoor ?? true;
  const [ox, oz] = origin;
  const points = [
    [ox, oz],
    // bottom-left
    [ox + mainW, oz],
    // bottom-right of main
    [ox + mainW, oz + mainD],
    // top-right of main
    [ox + wingW, oz + mainD],
    // step inward
    [ox + wingW, oz + mainD + wingD],
    // top of wing
    [ox, oz + mainD + wingD]
    // top-left
  ];
  const wallDefs = [];
  for (let i = 0; i < points.length; i++) {
    const start = points[i];
    const end = points[(i + 1) % points.length];
    wallDefs.push({ start, end });
  }
  const wallArgs = {
    walls: wallDefs.map((w) => ({
      ...w,
      ...wallHeight != null ? { height: wallHeight } : {}
    }))
  };
  const wallResult = JSON.parse(createWalls(wallArgs));
  const t = 0.075;
  const slabPolygon = [
    [ox + t, oz + t],
    [ox + mainW - t, oz + t],
    [ox + mainW - t, oz + mainD - t],
    [ox + wingW - t, oz + mainD - t],
    [ox + wingW - t, oz + mainD + wingD - t],
    [ox + t, oz + mainD + wingD - t]
  ];
  const slabResult = JSON.parse(createSlab({ polygon: slabPolygon }));
  const results = {
    success: true,
    walls: wallResult,
    slab: slabResult
  };
  if (addDoor) {
    const doorResult = JSON.parse(
      createDoor({ wallIndex: 0, position_t: 0.3 })
    );
    results.door = doorResult;
  }
  return JSON.stringify(results);
}
function modifyNode(args) {
  const nodeId = args.nodeId;
  const updates = args.updates;
  const node = use_scene_default.getState().nodes[nodeId];
  if (!node) {
    return JSON.stringify({ error: `Node ${nodeId} not found` });
  }
  use_scene_default.getState().updateNode(nodeId, updates);
  return JSON.stringify({
    success: true,
    nodeId,
    nodeType: node.type,
    updatedFields: Object.keys(updates)
  });
}
function deleteAllOnLevel() {
  const levelId = getLevelId();
  const { nodes } = use_scene_default.getState();
  const idsToDelete = [];
  for (const node of Object.values(nodes)) {
    if (node.parentId === levelId) {
      idsToDelete.push(node.id);
      if ("children" in node && Array.isArray(node.children)) {
        for (const childId of node.children) {
          idsToDelete.push(childId);
        }
      }
    }
  }
  if (idsToDelete.length > 0) {
    use_scene_default.getState().deleteNodes(idsToDelete);
  }
  recentWallIds = [];
  return JSON.stringify({
    success: true,
    deletedCount: idsToDelete.length
  });
}
function getSceneInfo() {
  const { nodes } = use_scene_default.getState();
  const levelId = getLevelId();
  const walls = [];
  const slabs = [];
  const doors = [];
  const windows = [];
  const ceilings = [];
  const zones = [];
  const roofs = [];
  const items = [];
  for (const node of Object.values(nodes)) {
    if (node.parentId !== levelId && !isChildOfLevel(node, nodes, levelId))
      continue;
    if (node.type === "wall") {
      const w = node;
      const len = Math.sqrt((w.end[0] - w.start[0]) ** 2 + (w.end[1] - w.start[1]) ** 2);
      walls.push({ id: w.id, start: w.start, end: w.end, height: w.height, thickness: w.thickness, length: Math.round(len * 100) / 100 });
    } else if (node.type === "slab") {
      const s = node;
      slabs.push({ id: node.id, vertexCount: s.polygon?.length ?? 0 });
    } else if (node.type === "door") {
      const d = node;
      doors.push({ id: d.id, parentWallId: d.parentId, width: d.width, height: d.height });
    } else if (node.type === "window") {
      const w = node;
      windows.push({ id: w.id, parentWallId: w.parentId, width: w.width, height: w.height });
    } else if (node.type === "ceiling") {
      const c = node;
      ceilings.push({ id: c.id, height: c.height });
    } else if (node.type === "zone") {
      const z2 = node;
      const metadata = node.metadata;
      zones.push({ id: z2.id, name: z2.name, color: z2.color, roomType: metadata?.roomType });
    } else if (node.type === "roof") {
      roofs.push({ id: node.id });
    } else if (node.type === "item") {
      const itm = node;
      items.push({
        id: itm.id,
        name: itm.asset.name,
        catalogId: itm.asset.id,
        position: itm.position,
        attachTo: itm.asset.attachTo,
        parentId: itm.parentId
      });
    }
  }
  const building = Object.values(nodes).find((n) => n.type === "building");
  const allLevels = building ? building.children.map((id) => nodes[id]).filter((n) => n?.type === "level").sort((a, b) => a.level - b.level).map((l) => ({
    levelId: l.id,
    level: l.level,
    name: l.name ?? `Level ${l.level}`,
    isActive: l.id === levelId,
    childCount: l.children.length
  })) : [];
  const roomSummaries = [];
  const slabPolygons = [];
  for (const node of Object.values(nodes)) {
    if (node.type === "slab" && (node.parentId === levelId || isChildOfLevel(node, nodes, levelId))) {
      const s = node;
      if (s.polygon) slabPolygons.push({ id: s.id, polygon: s.polygon });
    }
  }
  for (const slab of slabPolygons) {
    const xs = slab.polygon.map((p) => p[0]);
    const zs = slab.polygon.map((p) => p[1]);
    const minX = round32(Math.min(...xs));
    const minZ = round32(Math.min(...zs));
    const maxX = round32(Math.max(...xs));
    const maxZ = round32(Math.max(...zs));
    let area = 0;
    for (let i = 0, j = slab.polygon.length - 1; i < slab.polygon.length; j = i++) {
      area += (slab.polygon[j][0] + slab.polygon[i][0]) * (slab.polygon[j][1] - slab.polygon[i][1]);
    }
    area = round32(Math.abs(area) / 2);
    let zoneName = null;
    let roomType = null;
    for (const z2 of zones) {
      const zNode = nodes[z2.id];
      if (zNode?.polygon) {
        const zCentroid = [
          zNode.polygon.reduce((s, p) => s + p[0], 0) / zNode.polygon.length,
          zNode.polygon.reduce((s, p) => s + p[1], 0) / zNode.polygon.length
        ];
        if (pointInPolygonSimple(zCentroid[0], zCentroid[1], slab.polygon)) {
          zoneName = z2.name;
          roomType = z2.roomType ?? null;
          break;
        }
      }
    }
    const containedItems = items.filter((itm) => {
      const pos = itm.position;
      return pos && pointInPolygonSimple(pos[0], pos[2], slab.polygon);
    }).map((itm) => ({ id: itm.id, name: itm.name, catalogId: itm.catalogId }));
    const slabWallIds = walls.filter((wall) => {
      const w = nodes[wall.id];
      if (!w.start || !w.end) return false;
      return pointInPolygonSimple(w.start[0], w.start[1], slab.polygon) || pointInPolygonSimple(w.end[0], w.end[1], slab.polygon);
    }).map((wall) => wall.id);
    const windowCount = windows.filter((window2) => slabWallIds.includes(String(window2.parentWallId))).length;
    const doorCount = doors.filter((door) => slabWallIds.includes(String(door.parentWallId))).length;
    roomSummaries.push({
      slabId: slab.id,
      zoneName,
      bounds: { minX, minZ, maxX, maxZ },
      area,
      furniture: containedItems,
      shortSide: round32(Math.min(maxX - minX, maxZ - minZ)),
      roomType,
      windowCount,
      doorCount
    });
  }
  const architecturalSummary = {
    spaces: roomSummaries.map((room) => ({
      slabId: room.slabId,
      zoneName: room.zoneName,
      roomType: room.roomType,
      area: room.area,
      shortSide: room.shortSide,
      bounds: room.bounds,
      availableFurnitureZones: [room.bounds],
      usableFurnitureZones: [roomConstraintModel(levelId, {
        polygon: slabPolygons.find((slab) => slab.id === room.slabId)?.polygon ?? [
          [room.bounds.minX, room.bounds.minZ],
          [room.bounds.maxX, room.bounds.minZ],
          [room.bounds.maxX, room.bounds.maxZ],
          [room.bounds.minX, room.bounds.maxZ]
        ],
        bounds: room.bounds
      }).usableBounds],
      blockedZones: openingBlockedZones(levelId, {
        polygon: slabPolygons.find((slab) => slab.id === room.slabId)?.polygon ?? [
          [room.bounds.minX, room.bounds.minZ],
          [room.bounds.maxX, room.bounds.minZ],
          [room.bounds.maxX, room.bounds.maxZ],
          [room.bounds.minX, room.bounds.maxZ]
        ],
        bounds: room.bounds
      }).slice(0, 8),
      mainPathZones: roomConstraintModel(levelId, {
        polygon: slabPolygons.find((slab) => slab.id === room.slabId)?.polygon ?? [
          [room.bounds.minX, room.bounds.minZ],
          [room.bounds.maxX, room.bounds.minZ],
          [room.bounds.maxX, room.bounds.maxZ],
          [room.bounds.minX, room.bounds.maxZ]
        ],
        bounds: room.bounds
      }).clearPathCandidates.slice(0, 6),
      furnitureConstraintStatus: room.furniture.length === 0 ? "unfurnished" : "validate_after_furnishing",
      recommendedFurnitureTool: "place_furniture_solved",
      doorCount: room.doorCount,
      windowCount: room.windowCount,
      needsOpeningAttention: room.doorCount === 0 || windowCountNeedsAttention(room.roomType, room.windowCount)
    })),
    openingCounts: {
      doors: doors.length,
      windows: windows.length
    },
    exteriorWallCandidates: walls.filter((wall) => Number(wall.length) >= 1.2).slice(0, 12).map((wall) => ({ id: wall.id, length: wall.length, start: wall.start, end: wall.end })),
    suggestedNextTools: roomSummaries.length === 0 ? ["create_room", "create_apartment", "create_polygon_room"] : ["validate_scene", "add_door_to_wall", "add_window_to_wall", "auto_align_windows", "place_in_room"]
  };
  return JSON.stringify({
    levelId,
    activeLevelName: allLevels.find((l) => l.isActive)?.name ?? "Level 0",
    summary: {
      walls: walls.length,
      slabs: slabs.length,
      doors: doors.length,
      windows: windows.length,
      ceilings: ceilings.length,
      zones: zones.length,
      roofs: roofs.length,
      items: items.length,
      rooms: roomSummaries.length,
      isEmpty: walls.length === 0 && slabs.length === 0
    },
    allLevels,
    architecturalSummary,
    lastValidation: lastValidationReport ? {
      codeProfile: lastValidationReport.codeProfile,
      blocking: lastValidationReport.blocking,
      blockingRuleIds: lastValidationReport.blockingRuleIds,
      ruleSummary: lastValidationReport.ruleSummary,
      repairHints: lastValidationReport.repairHints
    } : null,
    roomSummaries,
    wallDetails: walls,
    doorDetails: doors,
    windowDetails: windows,
    zoneDetails: zones,
    slabDetails: slabs,
    ceilingDetails: ceilings,
    roofDetails: roofs,
    itemDetails: items
  });
}
function isChildOfLevel(node, nodes, levelId) {
  if (node.parentId === levelId) return true;
  if (!node.parentId) return false;
  const parent = nodes[node.parentId];
  if (!parent) return false;
  return parent.parentId === levelId;
}
function windowCountNeedsAttention(roomType, windowCount) {
  if (typeof roomType !== "string") return windowCount === 0;
  return ["bedroom", "living", "kitchen", "bathroom"].includes(roomType) && windowCount === 0;
}
function deleteNode(args) {
  const nodeId = args.nodeId;
  const { nodes } = use_scene_default.getState();
  const node = nodes[nodeId];
  if (!node) {
    return JSON.stringify({ error: `Node ${nodeId} not found` });
  }
  const idsToDelete = [nodeId];
  function collectChildren(parentId) {
    for (const n of Object.values(nodes)) {
      if (n.parentId === parentId) {
        idsToDelete.push(n.id);
        collectChildren(n.id);
      }
    }
  }
  collectChildren(nodeId);
  use_scene_default.getState().deleteNodes(idsToDelete);
  return JSON.stringify({
    success: true,
    deletedCount: idsToDelete.length,
    nodeType: node.type
  });
}
function undoAction() {
  const temporal2 = use_scene_default.temporal.getState();
  const canUndo = temporal2.pastStates.length > 0;
  if (!canUndo) {
    return JSON.stringify({ error: "Nothing to undo" });
  }
  temporal2.undo();
  return JSON.stringify({ success: true, message: "Undone last action" });
}
function redoAction() {
  const temporal2 = use_scene_default.temporal.getState();
  const canRedo = temporal2.futureStates.length > 0;
  if (!canRedo) {
    return JSON.stringify({ error: "Nothing to redo" });
  }
  temporal2.redo();
  return JSON.stringify({ success: true, message: "Redone last action" });
}
function selectNode(args) {
  const nodeId = args.nodeId;
  const node = use_scene_default.getState().nodes[nodeId];
  if (!node) {
    return JSON.stringify({ error: `Node ${nodeId} not found` });
  }
  use_viewer_default.getState().setSelection({ selectedIds: [nodeId] });
  return JSON.stringify({
    success: true,
    selectedNodeId: nodeId,
    nodeType: node.type
  });
}
function moveNodes(args) {
  const nodeIds = args.nodeIds;
  const delta = args.delta;
  if (!nodeIds || nodeIds.length === 0) {
    return JSON.stringify({ error: "nodeIds array is required" });
  }
  if (!delta || delta.length !== 2) {
    return JSON.stringify({ error: "delta must be [dx, dz]" });
  }
  const [dx, dz] = delta;
  const { nodes } = use_scene_default.getState();
  const updates = [];
  const moved = [];
  const skipped = [];
  for (const id of nodeIds) {
    const node = nodes[id];
    if (!node) {
      skipped.push(id);
      continue;
    }
    if (node.type === "wall") {
      const w = node;
      updates.push({
        id,
        data: {
          start: [w.start[0] + dx, w.start[1] + dz],
          end: [w.end[0] + dx, w.end[1] + dz]
        }
      });
      moved.push(id);
    } else if (node.type === "slab" || node.type === "zone" || node.type === "ceiling") {
      const n = node;
      if (n.polygon) {
        updates.push({
          id,
          data: {
            polygon: n.polygon.map(([x, z2]) => [x + dx, z2 + dz])
          }
        });
        moved.push(id);
      } else {
        skipped.push(id);
      }
    } else if (node.type === "roof") {
      const r = node;
      if (r.position) {
        updates.push({
          id,
          data: {
            position: [r.position[0] + dx, r.position[1], r.position[2] + dz]
          }
        });
        moved.push(id);
      }
    } else {
      skipped.push(id);
    }
  }
  if (updates.length > 0) {
    use_scene_default.getState().updateNodes(updates);
  }
  return JSON.stringify({
    success: true,
    movedCount: moved.length,
    movedIds: moved,
    ...skipped.length > 0 ? { skippedIds: skipped } : {}
  });
}
function addDoorToWall(args) {
  const wallId = args.wallId;
  const wall = use_scene_default.getState().nodes[wallId];
  if (!wall) {
    return JSON.stringify({ error: `Wall ${wallId} not found` });
  }
  if (wall.type !== "wall") {
    return JSON.stringify({ error: `Node ${wallId} is not a wall (type: ${wall.type})` });
  }
  const t = args.position_t ?? 0.5;
  const wallLen = Math.sqrt(
    (wall.end[0] - wall.start[0]) ** 2 + (wall.end[1] - wall.start[1]) ** 2
  );
  const xPos = t * wallLen;
  const doorHeight = args.height ?? 2.1;
  const yPos = doorHeight / 2;
  const door = DoorNode.parse({
    wallId,
    position: [xPos, yPos, 0],
    ...args.width != null ? { width: args.width } : {},
    ...args.height != null ? { height: args.height } : {}
  });
  use_scene_default.getState().createNode(door, wallId);
  return JSON.stringify({
    success: true,
    doorId: door.id,
    wallId,
    wallLength: Math.round(wallLen * 100) / 100
  });
}
function addWindowToWall(args) {
  const wallId = args.wallId;
  const wall = use_scene_default.getState().nodes[wallId];
  if (!wall) {
    return JSON.stringify({ error: `Wall ${wallId} not found` });
  }
  if (wall.type !== "wall") {
    return JSON.stringify({ error: `Node ${wallId} is not a wall (type: ${wall.type})` });
  }
  const t = args.position_t ?? 0.5;
  const wallLen = Math.sqrt(
    (wall.end[0] - wall.start[0]) ** 2 + (wall.end[1] - wall.start[1]) ** 2
  );
  const xPos = t * wallLen;
  const sillHeight = args.sillHeight ?? 0.9;
  const winHeight = args.height ?? 1.5;
  const yPos = sillHeight + winHeight / 2;
  const window2 = WindowNode.parse({
    wallId,
    position: [xPos, yPos, 0],
    ...args.width != null ? { width: args.width } : {},
    ...args.height != null ? { height: args.height } : {}
  });
  use_scene_default.getState().createNode(window2, wallId);
  return JSON.stringify({
    success: true,
    windowId: window2.id,
    wallId,
    wallLength: Math.round(wallLen * 100) / 100
  });
}
function batchModifyNodes(args) {
  const nodeIds = args.nodeIds;
  const updates = args.updates;
  if (!nodeIds || nodeIds.length === 0) {
    return JSON.stringify({ error: "nodeIds array is required" });
  }
  if (!updates || Object.keys(updates).length === 0) {
    return JSON.stringify({ error: "updates object is required and must not be empty" });
  }
  const { nodes } = use_scene_default.getState();
  const batchUpdates = [];
  const modified = [];
  const notFound = [];
  for (const id of nodeIds) {
    const node = nodes[id];
    if (!node) {
      notFound.push(id);
      continue;
    }
    batchUpdates.push({ id, data: updates });
    modified.push(id);
  }
  if (batchUpdates.length > 0) {
    use_scene_default.getState().updateNodes(batchUpdates);
  }
  return JSON.stringify({
    success: true,
    modifiedCount: modified.length,
    updatedFields: Object.keys(updates),
    ...notFound.length > 0 ? { notFoundIds: notFound } : {}
  });
}
function createPolygonRoom(args) {
  const polygon = args.polygon;
  if (!polygon || polygon.length < 3) {
    return JSON.stringify({ error: "polygon must have at least 3 vertices" });
  }
  const wallHeight = args.wallHeight;
  const wallThickness = args.wallThickness;
  const addDoor = args.addDoor ?? true;
  const doorEdgeIndex = args.doorEdgeIndex ?? 0;
  const addSlab = args.addSlab ?? true;
  const zoneName = args.zoneName;
  const zoneColor = args.zoneColor ?? "#3b82f6";
  const zoneRoomType = args.zoneRoomType;
  const wallDefs = polygon.map((pt, i) => {
    const next = polygon[(i + 1) % polygon.length];
    return {
      start: pt,
      end: next,
      ...wallHeight != null ? { height: wallHeight } : {},
      ...wallThickness != null ? { thickness: wallThickness } : {}
    };
  });
  const wallResult = JSON.parse(createWalls({ walls: wallDefs }));
  const results = {
    success: true,
    walls: wallResult,
    createdNodeIds: compactIds(Array.isArray(wallResult.wallIds) ? wallResult.wallIds : []),
    createdByType: createdByType({
      wall: Array.isArray(wallResult.wallIds) ? wallResult.wallIds : []
    }),
    spatialContext: {
      polygon,
      bounds: polygonBounds2(polygon),
      area: polygonArea2(polygon),
      edges: polygon.map((point, index) => {
        const next = polygon[(index + 1) % polygon.length];
        return {
          index,
          wallId: Array.isArray(wallResult.wallIds) ? wallResult.wallIds[index] : void 0,
          start: point,
          end: next,
          length: round32(Math.sqrt((next[0] - point[0]) ** 2 + (next[1] - point[1]) ** 2))
        };
      })
    },
    candidateWalls: polygon.map((_point, index) => ({
      index,
      wallId: Array.isArray(wallResult.wallIds) ? wallResult.wallIds[index] : void 0
    })),
    suggestedNextTools: ["create_zone", "add_door_to_wall", "add_window_to_wall", "validate_scene"]
  };
  if (addSlab) {
    const slabResult = JSON.parse(createSlab({ polygon }));
    results.slab = slabResult;
    results.createdNodeIds = compactIds([...results.createdNodeIds, slabResult.slabId]);
    results.createdByType = {
      ...results.createdByType,
      slab: compactIds([slabResult.slabId])
    };
    results.usableBounds = polygonBounds2(polygon);
  }
  if (addDoor && doorEdgeIndex >= 0 && doorEdgeIndex < polygon.length) {
    const doorResult = JSON.parse(
      createDoor({ wallIndex: doorEdgeIndex, position_t: 0.5 })
    );
    results.door = doorResult;
    results.createdNodeIds = compactIds([...results.createdNodeIds, doorResult.doorId]);
    results.createdByType = {
      ...results.createdByType,
      door: compactIds([doorResult.doorId])
    };
  }
  if (zoneName) {
    const zoneResult = JSON.parse(
      createZone({ name: zoneName, polygon, color: zoneColor, roomType: zoneRoomType })
    );
    results.zone = zoneResult;
    results.createdNodeIds = compactIds([...results.createdNodeIds, zoneResult.zoneId]);
    results.createdByType = {
      ...results.createdByType,
      zone: compactIds([zoneResult.zoneId])
    };
  }
  return JSON.stringify(results);
}
function findCatalogItem(id) {
  return CATALOG_ITEMS.find((item) => item.id === id) ?? null;
}
var DEFAULT_FURNITURE_METADATA = {
  footprintRole: "decor",
  preferredPlacement: ["center"],
  frontClearance: 0.45,
  sideClearance: 0.15
};
var FURNITURE_METADATA = {
  "double-bed": { footprintRole: "sleeping", preferredPlacement: ["wall"], frontClearance: 0.7, sideClearance: 0.45, wallBacked: true },
  "single-bed": { footprintRole: "sleeping", preferredPlacement: ["wall"], frontClearance: 0.65, sideClearance: 0.35, wallBacked: true },
  bunkbed: { footprintRole: "sleeping", preferredPlacement: ["wall"], frontClearance: 0.65, sideClearance: 0.35, wallBacked: true },
  sofa: { footprintRole: "seating", preferredPlacement: ["wall", "center"], frontClearance: 0.7, sideClearance: 0.25, wallBacked: true },
  "lounge-chair": { footprintRole: "seating", preferredPlacement: ["wall", "corner"], frontClearance: 0.55, sideClearance: 0.2 },
  "livingroom-chair": { footprintRole: "seating", preferredPlacement: ["wall", "center"], frontClearance: 0.55, sideClearance: 0.2 },
  stool: { footprintRole: "seating", preferredPlacement: ["center", "corner"], frontClearance: 0.35, sideClearance: 0.15 },
  "coffee-table": { footprintRole: "table", preferredPlacement: ["center"], frontClearance: 0.45, sideClearance: 0.25 },
  "dining-table": { footprintRole: "table", preferredPlacement: ["center"], frontClearance: 0.8, sideClearance: 0.65 },
  "dining-chair": { footprintRole: "seating", preferredPlacement: ["center"], frontClearance: 0.55, sideClearance: 0.2 },
  "tv-stand": { footprintRole: "storage", preferredPlacement: ["wall"], frontClearance: 0.45, sideClearance: 0.15, wallBacked: true },
  bookshelf: { footprintRole: "storage", preferredPlacement: ["wall"], frontClearance: 0.55, sideClearance: 0.15, wallBacked: true },
  closet: { footprintRole: "storage", preferredPlacement: ["wall"], frontClearance: 0.65, sideClearance: 0.15, wallBacked: true },
  dresser: { footprintRole: "storage", preferredPlacement: ["wall"], frontClearance: 0.55, sideClearance: 0.15, wallBacked: true },
  shelf: { footprintRole: "storage", preferredPlacement: ["wall"], frontClearance: 0.45, sideClearance: 0.1, wallBacked: true },
  "kitchen-counter": { footprintRole: "appliance", preferredPlacement: ["service-wall", "wall"], frontClearance: 0.8, sideClearance: 0.1, wallBacked: true },
  "kitchen-cabinet": { footprintRole: "appliance", preferredPlacement: ["service-wall", "wall"], frontClearance: 0.75, sideClearance: 0.1, wallBacked: true },
  kitchen: { footprintRole: "appliance", preferredPlacement: ["service-wall", "wall"], frontClearance: 0.8, sideClearance: 0.1, wallBacked: true },
  stove: { footprintRole: "appliance", preferredPlacement: ["service-wall", "wall"], frontClearance: 0.8, sideClearance: 0.15, wallBacked: true },
  fridge: { footprintRole: "appliance", preferredPlacement: ["service-wall", "wall", "corner"], frontClearance: 0.8, sideClearance: 0.15, wallBacked: true },
  microwave: { footprintRole: "appliance", preferredPlacement: ["wall"], frontClearance: 0.55, sideClearance: 0.1, wallBacked: true },
  toilet: { footprintRole: "sanitary", preferredPlacement: ["service-wall", "wall"], frontClearance: 0.65, sideClearance: 0.2, wallBacked: true },
  bathtub: { footprintRole: "sanitary", preferredPlacement: ["service-wall", "wall", "corner"], frontClearance: 0.65, sideClearance: 0.1, wallBacked: true },
  "bathroom-sink": { footprintRole: "sanitary", preferredPlacement: ["service-wall", "wall"], frontClearance: 0.65, sideClearance: 0.15, wallBacked: true },
  "shower-square": { footprintRole: "sanitary", preferredPlacement: ["corner", "service-wall"], frontClearance: 0.6, sideClearance: 0.05, wallBacked: true },
  "shower-angle": { footprintRole: "sanitary", preferredPlacement: ["corner", "service-wall"], frontClearance: 0.6, sideClearance: 0.05, wallBacked: true },
  "washing-machine": { footprintRole: "appliance", preferredPlacement: ["service-wall", "wall"], frontClearance: 0.7, sideClearance: 0.1, wallBacked: true },
  "floor-lamp": { footprintRole: "lighting", preferredPlacement: ["corner"], frontClearance: 0.25, sideClearance: 0.1 },
  "indoor-plant": { footprintRole: "decor", preferredPlacement: ["corner"], frontClearance: 0.25, sideClearance: 0.1 },
  "small-indoor-plant": { footprintRole: "decor", preferredPlacement: ["corner"], frontClearance: 0.2, sideClearance: 0.05 },
  cactus: { footprintRole: "decor", preferredPlacement: ["corner"], frontClearance: 0.2, sideClearance: 0.05 }
};
function furnitureMetadata(itemId) {
  return FURNITURE_METADATA[itemId] ?? DEFAULT_FURNITURE_METADATA;
}
function getFloorItems() {
  return CATALOG_ITEMS.filter(
    (item) => !item.attachTo || item.attachTo === void 0
  );
}
function bboxForItem(position, dimensions, rotationDeg) {
  return bboxForFurniture(position, dimensions, rotationDeg);
}
function expandBBox(bbox, amount) {
  return expandBBox2D(bbox, amount);
}
function bboxOverlaps(a, b) {
  return bboxOverlaps2D(a, b);
}
function bboxInsideBounds(bbox, bounds, margin = 0) {
  return bboxInsideBounds2D(bbox, bounds, margin);
}
function bboxCornersInsidePolygon(bbox, polygon, margin = 0) {
  return bboxCornersInsidePolygon2D(bbox, polygon, margin);
}
function boundsFromRoomArgs(args) {
  const slabId = args.slabId;
  const { nodes } = use_scene_default.getState();
  if (slabId) {
    const slab = nodes[slabId];
    if (slab?.polygon && slab.polygon.length >= 3) {
      return { slabId, polygon: slab.polygon, bounds: polygonBounds2D(slab.polygon) };
    }
    return null;
  }
  const roomOrigin = args.roomOrigin ?? args.origin;
  const roomWidth = args.roomWidth ?? args.width;
  const roomDepth = args.roomDepth ?? args.depth;
  const wallThickness = args.wallThickness ?? 0.15;
  if (!roomOrigin || !roomWidth || !roomDepth) return null;
  const t = wallThickness / 2;
  const polygon = [
    [roomOrigin[0] + t, roomOrigin[1] + t],
    [roomOrigin[0] + roomWidth - t, roomOrigin[1] + t],
    [roomOrigin[0] + roomWidth - t, roomOrigin[1] + roomDepth - t],
    [roomOrigin[0] + t, roomOrigin[1] + roomDepth - t]
  ];
  return { polygon, bounds: polygonBounds2D(polygon) };
}
function existingFloorItemBBoxes(levelId, extra = []) {
  const boxes = [];
  const { nodes } = use_scene_default.getState();
  for (const node of Object.values(nodes)) {
    if (node.type !== "item") continue;
    if (node.parentId !== levelId && !isChildOfLevel(node, nodes, levelId)) continue;
    const item = node;
    if (item.asset.attachTo === "wall" || item.asset.attachTo === "wall-side" || item.asset.attachTo === "ceiling") continue;
    const dims = item.asset.dimensions ?? [1, 1, 1];
    const rotationDeg = Math.round((item.rotation?.[1] ?? 0) * 180 / Math.PI);
    boxes.push({ ...expandBBox(bboxForItem(item.position, dims, rotationDeg), 0.05), reason: "existing_furniture", nodeId: item.id });
  }
  for (const placement of extra) {
    boxes.push({ ...expandBBox(placement.bbox, 0.05), reason: "planned_furniture" });
  }
  return boxes;
}
function wallsForConstraintModel(levelId) {
  const { nodes } = use_scene_default.getState();
  const walls = [];
  for (const node of Object.values(nodes)) {
    if (node.type !== "wall") continue;
    if (node.parentId !== levelId && !isChildOfLevel(node, nodes, levelId)) continue;
    const wall = node;
    walls.push({ id: wall.id, start: wall.start, end: wall.end, children: [...wall.children ?? []] });
  }
  return walls;
}
function roomConstraintModel(levelId, room, planned = []) {
  const { nodes } = use_scene_default.getState();
  return buildFurnitureConstraintModel({
    polygon: room.polygon,
    bounds: room.bounds,
    walls: wallsForConstraintModel(levelId),
    nodes,
    existingItems: existingFloorItemBBoxes(levelId).map((box) => ({
      id: box.nodeId,
      position: [(box.minX + box.maxX) / 2, 0, (box.minZ + box.maxZ) / 2],
      dimensions: [box.maxX - box.minX, 1, box.maxZ - box.minZ],
      reason: box.reason
    })),
    plannedItems: planned.map((placement) => ({
      position: placement.position,
      dimensions: [placement.bbox.maxX - placement.bbox.minX, 1, placement.bbox.maxZ - placement.bbox.minZ],
      rotationDeg: 0,
      reason: "planned_furniture"
    }))
  });
}
function openingBlockedZones(levelId, room) {
  const model = roomConstraintModel(levelId, room);
  return model.blockedZones.filter((zone) => zone.reason === "door_clearance" || zone.reason === "window_access");
}
function candidateAnchorsForPlacement(bounds, placement) {
  const cx = (bounds.minX + bounds.maxX) / 2;
  const cz = (bounds.minZ + bounds.maxZ) / 2;
  const left = bounds.minX;
  const right = bounds.maxX;
  const south = bounds.minZ;
  const north = bounds.maxZ;
  if (placement === "center") {
    return [
      { x: cx, z: cz, rotation: 0, placement: "center" },
      { x: cx, z: cz, rotation: 90, placement: "center-rotated" }
    ];
  }
  if (placement === "corner") {
    return [
      { x: left, z: south, rotation: 45, placement: "southwest-corner" },
      { x: right, z: south, rotation: 315, placement: "southeast-corner" },
      { x: left, z: north, rotation: 135, placement: "northwest-corner" },
      { x: right, z: north, rotation: 225, placement: "northeast-corner" }
    ];
  }
  return [
    { x: cx, z: south, rotation: 180, placement: "south-wall" },
    { x: cx, z: north, rotation: 0, placement: "north-wall" },
    { x: left, z: cz, rotation: 270, placement: "west-wall" },
    { x: right, z: cz, rotation: 90, placement: "east-wall" }
  ];
}
function shiftCandidateInside(anchor, dims, metadata, bounds) {
  const bboxAtAnchor = bboxForItem([anchor.x, 0, anchor.z], dims, anchor.rotation);
  let x = anchor.x;
  let z2 = anchor.z;
  if (bboxAtAnchor.minX < bounds.minX + metadata.sideClearance) x += bounds.minX + metadata.sideClearance - bboxAtAnchor.minX;
  if (bboxAtAnchor.maxX > bounds.maxX - metadata.sideClearance) x -= bboxAtAnchor.maxX - (bounds.maxX - metadata.sideClearance);
  if (bboxAtAnchor.minZ < bounds.minZ + metadata.sideClearance) z2 += bounds.minZ + metadata.sideClearance - bboxAtAnchor.minZ;
  if (bboxAtAnchor.maxZ > bounds.maxZ - metadata.sideClearance) z2 -= bboxAtAnchor.maxZ - (bounds.maxZ - metadata.sideClearance);
  return [round32(x), 0, round32(z2)];
}
function gridFallbackAnchors(bounds) {
  const anchors = [];
  const cols = 5;
  const rows = 5;
  for (let ix = 1; ix < cols; ix++) {
    for (let iz = 1; iz < rows; iz++) {
      const x = bounds.minX + ix / cols * (bounds.maxX - bounds.minX);
      const z2 = bounds.minZ + iz / rows * (bounds.maxZ - bounds.minZ);
      anchors.push({ x, z: z2, rotation: 0, placement: "grid" });
      anchors.push({ x, z: z2, rotation: 90, placement: "grid-rotated" });
    }
  }
  return anchors;
}
function solveSingleFurniture(itemId, room, roomType, planned, preferredAnchors) {
  const catalogEntry = findCatalogItem(itemId);
  if (!catalogEntry) {
    return { placement: null, rejections: [{ itemId, reasons: [`Unknown item "${itemId}"`] }], blockedZones: [] };
  }
  const dims = catalogEntry.dimensions ?? [1, 1, 1];
  const metadata = furnitureMetadata(itemId);
  const canSitBelowWindow = dims[1] <= 0.75 && ["storage", "table", "seating"].includes(metadata.footprintRole);
  const levelId = getLevelId();
  const constraintModel = roomConstraintModel(levelId, room, planned);
  const blockedZones = constraintModel.blockedZones;
  const anchors = [
    ...preferredAnchors ?? [],
    ...relationshipAnchorsForItem(itemId, roomType, planned),
    ...metadata.preferredPlacement.flatMap((placement) => candidateAnchorsForPlacement(room.bounds, placement)),
    ...gridFallbackAnchors(room.bounds)
  ];
  const rejections = [];
  let best = null;
  for (const anchor of anchors) {
    const position = shiftCandidateInside(anchor, dims, metadata, room.bounds);
    const bbox = bboxForItem(position, dims, anchor.rotation);
    const reasons = [];
    if (!bboxInsideBounds(bbox, room.bounds, 0.02) || !bboxCornersInsidePolygon(bbox, room.polygon, 0.02)) {
      reasons.push("out_of_room_bounds");
    }
    for (const blocked of blockedZones) {
      if (blocked.reason === "window_access" && canSitBelowWindow) continue;
      if (bboxOverlaps(expandBBox(bbox, metadata.sideClearance), blocked)) {
        reasons.push(`blocked_by_${blocked.reason}`);
      }
    }
    const useBBox = expandBBox(bbox, metadata.frontClearance);
    for (const blocked of blockedZones) {
      if (blocked.reason === "window_access" && canSitBelowWindow) continue;
      if (bboxOverlaps(useBBox, blocked)) {
        reasons.push(`use_clearance_conflict_${blocked.reason}`);
      }
    }
    if (metadata.wallBacked && anchor.placement.includes("grid")) {
      reasons.push("requires_wall_backing");
    }
    const pathBlocked = constraintModel.clearPathCandidates.some((path2) => bboxOverlaps(expandBBox(bbox, 0.05), path2));
    const isHeavyPathBlocker = ["sleeping", "storage", "appliance", "sanitary"].includes(metadata.footprintRole) && !["sofa", "lounge-chair", "livingroom-chair", "tv-stand"].includes(itemId);
    if (pathBlocked && isHeavyPathBlocker) {
      reasons.push("blocks_main_path");
    }
    if (reasons.length > 0) {
      rejections.push({ itemId, position, rotation: anchor.rotation, reasons: Array.from(new Set(reasons)) });
      continue;
    }
    const relationship = scoreFurnitureRelationship(itemId, roomType, { position, rotation: anchor.rotation, bbox, placement: anchor.placement }, planned);
    const centerBias = 1 - (Math.abs(position[0] - (room.bounds.minX + room.bounds.maxX) / 2) + Math.abs(position[2] - (room.bounds.minZ + room.bounds.maxZ) / 2)) / Math.max(0.01, room.bounds.maxX - room.bounds.minX + (room.bounds.maxZ - room.bounds.minZ));
    const wallBonus = metadata.wallBacked && !anchor.placement.includes("grid") ? 0.4 : 0;
    const roleBonus = roomType === "living" && itemId === "sofa" && anchor.placement.includes("north") ? 0.2 : 0;
    const clearanceScore = Math.max(0, 1 - blockedZones.filter((blocked) => bboxOverlaps(expandBBox(bbox, metadata.frontClearance), expandBBox(blocked, 0.1))).length * 0.2);
    const pathScore = pathBlocked ? 0.35 : 1;
    const score = round32(centerBias + wallBonus + roleBonus + clearanceScore + relationship.score + pathScore);
    const candidate = {
      itemId,
      position,
      rotation: anchor.rotation,
      bbox,
      score,
      clearanceScore: round32(clearanceScore),
      relationshipScore: round32(relationship.score),
      pathScore: round32(pathScore),
      finalScore: score,
      placement: anchor.placement,
      reasons: relationship.reasons
    };
    if (!best || candidate.score > best.score) best = candidate;
  }
  return { placement: best, rejections, blockedZones };
}
function scoreFurnitureRelationship(itemId, roomType, candidate, planned) {
  const reasons = [];
  let score = 0;
  const cx = candidate.position[0];
  const cz = candidate.position[2];
  const plannedById = (id) => planned.find((p) => p.itemId === id);
  const wallPlaced = !candidate.placement.includes("grid") && candidate.placement !== "center" && candidate.placement !== "center-rotated";
  if (["bedroom", "guest", "kids"].includes(roomType)) {
    if (["double-bed", "single-bed", "bunkbed"].includes(itemId) && wallPlaced) {
      score += 0.7;
      reasons.push("bed_head_against_wall");
    }
    if (itemId === "bedside-table") {
      const bed = planned.find((p) => ["double-bed", "single-bed", "bunkbed"].includes(p.itemId));
      if (bed) {
        const dist = Math.sqrt((bed.position[0] - cx) ** 2 + (bed.position[2] - cz) ** 2);
        if (dist <= 1.8) {
          score += 0.8;
          reasons.push("bedside_table_near_bed");
        } else {
          reasons.push("bedside_table_far_from_bed");
        }
      }
    }
    if (["closet", "dresser"].includes(itemId) && wallPlaced) {
      score += 0.5;
      reasons.push("storage_wall_backed");
    }
  }
  if (roomType === "living") {
    const tv = plannedById("tv-stand");
    const sofa = plannedById("sofa");
    if (itemId === "tv-stand" && wallPlaced) {
      score += 0.8;
      reasons.push("tv_stand_wall_backed");
    }
    if (itemId === "sofa") {
      if (wallPlaced) score += 0.4;
      if (tv) {
        const alignedX = Math.abs(cx - tv.position[0]) < 1.4;
        const separatedZ = Math.abs(cz - tv.position[2]) > 1.6;
        if (alignedX && separatedZ) {
          score += 0.9;
          reasons.push("sofa_faces_tv_zone");
        } else {
          reasons.push("sofa_tv_alignment_weak");
        }
      }
    }
    if (itemId === "coffee-table" && tv && sofa) {
      const betweenZ = cz > Math.min(tv.position[2], sofa.position[2]) && cz < Math.max(tv.position[2], sofa.position[2]);
      const alignedX = Math.abs(cx - (tv.position[0] + sofa.position[0]) / 2) < 1.2;
      if (betweenZ && alignedX) {
        score += 1;
        reasons.push("coffee_table_between_sofa_tv");
      } else {
        reasons.push("coffee_table_relationship_weak");
      }
    }
  }
  if (["kitchen", "bathroom", "laundry"].includes(roomType)) {
    if (wallPlaced) {
      score += 0.7;
      reasons.push("service_furniture_wall_backed");
    }
  }
  if (roomType === "dining" && itemId === "dining-table" && candidate.placement.includes("center")) {
    score += 0.7;
    reasons.push("dining_table_centered");
  }
  return { score, reasons };
}
function relationshipAnchorsForItem(itemId, roomType, planned) {
  if (roomType === "living" && itemId === "coffee-table") {
    const tv = planned.find((p) => p.itemId === "tv-stand");
    const sofa = planned.find((p) => p.itemId === "sofa");
    if (tv && sofa) {
      const x = (tv.position[0] + sofa.position[0]) / 2;
      const z2 = (tv.position[2] + sofa.position[2]) / 2;
      return [
        { x, z: z2, rotation: 0, placement: "between-sofa-tv" },
        { x, z: z2, rotation: 90, placement: "between-sofa-tv-rotated" }
      ];
    }
  }
  if (["bedroom", "guest", "kids"].includes(roomType) && itemId === "bedside-table") {
    const bed = planned.find((p) => ["double-bed", "single-bed", "bunkbed"].includes(p.itemId));
    if (bed) {
      const sideOffset = (bed.bbox.maxX - bed.bbox.minX) / 2 + 0.35;
      return [
        { x: bed.position[0] - sideOffset, z: bed.position[2], rotation: bed.rotation, placement: "beside-bed-left" },
        { x: bed.position[0] + sideOffset, z: bed.position[2], rotation: bed.rotation, placement: "beside-bed-right" }
      ];
    }
  }
  return [];
}
function defaultFurnitureForRoom(roomType) {
  if (roomType === "bedroom") return ["double-bed", "bedside-table", "closet"];
  if (roomType === "living") return ["tv-stand", "sofa", "coffee-table"];
  if (roomType === "kitchen") return ["kitchen-counter", "fridge", "stove"];
  if (roomType === "bathroom") return ["toilet", "bathroom-sink", "shower-square"];
  if (roomType === "dining") return ["dining-table", "dining-chair", "dining-chair"];
  if (roomType === "office") return ["office-table", "office-chair", "bookshelf"];
  return ["sofa", "coffee-table"];
}
function solveFurnitureLayout(args) {
  const room = boundsFromRoomArgs(args);
  const roomType = (args.roomType ?? "living").toLowerCase();
  if (!room) {
    return {
      success: false,
      roomType,
      roomBounds: { minX: 0, minZ: 0, maxX: 0, maxZ: 0 },
      availableFurnitureZones: [],
      blockedZones: [],
      constraintSummary: {
        usableArea: 0,
        blockedArea: 0,
        blockedZones: [],
        clearPathCandidates: [],
        constraintFailures: ["room_bounds_unresolved"]
      },
      relationshipSummary: { rules: relationshipRulesForRoom(roomType), failures: ["room_bounds_unresolved"] },
      substitutions: [],
      recommendedNextAction: "Resolve the room slab or bounds before solving furniture.",
      placements: [],
      rejections: [{ itemId: "room", reasons: ["room bounds unresolved; provide slabId or roomOrigin/roomWidth/roomDepth"] }],
      suggestedNextTools: ["get_scene_info", "suggest_furniture_layout"]
    };
  }
  const requested = args.items;
  const itemIds = Array.isArray(requested) && requested.length > 0 ? requested.map((item) => typeof item === "string" ? item : isRecordLike(item) ? String(item.type ?? item.itemId ?? "") : "").filter(Boolean) : defaultFurnitureForRoom(roomType);
  const placements = [];
  const rejections = [];
  const substitutions = [];
  let constraintModel = roomConstraintModel(getLevelId(), room, placements);
  for (const itemId of itemIds) {
    let solve = solveSingleFurniture(itemId, room, roomType, placements);
    if (!solve.placement && SMALL_ROOM_SUBSTITUTIONS[itemId]) {
      solve = solveSingleFurniture(SMALL_ROOM_SUBSTITUTIONS[itemId], room, roomType, placements);
      if (solve.placement) {
        substitutions.push({ requested: itemId, used: SMALL_ROOM_SUBSTITUTIONS[itemId], reason: "requested_item_infeasible" });
        rejections.push({ itemId, reasons: [`substituted_with_${SMALL_ROOM_SUBSTITUTIONS[itemId]}`] });
      }
    }
    if (solve.placement) placements.push(solve.placement);
    else rejections.push(...solve.rejections.slice(0, 6));
    constraintModel = roomConstraintModel(getLevelId(), room, placements);
  }
  const relationshipSummary = summarizeFurnitureRelationships(roomType, placements);
  const criticalItemMissing = missingCriticalFurniture(roomType, itemIds, placements, substitutions);
  const success2 = placements.length > 0 && criticalItemMissing.length === 0;
  return {
    success: success2,
    roomType,
    slabId: room.slabId,
    roomBounds: room.bounds,
    availableFurnitureZones: [constraintModel.usableBounds],
    blockedZones: constraintModel.blockedZones,
    constraintSummary: {
      ...constraintModel.constraintSummary,
      constraintFailures: [
        ...constraintModel.constraintSummary.constraintFailures,
        ...relationshipSummary.failures,
        ...criticalItemMissing.map((itemId) => `missing_critical_${itemId}`)
      ]
    },
    relationshipSummary,
    substitutions,
    recommendedNextAction: success2 ? "Create the solved placements, then validate the scene." : "Review rejection reasons or reduce required furniture before creating nodes.",
    placements,
    rejections,
    suggestedNextTools: success2 ? ["place_furniture_solved", "validate_scene"] : ["suggest_furniture_layout", "create_room"]
  };
}
function relationshipRulesForRoom(roomType) {
  if (["bedroom", "guest", "kids"].includes(roomType)) return ["bed_head_against_wall", "bedside_table_near_bed", "storage_wall_backed"];
  if (roomType === "living") return ["tv_stand_wall_backed", "sofa_faces_tv_zone", "coffee_table_between_sofa_tv"];
  if (roomType === "dining") return ["dining_table_centered"];
  if (["kitchen", "bathroom", "laundry"].includes(roomType)) return ["service_furniture_wall_backed", "front_use_clearance"];
  return [];
}
function summarizeFurnitureRelationships(roomType, placements) {
  const rules = relationshipRulesForRoom(roomType);
  const reasons = new Set(placements.flatMap((placement) => placement.reasons));
  const placedIds = new Set(placements.map((placement) => placement.itemId));
  const failures = rules.filter((rule) => {
    if (rule === "coffee_table_between_sofa_tv" && !placedIds.has("coffee-table")) return false;
    if (rule === "bedside_table_near_bed" && !placedIds.has("bedside-table")) return false;
    return !reasons.has(rule);
  });
  return { rules, failures };
}
function missingCriticalFurniture(roomType, requested, placements, substitutions) {
  const placed = new Set(placements.map((placement) => placement.itemId));
  const substituted = new Set(substitutions.map((substitution) => substitution.requested));
  const criticalByRoom = {
    bedroom: ["double-bed", "single-bed", "bunkbed"],
    guest: ["double-bed", "single-bed", "bunkbed"],
    kids: ["single-bed", "bunkbed"],
    living: ["sofa", "tv-stand"],
    kitchen: ["kitchen-counter", "kitchen-cabinet"],
    bathroom: ["toilet"],
    dining: ["dining-table"]
  };
  const groups = criticalByRoom[roomType] ? [criticalByRoom[roomType]] : [];
  const missing = [];
  for (const group of groups) {
    const requestedInGroup = requested.filter((itemId) => group.includes(itemId));
    if (requestedInGroup.length === 0) continue;
    const satisfied = group.some((itemId) => placed.has(itemId)) || requestedInGroup.some((itemId) => substituted.has(itemId));
    if (!satisfied) missing.push(requestedInGroup[0]);
  }
  return missing;
}
function suggestFurnitureLayout(args) {
  const result = solveFurnitureLayout(args);
  return JSON.stringify(result);
}
function placeFurnitureSolved(args) {
  const solve = solveFurnitureLayout(args);
  if (solve.placements.length === 0) {
    return JSON.stringify({
      ...solve,
      success: false,
      error: "No feasible furniture placements found"
    });
  }
  const created = [];
  for (const placement of solve.placements) {
    const result = JSON.parse(placeFurniture({
      type: placement.itemId,
      position: placement.position,
      rotation: placement.rotation
    }));
    created.push(result);
  }
  return JSON.stringify({
    ...solve,
    success: created.length > 0,
    created,
    createdNodeIds: compactIds(created.map((result) => isRecordLike(result) ? result.itemId : void 0)),
    createdByType: { item: compactIds(created.map((result) => isRecordLike(result) ? result.itemId : void 0)) },
    suggestedNextTools: ["validate_scene", "suggest_furniture_layout"]
  });
}
function placeFurniture(args) {
  const levelId = getLevelId();
  const itemId = args.type;
  const position = args.position ?? [0, 0, 0];
  const rotationDeg = args.rotation ?? 0;
  const rotationRad = rotationDeg * Math.PI / 180;
  const catalogEntry = itemId ? findCatalogItem(itemId) : null;
  if (!catalogEntry) {
    const floorItems = getFloorItems();
    const available = floorItems.map((i) => i.id).join(", ");
    return JSON.stringify({
      error: `Unknown item "${itemId}". Available floor items: ${available}`
    });
  }
  const item = ItemNode.parse({
    position,
    rotation: [0, rotationRad, 0],
    asset: catalogEntry
  });
  use_scene_default.getState().createNode(item, levelId);
  const dims = catalogEntry.dimensions ?? [1, 1, 1];
  const rot = (rotationDeg % 360 + 360) % 360;
  const isRotated = rot === 90 || rot === 270;
  const worldW = isRotated ? dims[2] : dims[0];
  const worldD = isRotated ? dims[0] : dims[2];
  const bbox = {
    minX: round32(position[0] - worldW / 2),
    minZ: round32(position[2] - worldD / 2),
    maxX: round32(position[0] + worldW / 2),
    maxZ: round32(position[2] + worldD / 2)
  };
  let insideRoom = null;
  const { nodes } = use_scene_default.getState();
  for (const node of Object.values(nodes)) {
    if (node.type === "slab") {
      const slab = node;
      if (slab.polygon && pointInPolygonSimple(position[0], position[2], slab.polygon)) {
        insideRoom = slab.id;
        break;
      }
    }
  }
  const collisions = [];
  for (const node of Object.values(nodes)) {
    const n = node;
    if (n.type !== "item" || n.id === item.id) continue;
    if (!n.position || !n.asset?.dimensions) continue;
    const oDims = n.asset.dimensions;
    const oRotRad = n.rotation?.[1] ?? 0;
    const oRotDeg = (Math.round(oRotRad * 180 / Math.PI) % 360 + 360) % 360;
    const oIsRot = oRotDeg === 90 || oRotDeg === 270;
    const oW = oIsRot ? oDims[2] : oDims[0];
    const oD = oIsRot ? oDims[0] : oDims[2];
    const oBbox = {
      minX: n.position[0] - oW / 2,
      minZ: n.position[2] - oD / 2,
      maxX: n.position[0] + oW / 2,
      maxZ: n.position[2] + oD / 2
    };
    const overlapX = Math.max(0, Math.min(bbox.maxX, oBbox.maxX) - Math.max(bbox.minX, oBbox.minX));
    const overlapZ = Math.max(0, Math.min(bbox.maxZ, oBbox.maxZ) - Math.max(bbox.minZ, oBbox.minZ));
    const overlapArea = round32(overlapX * overlapZ);
    if (overlapArea > 0.01) {
      collisions.push({ itemId: n.id, name: n.asset.name ?? n.asset.id ?? "unknown", overlapArea });
    }
  }
  const warnings = [];
  if (!insideRoom) warnings.push("\u26A0\uFE0F Item center is NOT inside any room slab!");
  if (collisions.length > 0) warnings.push(`\u26A0\uFE0F Overlaps with ${collisions.length} item(s): ${collisions.map((c) => c.name).join(", ")}`);
  return JSON.stringify({
    success: true,
    itemId: item.id,
    name: catalogEntry.name,
    catalogId: catalogEntry.id,
    dimensions: catalogEntry.dimensions,
    position,
    bbox,
    insideSlabId: insideRoom,
    collisions: collisions.length > 0 ? collisions : void 0,
    warning: warnings.length > 0 ? warnings.join(" | ") : void 0,
    createdNodeIds: [item.id],
    createdByType: { item: [item.id] },
    spatialContext: {
      bbox,
      insideSlabId: insideRoom,
      collisions
    },
    usableBounds: bbox,
    suggestedNextTools: warnings.length > 0 ? ["move_nodes", "validate_scene"] : ["validate_scene", "place_in_room", "place_against_wall"]
  });
}
function pointInPolygonSimple(x, z2, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], zi = polygon[i][1];
    const xj = polygon[j][0], zj = polygon[j][1];
    if (zi > z2 !== zj > z2 && x < (xj - xi) * (z2 - zi) / (zj - zi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}
function placeInRoom(args) {
  const itemType = args.type;
  const anchor = args.anchor ?? "center";
  const orientation = args.orientation ?? "auto";
  const offsetFromWall = args.offsetFromWall ?? 0.05;
  const roomOrigin = args.roomOrigin;
  const roomWidth = args.roomWidth;
  const roomDepth = args.roomDepth;
  const slabId = args.slabId;
  const wallThickness = args.wallThickness ?? 0.15;
  const catalogEntry = itemType ? findCatalogItem(itemType) : null;
  if (!catalogEntry) {
    const floorItems = getFloorItems();
    return JSON.stringify({
      error: `Unknown item "${itemType}". Available: ${floorItems.map((i) => i.id).join(", ")}`
    });
  }
  let minX, minZ, maxX, maxZ;
  if (roomOrigin && roomWidth && roomDepth) {
    const halfT = wallThickness / 2;
    minX = roomOrigin[0] + halfT;
    minZ = roomOrigin[1] + halfT;
    maxX = roomOrigin[0] + roomWidth - halfT;
    maxZ = roomOrigin[1] + roomDepth - halfT;
  } else if (slabId) {
    const slab = use_scene_default.getState().nodes[slabId];
    if (!slab?.polygon) return JSON.stringify({ error: `Slab ${slabId} not found or has no polygon` });
    minX = Math.min(...slab.polygon.map((p) => p[0]));
    minZ = Math.min(...slab.polygon.map((p) => p[1]));
    maxX = Math.max(...slab.polygon.map((p) => p[0]));
    maxZ = Math.max(...slab.polygon.map((p) => p[1]));
  } else {
    return JSON.stringify({
      error: "Must provide either (roomOrigin + roomWidth + roomDepth) or slabId to define the room bounds."
    });
  }
  const dims = catalogEntry.dimensions ?? [1, 1, 1];
  const gap = offsetFromWall;
  let dx = 0.5;
  let dz = 0.5;
  if (anchor.includes("north")) dz = 1;
  if (anchor.includes("south")) dz = 0;
  if (anchor.includes("east")) dx = 1;
  if (anchor.includes("west")) dx = 0;
  if (anchor === "center") {
    dx = 0.5;
    dz = 0.5;
  }
  let rotDeg = 0;
  if (orientation === "auto") {
    if (anchor.includes("north")) rotDeg = 180;
    else if (anchor.includes("south")) rotDeg = 0;
    else if (anchor.includes("east")) rotDeg = 270;
    else if (anchor.includes("west")) rotDeg = 90;
  } else if (orientation === "facing-north" || orientation === "north") {
    rotDeg = 180;
  } else if (orientation === "facing-south" || orientation === "south") {
    rotDeg = 0;
  } else if (orientation === "facing-east" || orientation === "east") {
    rotDeg = 270;
  } else if (orientation === "facing-west" || orientation === "west") {
    rotDeg = 90;
  } else {
    rotDeg = Number(orientation) || 0;
  }
  const rot = (rotDeg % 360 + 360) % 360;
  const isRotated = rot === 90 || rot === 270;
  const fw = isRotated ? dims[2] : dims[0];
  const fd = isRotated ? dims[0] : dims[2];
  const minCX = minX + fw / 2 + gap;
  const maxCX = maxX - fw / 2 - gap;
  const minCZ = minZ + fd / 2 + gap;
  const maxCZ = maxZ - fd / 2 - gap;
  let x, z2;
  if (maxCX <= minCX) x = (minX + maxX) / 2;
  else x = minCX + dx * (maxCX - minCX);
  if (maxCZ <= minCZ) z2 = (minZ + maxZ) / 2;
  else z2 = minCZ + dz * (maxCZ - minCZ);
  const targetPosition = [round32(x), 0, round32(z2)];
  const room = boundsFromRoomArgs({
    ...args,
    ...slabId ? { slabId } : {},
    ...roomOrigin && roomWidth && roomDepth ? { roomOrigin, roomWidth, roomDepth, wallThickness } : {}
  });
  if (room) {
    const solved = solveSingleFurniture(itemType, room, String(args.roomType ?? "living"), [], [{
      x: targetPosition[0],
      z: targetPosition[2],
      rotation: rotDeg,
      placement: `requested-${anchor}`
    }]);
    if (solved.placement) {
      const result = JSON.parse(placeFurniture({
        type: itemType,
        position: solved.placement.position,
        rotation: solved.placement.rotation
      }));
      return JSON.stringify({
        ...result,
        solverAdjusted: solved.placement.position[0] !== targetPosition[0] || solved.placement.position[2] !== targetPosition[2] || solved.placement.rotation !== rotDeg,
        requestedPosition: targetPosition,
        solverPlacement: solved.placement,
        rejections: solved.rejections.slice(0, 5)
      });
    }
    return JSON.stringify({
      success: false,
      error: "Requested semantic furniture position is not feasible",
      requestedPosition: targetPosition,
      rejections: solved.rejections.slice(0, 8),
      suggestedNextTools: ["suggest_furniture_layout", "place_furniture_solved"]
    });
  }
  return placeFurniture({
    type: itemType,
    position: targetPosition,
    rotation: rotDeg
  });
}
function placeAgainstWall(args) {
  const itemType = args.type;
  const wallId = args.wallId;
  const positionT = args.position_t ?? 0.5;
  const offsetFromWall = args.offsetFromWall ?? 0.05;
  const facing = args.facing ?? "toward-wall";
  if (!wallId) return JSON.stringify({ error: "wallId is required" });
  const catalogEntry = itemType ? findCatalogItem(itemType) : null;
  if (!catalogEntry) {
    const floorItems = getFloorItems();
    return JSON.stringify({
      error: `Unknown item "${itemType}". Available: ${floorItems.map((i) => i.id).join(", ")}`
    });
  }
  const wall = use_scene_default.getState().nodes[wallId];
  if (!wall || wall.type !== "wall") {
    return JSON.stringify({ error: `Wall ${wallId} not found or is not a wall` });
  }
  const wdx = wall.end[0] - wall.start[0];
  const wdz = wall.end[1] - wall.start[1];
  const wallLen = Math.sqrt(wdx * wdx + wdz * wdz);
  if (wallLen < 0.01) return JSON.stringify({ error: "Wall has zero length" });
  const dirX = wdx / wallLen;
  const dirZ = wdz / wallLen;
  const normX = -dirZ;
  const normZ = dirX;
  const alongX = wall.start[0] + positionT * wdx;
  const alongZ = wall.start[1] + positionT * wdz;
  const wallAngleDeg = Math.atan2(-wdx, -wdz) * 180 / Math.PI;
  const dims = catalogEntry.dimensions ?? [1, 1, 1];
  const halfT = (wall.thickness ?? 0.15) / 2;
  let rotDeg;
  let perpDist;
  if (facing === "toward-wall" || facing === "facing-wall") {
    rotDeg = ((wallAngleDeg + 180) % 360 + 360) % 360;
    const rot = (rotDeg % 360 + 360) % 360;
    const isRot = rot === 90 || rot === 270;
    const fd = isRot ? dims[0] : dims[2];
    perpDist = halfT + fd / 2 + offsetFromWall;
  } else {
    rotDeg = (wallAngleDeg % 360 + 360) % 360;
    const rot = (rotDeg % 360 + 360) % 360;
    const isRot = rot === 90 || rot === 270;
    const fd = isRot ? dims[0] : dims[2];
    perpDist = halfT + fd / 2 + offsetFromWall;
  }
  const x = round32(alongX + normX * perpDist);
  const z2 = round32(alongZ + normZ * perpDist);
  const targetPosition = [x, 0, z2];
  const room = boundsFromRoomArgs(args);
  if (room) {
    const solved = solveSingleFurniture(itemType, room, String(args.roomType ?? "living"), [], [{
      x,
      z: z2,
      rotation: Math.round(rotDeg),
      placement: `requested-wall-${wallId}`
    }]);
    if (solved.placement) {
      const result = JSON.parse(placeFurniture({
        type: itemType,
        position: solved.placement.position,
        rotation: solved.placement.rotation
      }));
      return JSON.stringify({
        ...result,
        solverAdjusted: solved.placement.position[0] !== targetPosition[0] || solved.placement.position[2] !== targetPosition[2] || solved.placement.rotation !== Math.round(rotDeg),
        requestedPosition: targetPosition,
        solverPlacement: solved.placement,
        rejections: solved.rejections.slice(0, 5)
      });
    }
    return JSON.stringify({
      success: false,
      error: "Requested wall furniture position is not feasible",
      requestedPosition: targetPosition,
      rejections: solved.rejections.slice(0, 8),
      suggestedNextTools: ["suggest_furniture_layout", "place_furniture_solved"]
    });
  }
  return placeFurniture({ type: itemType, position: targetPosition, rotation: Math.round(rotDeg) });
}
var ROOM_FURNITURE_PRESETS = {
  bedroom: [
    // Bed: head against back (north) wall, centered X
    { type: "double-bed", dx: 0.5, dz: 1, rotation: 0 },
    // Bedside table: left side of bed, near back wall
    { type: "bedside-table", dx: 0.05, dz: 0.9, rotation: 0 },
    // Closet: against left (west) wall, near front
    { type: "closet", dx: 0, dz: 0, rotation: 0 },
    // Floor lamp: right rear corner
    { type: "floor-lamp", dx: 0.95, dz: 0.9, rotation: 0 }
  ],
  living: [
    // TV stand: against front (south) wall, centered
    { type: "tv-stand", dx: 0.5, dz: 0, rotation: 0 },
    // Sofa: facing TV, in back half of room
    { type: "sofa", dx: 0.5, dz: 0.75, rotation: 180 },
    // Coffee table: between TV and sofa
    { type: "coffee-table", dx: 0.5, dz: 0.45, rotation: 0 },
    // Floor lamp: left rear corner
    { type: "floor-lamp", dx: 0.05, dz: 0.9, rotation: 0 }
  ],
  kitchen: [
    // Kitchen counter: against back (north) wall
    { type: "kitchen-counter", dx: 0.5, dz: 1, rotation: 180 },
    // Fridge: left side against back wall
    { type: "fridge", dx: 0, dz: 1, rotation: 180 },
    // Stove: right side against back wall
    { type: "stove", dx: 1, dz: 1, rotation: 180 }
  ],
  bathroom: [
    // Toilet: against back (north) wall, left side
    { type: "toilet", dx: 0.2, dz: 1, rotation: 180 },
    // Sink: against back wall, right side
    { type: "bathroom-sink", dx: 0.75, dz: 1, rotation: 180 },
    // Washing machine: against left (west) wall, near front
    { type: "washing-machine", dx: 0, dz: 0, rotation: 0 }
  ],
  dining: [
    // Dining table: centered in room
    { type: "dining-table", dx: 0.5, dz: 0.5, rotation: 0 },
    // 4 chairs around table
    { type: "dining-chair", dx: 0.25, dz: 0.3, rotation: 0 },
    { type: "dining-chair", dx: 0.75, dz: 0.3, rotation: 0 },
    { type: "dining-chair", dx: 0.25, dz: 0.7, rotation: 180 },
    { type: "dining-chair", dx: 0.75, dz: 0.7, rotation: 180 }
  ],
  office: [
    // Desk: against back (north) wall, centered
    { type: "office-table", dx: 0.5, dz: 1, rotation: 180 },
    // Chair: in front of desk
    { type: "office-chair", dx: 0.5, dz: 0.6, rotation: 0 },
    // Bookshelf: against left (west) wall
    { type: "bookshelf", dx: 0, dz: 0.5, rotation: 0 }
  ],
  entryway: [
    // Coat rack: near the entrance (south wall)
    { type: "coat-rack", dx: 0.1, dz: 0, rotation: 0 },
    // Shoe shelf: against left wall
    { type: "shelf", dx: 0, dz: 0.5, rotation: 0 },
    // Small plant: right side
    { type: "small-indoor-plant", dx: 0.9, dz: 0, rotation: 0 }
  ],
  balcony: [
    // Indoor plant: left corner
    { type: "indoor-plant", dx: 0.1, dz: 0.9, rotation: 0 },
    // Small plant: right corner
    { type: "small-indoor-plant", dx: 0.9, dz: 0.9, rotation: 0 },
    // Lounge chair: centered
    { type: "lounge-chair", dx: 0.5, dz: 0.4, rotation: 0 }
  ],
  kids: [
    // Single bed: head against north wall
    { type: "single-bed", dx: 0.5, dz: 1, rotation: 0 },
    // Toy: on the floor, center-left
    { type: "toy", dx: 0.3, dz: 0.4, rotation: 0 },
    // Dresser: against west wall
    { type: "dresser", dx: 0, dz: 0.3, rotation: 0 },
    // Bookshelf: against east wall
    { type: "bookshelf", dx: 1, dz: 0.5, rotation: 0 }
  ],
  laundry: [
    // Washing machine: back wall, left
    { type: "washing-machine", dx: 0.2, dz: 1, rotation: 180 },
    // Ironing board: center
    { type: "ironing-board", dx: 0.5, dz: 0.4, rotation: 0 },
    // Drying rack: back wall, right
    { type: "drying-rack", dx: 0.8, dz: 1, rotation: 180 }
  ],
  gym: [
    // Treadmill: against back wall, centered
    { type: "threadmill", dx: 0.5, dz: 0.9, rotation: 180 },
    // Barbell stand: left side
    { type: "barbell-stand", dx: 0.1, dz: 0.3, rotation: 0 }
  ],
  guest: [
    // Single bed: head against north wall, centered
    { type: "single-bed", dx: 0.5, dz: 1, rotation: 0 },
    // Bedside table: right side of bed
    { type: "bedside-table", dx: 0.9, dz: 0.9, rotation: 0 },
    // Floor lamp: left corner
    { type: "floor-lamp", dx: 0.05, dz: 0.9, rotation: 0 }
  ]
};
var SMALL_ROOM_SUBSTITUTIONS = {
  "double-bed": "single-bed",
  "sofa": "lounge-chair",
  "bathtub": "shower-square",
  "bathroom-sink": "toilet",
  // skip sink if too small
  "dining-table": "coffee-table",
  "coffee-table": "stool",
  "kitchen-counter": "kitchen-cabinet",
  "closet": "dresser",
  "bookshelf": "shelf",
  "indoor-plant": "small-indoor-plant",
  "ironing-board": "laundry-bag"
};
function furnishRoom(args) {
  const roomType = args.roomType ?? "living";
  const origin = args.origin ?? [0, 0];
  const width = args.width ?? 5;
  const depth = args.depth ?? 4;
  const wallThickness = args.wallThickness ?? 0.15;
  const items = args.items ?? defaultFurnitureForRoom(roomType);
  const solved = JSON.parse(placeFurnitureSolved({
    ...args,
    roomType,
    items,
    roomOrigin: origin,
    roomWidth: width,
    roomDepth: depth,
    wallThickness
  }));
  const halfT = wallThickness / 2;
  const gap = 0.05;
  const roomSpatial = {
    roomBounds: {
      minX: round32(origin[0]),
      minZ: round32(origin[1]),
      maxX: round32(origin[0] + width),
      maxZ: round32(origin[1] + depth)
    },
    interiorBounds: {
      minX: round32(origin[0] + halfT + gap),
      minZ: round32(origin[1] + halfT + gap),
      maxX: round32(origin[0] + width - halfT - gap),
      maxZ: round32(origin[1] + depth - halfT - gap)
    }
  };
  return JSON.stringify({
    success: Boolean(solved.success),
    roomType,
    itemsPlaced: Array.isArray(solved.created) ? solved.created.length : 0,
    items: solved.created ?? [],
    solver: {
      placements: solved.placements ?? [],
      rejections: solved.rejections ?? [],
      blockedZones: solved.blockedZones ?? []
    },
    roomSpatial,
    suggestedNextTools: ["validate_scene", "suggest_furniture_layout"]
  });
}
function createHallway(args) {
  const from = args.from ?? [0, 0];
  const to = args.to ?? [0, 4];
  const hallwayWidth = args.width ?? 1.2;
  const wallHeight = args.wallHeight;
  const wallThickness = args.wallThickness;
  const addSlab = args.addSlab ?? true;
  const dx = to[0] - from[0];
  const dz = to[1] - from[1];
  const length = Math.sqrt(dx * dx + dz * dz);
  if (length < 0.1) {
    return JSON.stringify({ error: '"from" and "to" must be different points' });
  }
  const nx = -dz / length * (hallwayWidth / 2);
  const nz = dx / length * (hallwayWidth / 2);
  const p1 = [from[0] + nx, from[1] + nz];
  const p2 = [from[0] - nx, from[1] - nz];
  const p3 = [to[0] - nx, to[1] - nz];
  const p4 = [to[0] + nx, to[1] + nz];
  const wallDefs = [
    { start: p1, end: p4 },
    // left wall
    { start: p3, end: p2 }
    // right wall
  ];
  const wallArgs = {
    walls: wallDefs.map((w) => ({
      ...w,
      ...wallHeight != null ? { height: wallHeight } : {},
      ...wallThickness != null ? { thickness: wallThickness } : {}
    }))
  };
  const wallResult = JSON.parse(createWalls(wallArgs));
  const results = {
    success: true,
    walls: wallResult,
    length: Math.round(length * 100) / 100,
    width: hallwayWidth
  };
  if (addSlab) {
    const slabResult = JSON.parse(createSlab({ polygon: [p1, p4, p3, p2] }));
    results.slab = slabResult;
  }
  return JSON.stringify(results);
}
function listFurniture() {
  const floorItems = getFloorItems();
  const catalog = {};
  for (const item of floorItems) {
    const d = item.dimensions ?? [0, 0, 0];
    catalog[item.id] = {
      name: item.name,
      category: item.category,
      dimensions: `${d[0]}\xD7${d[1]}\xD7${d[2]}m`
    };
  }
  return JSON.stringify({ catalog });
}
function createBuildingShell(args) {
  const width = args.width ?? 10;
  const depth = args.depth ?? 8;
  const origin = args.origin ?? [0, 0];
  const wallHeight = args.wallHeight ?? 2.8;
  const wallThickness = args.wallThickness ?? 0.15;
  const addRoof = args.addRoof ?? true;
  const roofType = args.roofType ?? "gable";
  const ceilingHeight = args.ceilingHeight ?? wallHeight - 0.3;
  const roomResult = JSON.parse(
    createRoom({
      origin,
      width,
      depth,
      wallHeight,
      wallThickness,
      addDoor: true,
      doorWall: "front",
      addWindows: true,
      addCeiling: true,
      ceilingHeight
    })
  );
  const results = {
    success: true,
    ...roomResult
  };
  if (addRoof) {
    const [ox, oz] = origin;
    const roofResult = JSON.parse(
      createRoof({
        position: [ox + width / 2, wallHeight, oz + depth / 2],
        roofType,
        width: width + 0.6,
        // overhang
        depth: depth + 0.6,
        wallHeight: 0.5,
        roofHeight: 2,
        overhang: 0.3
      })
    );
    results.roof = roofResult;
  }
  return JSON.stringify(results);
}
function createFurnishedApartment(args) {
  const origin = args.origin ?? [0, 0];
  const rooms = args.rooms;
  const wallHeight = args.wallHeight;
  const wallThickness = args.wallThickness ?? 0.15;
  const maxRowWidth = args.maxRowWidth ?? 20;
  if (!rooms || !Array.isArray(rooms) || rooms.length === 0) {
    return JSON.stringify({ error: "rooms array is required" });
  }
  const nameToRoomType = {
    \u5BA2\u5385: "living",
    \u8D77\u5C45\u5BA4: "living",
    living: "living",
    \u5367\u5BA4: "bedroom",
    \u4E3B\u5367: "bedroom",
    \u6B21\u5367: "bedroom",
    bedroom: "bedroom",
    \u53A8\u623F: "kitchen",
    kitchen: "kitchen",
    \u536B\u751F\u95F4: "bathroom",
    \u6D74\u5BA4: "bathroom",
    \u6D17\u624B\u95F4: "bathroom",
    bathroom: "bathroom",
    \u9910\u5385: "dining",
    dining: "dining",
    \u4E66\u623F: "office",
    \u529E\u516C\u5BA4: "office",
    office: "office",
    \u7384\u5173: "entryway",
    \u95E8\u5385: "entryway",
    entryway: "entryway",
    \u9633\u53F0: "balcony",
    \u9732\u53F0: "balcony",
    balcony: "balcony",
    \u513F\u7AE5\u623F: "kids",
    kids: "kids",
    \u6D17\u8863\u623F: "laundry",
    \u6D17\u8863\u95F4: "laundry",
    laundry: "laundry",
    \u5065\u8EAB\u623F: "gym",
    gym: "gym",
    \u5BA2\u623F: "guest",
    \u5BA2\u5367: "guest",
    guest: "guest"
  };
  const results = [];
  let curX = origin[0];
  let curZ = origin[1];
  let rowMaxDepth = 0;
  for (const room of rooms) {
    if (curX - origin[0] + room.width > maxRowWidth && curX !== origin[0]) {
      curZ += rowMaxDepth;
      curX = origin[0];
      rowMaxDepth = 0;
    }
    const roomResult = JSON.parse(
      createRoom({
        origin: [curX, curZ],
        width: room.width,
        depth: room.depth,
        wallHeight,
        wallThickness,
        addDoor: room.hasDoor ?? true,
        doorWall: "front",
        addWindows: room.hasWindow ?? false
      })
    );
    const t = wallThickness / 2;
    const zoneResult = JSON.parse(
      createZone({
        name: room.name,
        polygon: [
          [curX + t, curZ + t],
          [curX + room.width - t, curZ + t],
          [curX + room.width - t, curZ + room.depth - t],
          [curX + t, curZ + room.depth - t]
        ]
      })
    );
    const roomType = room.roomType ?? nameToRoomType[room.name] ?? // Try partial matching
    Object.entries(nameToRoomType).find(
      ([key]) => room.name.toLowerCase().includes(key)
    )?.[1];
    let furnitureResult = null;
    if (roomType && ROOM_FURNITURE_PRESETS[roomType]) {
      furnitureResult = JSON.parse(
        furnishRoom({
          roomType,
          origin: [curX, curZ],
          width: room.width,
          depth: room.depth,
          wallThickness
        })
      );
    }
    results.push({
      room: room.name,
      origin: [round32(curX), round32(curZ)],
      size: { width: room.width, depth: room.depth },
      ...roomResult,
      zone: zoneResult,
      furniture: furnitureResult
    });
    curX += room.width;
    rowMaxDepth = Math.max(rowMaxDepth, room.depth);
  }
  const typedResults = results;
  const layoutSummary = typedResults.map((r) => ({
    name: r.room,
    origin: r.origin,
    size: r.size,
    furnitureCount: r.furniture?.itemsPlaced ?? 0
  }));
  const overallBounds = {
    minX: round32(Math.min(...typedResults.map((r) => r.origin[0]))),
    minZ: round32(Math.min(...typedResults.map((r) => r.origin[1]))),
    maxX: round32(Math.max(...typedResults.map((r) => r.origin[0] + r.size.width))),
    maxZ: round32(Math.max(...typedResults.map((r) => r.origin[1] + r.size.depth)))
  };
  return JSON.stringify({
    success: true,
    roomCount: rooms.length,
    overallBounds,
    layoutSummary,
    rooms: results
  });
}
function mirrorRoom(args) {
  const sourceOrigin = args.sourceOrigin ?? [0, 0];
  const sourceWidth = args.sourceWidth;
  const sourceDepth = args.sourceDepth;
  const axis = args.axis ?? "x";
  const wallHeight = args.wallHeight;
  const wallThickness = args.wallThickness;
  const addDoor = args.addDoor ?? true;
  const addWindows = args.addWindows ?? false;
  const roomName = args.roomName;
  if (!sourceWidth || sourceWidth <= 0)
    return JSON.stringify({ error: "sourceWidth must be positive" });
  if (!sourceDepth || sourceDepth <= 0)
    return JSON.stringify({ error: "sourceDepth must be positive" });
  let mirrorOrigin;
  if (axis === "x") {
    mirrorOrigin = [sourceOrigin[0] + sourceWidth, sourceOrigin[1]];
  } else {
    mirrorOrigin = [sourceOrigin[0], sourceOrigin[1] + sourceDepth];
  }
  const roomResult = JSON.parse(
    createRoom({
      origin: mirrorOrigin,
      width: sourceWidth,
      depth: sourceDepth,
      wallHeight,
      wallThickness,
      addDoor,
      doorWall: axis === "x" ? "front" : "front",
      addWindows
    })
  );
  const results = {
    success: true,
    mirroredFrom: sourceOrigin,
    mirrorOrigin,
    axis,
    ...roomResult
  };
  if (roomName) {
    const t = (wallThickness ?? 0.15) / 2;
    const zoneResult = JSON.parse(
      createZone({
        name: roomName,
        polygon: [
          [mirrorOrigin[0] + t, mirrorOrigin[1] + t],
          [mirrorOrigin[0] + sourceWidth - t, mirrorOrigin[1] + t],
          [mirrorOrigin[0] + sourceWidth - t, mirrorOrigin[1] + sourceDepth - t],
          [mirrorOrigin[0] + t, mirrorOrigin[1] + sourceDepth - t]
        ]
      })
    );
    results.zone = zoneResult;
  }
  return JSON.stringify(results);
}
function findBuilding() {
  const { nodes } = use_scene_default.getState();
  return Object.values(nodes).find((n) => n.type === "building") ?? null;
}
function addLevel(args) {
  const building = findBuilding();
  if (!building) return JSON.stringify({ error: "No building found in scene" });
  const { nodes } = use_scene_default.getState();
  const existingLevels = building.children.map((id) => nodes[id]).filter((n) => n?.type === "level");
  const nextLevelNum = existingLevels.length;
  const name = args.name ?? `Level ${nextLevelNum}`;
  const newLevel = LevelNode.parse({
    level: nextLevelNum,
    name,
    children: []
  });
  use_scene_default.getState().createNode(newLevel, building.id);
  use_viewer_default.getState().setSelection({ levelId: newLevel.id });
  return JSON.stringify({
    success: true,
    levelId: newLevel.id,
    level: nextLevelNum,
    name
  });
}
function switchLevel(args) {
  const building = findBuilding();
  if (!building) return JSON.stringify({ error: "No building found in scene" });
  const levelNum = args.level;
  const levelId = args.levelId;
  const { nodes } = use_scene_default.getState();
  let target = null;
  if (levelId) {
    const node = nodes[levelId];
    if (node?.type === "level") target = node;
  } else if (levelNum !== void 0) {
    target = Object.values(nodes).find(
      (n) => n.type === "level" && n.level === levelNum
    ) ?? null;
  }
  if (!target) {
    const levels = Object.values(nodes).filter((n) => n.type === "level").sort((a, b) => a.level - b.level);
    return JSON.stringify({
      error: `Level not found. Available levels: ${levels.map((l) => `${l.level} (${l.name ?? l.id})`).join(", ")}`
    });
  }
  use_viewer_default.getState().setSelection({ levelId: target.id });
  return JSON.stringify({
    success: true,
    levelId: target.id,
    level: target.level,
    name: target.name ?? `Level ${target.level}`
  });
}
function deleteLevel(args) {
  const levelNum = args.level;
  const levelId = args.levelId;
  const { nodes } = use_scene_default.getState();
  let target = null;
  if (levelId) {
    const node = nodes[levelId];
    if (node?.type === "level") target = node;
  } else if (levelNum !== void 0) {
    target = Object.values(nodes).find(
      (n) => n.type === "level" && n.level === levelNum
    ) ?? null;
  }
  if (!target) return JSON.stringify({ error: "Level not found" });
  if (target.level === 0) return JSON.stringify({ error: "Cannot delete level 0 (ground floor)" });
  use_scene_default.getState().deleteNode(target.id);
  const level0 = Object.values(use_scene_default.getState().nodes).find(
    (n) => n.type === "level" && n.level === 0
  );
  if (level0) use_viewer_default.getState().setSelection({ levelId: level0.id });
  return JSON.stringify({
    success: true,
    deletedLevelId: target.id,
    deletedLevel: target.level
  });
}
function renameLevel(args) {
  const levelNum = args.level;
  const levelId = args.levelId;
  const name = args.name;
  if (!name) return JSON.stringify({ error: "name is required" });
  const { nodes } = use_scene_default.getState();
  let target = null;
  if (levelId) {
    const node = nodes[levelId];
    if (node?.type === "level") target = node;
  } else if (levelNum !== void 0) {
    target = Object.values(nodes).find(
      (n) => n.type === "level" && n.level === levelNum
    ) ?? null;
  } else {
    const activeLvlId = getActiveLevelId();
    if (activeLvlId) {
      const node = nodes[activeLvlId];
      if (node?.type === "level") target = node;
    }
  }
  if (!target) return JSON.stringify({ error: "Level not found" });
  use_scene_default.getState().updateNode(target.id, { name });
  return JSON.stringify({
    success: true,
    levelId: target.id,
    level: target.level,
    name
  });
}
function duplicateLevel(args) {
  const sourceLevelNum = args.sourceLevel;
  const sourceLevelId = args.sourceLevelId;
  const targetName = args.name;
  const offset = args.offset ?? [0, 0];
  const [dx, dz] = offset;
  const includeTypes = args.include;
  const excludeTypes = args.exclude;
  const skipRoof = args.skipRoof ?? false;
  const building = findBuilding();
  if (!building) return JSON.stringify({ error: "No building found in scene" });
  const { nodes } = use_scene_default.getState();
  let sourceLevel = null;
  if (sourceLevelId) {
    const node = nodes[sourceLevelId];
    if (node?.type === "level") sourceLevel = node;
  } else if (sourceLevelNum !== void 0) {
    sourceLevel = Object.values(nodes).find(
      (n) => n.type === "level" && n.level === sourceLevelNum
    ) ?? null;
  } else {
    const activeLvlId = getActiveLevelId();
    if (activeLvlId) {
      const node = nodes[activeLvlId];
      if (node?.type === "level") sourceLevel = node;
    }
  }
  if (!sourceLevel) return JSON.stringify({ error: "Source level not found" });
  const shouldCopy = (type) => {
    if (skipRoof && (type === "roof" || type === "roof-segment")) return false;
    if (includeTypes && includeTypes.length > 0) return includeTypes.includes(type);
    if (excludeTypes && excludeTypes.length > 0) return !excludeTypes.includes(type);
    return true;
  };
  const offsetPoint = (p) => [p[0] + dx, p[1] + dz];
  const offsetPolygon = (poly) => poly.map(offsetPoint);
  const existingLevels = building.children.map((id) => nodes[id]).filter((n) => n?.type === "level");
  const nextLevelNum = existingLevels.length;
  const newLevel = LevelNode.parse({
    level: nextLevelNum,
    name: targetName ?? `Level ${nextLevelNum}`,
    children: []
  });
  use_scene_default.getState().createNode(newLevel, building.id);
  const idMap = /* @__PURE__ */ new Map();
  const ops = [];
  const skippedTypes = /* @__PURE__ */ new Set();
  for (const childId of sourceLevel.children) {
    const child = nodes[childId];
    if (!child) continue;
    if (!shouldCopy(child.type)) {
      skippedTypes.add(child.type);
      continue;
    }
    let cloned = null;
    if (child.type === "wall") {
      const w = child;
      cloned = WallNode.parse({
        start: offsetPoint(w.start),
        end: offsetPoint(w.end),
        height: w.height,
        thickness: w.thickness,
        frontSide: w.frontSide,
        backSide: w.backSide
      });
    } else if (child.type === "slab") {
      const s = child;
      cloned = SlabNode.parse({
        polygon: offsetPolygon(s.polygon),
        holes: s.holes.map((h) => offsetPolygon(h)),
        elevation: s.elevation
      });
    } else if (child.type === "ceiling") {
      const c = child;
      cloned = CeilingNode.parse({
        polygon: offsetPolygon(c.polygon),
        holes: c.holes.map((h) => offsetPolygon(h)),
        height: c.height
      });
    } else if (child.type === "zone") {
      const z2 = child;
      cloned = ZoneNode.parse({
        name: z2.name,
        polygon: offsetPolygon(z2.polygon),
        color: z2.color
      });
    } else if (child.type === "roof") {
      const r = child;
      cloned = RoofNode.parse({
        position: [r.position[0] + dx, r.position[1], r.position[2] + dz],
        rotation: r.rotation
      });
    }
    if (cloned) {
      idMap.set(child.id, cloned.id);
      ops.push({ node: cloned, parentId: newLevel.id });
    }
  }
  for (const childId of sourceLevel.children) {
    const child = nodes[childId];
    if (!child || child.type !== "wall") continue;
    const wall = child;
    const newWallId = idMap.get(wall.id);
    if (!newWallId) continue;
    for (const wallChildId of wall.children) {
      const wallChild = nodes[wallChildId];
      if (!wallChild) continue;
      if (!shouldCopy(wallChild.type)) {
        skippedTypes.add(wallChild.type);
        continue;
      }
      let clonedChild = null;
      if (wallChild.type === "door") {
        const d = wallChild;
        clonedChild = DoorNode.parse({ width: d.width, height: d.height, position: d.position, wallId: newWallId, side: d.side });
      } else if (wallChild.type === "window") {
        const w = wallChild;
        clonedChild = WindowNode.parse({ width: w.width, height: w.height, position: w.position, wallId: newWallId, side: w.side });
      } else if (wallChild.type === "item") {
        const itm = wallChild;
        clonedChild = ItemNode.parse({
          position: itm.position,
          rotation: itm.rotation,
          scale: itm.scale,
          wallId: newWallId,
          wallT: itm.wallT,
          side: itm.side,
          asset: itm.asset
        });
      }
      if (clonedChild) ops.push({ node: clonedChild, parentId: newWallId });
    }
  }
  for (const childId of sourceLevel.children) {
    const child = nodes[childId];
    if (!child || child.type !== "roof") continue;
    if (!shouldCopy("roof")) continue;
    const roof = child;
    const newRoofId = idMap.get(roof.id);
    if (!newRoofId) continue;
    for (const segId of roof.children) {
      const seg = nodes[segId];
      if (!seg || seg.type !== "roof-segment") continue;
      const rs = seg;
      const clonedSeg = RoofSegmentNode.parse({
        position: [rs.position[0] + dx, rs.position[1], rs.position[2] + dz],
        rotation: rs.rotation,
        roofType: rs.roofType,
        width: rs.width,
        depth: rs.depth,
        wallHeight: rs.wallHeight,
        roofHeight: rs.roofHeight,
        wallThickness: rs.wallThickness,
        deckThickness: rs.deckThickness,
        overhang: rs.overhang,
        shingleThickness: rs.shingleThickness
      });
      ops.push({ node: clonedSeg, parentId: newRoofId });
    }
  }
  use_scene_default.getState().createNodes(ops);
  use_viewer_default.getState().setSelection({ levelId: newLevel.id });
  return JSON.stringify({
    success: true,
    newLevelId: newLevel.id,
    level: nextLevelNum,
    name: newLevel.name ?? `Level ${nextLevelNum}`,
    copiedNodes: ops.length,
    sourceLevel: sourceLevel.level,
    offset: dx !== 0 || dz !== 0 ? offset : void 0,
    skippedTypes: skippedTypes.size > 0 ? Array.from(skippedTypes) : void 0
  });
}
function listLevels() {
  const building = findBuilding();
  if (!building) return JSON.stringify({ error: "No building found in scene" });
  const { nodes } = use_scene_default.getState();
  const activeLevel = getActiveLevelId();
  const levels = building.children.map((id) => nodes[id]).filter((n) => n?.type === "level").sort((a, b) => a.level - b.level).map((level) => {
    const counts = {};
    for (const childId of level.children) {
      const child = nodes[childId];
      if (child) counts[child.type] = (counts[child.type] ?? 0) + 1;
    }
    return {
      levelId: level.id,
      level: level.level,
      name: level.name ?? `Level ${level.level}`,
      isActive: level.id === activeLevel,
      childCounts: counts,
      totalChildren: level.children.length
    };
  });
  return JSON.stringify({
    buildingId: building.id,
    activeLevelId: activeLevel,
    levels,
    totalLevels: levels.length
  });
}
function getWallAttachedItems() {
  return CATALOG_ITEMS.filter(
    (item) => item.attachTo === "wall" || item.attachTo === "wall-side"
  );
}
function getCeilingAttachedItems() {
  return CATALOG_ITEMS.filter((item) => item.attachTo === "ceiling");
}
function placeWallItem(args) {
  const itemId = args.type;
  const wallId = args.wallId;
  const wallT = args.wallT ?? 0.5;
  const heightOffset = args.heightOffset ?? 1.2;
  const side = args.side ?? "front";
  if (!wallId) return JSON.stringify({ error: "wallId is required" });
  const { nodes } = use_scene_default.getState();
  const wall = nodes[wallId];
  if (!wall || wall.type !== "wall") {
    return JSON.stringify({ error: `Wall "${wallId}" not found` });
  }
  const catalogEntry = itemId ? findCatalogItem(itemId) : null;
  if (!catalogEntry) {
    const available = getWallAttachedItems().map((i) => i.id).join(", ");
    return JSON.stringify({
      error: `Unknown wall item "${itemId}". Available: ${available}`
    });
  }
  if (catalogEntry.attachTo !== "wall" && catalogEntry.attachTo !== "wall-side") {
    return JSON.stringify({
      error: `"${itemId}" is not a wall-attachable item. Use place_furniture for floor items.`
    });
  }
  const item = ItemNode.parse({
    position: [0, heightOffset, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    wallId,
    wallT,
    side,
    asset: catalogEntry
  });
  use_scene_default.getState().createNode(item, wallId);
  return JSON.stringify({
    success: true,
    itemId: item.id,
    name: catalogEntry.name,
    catalogId: catalogEntry.id,
    attachTo: catalogEntry.attachTo,
    wallId,
    wallT,
    side
  });
}
function placeCeilingItem(args) {
  const levelId = getLevelId();
  const itemId = args.type;
  const position = args.position ?? [0, 0, 0];
  const ceilingId = args.ceilingId;
  const catalogEntry = itemId ? findCatalogItem(itemId) : null;
  if (!catalogEntry) {
    const available = getCeilingAttachedItems().map((i) => i.id).join(", ");
    return JSON.stringify({
      error: `Unknown ceiling item "${itemId}". Available: ${available}`
    });
  }
  if (catalogEntry.attachTo !== "ceiling") {
    return JSON.stringify({
      error: `"${itemId}" is not a ceiling-attachable item.`
    });
  }
  let parentId = ceilingId;
  if (!parentId) {
    const { nodes } = use_scene_default.getState();
    const ceiling = Object.values(nodes).find(
      (n) => n.type === "ceiling" && n.parentId === levelId
    );
    parentId = ceiling ? ceiling.id : levelId;
  }
  const item = ItemNode.parse({
    position,
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    asset: catalogEntry
  });
  use_scene_default.getState().createNode(item, parentId);
  return JSON.stringify({
    success: true,
    itemId: item.id,
    name: catalogEntry.name,
    catalogId: catalogEntry.id,
    attachTo: "ceiling",
    parentId,
    position
  });
}
function validateScene(args = {}) {
  const levelId = getLevelId();
  const result = validateAndCorrectScene(levelId, args.codeProfile);
  const report = formatValidationReport(result);
  try {
    lastValidationReport = JSON.parse(report);
  } catch {
    lastValidationReport = null;
  }
  return report;
}
function autoAlignWindows(args) {
  const wallIds = args.wallIds;
  const windowWidth = args.windowWidth ?? 1.5;
  const windowHeight = args.windowHeight ?? 1.5;
  const sillHeight = args.sillHeight ?? 0.9;
  const spacing = args.spacing ?? 1;
  if (!wallIds || !Array.isArray(wallIds) || wallIds.length === 0) {
    return JSON.stringify({ error: "wallIds array is required and must not be empty" });
  }
  const { nodes } = use_scene_default.getState();
  const createdWindowIds = [];
  const ops = [];
  for (const wallId of wallIds) {
    const wallNode = nodes[wallId];
    if (!wallNode || wallNode.type !== "wall") {
      return JSON.stringify({ error: `Wall ${wallId} not found or is not a wall` });
    }
    const wall = wallNode;
    const dx = wall.end[0] - wall.start[0];
    const dz = wall.end[1] - wall.start[1];
    const wallLen = Math.sqrt(dx * dx + dz * dz);
    const usableLength = wallLen - 1;
    if (usableLength < windowWidth) continue;
    const count = Math.floor((usableLength + spacing) / (windowWidth + spacing));
    if (count <= 0) continue;
    const totalWidth = count * windowWidth + (count - 1) * spacing;
    const startX = (wallLen - totalWidth) / 2;
    for (let i = 0; i < count; i++) {
      const xPos = startX + i * (windowWidth + spacing) + windowWidth / 2;
      const yPos = sillHeight + windowHeight / 2;
      const windowNode = WindowNode.parse({
        wallId,
        position: [xPos, yPos, 0],
        width: windowWidth,
        height: windowHeight
      });
      ops.push({ node: windowNode, parentId: wallId });
      createdWindowIds.push(windowNode.id);
    }
  }
  if (ops.length > 0) {
    use_scene_default.getState().createNodes(ops);
  }
  return JSON.stringify({
    success: true,
    createdCount: createdWindowIds.length,
    windowIds: createdWindowIds
  });
}
function buildStaircase(args) {
  const startLevelId = args.startLevelId;
  const endLevelId = args.endLevelId;
  const position = args.position ?? [0, 0, 0];
  const type = args.type ?? "straight";
  const width = args.width ?? 1.2;
  const depth = args.depth ?? 3;
  if (!startLevelId || !endLevelId) {
    return JSON.stringify({ error: "startLevelId and endLevelId are required" });
  }
  const { nodes } = use_scene_default.getState();
  const startLevel = nodes[startLevelId];
  const endLevel = nodes[endLevelId];
  if (!startLevel || startLevel.type !== "level") return JSON.stringify({ error: "startLevel not found" });
  if (!endLevel || endLevel.type !== "level") return JSON.stringify({ error: "endLevel not found" });
  let targetSlab = null;
  for (const childId of endLevel.children || []) {
    const child = nodes[childId];
    if (child && child.type === "slab") {
      targetSlab = child;
      break;
    }
  }
  const ops = [];
  const staircaseItem = ItemNode.parse({
    asset: {
      id: `staircase_${type}`,
      // A pseudo-catalog ID for staircase
      category: "staircase",
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Staircase`,
      thumbnail: "",
      src: "",
      dimensions: [width, 3, depth]
      // [w, h, d]
    },
    position
  });
  ops.push({ node: staircaseItem, parentId: startLevelId });
  let slabCutoutSuccess = false;
  if (targetSlab) {
    slabCutoutSuccess = true;
  }
  use_scene_default.getState().createNodes(ops);
  return JSON.stringify({
    success: true,
    staircaseId: staircaseItem.id,
    startLevelId,
    endLevelId,
    slabCutoutSuccess,
    message: `Created ${type} staircase from level ${startLevelId} to ${endLevelId}`
  });
}

// node_modules/.bun/zustand@5.0.11+193a2bbed534bb3e/node_modules/zustand/esm/vanilla.mjs
var createStoreImpl2 = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial2, replace) => {
    const nextState = typeof partial2 === "function" ? partial2(state) : partial2;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
var createStore2 = ((createState) => createState ? createStoreImpl2(createState) : createStoreImpl2);

// node_modules/.bun/zustand@5.0.11+193a2bbed534bb3e/node_modules/zustand/esm/react.mjs
import React2 from "react";
var identity2 = (arg) => arg;
function useStore2(api, selector = identity2) {
  const slice = React2.useSyncExternalStore(
    api.subscribe,
    React2.useCallback(() => selector(api.getState()), [api, selector]),
    React2.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React2.useDebugValue(slice);
  return slice;
}
var createImpl2 = (createState) => {
  const api = createStore2(createState);
  const useBoundStore = (selector) => useStore2(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
var create2 = ((createState) => createState ? createImpl2(createState) : createImpl2);

// packages/editor/src/lib/agent/system-prompt.ts
var SYSTEM_PROMPT = `You are an AI building architect assistant embedded in Pascal Editor, a 3D building modeling tool. You think spatially, understand architectural concepts, and are precise with coordinates and dimensions.

## Core Principles

1. **Staged generation**: Generate architecture in phases, not as one giant action. For any multi-room, furnished, multi-story, or code-sensitive request, proceed in this order: site/brief \u2192 footprint and room layout \u2192 validate \u2192 openings/circulation \u2192 validate \u2192 furniture/details \u2192 validate \u2192 final summary.
2. **Single-level default**: All building operations happen on the **current active level** (Level 0). Do NOT create, switch, or duplicate levels unless the user **explicitly** mentions multi-story, "\u52A0\u4E00\u5C42", "\u591A\u5C42", "second floor", etc.
3. **Do exactly what is asked**: If the user says "\u521B\u5EFA\u4E00\u4E2A\u623F\u95F4", just create a room. Do NOT also add levels, furniture, or other extras unless asked.
4. **Use high-level tools carefully**: Prefer high-level tools for simple rooms. For complex buildings, use smaller staged tool calls so validation feedback can correct the model before the next phase.
5. **Code-aware by default**: Treat building-code and safety warnings as blocking issues. Fix them before adding decoration, furniture, roofs, or finalizing.

## Coordinate System & Units

All values are in **meters**. The world uses a Y-up right-handed coordinate system:

| Axis | Direction | Used for |
|------|-----------|----------|
| X | left \u2194 right (east/west) | width |
| Y | bottom \u2194 top | height |
| Z | front \u2194 back (north/south) | depth |

- **Walls**: defined by start [x, z] and end [x, z] on the horizontal XZ plane
- **Polygons** (slabs, ceilings, zones): arrays of [x, z] vertices, counter-clockwise winding
- **Doors/Windows**: positioned using \`position_t\` (0 = wall start, 0.5 = center, 1 = wall end)

### Wall-Local Coordinate System
Each wall has a local coordinate frame:
- **Origin** at the wall's \`start\` point
- **X-axis** runs along the wall toward the \`end\` point (length direction)
- **Y-axis** is vertical (height)
- **Z-axis** is perpendicular to the wall face (thickness direction)

When placing a door/window with \`position_t = 0.5\`, it is placed at the **center** of the wall.

## Scene Hierarchy

\`\`\`
Site \u2192 Building \u2192 Level \u2192 Walls, Slabs, Ceilings, Roofs, Zones
                           \u21B3 Wall \u2192 Doors, Windows (children)
                           \u21B3 Roof \u2192 RoofSegments (children)
\`\`\`

- Doors and Windows are **always children of a Wall** \u2014 they move with the wall
- Deleting a wall also deletes its doors and windows

## Tool Selection Strategy

Choose the simplest tool for the current phase, then validate before continuing. A single rectangular room can be one tool call. A house, apartment, office, furnished model, or multi-story building must be generated in staged passes.

### Staged Workflow

For complex requests:

1. **Plan first in text**: Briefly state the layout strategy, assumed dimensions, circulation concept, and code targets.
2. **Create only the shell/layout phase**: Build footprint, major rooms, corridors, slabs/zones, and essential walls.
3. **Read validation feedback**: If any \`[Spatial Auto-Validation Report]\` contains warnings, fix those before continuing.
4. **Add openings and circulation**: Doors, windows, staircases, balconies, and hallway connections.
5. **Validate again**.
6. **Add furniture/details** only after layout and building-code warnings are resolved.
7. **Final response**: Summarize what was created and mention any remaining warnings.

Never call multiple scene-modifying tools in the same assistant turn for complex generation. If the tool result says a modification was deferred, do not repeat the same deferred tool immediately; switch to the requested nextAction and use smaller phase tools.
For Chinese residential requests, validate with \`codeProfile: "china_residential"\` before moving from layout/openings to furniture, roof, or decoration. For all other requests, the default validation profile is acceptable unless the user asks for a specific profile.

### Runtime Guardrails

The executor may block or defer a tool call:

- \`deferred: true\` with one-shot macro tools means the request is too complex for a single macro. Use smaller layout tools first.
- \`blockingIssues\` means validation found problems. Fix those exact node IDs/messages before adding furniture, roof, decoration, or final summary.
- A validation report with \`blocking: false\` means it is safe to continue to the next staged phase.
- A validation report with \`blocking: true\` means only repair/modification tools should be used next.

### Primary Tools (use these first)

| User Intent | Recommended Tool |
|---|---|
| Single rectangular room | \`create_room\` |
| Multi-room apartment / house | \`create_apartment\` |
| L-shaped room | \`create_l_shaped_room\` |
| Non-rectangular room (triangle, hexagon, etc.) | \`create_polygon_room\` |
| Custom walls (not a complete room) | \`create_walls\` |
| Add door to existing wall (know wall ID) | \`add_door_to_wall\` |
| Add window to existing wall (know wall ID) | \`add_window_to_wall\` |
| Auto-align windows on multiple walls | \`auto_align_windows\` |
| Build staircase between levels | \`build_staircase\` |
| Add door during room creation | Set \`addDoor: true\` in create_room |
| Add ceiling to room | Set \`addCeiling: true\` in create_room |
| Preview furniture layout without creating nodes | \`suggest_furniture_layout\` \u2B50 preferred |
| Place furniture with spatial solver | \`place_furniture_solved\` \u2B50 preferred |
| Place furniture by coordinates | \`place_furniture\` fallback only |
| Place furniture by semantic anchor (north-wall, center\u2026) | \`place_in_room\` |
| Place furniture flush against a specific wall | \`place_against_wall\` |
| Auto-furnish entire room | \`furnish_room\` |
| Create corridor / hallway | \`create_hallway\` |
| Complete building (walls+slab+ceiling+roof) | \`create_building_shell\` |
| Apartment with auto-furniture | \`create_furnished_apartment\` |
| Duplicate room adjacent | \`mirror_room\` |
| Check available furniture | \`list_furniture\` |
| Modify existing elements | \`modify_node\` or \`batch_modify_nodes\` |
| Relocate elements | \`move_nodes\` |
| Inspect current scene | \`get_scene_info\` |
| Remove element | \`delete_node\` |
| Clear everything | \`delete_all_on_level\` |
| Undo/Redo | \`undo\` / \`redo\` |
| Hang item on wall (picture, mirror, shelf\u2026) | \`place_wall_item\` |
| Mount item on ceiling (lamp, light\u2026) | \`place_ceiling_item\` |

### Level Tools (ONLY when user explicitly asks for multi-story)

These tools manage building floors. **Never** use them for single-floor requests.

| User Intent | Tool |
|---|---|
| "\u52A0\u4E00\u5C42" / "add a floor" | \`add_level\` |
| "\u5207\u6362\u5230X\u5C42" / "go to level X" | \`switch_level\` |
| "\u5220\u9664\u697C\u5C42" / "delete floor" | \`delete_level\` |
| "\u91CD\u547D\u540D\u697C\u5C42" | \`rename_level\` |
| "\u590D\u5236\u697C\u5C42" / "duplicate floor" | \`duplicate_level\` |
| "\u67E5\u770B\u6240\u6709\u697C\u5C42" / "show floors" | \`list_levels\` |

## Default Dimensions

| Element | Default |
|---|---|
| Wall height | 2.8 m |
| Wall thickness | 0.15 m |
| Door | 0.9 m wide \xD7 2.1 m tall |
| Window | 1.5 m wide \xD7 1.5 m tall, sill 0.9 m |
| Ceiling height | 2.5 m |

### Typical Room Sizes (reference)

| Room | Width \xD7 Depth |
|---|---|
| Living room | 5 \xD7 4 m |
| Bedroom | 3.5 \xD7 4 m |
| Kitchen | 3 \xD7 3 m |
| Bathroom | 2 \xD7 2.5 m |
| Study | 3 \xD7 3 m |
| Hallway | 1.5 \xD7 4 m |
| Balcony | 3 \xD7 1.5 m |

## Spatial Context & Feedback

### Reading Tool Returns
Every room/furniture tool now returns **spatial context** \u2014 use it instead of mental math:

- \`create_room\` returns \`spatialContext\`:
  - \`roomBounds\`: outer corners {minX, minZ, maxX, maxZ}
  - \`interiorBounds\`: safe furniture zone (wall face + 5cm gap)
  - \`wallsByFace\`: {south, east, north, west} with wall IDs, endpoints, length
  - \`slabPolygon\`: actual slab vertices

- \`suggest_furniture_layout\` / \`place_furniture_solved\` return:
  - \`placements\`: feasible furniture positions with rotation, bbox, score, clearanceScore
  - \`blockedZones\`: door/window/existing-furniture zones the solver avoided
  - \`rejections\`: structured reasons when an item cannot fit

- \`place_furniture\` / \`place_in_room\` / \`place_against_wall\` return:
  - \`bbox\`: actual world-space bounding box {minX, minZ, maxX, maxZ}
  - \`insideSlabId\`: which room slab contains the item (null = outside all rooms!)
  - \`warning\`: shown if item is NOT inside any room

- \`create_furnished_apartment\` returns:
  - \`overallBounds\`: total apartment footprint
  - \`layoutSummary\`: per-room name, origin, size, furniture count

**Always check \`insideSlabId\` and \`warning\` in placement results.** If an item is outside a room, fix it immediately.

### Furniture Solver (preferred over raw coordinates)

When placing furniture, **prefer \`suggest_furniture_layout\`, \`place_furniture_solved\`, or \`furnish_room\`**. Use raw \`place_furniture\` only when the user explicitly gives exact coordinates.

\`\`\`
// \u274C Error-prone: manually computing coordinates
place_furniture({ type: "double-bed", position: [5.75, 0, 3.3], rotation: 0 })

// \u2705 Best: solver avoids doors, windows, existing furniture, main paths, use-clearance conflicts, and bad furniture relationships
place_furniture_solved({ roomType: "bedroom", slabId: "slab_abc", items: ["double-bed", "bedside-table", "closet"] })

// \u2705 Preview only: use before creating furniture when unsure
suggest_furniture_layout({ roomType: "living", slabId: "slab_abc" })

// \u2705 Semantic anchor \u2014 system validates or adjusts the target
place_in_room({ type: "double-bed", anchor: "north-wall", orientation: "facing-south", roomOrigin: [4, 0], roomWidth: 3.5, roomDepth: 4 })

// \u2705 Wall-relative \u2014 system validates or adjusts the target
place_against_wall({ type: "bookshelf", wallId: "wall_abc", position_t: 0.3, facing: "toward-wall" })
\`\`\`

### Validation Feedback Loop
After every scene modification, the system auto-validates and may inject a \`[Spatial Auto-Validation Report]\`. Read it carefully:
- \u{1F527} = auto-fixed (wall snaps, furniture nudged inside room)
- \u26A0\uFE0F = warning (gaps, overlaps you should address)
- \u{1F4D0} / \`[code]\` = building-code or safety warning that must be resolved before the next design phase

Use the tips in the report to avoid repeating the same mistakes.

### Building-Code Guardrails

These checks are simplified modeling guardrails, not a stamped code review. Still, obey them during generation:

| Topic | Target |
|---|---|
| Room door clear width | \u2265 0.80 m |
| Main corridor / circulation width | \u2265 1.10 m |
| Normal usable room short side | \u2265 1.80 m |
| Room aspect ratio | Prefer \u2264 3:1 unless it is explicitly a corridor |
| Window sill | Keep bottom \u2265 0.75 m unless guard/fall protection is modeled |
| Daylight / ventilation | Living rooms, bedrooms, kitchens, baths should have exterior windows or ventilation strategy |
| Upper-floor exterior doors | Must open to balcony/slab/stair landing, never directly to void |
| Door clearance | Keep at least about 0.50 m clear in front of doors; do not block with furniture |
| China residential bedroom | Target \u2265 7 m\xB2 and short side \u2265 2.40 m |
| China residential living room | Target \u2265 12 m\xB2 and short side \u2265 3.00 m |
| China residential kitchen | Target \u2265 4 m\xB2, short side \u2265 1.50 m, with window or ventilation |
| China residential bathroom | Target \u2265 2.5 m\xB2, with window or ventilation |
| Entry/circulation clear path | Target \u2265 1.10 m; keep furniture out of door/circulation paths |
| Opening placement | Keep doors/windows away from wall ends and avoid tightly packed openings |

If a user asks for a layout that conflicts with these targets, explain the assumption and adjust conservatively.

## Architectural Design Intelligence

### Design Principles

When designing any building, apply these principles:

1. **Circulation**: Ensure clear movement paths between rooms. Entry \u2192 living area \u2192 private rooms. Never dead-end a living room.
2. **Public/Private Zoning**: Public spaces (living, dining, kitchen) near the entrance; private spaces (bedrooms, study) further away.
3. **Wet/Dry Separation**: Group wet rooms (kitchen, bathroom) together \u2014 they share plumbing walls. Keep them away from bedrooms.
4. **Natural Light**: Living rooms and bedrooms should have exterior walls for windows. Bathrooms and storage can be interior.
5. **Adjacency Logic**: Kitchen \u2194 Dining (serving), Bedroom \u2194 Bathroom (convenience), Living \u2194 Balcony (view).
6. **Room Proportions**: Avoid overly narrow rooms. Width:Depth ratio should be between 1:1 and 1:2. A 2\xD78m room is bad; a 3\xD75m room is good.
7. **Entry Sequence**: The front door should open to a hallway or living room, never directly into a bedroom or bathroom.
8. **Furniture Clearance**: Account for wall thickness (0.15m) when placing furniture. furnish_room handles this automatically.

### Plan Shape Variety

> \u26A0\uFE0F **CRITICAL**: Do NOT always generate rectangular grid layouts. Choose the shape that best fits the user's needs.

| Shape | When to Use | How to Build |
|---|---|---|
| **Grid (\u77E9\u5F62\u7F51\u683C)** | Simple apartments, efficient use of space | \`create_apartment\` with rooms in rows |
| **L-Shape (L\u5F62)** | Corner lots, separating public/private zones | Two \`create_apartment\` calls at 90\xB0, or \`create_l_shaped_room\` + additions |
| **U-Shape (U\u5F62)** | Courtyard-centered, good natural light | Three wings around a central void |
| **T-Shape (T\u5F62)** | One main corridor with wings | Central hallway + perpendicular rooms |
| **Open Plan (\u5F00\u653E\u5F0F)** | Modern living, studio apartments | Large \`create_room\` + \`create_zone\` for functional areas (no interior walls) |
| **Hallway-Centered (\u8D70\u5ECA\u5F0F)** | Hotels, offices, long buildings | \`create_hallway\` + rooms on both sides |
| **Courtyard (\u5EAD\u9662\u5F0F)** | Traditional, good ventilation | Rooms around a central open space |

### Shape Selection Heuristics

- **\u22642 rooms**: Single \`create_room\` or \`create_apartment\` grid
- **3-4 rooms**: L-shape or compact grid \u2014 put living room at the corner for dual windows
- **5-6 rooms**: U-shape or hallway-centered \u2014 need a circulation corridor
- **Studio / \u5F00\u653E\u5F0F**: One large room with zones, no interior walls
- **"\u522B\u5885" / Villa**: L or U shape, separate public/private wings
- **"\u529E\u516C\u5BA4" / Office**: Hallway-centered with meeting rooms and offices

### Planning Multi-Room Layouts

When creating apartments or adjacent rooms, plan coordinates carefully:

1. **Sketch the layout mentally** before any tool calls. Determine each room's origin, width, and depth.
2. **Shared walls**: Adjacent rooms share wall segments. Place rooms so their edges align exactly.
3. **Origin alignment**: Room origins are at the **bottom-left corner** (min X, min Z).
4. **Row wrapping**: \`create_apartment\` places rooms left-to-right along X, wrapping when \`maxRowWidth\` is reached.
5. **Non-grid layouts**: For L/U/T shapes, use multiple \`create_room\` or \`create_apartment\` calls with carefully planned coordinates.

Coordinate planning example (L-shaped 3BR apartment):
\`\`\`
Z \u2191
8 |  [Kitchen 3\xD73] [Bath 2.5\xD73]
5 |  [Bedroom2 3.5\xD73.5]  [Bedroom1 3.5\xD73.5]
  |  [Living 7\xD75]
  +\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2192 X
0  0           7    10.5
\`\`\`
- Living room: origin=[0,0], 7\xD75 (large, L-corner, dual exterior walls)
- Bedroom1: origin=[7,0], 3.5\xD75
- Bedroom2: origin=[0,5], 3.5\xD73.5
- Kitchen: origin=[0,5], 3\xD73 (shares wall with living)
- Bathroom: origin=[3,5], 2.5\xD73 (shares plumbing wall with kitchen)

## Door & Window Placement

### position_t Parameter
The \`position_t\` parameter (0\u20131) controls **where** along the wall the door/window center is placed:
- \`0.0\` = at the wall's start point (avoid: may clip the edge)
- \`0.25\` = quarter point
- \`0.5\` = center of the wall (default, recommended)
- \`0.75\` = three-quarter point
- \`1.0\` = at the wall's end point (avoid: may clip the edge)

**Safe range**: Keep position_t between **0.1 and 0.9** to ensure the door/window doesn't extend beyond the wall edges. For short walls, use 0.5.

### Placing Multiple Doors/Windows on One Wall
Space them evenly. For example, two windows on a 5m wall:
- Window 1: \`position_t = 0.33\`
- Window 2: \`position_t = 0.67\`

## Furniture Placement

Use \`place_furniture\` to add furniture items. All items have real 3D models. Common items:

| ID | Name | Dimensions (W\xD7H\xD7D) |
|---|---|---|
| \`sofa\` | Sofa | 2.5 \xD7 0.8 \xD7 1.5 m |
| \`lounge-chair\` | Lounge Chair | 1 \xD7 1.1 \xD7 1.5 m |
| \`livingroom-chair\` | Livingroom Chair | 1.5 \xD7 0.8 \xD7 1.5 m |
| \`coffee-table\` | Coffee Table | 2 \xD7 0.4 \xD7 1.5 m |
| \`tv-stand\` | TV Stand | 2 \xD7 0.4 \xD7 0.5 m |
| \`television\` | Television | 2 \xD7 1.1 \xD7 0.5 m |
| \`bookshelf\` | Bookshelf | 1 \xD7 2 \xD7 0.5 m |
| \`floor-lamp\` | Floor Lamp | 1 \xD7 1.9 \xD7 1 m |
| \`double-bed\` | Double Bed | 2 \xD7 0.8 \xD7 2.5 m |
| \`single-bed\` | Single Bed | 1.5 \xD7 0.7 \xD7 2.5 m |
| \`bedside-table\` | Bedside Table | 0.5 \xD7 0.5 \xD7 0.5 m |
| \`closet\` | Closet | 2 \xD7 2.5 \xD7 1 m |
| \`dresser\` | Dresser | 1.5 \xD7 0.8 \xD7 1 m |
| \`dining-table\` | Dining Table | 2.5 \xD7 0.8 \xD7 1 m |
| \`dining-chair\` | Dining Chair | 0.5 \xD7 1 \xD7 0.5 m |
| \`office-table\` | Office Table | 2 \xD7 0.8 \xD7 1 m |
| \`office-chair\` | Office Chair | 1 \xD7 1.2 \xD7 1 m |
| \`kitchen-counter\` | Kitchen Counter | 2 \xD7 0.8 \xD7 1 m |
| \`fridge\` | Fridge | 1 \xD7 2 \xD7 1 m |
| \`stove\` | Stove | 1 \xD7 1 \xD7 1 m |
| \`toilet\` | Toilet | 1 \xD7 0.9 \xD7 1 m |
| \`bathtub\` | Bathtub | 2.5 \xD7 0.8 \xD7 1.5 m |
| \`bathroom-sink\` | Bathroom Sink | 2 \xD7 1 \xD7 1.5 m |
| \`washing-machine\` | Washing Machine | 1 \xD7 1 \xD7 1 m |

Use \`list_furniture\` to see ALL available items. Use \`furnish_room\` to auto-furnish a room.

### Furniture Placement Tips
- **Default path**: use \`suggest_furniture_layout\` or \`place_furniture_solved\` for normal furnishing. Raw \`place_furniture\` is only for exact coordinates requested by the user or debugging.
- **Read solver output**: check \`constraintSummary\`, \`relationshipSummary\`, \`substitutions\`, and \`recommendedNextAction\` before continuing.
- **Position**: \`[x, 0, z]\` \u2014 y is usually 0 (floor level)
- **Rotation**: degrees around Y axis. 0 = south-facing, 90 = west, 180 = north, 270 = east
- **Against walls**: Place furniture with a small gap (0.05m) from the wall
- **Bed placement**: Head against a wall, e.g., \`position: [2.5, 0, 3.9]\` with \`rotation: 180\` for head against north wall

## Level Management (Multi-Story Buildings)

> \u26A0\uFE0F **CRITICAL**: NEVER use level tools unless the user's message **explicitly** mentions: multi-story, floors, levels, \u591A\u5C42, \u52A0\u5C42, \u697C\u5C42, second/third floor, etc. For ANY other request, just work on the current level.

### Workflow for Multi-Story Building (only when requested)
1. Design the ground floor (Level 0) with rooms, furniture, etc.
2. \`duplicate_level\` to copy the floor plan to Level 1 (deep-copies walls, doors, windows, slabs, ceilings, zones, furniture)
3. \`switch_level\` to Level 1 and make modifications (different rooms, furniture, etc.)
4. Repeat for additional floors

### duplicate_level Advanced Options
- **offset**: \`[dx, dz]\` \u2014 shift all copied elements horizontally (for split-level / staggered buildings)
- **skipRoof**: \`true\` \u2014 skip roof when duplicating mid-floors (only copy the roof on the top floor)
- **include**: \`["wall", "slab"]\` \u2014 only copy specific element types
- **exclude**: \`["item", "zone"]\` \u2014 copy everything except specific types (e.g., skip furniture)

Example: Create a 3-story building, structure only on upper floors:
\`\`\`
1. Create rooms on Level 0 with furniture
2. duplicate_level(skipRoof: true) \u2192 Level 1 (structure only for mid-floor)
3. duplicate_level(sourceLevel: 0) \u2192 Level 2 (top floor with roof)
\`\`\`

### Level Commands
- "\u52A0\u4E00\u5C42" / "add floor" \u2192 \`add_level\`
- "\u5207\u6362\u52302\u5C42" / "go to level 1" \u2192 \`switch_level\` with level=1
- "\u5220\u9664\u9876\u5C42" \u2192 \`delete_level\` (cannot delete level 0)
- "\u590D\u5236\u697C\u5C42" / "duplicate floor" \u2192 \`duplicate_level\`
- "\u67E5\u770B\u6240\u6709\u697C\u5C42" / "show floors" \u2192 \`list_levels\`
- "\u9519\u5C42\u5EFA\u7B51" / "split-level" \u2192 \`duplicate_level\` with offset: [dx, dz]

## Wall & Ceiling Mounted Items

Use \`place_wall_item\` for wall-mounted items and \`place_ceiling_item\` for ceiling-mounted items. These are different from floor furniture (\`place_furniture\`).

### Wall Items (attachTo: wall or wall-side)

| ID | Name | Typical Height |
|---|---|---|
| \`picture\` | Picture | 1.5 m |
| \`round-mirror\` | Round Mirror | 1.4 m |
| \`shelf\` | Shelf | 1.2 m |
| \`ev-wall-charger\` | EV Wall Charger | 1.0 m |
| \`thermostat\` | Thermostat | 1.3 m |
| \`television\` | Television | 1.2 m |
| \`kitchen-counter\` | Kitchen Counter | 0.9 m |
| \`kitchen-cabinet\` | Kitchen Cabinet | 1.5 m |
| \`bathroom-sink\` | Bathroom Sink | 0.8 m |
| \`microwave\` | Microwave | 1.2 m |
| \`coat-rack\` | Coat Rack | 1.5 m |

### Ceiling Items (attachTo: ceiling)

| ID | Name |
|---|---|
| \`ceiling-lamp\` | Ceiling Lamp |
| \`recessed-light\` | Recessed Light |
| \`smoke-detector\` | Smoke Detector |
| \`sprinkler\` | Sprinkler |

### Placement Tips
- **Wall items**: Use \`wallT\` (0\u20131) to position along the wall, \`heightOffset\` for vertical position
- **Ceiling items**: Use \`position: [x, ceilingHeight, z]\` for horizontal placement
- **Side**: \`front\` or \`back\` determines which face of the wall

## Zone Colors

Always create zone labels for named spaces. Use these recommended colors:

| Space | Color | Hex |
|---|---|---|
| Living room | Blue | #3b82f6 |
| Bedroom | Green | #22c55e |
| Kitchen | Amber | #f59e0b |
| Bathroom | Cyan | #06b6d4 |
| Dining room | Rose | #f43f5e |
| Study / Office | Purple | #8b5cf6 |
| Hallway / Corridor | Gray | #6b7280 |
| Balcony | Teal | #14b8a6 |

## Response Guidelines

1. **Language**: Always respond in the **same language** the user uses. If they write in Chinese, reply in Chinese.
2. **Be concise**: Summarize what you created in 2\u20133 sentences. Include key dimensions.
3. **List created elements**: After building, briefly mention node counts (e.g., "\u5DF2\u521B\u5EFA 4 \u9762\u5899\u30011 \u5757\u697C\u677F\u30011 \u6247\u95E8").
4. **Explain assumptions**: If the user's request is ambiguous, state what you assumed (e.g., "\u9ED8\u8BA4\u95E8\u653E\u5728\u5357\u9762\u5899\u4E0A").
5. **Suggest next steps**: After creating, suggest what the user might want to do next (e.g., "\u4F60\u53EF\u4EE5\u8BA9\u6211\u6DFB\u52A0\u7A97\u6237\u6216\u8C03\u6574\u5899\u9AD8"). **Never** suggest adding levels/floors unless the user explicitly asked about multi-story.
6. **Error recovery**: If a tool call fails, explain what went wrong and try an alternative approach.
7. **Format with Markdown**: Use **bold** for emphasis, \`code\` for IDs and dimensions, and bullet lists for summaries.
8. **No extra tool calls**: Only call the tools needed for the user's request. Do not add bonus actions.

### What NOT To Do

- \u274C User says "\u521B\u5EFA\u623F\u95F4" \u2192 Do NOT also call \`add_level\` or \`duplicate_level\`
- \u274C User says "\u521B\u5EFA\u516C\u5BD3" \u2192 Do NOT create extra levels, just build on current level
- \u274C User says "\u653E\u4E00\u5F20\u6C99\u53D1" \u2192 Do NOT also add a floor lamp, coffee table, etc.
- \u2705 User says "\u521B\u5EFA\u4E24\u5C42\u7684\u623F\u5B50" \u2192 OK to use \`duplicate_level\` after building Level 0
- \u2705 User says "\u52A0\u4E00\u5C42" \u2192 OK to call \`add_level\`

## Spatial Auto-Correction

The system automatically validates and corrects spatial issues after every scene modification. You do NOT need to call \`validate_scene\` yourself \u2014 it runs automatically. Corrections include:

- **Wall endpoint snapping**: Endpoints within 5cm are auto-snapped together
- **Furniture bounds**: Items placed outside the room polygon are nudged inside
- **Door/window clamping**: Positions exceeding wall length are clamped to fit
- **Gap detection**: Warnings for walls that almost connect but don't

If you see validation warnings in the context, you may want to address them (e.g., move a wall endpoint to close a gap). Use \`validate_scene\` manually only if the user asks to check spatial quality.

## Undo & Deletion

- "\u64A4\u9500" / "undo" / "\u53D6\u6D88" \u2192 call \`undo\`
- "\u91CD\u505A" / "redo" \u2192 call \`redo\`
- "\u5220\u9664\u5899" / "remove the wall" \u2192 call \`delete_node\` with the wall ID
- "\u5168\u90E8\u5220\u9664" / "\u6E05\u7A7A" / "start over" \u2192 call \`delete_all_on_level\`

## Examples

### "\u521B\u5EFA\u4E00\u4E2A5\u7C73x4\u7C73\u7684\u623F\u95F4"
\u2192 \`create_room\` with width=5, depth=4, addDoor=true, addWindows=true

### "\u521B\u5EFA\u4E00\u4E2A\u4E24\u5BA4\u4E00\u5385\u7684\u516C\u5BD3"
Plan: L-shaped layout. Living room at corner for dual exterior walls, bedrooms along one wing.
\u2192 Step 1: \`create_room\` origin=[0,0], width=5, depth=4 (\u5BA2\u5385, with door)
\u2192 Step 2: \`create_room\` origin=[5,0], width=3.5, depth=4 (\u5367\u5BA41)
\u2192 Step 3: \`create_room\` origin=[0,4], width=3.5, depth=3.5 (\u5367\u5BA42)
\u2192 Create zones for each room.
Or use \`create_apartment\` for a simpler grid layout.

### "\u521B\u5EFA\u4E00\u4E2A\u5E26\u5BB6\u5177\u7684\u4E09\u5BA4\u4E24\u5385\u4E24\u536B"
Plan: Hallway-centered layout \u2014 main corridor with rooms on both sides.
\`\`\`
Z \u2191
  | [Kitchen 3\xD73][DiningRoom 3\xD73][Bathroom2 2.5\xD73]
  | [Hallway 1.5\xD79 \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014]
  | [LivingRoom 5\xD74][Bedroom1 3.5\xD74][Bedroom2 3.5\xD74]
  +\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2192 X
\`\`\`
\u2192 Use \`create_furnished_apartment\` with rooms array, maxRowWidth set to total width.

### "\u521B\u5EFA\u5F00\u653E\u5F0F\u5DE5\u4F5C\u5BA4 / Studio"
Plan: One large room (8\xD76), no interior walls. Use zones to define functional areas.
\u2192 \`create_room\` width=8, depth=6, addDoor=true, addWindows=true
\u2192 \`create_zone\` for "\u8D77\u5C45\u533A" (left half), "\u5DE5\u4F5C\u533A" (right half), "\u53A8\u623F\u533A" (corner)
\u2192 \`furnish_room\` roomType="living" for one area, \`place_furniture\` for others

### "\u5728\u5357\u9762\u5899\u4E0A\u52A0\u4E00\u6247\u7A97\u6237"
\u2192 \`get_scene_info\` to find the south wall's ID
\u2192 \`add_window_to_wall\` with that wallId and position_t=0.5

### "\u628A\u6240\u6709\u5899\u9AD8\u6539\u62103\u7C73"
\u2192 \`get_scene_info\` to collect all wall IDs
\u2192 \`batch_modify_nodes\` with all wall IDs and updates: {height: 3}

### "\u521B\u5EFA\u4E00\u4E2A\u4E09\u89D2\u5F62\u7684\u623F\u95F4"
\u2192 \`create_polygon_room\` with polygon: [[0,0], [5,0], [2.5,4]], addDoor=true, zoneName="\u4E09\u89D2\u623F\u95F4"

### "\u521B\u5EFA\u522B\u5885"
Plan: L-shaped, two wings \u2014 public (living+dining+kitchen) and private (bedrooms+bathroom).
\u2192 Public wing: \`create_apartment\` with \u5BA2\u5385+\u9910\u5385+\u53A8\u623F along X axis
\u2192 Private wing: \`create_apartment\` with \u5367\u5BA4+\u536B\u751F\u95F4 along Z axis, origin offset to form L
\u2192 Connect with \`create_hallway\`

### "\u64A4\u9500\u521A\u624D\u7684\u64CD\u4F5C"
\u2192 \`undo\`
`;

// packages/editor/src/lib/agent/tools.ts
var agentTools = [
  {
    type: "function",
    function: {
      name: "create_walls",
      description: "Create one or more walls on the current level. Each wall is defined by start and end points [x, z] in meters. Walls should form closed loops for rooms.",
      parameters: {
        type: "object",
        properties: {
          walls: {
            type: "array",
            items: {
              type: "object",
              properties: {
                start: {
                  type: "array",
                  items: { type: "number" },
                  minItems: 2,
                  maxItems: 2,
                  description: "Start point [x, z] in meters"
                },
                end: {
                  type: "array",
                  items: { type: "number" },
                  minItems: 2,
                  maxItems: 2,
                  description: "End point [x, z] in meters"
                },
                thickness: {
                  type: "number",
                  description: "Wall thickness in meters (default: 0.15)"
                },
                height: {
                  type: "number",
                  description: "Wall height in meters (default: 2.8)"
                }
              },
              required: ["start", "end"]
            },
            description: "Array of wall definitions"
          }
        },
        required: ["walls"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_slab",
      description: "Create a floor slab defined by a polygon of [x, z] points. Points should be in counter-clockwise order.",
      parameters: {
        type: "object",
        properties: {
          polygon: {
            type: "array",
            items: {
              type: "array",
              items: { type: "number" },
              minItems: 2,
              maxItems: 2
            },
            description: "Array of [x, z] points defining the slab boundary"
          },
          elevation: {
            type: "number",
            description: "Slab elevation/thickness in meters (default: 0.05)"
          }
        },
        required: ["polygon"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_door",
      description: "Create a door on a specified wall. The door is positioned along the wall using a parametric t value (0-1).",
      parameters: {
        type: "object",
        properties: {
          wallIndex: {
            type: "integer",
            description: "Index of the wall (from the most recently created walls) to place the door on. 0-based."
          },
          width: {
            type: "number",
            description: "Door width in meters (default: 0.9)"
          },
          height: {
            type: "number",
            description: "Door height in meters (default: 2.1)"
          },
          position_t: {
            type: "number",
            description: "Parametric position along the wall from 0 (start) to 1 (end). 0.5 = center."
          }
        },
        required: ["wallIndex"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_window",
      description: "Create a window on a specified wall. The window is positioned along the wall using a parametric t value (0-1).",
      parameters: {
        type: "object",
        properties: {
          wallIndex: {
            type: "integer",
            description: "Index of the wall (from the most recently created walls) to place the window on. 0-based."
          },
          width: {
            type: "number",
            description: "Window width in meters (default: 1.5)"
          },
          height: {
            type: "number",
            description: "Window height in meters (default: 1.5)"
          },
          position_t: {
            type: "number",
            description: "Parametric position along the wall from 0 (start) to 1 (end). 0.5 = center."
          },
          sillHeight: {
            type: "number",
            description: "Height of window sill from floor in meters (default: 0.9)"
          }
        },
        required: ["wallIndex"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_room",
      description: "High-level helper: Create a complete rectangular room with walls and floor slab. Optionally add a door and windows.",
      parameters: {
        type: "object",
        properties: {
          origin: {
            type: "array",
            items: { type: "number" },
            minItems: 2,
            maxItems: 2,
            description: "Bottom-left corner [x, z] of the room in meters (default: [0, 0])"
          },
          width: {
            type: "number",
            description: "Room width along X axis in meters"
          },
          depth: {
            type: "number",
            description: "Room depth along Z axis in meters"
          },
          wallHeight: {
            type: "number",
            description: "Wall height in meters (default: 2.8)"
          },
          wallThickness: {
            type: "number",
            description: "Wall thickness in meters (default: 0.15)"
          },
          addDoor: {
            type: "boolean",
            description: "Whether to add a door on the front wall (default: true)"
          },
          doorWall: {
            type: "string",
            enum: ["front", "back", "left", "right"],
            description: "Which wall to place the door on (default: front)"
          },
          addWindows: {
            type: "boolean",
            description: "Whether to add windows (default: false)"
          },
          addCeiling: {
            type: "boolean",
            description: "Whether to add a ceiling (default: false)"
          },
          ceilingHeight: {
            type: "number",
            description: "Ceiling height in meters (default: wallHeight - 0.3, or 2.5)"
          }
        },
        required: ["width", "depth"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_ceiling",
      description: "Create a ceiling defined by a polygon of [x, z] points, at a given height. The polygon should match the room boundary.",
      parameters: {
        type: "object",
        properties: {
          polygon: {
            type: "array",
            items: {
              type: "array",
              items: { type: "number" },
              minItems: 2,
              maxItems: 2
            },
            description: "Array of [x, z] points defining the ceiling boundary"
          },
          height: {
            type: "number",
            description: "Ceiling height in meters (default: 2.5)"
          }
        },
        required: ["polygon"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_zone",
      description: "Create a named zone (labeled area) on the current level. Zones are colored polygonal regions used to label rooms and spaces.",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: 'Name/label of the zone (e.g., "Living Room", "Kitchen", "Bedroom")'
          },
          polygon: {
            type: "array",
            items: {
              type: "array",
              items: { type: "number" },
              minItems: 2,
              maxItems: 2
            },
            description: "Array of [x, z] points defining the zone boundary"
          },
          color: {
            type: "string",
            description: 'Hex color for the zone (default: "#3b82f6" blue)'
          },
          roomType: {
            type: "string",
            enum: ["bedroom", "living", "kitchen", "bathroom", "dining", "balcony", "corridor", "entry", "other"],
            description: "Optional semantic room type for building-rule validation. If omitted, validators infer it from the zone name."
          }
        },
        required: ["name", "polygon"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_roof",
      description: "Create a roof on the current level. Supports various roof types: gable, hip, shed, flat, gambrel, dutch, mansard.",
      parameters: {
        type: "object",
        properties: {
          position: {
            type: "array",
            items: { type: "number" },
            minItems: 3,
            maxItems: 3,
            description: "Center position [x, y, z] of the roof (default: [0, 0, 0])"
          },
          rotation: {
            type: "number",
            description: "Rotation around Y axis in degrees (default: 0)"
          },
          roofType: {
            type: "string",
            enum: ["gable", "hip", "shed", "flat", "gambrel", "dutch", "mansard"],
            description: 'Type of roof (default: "gable")'
          },
          width: {
            type: "number",
            description: "Roof footprint width in meters (default: 8)"
          },
          depth: {
            type: "number",
            description: "Roof footprint depth in meters (default: 6)"
          },
          wallHeight: {
            type: "number",
            description: "Height of walls below the roof in meters (default: 0.5)"
          },
          roofHeight: {
            type: "number",
            description: "Height of the roof peak above walls in meters (default: 2.5)"
          },
          overhang: {
            type: "number",
            description: "Eave overhang distance in meters (default: 0.3)"
          }
        },
        required: []
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_apartment",
      description: "High-level helper: Create a simple multi-room apartment layout. Rooms are placed adjacent to each other in rows. For complex/code-sensitive requests, use this only for the layout phase, then validate before adding openings, furniture, roof, or details.",
      parameters: {
        type: "object",
        properties: {
          origin: {
            type: "array",
            items: { type: "number" },
            minItems: 2,
            maxItems: 2,
            description: "Bottom-left corner [x, z] of the apartment (default: [0, 0])"
          },
          rooms: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: 'Room name (e.g., "Living Room", "Bedroom")'
                },
                width: {
                  type: "number",
                  description: "Room width along X axis in meters"
                },
                depth: {
                  type: "number",
                  description: "Room depth along Z axis in meters"
                },
                hasDoor: {
                  type: "boolean",
                  description: "Whether this room has a door (default: true)"
                },
                hasWindow: {
                  type: "boolean",
                  description: "Whether this room has windows (default: false)"
                },
                roomType: {
                  type: "string",
                  enum: ["bedroom", "living", "kitchen", "bathroom", "dining", "balcony", "corridor", "entry", "other"],
                  description: "Optional semantic room type stored on the room zone for building-rule validation."
                }
              },
              required: ["name", "width", "depth"]
            },
            description: "List of rooms to create. Rooms are laid out left-to-right then wrap to next row."
          },
          wallHeight: {
            type: "number",
            description: "Wall height in meters (default: 2.8)"
          },
          wallThickness: {
            type: "number",
            description: "Wall thickness in meters (default: 0.15)"
          },
          maxRowWidth: {
            type: "number",
            description: "Maximum width before wrapping to next row (default: 20)"
          }
        },
        required: ["rooms"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_l_shaped_room",
      description: "Create an L-shaped room defined by two overlapping rectangles. Creates walls, floor slab, and optional door.",
      parameters: {
        type: "object",
        properties: {
          origin: {
            type: "array",
            items: { type: "number" },
            minItems: 2,
            maxItems: 2,
            description: "Bottom-left corner [x, z] (default: [0, 0])"
          },
          mainWidth: {
            type: "number",
            description: "Width of the main (longer) section in meters"
          },
          mainDepth: {
            type: "number",
            description: "Depth of the main section in meters"
          },
          wingWidth: {
            type: "number",
            description: "Width of the wing (shorter) section in meters"
          },
          wingDepth: {
            type: "number",
            description: "Depth of the wing section in meters"
          },
          wallHeight: {
            type: "number",
            description: "Wall height in meters (default: 2.8)"
          },
          addDoor: {
            type: "boolean",
            description: "Whether to add a door on the front wall (default: true)"
          }
        },
        required: ["mainWidth", "mainDepth", "wingWidth", "wingDepth"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "modify_node",
      description: "Modify properties of an existing node by its ID. Can change wall height/thickness, door/window dimensions, zone color/name, etc.",
      parameters: {
        type: "object",
        properties: {
          nodeId: {
            type: "string",
            description: "The ID of the node to modify"
          },
          updates: {
            type: "object",
            description: "Properties to update. Depends on node type. Walls: { height, thickness }, Doors: { width, height }, Windows: { width, height }, Zones: { name, color }."
          }
        },
        required: ["nodeId", "updates"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "delete_all_on_level",
      description: "Delete all walls, slabs, doors, windows, ceilings, zones, and roofs on the current level. Useful for starting over.",
      parameters: {
        type: "object",
        properties: {},
        required: []
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_scene_info",
      description: "Get information about the current scene: number of walls, slabs, doors, windows, ceilings, zones, roofs and their basic properties. Use this BEFORE making changes to understand the current state.",
      parameters: {
        type: "object",
        properties: {},
        required: []
      }
    }
  },
  {
    type: "function",
    function: {
      name: "undo",
      description: "Undo the last scene change. Can be called multiple times to undo multiple steps.",
      parameters: {
        type: "object",
        properties: {},
        required: []
      }
    }
  },
  {
    type: "function",
    function: {
      name: "redo",
      description: "Redo the last undone scene change.",
      parameters: {
        type: "object",
        properties: {},
        required: []
      }
    }
  },
  {
    type: "function",
    function: {
      name: "delete_node",
      description: "Delete a specific node by its ID. Also deletes all children (e.g., deleting a wall also removes its doors/windows).",
      parameters: {
        type: "object",
        properties: {
          nodeId: {
            type: "string",
            description: "The ID of the node to delete"
          }
        },
        required: ["nodeId"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "select_node",
      description: "Select a node in the viewer to highlight it. Useful after creating something so the user can see what was made.",
      parameters: {
        type: "object",
        properties: {
          nodeId: {
            type: "string",
            description: "The ID of the node to select"
          }
        },
        required: ["nodeId"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "move_nodes",
      description: "Move one or more nodes by a delta offset [dx, dz]. For walls this shifts both start and end points. For slabs/zones/ceilings it shifts all polygon vertices. For doors/windows it is not supported (move the parent wall instead).",
      parameters: {
        type: "object",
        properties: {
          nodeIds: {
            type: "array",
            items: { type: "string" },
            description: "Array of node IDs to move"
          },
          delta: {
            type: "array",
            items: { type: "number" },
            minItems: 2,
            maxItems: 2,
            description: "Offset [dx, dz] in meters to shift the nodes"
          }
        },
        required: ["nodeIds", "delta"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "add_door_to_wall",
      description: "Place a door on an existing wall identified by its wall ID (not index). Use this when you know the wall ID from get_scene_info.",
      parameters: {
        type: "object",
        properties: {
          wallId: {
            type: "string",
            description: "The ID of the wall to place the door on"
          },
          width: {
            type: "number",
            description: "Door width in meters (default: 0.9)"
          },
          height: {
            type: "number",
            description: "Door height in meters (default: 2.1)"
          },
          position_t: {
            type: "number",
            description: "Parametric position along the wall 0-1 (default: 0.5 = center)"
          }
        },
        required: ["wallId"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "add_window_to_wall",
      description: "Place a window on an existing wall identified by its wall ID (not index). Use this when you know the wall ID from get_scene_info.",
      parameters: {
        type: "object",
        properties: {
          wallId: {
            type: "string",
            description: "The ID of the wall to place the window on"
          },
          width: {
            type: "number",
            description: "Window width in meters (default: 1.5)"
          },
          height: {
            type: "number",
            description: "Window height in meters (default: 1.5)"
          },
          position_t: {
            type: "number",
            description: "Parametric position along the wall 0-1 (default: 0.5 = center)"
          },
          sillHeight: {
            type: "number",
            description: "Height of window sill from floor in meters (default: 0.9)"
          }
        },
        required: ["wallId"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "batch_modify_nodes",
      description: "Modify the same property on multiple nodes at once. Useful for changing all wall heights, all zone colors, etc.",
      parameters: {
        type: "object",
        properties: {
          nodeIds: {
            type: "array",
            items: { type: "string" },
            description: "Array of node IDs to modify"
          },
          updates: {
            type: "object",
            description: "Properties to update on all specified nodes"
          }
        },
        required: ["nodeIds", "updates"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_polygon_room",
      description: "Create a room from a custom polygon outline (not limited to rectangles). Creates walls along each edge, a floor slab, and optionally a door on one edge.",
      parameters: {
        type: "object",
        properties: {
          polygon: {
            type: "array",
            items: {
              type: "array",
              items: { type: "number" },
              minItems: 2,
              maxItems: 2
            },
            description: "Array of [x, z] vertices defining the room outline (at least 3 points, counter-clockwise)"
          },
          wallHeight: {
            type: "number",
            description: "Wall height in meters (default: 2.8)"
          },
          wallThickness: {
            type: "number",
            description: "Wall thickness in meters (default: 0.15)"
          },
          addDoor: {
            type: "boolean",
            description: "Whether to add a door on the first edge (default: true)"
          },
          doorEdgeIndex: {
            type: "integer",
            description: "Which edge to place the door on, 0-based (default: 0)"
          },
          addSlab: {
            type: "boolean",
            description: "Whether to add a floor slab (default: true)"
          },
          zoneName: {
            type: "string",
            description: "Optional zone label name. If provided, a zone is also created."
          },
          zoneColor: {
            type: "string",
            description: 'Hex color for the zone (default: "#3b82f6")'
          },
          zoneRoomType: {
            type: "string",
            enum: ["bedroom", "living", "kitchen", "bathroom", "dining", "balcony", "corridor", "entry", "other"],
            description: "Optional semantic room type stored on the generated zone for building-rule validation."
          }
        },
        required: ["polygon"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "place_furniture",
      description: "Low-level fallback: place a furniture item at exact coordinates. Prefer suggest_furniture_layout, place_furniture_solved, place_in_room, place_against_wall, or furnish_room so the solver can avoid walls, doors, windows, collisions, and circulation conflicts. Available IDs: sofa, lounge-chair, livingroom-chair, stool, coffee-table, tv-stand, bookshelf, floor-lamp, ceiling-lamp, recessed-light, table-lamp, rectangular-carpet, round-carpet, indoor-plant, small-indoor-plant, cactus, double-bed, single-bed, bunkbed, bedside-table, closet, dresser, dining-table, dining-chair, office-table, office-chair, kitchen-counter, kitchen-cabinet, kitchen, stove, fridge, microwave, toilet, bathtub, bathroom-sink, shower-square, shower-angle, washing-machine, television, computer, stairs, column, piano, pool-table, coat-rack, trash-bin, picture, round-mirror, shelf.",
      parameters: {
        type: "object",
        properties: {
          type: {
            type: "string",
            description: 'Catalog item ID (e.g., "sofa", "double-bed", "office-table"). See description for full list.'
          },
          position: {
            type: "array",
            items: { type: "number" },
            minItems: 3,
            maxItems: 3,
            description: "Position [x, y, z] in level coordinates. x = left/right, y = height offset (usually 0), z = front/back."
          },
          rotation: {
            type: "number",
            description: "Rotation around Y axis in degrees. 0 = facing -Z (south), 90 = facing -X (west), 180 = facing +Z (north), 270 = facing +X (east)."
          }
        },
        required: ["type"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "suggest_furniture_layout",
      description: "Solve furniture placement without creating nodes. Uses shared room constraints, existing furniture, doors, windows, main circulation paths, use-clearance, and room relationship rules to return feasible placements, final scores, constraintSummary, relationshipSummary, substitutions, and structured rejection reasons. Use before placing furniture when layout quality matters.",
      parameters: {
        type: "object",
        properties: {
          roomType: {
            type: "string",
            enum: ["bedroom", "living", "kitchen", "bathroom", "dining", "office", "entryway", "balcony", "kids", "laundry", "gym", "guest"],
            description: "Semantic room type used to choose default furniture and placement rules."
          },
          items: {
            type: "array",
            items: { type: "string" },
            description: "Optional catalog item IDs to solve. If omitted, defaults are chosen from roomType."
          },
          slabId: {
            type: "string",
            description: "Preferred: slab ID for the room to furnish."
          },
          roomOrigin: {
            type: "array",
            items: { type: "number" },
            minItems: 2,
            maxItems: 2,
            description: "Fallback room bottom-left [x, z] when slabId is not available."
          },
          roomWidth: { type: "number", description: "Fallback room width in meters." },
          roomDepth: { type: "number", description: "Fallback room depth in meters." },
          wallThickness: {
            type: "number",
            description: "Wall thickness in meters for fallback room bounds (default: 0.15)."
          },
          codeProfile: {
            type: "string",
            enum: ["residential_default", "china_residential"],
            description: "Optional profile for clearance expectations. Defaults to residential_default."
          }
        },
        required: ["roomType"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "place_furniture_solved",
      description: "Create furniture using the deterministic spatial solver. It avoids room bounds, doors, windows, existing furniture, main circulation paths, use-clearance conflicts, and bad furniture relationships. If critical furniture cannot fit, it returns structured rejections instead of creating a broken layout. Prefer this over raw place_furniture for multi-item or code-sensitive furnishing.",
      parameters: {
        type: "object",
        properties: {
          roomType: {
            type: "string",
            enum: ["bedroom", "living", "kitchen", "bathroom", "dining", "office", "entryway", "balcony", "kids", "laundry", "gym", "guest"],
            description: "Semantic room type used to choose default furniture and placement rules."
          },
          items: {
            type: "array",
            items: { type: "string" },
            description: "Optional catalog item IDs to create. If omitted, defaults are chosen from roomType."
          },
          slabId: { type: "string", description: "Preferred: slab ID for the room to furnish." },
          roomOrigin: {
            type: "array",
            items: { type: "number" },
            minItems: 2,
            maxItems: 2,
            description: "Fallback room bottom-left [x, z] when slabId is not available."
          },
          roomWidth: { type: "number", description: "Fallback room width in meters." },
          roomDepth: { type: "number", description: "Fallback room depth in meters." },
          wallThickness: {
            type: "number",
            description: "Wall thickness in meters for fallback room bounds (default: 0.15)."
          },
          codeProfile: {
            type: "string",
            enum: ["residential_default", "china_residential"],
            description: "Optional profile for clearance expectations. Defaults to residential_default."
          }
        },
        required: ["roomType"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "place_in_room",
      description: 'Place a furniture item in a room using a semantic anchor (e.g., "north-wall", "center", "southeast-corner") instead of raw coordinates. The system auto-computes the correct world position, clamping to wall interior faces. Requires room bounds (via roomOrigin+roomWidth+roomDepth or slabId). Returns bbox and containment info.',
      parameters: {
        type: "object",
        properties: {
          type: {
            type: "string",
            description: 'Catalog item ID (e.g., "sofa", "double-bed", "office-table")'
          },
          anchor: {
            type: "string",
            enum: [
              "center",
              "north-wall",
              "south-wall",
              "east-wall",
              "west-wall",
              "northwest-corner",
              "northeast-corner",
              "southwest-corner",
              "southeast-corner"
            ],
            description: 'Semantic position within the room (default: "center")'
          },
          orientation: {
            type: "string",
            description: 'Facing direction: "auto" (faces room center from anchor), "facing-north", "facing-south", "facing-east", "facing-west", or a number in degrees. Default: "auto".'
          },
          roomOrigin: {
            type: "array",
            items: { type: "number" },
            minItems: 2,
            maxItems: 2,
            description: "Room bottom-left corner [x, z]. Use spatialContext.roomBounds from create_room result."
          },
          roomWidth: {
            type: "number",
            description: "Room width (X) in meters"
          },
          roomDepth: {
            type: "number",
            description: "Room depth (Z) in meters"
          },
          slabId: {
            type: "string",
            description: "Alternative: provide slab ID instead of roomOrigin/width/depth. Room bounds will be derived from the slab polygon."
          },
          wallThickness: {
            type: "number",
            description: "Wall thickness in meters (default: 0.15). Used to compute interior bounds."
          },
          offsetFromWall: {
            type: "number",
            description: "Gap between item and wall face in meters (default: 0.05)"
          }
        },
        required: ["type"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "place_against_wall",
      description: "Place a furniture item against a specific wall, at a position along the wall (0-1). Automatically computes the correct perpendicular offset so the item sits flush against the wall interior face. Ideal for bookshelves, desks, kitchen counters, etc.",
      parameters: {
        type: "object",
        properties: {
          type: {
            type: "string",
            description: 'Catalog item ID (e.g., "bookshelf", "kitchen-counter", "tv-stand")'
          },
          wallId: {
            type: "string",
            description: "ID of the wall to place against. Get from create_room spatialContext.wallsByFace or get_scene_info."
          },
          position_t: {
            type: "number",
            description: "Position along wall from 0 (start) to 1 (end). 0.5 = center. Default: 0.5."
          },
          facing: {
            type: "string",
            enum: ["toward-wall", "away-from-wall"],
            description: 'Item faces toward the wall (back flush) or away from wall (front flush). Default: "toward-wall".'
          },
          offsetFromWall: {
            type: "number",
            description: "Gap between item and wall face in meters (default: 0.05)"
          }
        },
        required: ["type", "wallId"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "furnish_room",
      description: "Automatically furnish a room with appropriate furniture based on room type. Places furniture items using built-in layout presets. For small rooms (<6m\xB2), large items are automatically swapped for smaller alternatives. Supported room types: bedroom, living, kitchen, bathroom, dining, office, entryway, balcony, kids, laundry, gym, guest.",
      parameters: {
        type: "object",
        properties: {
          roomType: {
            type: "string",
            enum: ["bedroom", "living", "kitchen", "bathroom", "dining", "office", "entryway", "balcony", "kids", "laundry", "gym", "guest"],
            description: "Type of room to furnish"
          },
          origin: {
            type: "array",
            items: { type: "number" },
            minItems: 2,
            maxItems: 2,
            description: "Bottom-left corner [x, z] of the room (default: [0, 0])"
          },
          width: {
            type: "number",
            description: "Room width along X axis in meters (default: 5)"
          },
          depth: {
            type: "number",
            description: "Room depth along Z axis in meters (default: 4)"
          },
          wallThickness: {
            type: "number",
            description: "Wall thickness in meters (default: 0.15). Used to compute interior space for furniture placement."
          }
        },
        required: ["roomType"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_hallway",
      description: "Create a hallway/corridor between two points. Creates two parallel walls and a floor slab. The hallway has no end walls so it can connect to rooms.",
      parameters: {
        type: "object",
        properties: {
          from: {
            type: "array",
            items: { type: "number" },
            minItems: 2,
            maxItems: 2,
            description: "Start center point [x, z] of the hallway"
          },
          to: {
            type: "array",
            items: { type: "number" },
            minItems: 2,
            maxItems: 2,
            description: "End center point [x, z] of the hallway"
          },
          width: {
            type: "number",
            description: "Hallway width in meters (default: 1.2)"
          },
          wallHeight: {
            type: "number",
            description: "Wall height in meters (default: 2.8)"
          },
          wallThickness: {
            type: "number",
            description: "Wall thickness in meters (default: 0.15)"
          },
          addSlab: {
            type: "boolean",
            description: "Whether to add a floor slab (default: true)"
          }
        },
        required: ["from", "to"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "list_furniture",
      description: "List all available furniture types in the catalog with their names, categories, and dimensions. Use this to check what furniture is available before placing items.",
      parameters: {
        type: "object",
        properties: {},
        required: []
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_building_shell",
      description: "Create a complete single-room building shell in one call: 4 walls + floor slab + ceiling + optional roof with door and windows. Use for small/simple shells only. For houses, villas, offices, multi-room, or code-sensitive work, generate in phases and validate between phases.",
      parameters: {
        type: "object",
        properties: {
          origin: {
            type: "array",
            items: { type: "number" },
            minItems: 2,
            maxItems: 2,
            description: "Bottom-left corner [x, z] (default: [0, 0])"
          },
          width: {
            type: "number",
            description: "Building width along X axis in meters (default: 10)"
          },
          depth: {
            type: "number",
            description: "Building depth along Z axis in meters (default: 8)"
          },
          wallHeight: {
            type: "number",
            description: "Wall height in meters (default: 2.8)"
          },
          wallThickness: {
            type: "number",
            description: "Wall thickness in meters (default: 0.15)"
          },
          addRoof: {
            type: "boolean",
            description: "Whether to add a roof (default: true)"
          },
          roofType: {
            type: "string",
            enum: ["gable", "hip", "shed", "flat", "gambrel", "dutch", "mansard"],
            description: 'Type of roof (default: "gable")'
          },
          ceilingHeight: {
            type: "number",
            description: "Ceiling height in meters (default: wallHeight - 0.3)"
          }
        },
        required: []
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_furnished_apartment",
      description: "Rapid concept helper: create a simple multi-room apartment AND automatically furnish each room based on its name/type. Combines create_apartment + furnish_room. Do NOT use for complex, production, code-sensitive, multi-story, villa, office, or user-reviewed generation; instead create layout, validate, add openings, validate, then furnish.",
      parameters: {
        type: "object",
        properties: {
          origin: {
            type: "array",
            items: { type: "number" },
            minItems: 2,
            maxItems: 2,
            description: "Bottom-left corner [x, z] (default: [0, 0])"
          },
          rooms: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: 'Room name (e.g., "\u5BA2\u5385", "\u5367\u5BA4", "\u53A8\u623F"). Name is used to auto-detect furniture type.'
                },
                width: {
                  type: "number",
                  description: "Room width along X axis in meters"
                },
                depth: {
                  type: "number",
                  description: "Room depth along Z axis in meters"
                },
                roomType: {
                  type: "string",
                  enum: ["bedroom", "living", "kitchen", "bathroom", "dining", "office"],
                  description: "Explicit room type for furniture (optional, auto-detected from name)"
                },
                hasDoor: {
                  type: "boolean",
                  description: "Whether this room has a door (default: true)"
                },
                hasWindow: {
                  type: "boolean",
                  description: "Whether this room has windows (default: false)"
                }
              },
              required: ["name", "width", "depth"]
            },
            description: "List of rooms. Rooms are laid out left-to-right, wrapping at maxRowWidth."
          },
          wallHeight: {
            type: "number",
            description: "Wall height in meters (default: 2.8)"
          },
          wallThickness: {
            type: "number",
            description: "Wall thickness in meters (default: 0.15)"
          },
          maxRowWidth: {
            type: "number",
            description: "Maximum width before wrapping to next row (default: 20)"
          }
        },
        required: ["rooms"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "mirror_room",
      description: "Create a mirror copy of a room adjacent to the original. Useful for creating symmetrical layouts (e.g., two identical bedrooms side by side).",
      parameters: {
        type: "object",
        properties: {
          sourceOrigin: {
            type: "array",
            items: { type: "number" },
            minItems: 2,
            maxItems: 2,
            description: "Bottom-left corner [x, z] of the original room"
          },
          sourceWidth: {
            type: "number",
            description: "Width of the original room in meters"
          },
          sourceDepth: {
            type: "number",
            description: "Depth of the original room in meters"
          },
          axis: {
            type: "string",
            enum: ["x", "z"],
            description: 'Mirror axis: "x" places new room to the right, "z" places it behind (default: "x")'
          },
          wallHeight: {
            type: "number",
            description: "Wall height in meters (default: 2.8)"
          },
          wallThickness: {
            type: "number",
            description: "Wall thickness in meters (default: 0.15)"
          },
          addDoor: {
            type: "boolean",
            description: "Whether to add a door (default: true)"
          },
          addWindows: {
            type: "boolean",
            description: "Whether to add windows (default: false)"
          },
          roomName: {
            type: "string",
            description: "Optional zone label name for the mirrored room"
          }
        },
        required: ["sourceOrigin", "sourceWidth", "sourceDepth"]
      }
    }
  },
  // ── Level Management Tools ──
  {
    type: "function",
    function: {
      name: "add_level",
      description: "Add a new level (floor) to the building. Automatically sets the level number. The new level becomes active.",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: 'Optional name for the level (e.g., "2nd Floor", "Attic")'
          }
        },
        required: []
      }
    }
  },
  {
    type: "function",
    function: {
      name: "switch_level",
      description: "Switch the active level by level number or ID. Use list_levels to see available levels.",
      parameters: {
        type: "object",
        properties: {
          level: {
            type: "number",
            description: "Level number (0 = ground floor, 1 = first floor, etc.)"
          },
          levelId: {
            type: "string",
            description: "Level node ID (alternative to level number)"
          }
        },
        required: []
      }
    }
  },
  {
    type: "function",
    function: {
      name: "delete_level",
      description: "Delete a level and all its contents (walls, slabs, furniture, etc.). Cannot delete level 0 (ground floor).",
      parameters: {
        type: "object",
        properties: {
          level: {
            type: "number",
            description: "Level number to delete"
          },
          levelId: {
            type: "string",
            description: "Level node ID (alternative to level number)"
          }
        },
        required: []
      }
    }
  },
  {
    type: "function",
    function: {
      name: "rename_level",
      description: "Rename a level. If no level specified, renames the active level.",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "New name for the level"
          },
          level: {
            type: "number",
            description: "Level number to rename"
          },
          levelId: {
            type: "string",
            description: "Level node ID (alternative to level number)"
          }
        },
        required: ["name"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "duplicate_level",
      description: "Deep-copy all contents of a level (walls, doors, windows, slabs, ceilings, furniture, zones, roofs) to a new level. Great for creating multi-story buildings with identical floor plans. Supports horizontal offset for split-level/staggered buildings, and selective copying to include/exclude specific element types.",
      parameters: {
        type: "object",
        properties: {
          sourceLevel: {
            type: "number",
            description: "Source level number to copy from (default: active level)"
          },
          sourceLevelId: {
            type: "string",
            description: "Source level ID (alternative to level number)"
          },
          name: {
            type: "string",
            description: "Name for the new level"
          },
          offset: {
            type: "array",
            items: { type: "number" },
            minItems: 2,
            maxItems: 2,
            description: "Horizontal offset [dx, dz] in meters to shift all copied elements. Use for split-level or staggered buildings. Default: [0, 0]"
          },
          include: {
            type: "array",
            items: { type: "string" },
            description: "Only copy these element types. Values: wall, slab, ceiling, zone, roof, door, window, item. If omitted, copies everything."
          },
          exclude: {
            type: "array",
            items: { type: "string" },
            description: "Skip these element types. Values: wall, slab, ceiling, zone, roof, door, window, item. Ignored if include is set."
          },
          skipRoof: {
            type: "boolean",
            description: 'Skip roof and roof segments (shortcut for exclude: ["roof"]). Useful for mid-floor duplication. Default: false'
          }
        },
        required: []
      }
    }
  },
  {
    type: "function",
    function: {
      name: "list_levels",
      description: "List all levels in the building with their content counts (walls, slabs, zones, etc.). Shows which level is currently active.",
      parameters: {
        type: "object",
        properties: {},
        required: []
      }
    }
  },
  // ── Wall/Ceiling Attached Item Tools ──
  {
    type: "function",
    function: {
      name: "place_wall_item",
      description: "Place a wall-mounted item on a specific wall. Items include: picture, round-mirror, shelf, ev-wall-charger, thermostat, television, kitchen-counter, kitchen-cabinet, bathroom-sink, microwave, coat-rack. Use get_scene_info to find wall IDs first.",
      parameters: {
        type: "object",
        properties: {
          type: {
            type: "string",
            description: 'Catalog item ID for the wall item (e.g., "picture", "round-mirror", "shelf")'
          },
          wallId: {
            type: "string",
            description: "ID of the wall to attach the item to"
          },
          wallT: {
            type: "number",
            description: "Position along the wall (0 = start, 0.5 = center, 1 = end). Default: 0.5"
          },
          heightOffset: {
            type: "number",
            description: "Height offset from floor in meters. Default: 1.2"
          },
          side: {
            type: "string",
            enum: ["front", "back"],
            description: "Which side of the wall to place on. Default: front"
          }
        },
        required: ["type", "wallId"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "place_ceiling_item",
      description: "Place a ceiling-mounted item. Items include: ceiling-lamp, recessed-light, smoke-detector, sprinkler. Automatically finds the ceiling on the current level.",
      parameters: {
        type: "object",
        properties: {
          type: {
            type: "string",
            description: 'Catalog item ID (e.g., "ceiling-lamp", "recessed-light", "smoke-detector")'
          },
          position: {
            type: "array",
            items: { type: "number" },
            minItems: 3,
            maxItems: 3,
            description: "Position [x, y, z]. x/z = horizontal position, y = usually ceiling height."
          },
          ceilingId: {
            type: "string",
            description: "Optional ceiling node ID. If omitted, uses first ceiling on active level."
          }
        },
        required: ["type"]
      }
    }
  },
  // ── Macro Building & Modeling ──
  {
    type: "function",
    function: {
      name: "auto_align_windows",
      description: "Automatically place and align windows evenly across multiple specified walls.",
      parameters: {
        type: "object",
        properties: {
          wallIds: {
            type: "array",
            items: { type: "string" },
            description: "Array of wall IDs to add windows to."
          },
          windowWidth: {
            type: "number",
            description: "Width of each window in meters (default: 1.5)."
          },
          windowHeight: {
            type: "number",
            description: "Height of each window in meters (default: 1.5)."
          },
          sillHeight: {
            type: "number",
            description: "Height of the window sill from the floor in meters (default: 0.9)."
          },
          spacing: {
            type: "number",
            description: "Target spacing between windows in meters (default: 1.0)."
          }
        },
        required: ["wallIds"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "build_staircase",
      description: "Build a staircase connecting two specific levels, including necessary slab cutouts.",
      parameters: {
        type: "object",
        properties: {
          startLevelId: {
            type: "string",
            description: "The ID of the lower level where the staircase starts."
          },
          endLevelId: {
            type: "string",
            description: "The ID of the upper level where the staircase ends."
          },
          position: {
            type: "array",
            items: { type: "number" },
            minItems: 3,
            maxItems: 3,
            description: "Position [x, y, z] on the start level where the staircase begins."
          },
          type: {
            type: "string",
            enum: ["straight", "l-shaped", "u-shaped", "spiral"],
            description: "The type/shape of the staircase (default: straight)."
          }
        },
        required: ["startLevelId", "endLevelId"]
      }
    }
  },
  // ── Spatial Validation ──
  {
    type: "function",
    function: {
      name: "validate_scene",
      description: "Validate and auto-correct spatial issues on the current level. Fixes: wall endpoint gaps (snaps within 5cm), furniture outside room boundaries (nudges inside), door/window overflows (clamps position). Reports warnings for wall gaps, overlaps, circulation, simplified building-code guardrails, daylight/ventilation, door widths, corridor widths, room proportions, and upper-floor fall hazards. Auto-runs after every scene modification, but can be called manually to inspect before continuing.",
      parameters: {
        type: "object",
        properties: {
          codeProfile: {
            type: "string",
            enum: ["residential_default", "china_residential"],
            description: "Optional building-rule profile. Defaults to residential_default; use china_residential for Chinese residential layouts."
          }
        },
        required: []
      }
    }
  }
];

// packages/editor/src/store/use-agent.ts
var SCENE_MODIFYING_TOOLS = /* @__PURE__ */ new Set([
  "create_walls",
  "create_slab",
  "create_door",
  "create_window",
  "create_room",
  "create_ceiling",
  "create_zone",
  "create_roof",
  "create_apartment",
  "create_l_shaped_room",
  "create_polygon_room",
  "create_hallway",
  "create_building_shell",
  "create_furnished_apartment",
  "mirror_room",
  "place_furniture",
  "place_in_room",
  "place_against_wall",
  "place_furniture_solved",
  "furnish_room",
  "move_nodes",
  "modify_node",
  "batch_modify_nodes",
  "add_door_to_wall",
  "add_window_to_wall",
  "place_wall_item",
  "place_ceiling_item",
  "duplicate_level",
  "auto_align_windows",
  "build_staircase"
]);
var MAX_SCENE_MODIFYING_TOOLS_PER_ITERATION = 1;
var ONE_SHOT_MACRO_TOOLS = /* @__PURE__ */ new Set([
  "create_furnished_apartment",
  "create_building_shell"
]);
var POST_LAYOUT_TOOLS = /* @__PURE__ */ new Set([
  "create_roof",
  "place_furniture",
  "place_in_room",
  "place_against_wall",
  "place_furniture_solved",
  "furnish_room",
  "place_wall_item",
  "place_ceiling_item",
  "create_furnished_apartment"
]);
var STORAGE_KEY = "pascal-agent-settings";
function loadSettings() {
  const defaults = { provider: "deepseek", apiKey: "", model: "", baseURL: "", proxyURL: "" };
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.model === "deepseek-v4-pro") {
        parsed.model = "deepseek-chat";
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        } catch {
        }
      }
      return { ...defaults, ...parsed };
    }
  } catch {
  }
  return defaults;
}
function saveSettings(settings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
  }
}
var messageCounter = 0;
function genId() {
  return `msg_${++messageCounter}_${Date.now()}`;
}
function isComplexGenerationRequest(content) {
  const normalized = content.toLowerCase();
  return /公寓|住宅|房子|别墅|办公室|酒店|多房|多层|整套|完整|家具|装修|模型|house|apartment|villa|office|hotel|multi|furnished|complete/.test(normalized);
}
function allowsRapidConcept(content) {
  const normalized = content.toLowerCase();
  return /快速|草图|概念|随便|rough|quick|draft|concept/.test(normalized);
}
function wantsExactCoordinatePlacement(content) {
  const normalized = content.toLowerCase();
  return /坐标|精确位置|指定位置|x\s*[:=]|z\s*[:=]|\[[\d\s.,-]+,\s*[\d\s.,-]+,\s*[\d\s.,-]+\]|exact coordinate|exact position|debug/.test(normalized);
}
function agentToolName(tool) {
  return tool.type === "function" ? tool.function.name : null;
}
function findAgentTool(toolName) {
  return agentTools.find((tool) => agentToolName(tool) === toolName);
}
function validateToolArguments(toolName, args) {
  const tool = findAgentTool(toolName);
  if (!tool || tool.type !== "function") {
    return { valid: false, errors: [`Unknown tool: ${toolName}`] };
  }
  const parameters = tool.function.parameters;
  if (!isSchemaObject(parameters)) return { valid: true, errors: [] };
  const errors = [];
  validateSchemaValue(parameters, args, "arguments", errors);
  return {
    valid: errors.length === 0,
    errors,
    required: Array.isArray(parameters.required) ? parameters.required.filter((value) => typeof value === "string") : []
  };
}
function buildInvalidToolArgumentsResult(toolName, validation) {
  return {
    success: false,
    error: "Invalid tool arguments",
    tool: toolName,
    argumentErrors: validation.errors,
    requiredArguments: validation.required ?? [],
    nextAction: "Retry the same exposed tool with complete arguments that match its schema, or call get_scene_info if required IDs are missing."
  };
}
function isSchemaObject(value) {
  return Boolean(value && typeof value === "object");
}
function validateSchemaValue(schema, value, path2, errors) {
  if (schema.type && !matchesJsonSchemaType(schema.type, value)) {
    errors.push(`${path2} expected ${schema.type}, received ${Array.isArray(value) ? "array" : typeof value}`);
    return;
  }
  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${path2} expected one of ${schema.enum.map(String).join(", ")}`);
  }
  if (schema.type === "object" && isPlainObject2(value)) {
    for (const requiredKey of schema.required ?? []) {
      if (typeof requiredKey === "string" && !(requiredKey in value)) {
        errors.push(`${path2}.${requiredKey} is required`);
      }
    }
    for (const [key, childSchema] of Object.entries(schema.properties ?? {})) {
      if (key in value && isSchemaObject(childSchema)) {
        validateSchemaValue(childSchema, value[key], `${path2}.${key}`, errors);
      }
    }
  }
  if (schema.type === "array" && Array.isArray(value)) {
    if (schema.minItems !== void 0 && value.length < schema.minItems) {
      errors.push(`${path2} expected at least ${schema.minItems} items`);
    }
    if (schema.maxItems !== void 0 && value.length > schema.maxItems) {
      errors.push(`${path2} expected at most ${schema.maxItems} items`);
    }
    if (isSchemaObject(schema.items)) {
      value.forEach((item, index) => validateSchemaValue(schema.items, item, `${path2}[${index}]`, errors));
    }
  }
}
function matchesJsonSchemaType(type, value) {
  if (type === "array") return Array.isArray(value);
  if (type === "object") return isPlainObject2(value);
  if (type === "number") return typeof value === "number" && Number.isFinite(value);
  if (type === "string") return typeof value === "string";
  if (type === "boolean") return typeof value === "boolean";
  return true;
}
function isPlainObject2(value) {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}
function parseAgentSceneProgress(sceneContextRaw) {
  if (!sceneContextRaw) return null;
  try {
    const parsed = JSON.parse(sceneContextRaw);
    const summary = parsed.summary ?? {};
    const rooms = Array.isArray(parsed.architecturalSummary?.spaces) ? parsed.architecturalSummary.spaces : Array.isArray(parsed.roomSummaries) ? parsed.roomSummaries : [];
    const numberValue = (key) => Number(summary[key] ?? 0);
    const hasLayout = numberValue("walls") > 0 || numberValue("slabs") > 0 || numberValue("rooms") > 0;
    const hasDoors = numberValue("doors") > 0;
    const hasWindows = numberValue("windows") > 0;
    const hasRoomsNeedingOpenings = rooms.some((room) => room && typeof room === "object" && "needsOpeningAttention" in room && Boolean(room.needsOpeningAttention));
    return {
      hasLayout,
      hasZones: numberValue("zones") > 0,
      hasDoors,
      hasWindows,
      hasFurniture: numberValue("items") > 0,
      hasRoof: numberValue("roofs") > 0,
      hasRoomsNeedingOpenings: hasLayout && (!hasDoors || !hasWindows || hasRoomsNeedingOpenings)
    };
  } catch {
    return null;
  }
}
function resolveAgentRunPolicy(userContent, lastValidation = null, sceneProgress = null) {
  const normalized = userContent.toLowerCase();
  const isChineseResidential = /中文|中国|国标|住宅|公寓|户型|两居|三居|卧室|客厅|厨房|卫生间|阳台/.test(userContent);
  const isResidential = isChineseResidential || /residential|apartment|house|home|bedroom|living|kitchen|bathroom/.test(normalized);
  const isMultiLevel = /多层|楼层|加层|二层|三层|multi-story|multistory|floor|level|second floor|third floor/.test(normalized);
  const includesFurnishing = /家具|软装|装修|摆放|沙发|床|furnish|furniture|sofa|bed|decor/.test(normalized);
  const includesRoofOrDetail = /屋顶|屋面|roof|detail|decoration|装饰/.test(normalized);
  const rapid = allowsRapidConcept(userContent);
  const isComplex = isComplexGenerationRequest(userContent);
  const wantsExactCoordinates = wantsExactCoordinatePlacement(userContent);
  let phase = "layout";
  if (lastValidation?.blocking) {
    phase = "validation_repair";
  } else if (isComplex && !rapid && !sceneProgress?.hasLayout) {
    phase = "layout";
  } else if (sceneProgress?.hasLayout && sceneProgress.hasRoomsNeedingOpenings && (isResidential || isComplex)) {
    phase = "openings";
  } else if (includesFurnishing && sceneProgress?.hasLayout) {
    phase = "furnishing";
  } else if (includesRoofOrDetail && sceneProgress?.hasLayout) {
    phase = "roof_detail";
  } else if (sceneProgress?.hasLayout && (isResidential || isComplex)) {
    phase = "openings";
  } else if (isComplex && !rapid) {
    phase = "layout";
  } else if (includesRoofOrDetail) {
    phase = "roof_detail";
  } else if (includesFurnishing) {
    phase = "furnishing";
  } else if (isResidential || isComplex) {
    phase = "openings";
  }
  const repairTools = ["modify_node", "move_nodes", "batch_modify_nodes", "add_door_to_wall", "add_window_to_wall", "auto_align_windows", "suggest_furniture_layout", "place_furniture_solved", "delete_node", "validate_scene"];
  const layoutTools = ["create_room", "create_apartment", "create_polygon_room", "create_l_shaped_room", "create_hallway", "create_walls", "create_slab", "create_zone", "validate_scene"];
  const openingTools = ["create_door", "create_window", "add_door_to_wall", "add_window_to_wall", "auto_align_windows", "create_zone", "validate_scene"];
  const furnishingTools = [
    "suggest_furniture_layout",
    "place_furniture_solved",
    "furnish_room",
    "place_in_room",
    "place_against_wall",
    ...wantsExactCoordinates ? ["place_furniture"] : [],
    "place_wall_item",
    "place_ceiling_item",
    "validate_scene"
  ];
  const roofTools = ["create_roof", "create_ceiling", "place_wall_item", "place_ceiling_item", "validate_scene"];
  const allowedNextTools = phase === "validation_repair" ? repairTools : phase === "furnishing" ? furnishingTools : phase === "roof_detail" ? roofTools : phase === "openings" ? [...openingTools, ...layoutTools] : layoutTools;
  return {
    codeProfile: isChineseResidential ? "china_residential" : "residential_default",
    phase,
    isComplex,
    isResidential,
    isMultiLevel,
    includesFurnishing,
    allowsRapidConcept: rapid,
    wantsExactCoordinates,
    allowedNextTools,
    deferredTools: phase === "validation_repair" ? Array.from(POST_LAYOUT_TOOLS) : [],
    sceneProgress: sceneProgress ?? void 0
  };
}
function selectAgentToolsForPolicy(policy, lastValidation = null) {
  const alwaysVisible = /* @__PURE__ */ new Set(["get_scene_info", "validate_scene"]);
  const allowed = /* @__PURE__ */ new Set([...policy.allowedNextTools, ...alwaysVisible]);
  if (policy.phase === "validation_repair" && lastValidation?.blocking) {
    const hintTools = /* @__PURE__ */ new Set();
    for (const hint of lastValidation.repairHints ?? []) {
      for (const tool of hint.preferredTools ?? []) hintTools.add(tool);
    }
    if (hintTools.size > 0) {
      allowed.clear();
      for (const tool of hintTools) allowed.add(tool);
      for (const tool of ["modify_node", "move_nodes", "batch_modify_nodes", "delete_node"]) allowed.add(tool);
      for (const tool of alwaysVisible) allowed.add(tool);
    }
  }
  if (!policy.wantsExactCoordinates) allowed.delete("place_furniture");
  const exposedToolNames = agentTools.map(agentToolName).filter((name) => Boolean(name && allowed.has(name)));
  const tools = agentTools.filter((tool) => {
    const name = agentToolName(tool);
    return Boolean(name && allowed.has(name));
  });
  const hiddenCount = agentTools.length - tools.length;
  const hiddenToolReasonSummary = hiddenCount === 0 ? "All tools are exposed for this agent turn." : `${hiddenCount} tools are hidden because the current phase is ${policy.phase}; hidden tools should be used in a later stage or after validation repair.`;
  return { tools, exposedToolNames, hiddenToolReasonSummary };
}
function buildBlockedToolResult(toolName, policy, exposure, lastValidation = null) {
  return {
    blocked: true,
    tool: toolName,
    phaseBlockedBy: policy.phase,
    reason: `Tool ${toolName} is not exposed in the current agent phase.`,
    hiddenToolReasonSummary: exposure.hiddenToolReasonSummary,
    allowedNextTools: exposure.exposedToolNames,
    requiredRuleFixes: lastValidation?.blockingRuleIds ?? [],
    repairHints: lastValidation?.blocking ? (lastValidation.repairHints ?? []).slice(0, 5) : [],
    nextAction: "Choose one of allowedNextTools for this turn. If the intended tool is hidden, complete the current validation/staging phase first."
  };
}
function parseValidationSnapshot(raw) {
  try {
    const parsed = JSON.parse(raw);
    return {
      valid: Boolean(parsed.valid),
      blocking: Boolean(parsed.blocking ?? (parsed.warningCount ?? 0) > 0),
      fixedCount: parsed.fixedCount ?? 0,
      warningCount: parsed.warningCount ?? 0,
      issues: Array.isArray(parsed.issues) ? parsed.issues : [],
      nextAction: parsed.nextAction,
      issueSummary: parsed.issueSummary,
      ruleSummary: parsed.ruleSummary,
      blockingRuleIds: parsed.blockingRuleIds,
      repairHints: Array.isArray(parsed.repairHints) ? parsed.repairHints : []
    };
  } catch {
    return null;
  }
}
function buildValidationMessage(snapshot, policy) {
  const payload = {
    type: "spatial_validation",
    codeProfile: policy.codeProfile,
    phase: snapshot.blocking ? "validation_repair" : policy.phase,
    valid: snapshot.valid,
    blocking: snapshot.blocking,
    fixedCount: snapshot.fixedCount,
    warningCount: snapshot.warningCount,
    blockingRuleIds: snapshot.blockingRuleIds ?? [],
    ruleSummary: snapshot.ruleSummary ?? {},
    repairHints: (snapshot.repairHints ?? []).slice(0, 8),
    allowedNextTools: snapshot.blocking ? policy.allowedNextTools : void 0,
    nextAction: snapshot.nextAction ?? (snapshot.blocking ? "Use repairHints with the allowed repair tools, then validate again before furniture/roof/detail work." : "Validation passed; continue to the next staged generation phase.")
  };
  return `[Spatial Auto-Validation JSON]
${JSON.stringify(payload, null, 2)}`;
}
function stagedDeferralForTool(toolName, userContent, lastValidation, policy = resolveAgentRunPolicy(userContent, lastValidation)) {
  if (ONE_SHOT_MACRO_TOOLS.has(toolName) && policy.isComplex && !policy.allowsRapidConcept) {
    return {
      deferred: true,
      tool: toolName,
      phaseBlockedBy: policy.phase,
      allowedNextTools: policy.allowedNextTools,
      reason: "This request is complex/code-sensitive, so one-shot macro generation is disabled. Build layout first, validate, then add openings, furniture, and details in later phases.",
      nextAction: "Use create_apartment/create_room/create_polygon_room/create_hallway for the layout phase, then wait for validation feedback."
    };
  }
  if (lastValidation?.blocking && POST_LAYOUT_TOOLS.has(toolName)) {
    return {
      deferred: true,
      tool: toolName,
      phaseBlockedBy: "validation_repair",
      allowedNextTools: policy.allowedNextTools,
      requiredRuleFixes: lastValidation.blockingRuleIds ?? [],
      repairHints: (lastValidation.repairHints ?? []).slice(0, 5),
      reason: "The previous validation report still has warnings. Post-layout work is blocked until those warnings are fixed.",
      blockingIssues: lastValidation.issues.filter((issue2) => issue2.severity === "warning").slice(0, 5).map((issue2) => ({
        type: issue2.type,
        ruleId: issue2.ruleId,
        nodeId: issue2.nodeId,
        message: issue2.message
      })),
      nextAction: "Fix layout/code/circulation warnings using modify_node, move_nodes, add_door_to_wall, add_window_to_wall, auto_align_windows, or delete/recreate problem geometry."
    };
  }
  return null;
}
var useAgent = create2((set2, get) => ({
  messages: [],
  isLoading: false,
  error: null,
  settings: loadSettings(),
  showSettings: false,
  setSettings: (partial2) => {
    const current = get().settings;
    const next = { ...current, ...partial2 };
    saveSettings(next);
    set2({ settings: next });
  },
  setShowSettings: (show) => set2({ showSettings: show }),
  clearMessages: () => {
    set2({ messages: [], error: null });
  },
  sendMessage: async (content) => {
    const { settings } = get();
    if (!settings.apiKey) {
      set2({ error: "\u8BF7\u5148\u5728\u8BBE\u7F6E\u4E2D\u586B\u5165 API Key", showSettings: true });
      return;
    }
    const userMsg = {
      id: genId(),
      role: "user",
      content
    };
    set2((s) => ({
      messages: [...s.messages, userMsg],
      isLoading: true,
      error: null
    }));
    try {
      await runAgentLoop(content, get, set2);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      set2({ error: errMsg, isLoading: false });
    }
  }
}));
async function runAgentLoop(userContent, get, set2) {
  const MAX_ITERATIONS = 10;
  let iteration = 0;
  let lastValidation = null;
  let lastPolicy = null;
  while (iteration < MAX_ITERATIONS) {
    iteration++;
    const sceneContext = executeToolCall("get_scene_info", {});
    const sceneProgress = parseAgentSceneProgress(sceneContext);
    const runPolicy = resolveAgentRunPolicy(userContent, lastValidation, sceneProgress);
    lastPolicy = runPolicy;
    const toolExposure = selectAgentToolsForPolicy(runPolicy, lastValidation);
    const toolContext = {
      exposedToolNames: toolExposure.exposedToolNames,
      hiddenToolReasonSummary: toolExposure.hiddenToolReasonSummary,
      instruction: "Only call tools listed in exposedToolNames this turn. Tools not exposed are intentionally hidden for the current architectural phase."
    };
    const systemWithContext = `${SYSTEM_PROMPT}

## Agent Run Policy
${JSON.stringify(runPolicy, null, 2)}

## Tool Exposure
${JSON.stringify(toolContext, null, 2)}

## Current Scene State
${sceneContext}`;
    const apiMessages = [
      { role: "system", content: systemWithContext },
      ...get().messages.map(msgToChatParam)
    ];
    const { settings } = get();
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: apiMessages,
        tools: toolExposure.tools,
        provider: settings.provider,
        apiKey: settings.apiKey,
        model: settings.model || void 0,
        baseURL: settings.baseURL || void 0,
        proxyURL: settings.proxyURL || void 0,
        stream: true
      })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "API request failed" }));
      throw new Error(err.error || `API error: ${res.status}`);
    }
    const { content, toolCalls } = await parseStreamResponse(res, get, set2);
    if (toolCalls.length > 0) {
      const assistantMsg = {
        id: genId(),
        role: "assistant",
        content,
        toolCalls
      };
      set2((s) => {
        const msgs = [...s.messages];
        const lastMsg = msgs[msgs.length - 1];
        if (lastMsg && lastMsg.role === "assistant" && lastMsg.isLoading) {
          msgs.pop();
        }
        return { messages: [...msgs, assistantMsg] };
      });
      let hasSceneModification = false;
      let sceneModificationCount = 0;
      for (const tc of toolCalls) {
        const isSceneModifyingTool = SCENE_MODIFYING_TOOLS.has(tc.name);
        const isExposedTool = toolExposure.exposedToolNames.includes(tc.name);
        let result;
        let toolArgs = {};
        try {
          toolArgs = tc.arguments.trim() ? JSON.parse(tc.arguments) : {};
        } catch (err) {
          result = JSON.stringify({
            error: "Invalid tool arguments JSON",
            tool: tc.name,
            arguments: tc.arguments,
            message: err instanceof Error ? err.message : String(err),
            nextAction: "Call the same tool again with complete valid JSON arguments that match the tool schema."
          });
          const toolMsg2 = {
            id: genId(),
            role: "tool",
            content: result,
            toolCallId: tc.id
          };
          set2((s) => ({
            messages: [...s.messages, toolMsg2]
          }));
          continue;
        }
        const stagedDeferral = isSceneModifyingTool ? stagedDeferralForTool(tc.name, userContent, lastValidation, runPolicy) : null;
        const argumentValidation = isExposedTool ? validateToolArguments(tc.name, toolArgs) : null;
        if (!isExposedTool) {
          result = JSON.stringify(buildBlockedToolResult(tc.name, runPolicy, toolExposure, lastValidation));
        } else if (argumentValidation && !argumentValidation.valid) {
          result = JSON.stringify(buildInvalidToolArgumentsResult(tc.name, argumentValidation));
        } else if (stagedDeferral) {
          result = JSON.stringify(stagedDeferral);
        } else if (isSceneModifyingTool && sceneModificationCount >= MAX_SCENE_MODIFYING_TOOLS_PER_ITERATION) {
          result = JSON.stringify({
            deferred: true,
            tool: tc.name,
            phaseBlockedBy: runPolicy.phase,
            allowedNextTools: runPolicy.allowedNextTools,
            reason: "Scene generation is staged. Review the validation report from the previous modification, then call this tool again if it is still appropriate.",
            nextAction: "Continue with the next architectural phase only after spatial and building-code warnings are resolved."
          });
        } else {
          result = executeToolCall(tc.name, toolArgs);
          if (isSceneModifyingTool) {
            hasSceneModification = true;
            sceneModificationCount++;
          }
        }
        const toolMsg = {
          id: genId(),
          role: "tool",
          content: result,
          toolCallId: tc.id
        };
        set2((s) => ({
          messages: [...s.messages, toolMsg]
        }));
      }
      if (hasSceneModification) {
        const validationResult = executeToolCall("validate_scene", { codeProfile: runPolicy.codeProfile });
        const snapshot = parseValidationSnapshot(validationResult);
        if (snapshot) {
          lastValidation = snapshot;
          const nextSceneProgress = parseAgentSceneProgress(executeToolCall("get_scene_info", {}));
          const validationMsg = {
            id: genId(),
            role: "system",
            content: buildValidationMessage(snapshot, resolveAgentRunPolicy(userContent, snapshot, nextSceneProgress))
          };
          set2((s) => ({
            messages: [...s.messages, validationMsg]
          }));
        }
      }
      continue;
    }
    set2((s) => {
      const msgs = [...s.messages];
      const lastMsg = msgs[msgs.length - 1];
      if (lastMsg && lastMsg.role === "assistant" && lastMsg.isLoading) {
        msgs[msgs.length - 1] = { ...lastMsg, isLoading: false };
      }
      return { messages: msgs, isLoading: false };
    });
    return;
  }
  set2((s) => ({
    messages: [
      ...s.messages,
      {
        id: genId(),
        role: "assistant",
        content: `\u5DE5\u5177\u8C03\u7528\u5DF2\u8FBE\u5230\u672C\u8F6E\u6700\u5927\u8FED\u4EE3\u6B21\u6570\u3002\u5F53\u524D\u9636\u6BB5\uFF1A${lastPolicy?.phase ?? "unknown"}\uFF1B\u6700\u8FD1\u963B\u585E\u89C4\u5219\uFF1A${lastValidation?.blockingRuleIds?.join(", ") || "\u65E0"}\uFF1B\u5EFA\u8BAE\u4E0B\u4E00\u6B65\u5DE5\u5177\uFF1A${lastPolicy?.allowedNextTools.slice(0, 8).join(", ") || "get_scene_info, validate_scene"}\u3002\u5F53\u524D\u573A\u666F\u5DF2\u4FDD\u7559\uFF0C\u8BF7\u5148\u67E5\u770B\u6700\u8FD1\u4E00\u6B21 validation/tool result\uFF0C\u518D\u7EE7\u7EED\u4E0B\u4E00\u6B65\u4FEE\u590D\u6216\u751F\u6210\u3002`
      }
    ],
    isLoading: false
  }));
}
async function parseStreamResponse(res, get, set2) {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let content = "";
  const toolCallMap = /* @__PURE__ */ new Map();
  const streamMsgId = genId();
  let buffer = "";
  set2((s) => ({
    messages: [
      ...s.messages,
      { id: streamMsgId, role: "assistant", content: "", isLoading: true }
    ]
  }));
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith("data: ")) continue;
      const payload = trimmed.slice(6);
      if (payload === "[DONE]") continue;
      try {
        const chunk = JSON.parse(payload);
        if (chunk.error) {
          throw new Error(chunk.error);
        }
        const delta = chunk.choices?.[0]?.delta;
        if (!delta) continue;
        if (delta.content) {
          content += delta.content;
          set2((s) => {
            const msgs = [...s.messages];
            const idx = msgs.findIndex((m) => m.id === streamMsgId);
            if (idx !== -1) {
              msgs[idx] = { ...msgs[idx], content, isLoading: true };
            }
            return { messages: msgs };
          });
        }
        if (delta.tool_calls) {
          for (const tc of delta.tool_calls) {
            const existing = toolCallMap.get(tc.index);
            if (!existing) {
              toolCallMap.set(tc.index, {
                id: tc.id || "",
                name: tc.function?.name || "",
                arguments: tc.function?.arguments || ""
              });
            } else {
              if (tc.id) existing.id = tc.id;
              if (tc.function?.name) existing.name += tc.function.name;
              if (tc.function?.arguments) existing.arguments += tc.function.arguments;
            }
          }
        }
      } catch (err) {
        if (err instanceof Error && err.message !== "Unexpected end of JSON input") {
          throw err;
        }
      }
    }
  }
  const toolCalls = [];
  const sortedKeys = [...toolCallMap.keys()].sort((a, b) => a - b);
  for (const key of sortedKeys) {
    const call = toolCallMap.get(key);
    if (!call.name) continue;
    toolCalls.push({
      ...call,
      id: call.id || `tool_${streamMsgId}_${key}`
    });
  }
  return { content, toolCalls };
}
function msgToChatParam(msg) {
  if (msg.role === "tool") {
    return {
      role: "tool",
      content: msg.content,
      tool_call_id: msg.toolCallId || ""
    };
  }
  if (msg.role === "assistant" && msg.toolCalls && msg.toolCalls.length > 0) {
    return {
      role: "assistant",
      content: msg.content || null,
      tool_calls: msg.toolCalls.map((tc) => ({
        id: tc.id,
        type: "function",
        function: {
          name: tc.name,
          arguments: tc.arguments
        }
      }))
    };
  }
  return {
    role: msg.role,
    content: msg.content
  };
}

// tooling/agent-harness/schema.ts
function assertHarnessCase(value, filePath) {
  if (!isRecord(value)) throw new Error(`${filePath}: case must be an object`);
  if (typeof value.name !== "string" || value.name.trim() === "") {
    throw new Error(`${filePath}: name must be a non-empty string`);
  }
  if (!Array.isArray(value.steps) || value.steps.length === 0) {
    throw new Error(`${filePath}: steps must be a non-empty array`);
  }
  if (!Array.isArray(value.assertions) || value.assertions.length === 0) {
    throw new Error(`${filePath}: assertions must be a non-empty array`);
  }
  if (value.validationArgs != null && !isRecord(value.validationArgs)) {
    throw new Error(`${filePath}: validationArgs must be an object when provided`);
  }
  value.steps.forEach((step, index) => {
    if (!isRecord(step)) throw new Error(`${filePath}: steps[${index}] must be an object`);
    if (typeof step.tool !== "string" || step.tool.trim() === "") {
      throw new Error(`${filePath}: steps[${index}].tool must be a non-empty string`);
    }
    if (step.args != null && !isRecord(step.args)) {
      throw new Error(`${filePath}: steps[${index}].args must be an object when provided`);
    }
  });
  value.assertions.forEach((assertion, index) => {
    if (!isRecord(assertion)) {
      throw new Error(`${filePath}: assertions[${index}] must be an object`);
    }
    if (typeof assertion.type !== "string") {
      throw new Error(`${filePath}: assertions[${index}].type must be a string`);
    }
  });
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function getByPath(source, path2) {
  if (path2 === "") return source;
  return path2.split(".").reduce((current, part) => {
    if (Array.isArray(current)) {
      const index = Number(part);
      return Number.isInteger(index) ? current[index] : void 0;
    }
    if (!isRecord(current)) return void 0;
    return current[part];
  }, source);
}
function nodesByType(nodes, type) {
  return Object.values(nodes).filter((node) => node.type === type);
}

// tooling/agent-harness/run.ts
var rootDir = process.cwd();
var casesDir = path.join(rootDir, "tooling/agent-harness/cases");
var defaultReportPath = path.join(rootDir, "artifacts/agent-harness/latest.json");
if (!globalThis.requestAnimationFrame) {
  globalThis.requestAnimationFrame = ((callback) => {
    return setTimeout(() => callback(Date.now()), 0);
  });
}
if (!globalThis.cancelAnimationFrame) {
  globalThis.cancelAnimationFrame = ((handle) => {
    clearTimeout(handle);
  });
}
async function main() {
  const options = parseArgs(process.argv.slice(2));
  const cases = await loadCases(options.caseFilter);
  const results = [];
  for (const testCase of cases) {
    const result = await runCase(testCase, options.verbose);
    results.push(result);
    printCaseResult(result, options.verbose);
  }
  const passed = results.filter((result) => result.pass).length;
  const failed = results.length - passed;
  const report = {
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    totals: {
      cases: results.length,
      passed,
      failed,
      assertions: results.reduce((sum, result) => sum + result.assertions.length, 0)
    },
    cases: results
  };
  await mkdir(path.dirname(options.reportPath), { recursive: true });
  await writeFile(options.reportPath, `${JSON.stringify(report, null, 2)}
`);
  console.log("");
  console.log(`Agent harness: ${passed}/${results.length} cases passed, ${failed} failed`);
  console.log(`Report: ${path.relative(rootDir, options.reportPath)}`);
  if (failed > 0) process.exitCode = 1;
}
function parseArgs(args) {
  const options = {
    reportPath: defaultReportPath,
    verbose: false
  };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--case") {
      options.caseFilter = requiredValue(args, ++i, "--case");
    } else if (arg === "--report") {
      options.reportPath = path.resolve(rootDir, requiredValue(args, ++i, "--report"));
    } else if (arg === "--verbose") {
      options.verbose = true;
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}
function requiredValue(args, index, flag) {
  const value = args[index];
  if (!value) throw new Error(`${flag} requires a value`);
  return value;
}
function printHelp() {
  console.log(`Usage: npm run agent:harness -- [--case <name-or-file>] [--report <path>] [--verbose]`);
}
async function loadCases(caseFilter) {
  const files = await resolveCaseFiles(caseFilter);
  const cases = [];
  for (const file2 of files) {
    const raw = await readFile(file2, "utf8");
    const parsed = JSON.parse(raw);
    assertHarnessCase(parsed, file2);
    cases.push(parsed);
  }
  return cases;
}
async function resolveCaseFiles(caseFilter) {
  if (caseFilter) {
    const directPath = path.resolve(rootDir, caseFilter);
    if (caseFilter.endsWith(".json")) return [directPath];
    const entries2 = await readdir(casesDir);
    const matches = entries2.filter((entry) => entry.endsWith(".json")).filter((entry) => entry === `${caseFilter}.json` || entry.includes(caseFilter)).map((entry) => path.join(casesDir, entry));
    if (matches.length === 0) {
      throw new Error(`No harness case matched "${caseFilter}"`);
    }
    return matches.sort();
  }
  const entries = await readdir(casesDir);
  return entries.filter((entry) => entry.endsWith(".json")).sort().map((entry) => path.join(casesDir, entry));
}
async function runCase(testCase, verbose) {
  const startedAt = performance.now();
  const stepResults = [];
  let validation = null;
  const assertions = [];
  try {
    resetScene();
    for (let index = 0; index < testCase.steps.length; index++) {
      const step = testCase.steps[index];
      const args = step.args ?? {};
      const raw = executeHarnessStep(step.tool, args);
      const parsed = parseToolResult(raw);
      stepResults.push({ index, tool: step.tool, args, raw, parsed });
      if (verbose) console.log(`  step ${index}: ${step.tool} -> ${summarizeResult(parsed)}`);
    }
    validation = parseToolResult(executeToolCall("validate_scene", testCase.validationArgs ?? {}));
    for (const assertion of testCase.assertions) {
      assertions.push(evaluateAssertion(assertion, stepResults, validation));
    }
  } catch (error48) {
    assertions.push({
      pass: false,
      type: "case.error",
      message: error48 instanceof Error ? error48.message : String(error48)
    });
  }
  const durationMs = Math.round(performance.now() - startedAt);
  return {
    name: testCase.name,
    description: testCase.description,
    pass: assertions.every((assertion) => assertion.pass),
    durationMs,
    steps: stepResults,
    validation,
    assertions,
    ...assertions.some((assertion) => !assertion.pass) ? { error: assertions.find((assertion) => !assertion.pass)?.message } : {}
  };
}
function resetScene() {
  clearSceneHistory();
  use_scene_default.getState().unloadScene();
  use_scene_default.getState().loadScene();
  clearSceneHistory();
}
function parseToolResult(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}
function evaluateAssertion(assertion, steps, validation) {
  switch (assertion.type) {
    case "toolResult.success":
      return assertToolResultSuccess(assertion.step, assertion.expected ?? true, steps);
    case "toolResult.field":
      return assertToolResultField(assertion, steps);
    case "toolResult.includesSuggestions":
      return assertToolResultIncludesSuggestions(assertion, steps);
    case "agent.policy":
      return assertAgentPolicy(assertion);
    case "agent.deferral":
      return assertAgentDeferral(assertion);
    case "agent.toolExposure":
      return assertAgentToolExposure(assertion);
    case "agent.toolGate":
      return assertAgentToolGate(assertion);
    case "agent.toolArgs":
      return assertAgentToolArgs(assertion);
    case "node.count":
      return assertNodeCount(assertion);
    case "node.exists":
      return assertNodeExists(assertion);
    case "geometry.closedWalls":
      return assertClosedWalls(assertion.tolerance ?? 1e-3);
    case "geometry.minClearance":
      return assertMinClearance(assertion);
    case "geometry.noSlabOverlap":
      return assertNoSlabOverlap();
    case "geometry.openingsFitWall":
      return assertOpeningsFitWall();
    case "geometry.furnitureInsideSlabs":
      return assertFurnitureInsideSlabs();
    case "geometry.noFurnitureOverlap":
      return assertNoFurnitureOverlap(assertion.clearance ?? 0);
    case "validation.repairHints":
      return assertValidationRepairHints(assertion, validation);
    case "validation":
      return assertValidation(assertion, validation);
    default:
      return {
        pass: false,
        type: assertion.type,
        message: `Unknown assertion type: ${assertion.type}`
      };
  }
}
function executeHarnessStep(tool, args) {
  if (tool === "agent.staged_deferral") {
    return JSON.stringify(stagedDeferralForTool(
      String(args.toolName ?? ""),
      String(args.userContent ?? ""),
      isRecord(args.lastValidation) ? args.lastValidation : null
    ));
  }
  return executeToolCall(tool, args);
}
function assertToolResultSuccess(stepIndex, expected, steps) {
  const step = steps[stepIndex];
  const actual = isRecord(step?.parsed) ? step.parsed.success === true : false;
  return {
    pass: actual === expected,
    type: "toolResult.success",
    message: `step ${stepIndex} success expected ${expected}, received ${actual}`
  };
}
function assertToolResultField(assertion, steps) {
  const step = steps[assertion.step];
  const actual = getByPath(step?.parsed, assertion.path);
  const pass = matchesExpectation(actual, assertion.expected);
  return {
    pass,
    type: "toolResult.field",
    message: `step ${assertion.step} field ${assertion.path} expected ${JSON.stringify(assertion.expected)}, received ${JSON.stringify(actual)}`
  };
}
function assertToolResultIncludesSuggestions(assertion, steps) {
  const step = steps[assertion.step];
  const suggestions = getByPath(step?.parsed, "suggestedNextTools");
  const failures = [];
  if (!Array.isArray(suggestions)) {
    failures.push("suggestedNextTools was not an array");
  } else {
    for (const tool of assertion.tools) {
      if (!suggestions.includes(tool)) failures.push(`missing suggested tool ${tool}`);
    }
  }
  return {
    pass: failures.length === 0,
    type: "toolResult.includesSuggestions",
    message: failures.length === 0 ? "suggested tools matched" : failures.join("; ")
  };
}
function assertAgentPolicy(assertion) {
  const policy = resolveAgentRunPolicy(assertion.userContent);
  const failures = [];
  if (assertion.codeProfile !== void 0 && policy.codeProfile !== assertion.codeProfile) {
    failures.push(`codeProfile expected ${assertion.codeProfile}, received ${policy.codeProfile}`);
  }
  if (assertion.phase !== void 0 && policy.phase !== assertion.phase) {
    failures.push(`phase expected ${assertion.phase}, received ${policy.phase}`);
  }
  if (assertion.isComplex !== void 0 && policy.isComplex !== assertion.isComplex) {
    failures.push(`isComplex expected ${assertion.isComplex}, received ${policy.isComplex}`);
  }
  if (assertion.includesFurnishing !== void 0 && policy.includesFurnishing !== assertion.includesFurnishing) {
    failures.push(`includesFurnishing expected ${assertion.includesFurnishing}, received ${policy.includesFurnishing}`);
  }
  return {
    pass: failures.length === 0,
    type: "agent.policy",
    message: failures.length === 0 ? "agent policy matched" : failures.join("; ")
  };
}
function assertAgentDeferral(assertion) {
  const lastValidation = isRecord(assertion.lastValidation) ? assertion.lastValidation : null;
  const policy = resolveAgentRunPolicy(assertion.userContent, lastValidation);
  const result = stagedDeferralForTool(assertion.toolName, assertion.userContent, lastValidation, policy);
  const failures = [];
  const expectedDeferred = assertion.deferred ?? true;
  if (Boolean(result?.deferred) !== expectedDeferred) {
    failures.push(`deferred expected ${expectedDeferred}, received ${Boolean(result?.deferred)}`);
  }
  if (assertion.phaseBlockedBy !== void 0 && result?.phaseBlockedBy !== assertion.phaseBlockedBy) {
    failures.push(`phaseBlockedBy expected ${assertion.phaseBlockedBy}, received ${String(result?.phaseBlockedBy)}`);
  }
  const allowedTools = Array.isArray(result?.allowedNextTools) ? result.allowedNextTools : [];
  for (const tool of assertion.mustIncludeAllowedTools ?? []) {
    if (!allowedTools.includes(tool)) failures.push(`allowedNextTools missing ${tool}`);
  }
  const requiredRuleFixes = Array.isArray(result?.requiredRuleFixes) ? result.requiredRuleFixes : [];
  for (const ruleId of assertion.mustIncludeRuleIds ?? []) {
    if (!requiredRuleFixes.includes(ruleId)) failures.push(`requiredRuleFixes missing ${ruleId}`);
  }
  return {
    pass: failures.length === 0,
    type: "agent.deferral",
    message: failures.length === 0 ? "agent deferral matched" : failures.join("; ")
  };
}
function assertAgentToolExposure(assertion) {
  const lastValidation = isRecord(assertion.lastValidation) ? assertion.lastValidation : null;
  const sceneContext = typeof assertion.sceneContext === "string" ? assertion.sceneContext : isRecord(assertion.sceneContext) ? JSON.stringify(assertion.sceneContext) : null;
  const sceneProgress = parseAgentSceneProgress(sceneContext);
  const policy = resolveAgentRunPolicy(assertion.userContent, lastValidation, sceneProgress);
  const exposure = selectAgentToolsForPolicy(policy, lastValidation);
  const exposed = new Set(exposure.exposedToolNames);
  const failures = [];
  if (assertion.phase !== void 0 && policy.phase !== assertion.phase) {
    failures.push(`phase expected ${assertion.phase}, received ${policy.phase}`);
  }
  if (assertion.codeProfile !== void 0 && policy.codeProfile !== assertion.codeProfile) {
    failures.push(`codeProfile expected ${assertion.codeProfile}, received ${policy.codeProfile}`);
  }
  for (const tool of assertion.mustExpose ?? []) {
    if (!exposed.has(tool)) failures.push(`expected exposed tool ${tool}`);
  }
  for (const tool of assertion.mustHide ?? []) {
    if (exposed.has(tool)) failures.push(`expected hidden tool ${tool}`);
  }
  return {
    pass: failures.length === 0,
    type: "agent.toolExposure",
    message: failures.length === 0 ? `tool exposure matched (${exposure.exposedToolNames.join(", ")})` : failures.join("; ")
  };
}
function assertAgentToolGate(assertion) {
  const lastValidation = isRecord(assertion.lastValidation) ? assertion.lastValidation : null;
  const sceneContext = typeof assertion.sceneContext === "string" ? assertion.sceneContext : isRecord(assertion.sceneContext) ? JSON.stringify(assertion.sceneContext) : null;
  const sceneProgress = parseAgentSceneProgress(sceneContext);
  const policy = resolveAgentRunPolicy(assertion.userContent, lastValidation, sceneProgress);
  const exposure = selectAgentToolsForPolicy(policy, lastValidation);
  const exposed = exposure.exposedToolNames.includes(assertion.toolName);
  const result = exposed ? null : buildBlockedToolResult(assertion.toolName, policy, exposure, lastValidation);
  const failures = [];
  const expectedBlocked = assertion.blocked ?? true;
  if (Boolean(result?.blocked) !== expectedBlocked) {
    failures.push(`blocked expected ${expectedBlocked}, received ${Boolean(result?.blocked)}`);
  }
  if (assertion.phaseBlockedBy !== void 0 && result?.phaseBlockedBy !== assertion.phaseBlockedBy) {
    failures.push(`phaseBlockedBy expected ${assertion.phaseBlockedBy}, received ${String(result?.phaseBlockedBy)}`);
  }
  const allowedTools = Array.isArray(result?.allowedNextTools) ? result.allowedNextTools : [];
  for (const tool of assertion.mustIncludeAllowedTools ?? []) {
    if (!allowedTools.includes(tool)) failures.push(`allowedNextTools missing ${tool}`);
  }
  const requiredRuleFixes = Array.isArray(result?.requiredRuleFixes) ? result.requiredRuleFixes : [];
  for (const ruleId of assertion.mustIncludeRuleIds ?? []) {
    if (!requiredRuleFixes.includes(ruleId)) failures.push(`requiredRuleFixes missing ${ruleId}`);
  }
  return {
    pass: failures.length === 0,
    type: "agent.toolGate",
    message: failures.length === 0 ? "agent tool gate matched" : failures.join("; ")
  };
}
function assertAgentToolArgs(assertion) {
  const validation = validateToolArguments(assertion.toolName, assertion.args);
  const result = validation.valid ? null : buildInvalidToolArgumentsResult(assertion.toolName, validation);
  const failures = [];
  const expectedValid = assertion.valid ?? true;
  if (validation.valid !== expectedValid) {
    failures.push(`valid expected ${expectedValid}, received ${validation.valid}`);
  }
  const errorText = [...validation.errors, ...Array.isArray(result?.argumentErrors) ? result.argumentErrors.map(String) : []].join("\n");
  for (const expected of assertion.mustIncludeErrors ?? []) {
    if (!errorText.includes(expected)) failures.push(`argument errors missing ${expected}`);
  }
  return {
    pass: failures.length === 0,
    type: "agent.toolArgs",
    message: failures.length === 0 ? "agent tool arguments matched" : failures.join("; ")
  };
}
function assertNodeCount(assertion) {
  const count = nodesByType(use_scene_default.getState().nodes, assertion.nodeType).length;
  const pass = matchesCount(count, {
    exact: assertion.exact,
    min: assertion.min,
    max: assertion.max
  });
  return {
    pass,
    type: "node.count",
    message: `${assertion.nodeType} count expected ${formatCountExpectation(assertion)}, received ${count}`
  };
}
function assertNodeExists(assertion) {
  const candidates = nodesByType(use_scene_default.getState().nodes, assertion.nodeType);
  const match = candidates.find((node) => matchesWhere(node, assertion.where ?? {}));
  return {
    pass: Boolean(match),
    type: "node.exists",
    message: `${assertion.nodeType} exists with ${JSON.stringify(assertion.where ?? {})}`
  };
}
function assertClosedWalls(tolerance) {
  const walls = nodesByType(use_scene_default.getState().nodes, "wall");
  const unmatched = [];
  for (const wall of walls) {
    if (!(wall.start && wall.end)) {
      unmatched.push(`${wall.id}:missing-endpoints`);
      continue;
    }
    const startMatches = walls.some((other) => other.id !== wall.id && other.end && dist2D2(wall.start, other.end) <= tolerance);
    const endMatches = walls.some((other) => other.id !== wall.id && other.start && dist2D2(wall.end, other.start) <= tolerance);
    if (!startMatches || !endMatches) unmatched.push(wall.id);
  }
  return {
    pass: walls.length > 0 && unmatched.length === 0,
    type: "geometry.closedWalls",
    message: `closed wall loop expected, unmatched walls: ${unmatched.length ? unmatched.join(", ") : "none"}`
  };
}
function assertMinClearance(assertion) {
  const nodes = use_scene_default.getState().nodes;
  const walls = nodesByType(nodes, "wall");
  const items = nodesByType(nodes, "item");
  const floorItems = items.filter((item) => {
    const attachTo = item.asset?.attachTo;
    return attachTo !== "wall" && attachTo !== "wall-side" && attachTo !== "ceiling";
  });
  const doors = collectDoorInfos(walls, nodes);
  const violations = [];
  for (const door of doors) {
    for (const item of floorItems) {
      if (!item.position) continue;
      const distance = dist2D2([door.worldX, door.worldZ], [item.position[0], item.position[2]]);
      const radius = itemRadius(item);
      const clearance = distance - door.width / 2 - radius;
      if (clearance < assertion.min) {
        violations.push(`${door.id}->${item.id}:${clearance.toFixed(2)}m`);
      }
    }
  }
  return {
    pass: violations.length === 0,
    type: "geometry.minClearance",
    message: `minimum clearance ${assertion.min.toFixed(2)}m expected, violations: ${violations.length ? violations.join(", ") : "none"}`
  };
}
function assertNoSlabOverlap() {
  const slabs = nodesByType(use_scene_default.getState().nodes, "slab");
  const overlaps = [];
  for (let i = 0; i < slabs.length; i++) {
    for (let j = i + 1; j < slabs.length; j++) {
      const a = slabs[i];
      const b = slabs[j];
      if (!a.polygon || !b.polygon) continue;
      if (polygonsOverlap(a.polygon, b.polygon)) overlaps.push(`${a.id}<->${b.id}`);
    }
  }
  return {
    pass: overlaps.length === 0,
    type: "geometry.noSlabOverlap",
    message: `no slab overlap expected, overlaps: ${overlaps.length ? overlaps.join(", ") : "none"}`
  };
}
function assertOpeningsFitWall() {
  const nodes = use_scene_default.getState().nodes;
  const walls = nodesByType(nodes, "wall");
  const violations = [];
  for (const wall of walls) {
    if (!wall.start || !wall.end) continue;
    const wallLen = dist2D2(wall.start, wall.end);
    const openings = [];
    for (const childId of wall.children ?? []) {
      const child = nodes[childId];
      if (!isRecord(child) || child.type !== "door" && child.type !== "window") continue;
      const position = child.position;
      if (!Array.isArray(position) || typeof position[0] !== "number") continue;
      const width = typeof child.width === "number" ? child.width : child.type === "door" ? 0.9 : 1.5;
      const minX = position[0] - width / 2;
      const maxX = position[0] + width / 2;
      if (minX < 0 || maxX > wallLen) violations.push(`${child.id}:out-of-wall`);
      openings.push({ id: String(child.id), minX, maxX });
    }
    for (let i = 0; i < openings.length; i++) {
      for (let j = i + 1; j < openings.length; j++) {
        const a = openings[i];
        const b = openings[j];
        if (a.maxX > b.minX && a.minX < b.maxX) violations.push(`${a.id}<->${b.id}:overlap`);
      }
    }
  }
  return {
    pass: violations.length === 0,
    type: "geometry.openingsFitWall",
    message: `openings fit walls expected, violations: ${violations.length ? violations.join(", ") : "none"}`
  };
}
function assertFurnitureInsideSlabs() {
  const nodes = use_scene_default.getState().nodes;
  const slabs = nodesByType(nodes, "slab");
  const items = nodesByType(nodes, "item");
  const violations = [];
  for (const item of items) {
    const attachTo = item.asset?.attachTo;
    if (attachTo === "wall" || attachTo === "wall-side" || attachTo === "ceiling") continue;
    if (!item.position || !item.asset?.dimensions) continue;
    const rotationDeg = Math.round((item.rotation?.[1] ?? 0) * 180 / Math.PI);
    const bbox = itemBboxForHarness(item.position, item.asset.dimensions, rotationDeg);
    const inside = slabs.some((slab) => slab.polygon && bboxCornersInsidePolygonForHarness(bbox, slab.polygon));
    if (!inside) violations.push(item.id);
  }
  return {
    pass: violations.length === 0,
    type: "geometry.furnitureInsideSlabs",
    message: `all furniture bbox corners inside slabs expected, violations: ${violations.length ? violations.join(", ") : "none"}`
  };
}
function assertNoFurnitureOverlap(clearance) {
  const nodes = use_scene_default.getState().nodes;
  const items = nodesByType(nodes, "item");
  const floorItems = items.filter((item) => {
    const attachTo = item.asset?.attachTo;
    return attachTo !== "wall" && attachTo !== "wall-side" && attachTo !== "ceiling" && item.position && item.asset?.dimensions;
  });
  const violations = [];
  for (let i = 0; i < floorItems.length; i++) {
    for (let j = i + 1; j < floorItems.length; j++) {
      const a = floorItems[i];
      const b = floorItems[j];
      const aBox = expandBboxForHarness(itemBboxForHarness(a.position, a.asset.dimensions, Math.round((a.rotation?.[1] ?? 0) * 180 / Math.PI)), clearance);
      const bBox = itemBboxForHarness(b.position, b.asset.dimensions, Math.round((b.rotation?.[1] ?? 0) * 180 / Math.PI));
      if (bboxesOverlapForHarness(aBox, bBox)) violations.push(`${a.id}<->${b.id}`);
    }
  }
  return {
    pass: violations.length === 0,
    type: "geometry.noFurnitureOverlap",
    message: `no furniture overlap expected, violations: ${violations.length ? violations.join(", ") : "none"}`
  };
}
function assertValidation(assertion, validation) {
  if (!isRecord(validation)) {
    return { pass: false, type: "validation", message: "validation result was not an object" };
  }
  const failures = [];
  if (assertion.valid !== void 0 && validation.valid !== assertion.valid) {
    failures.push(`valid expected ${assertion.valid}, received ${String(validation.valid)}`);
  }
  if (assertion.blocking !== void 0 && validation.blocking !== assertion.blocking) {
    failures.push(`blocking expected ${assertion.blocking}, received ${String(validation.blocking)}`);
  }
  if (assertion.fixedCount !== void 0 && !matchesCount(Number(validation.fixedCount ?? 0), normalizeCountExpectation(assertion.fixedCount))) {
    failures.push(`fixedCount expected ${formatCountExpectation(normalizeCountExpectation(assertion.fixedCount))}, received ${String(validation.fixedCount)}`);
  }
  if (assertion.warningCount !== void 0 && !matchesCount(Number(validation.warningCount ?? 0), normalizeCountExpectation(assertion.warningCount))) {
    failures.push(`warningCount expected ${formatCountExpectation(normalizeCountExpectation(assertion.warningCount))}, received ${String(validation.warningCount)}`);
  }
  if (assertion.blockingCount !== void 0 && !matchesCount(Number(validation.blockingCount ?? 0), normalizeCountExpectation(assertion.blockingCount))) {
    failures.push(`blockingCount expected ${formatCountExpectation(normalizeCountExpectation(assertion.blockingCount))}, received ${String(validation.blockingCount)}`);
  }
  if (assertion.codeProfile !== void 0 && validation.codeProfile !== assertion.codeProfile) {
    failures.push(`codeProfile expected ${assertion.codeProfile}, received ${String(validation.codeProfile)}`);
  }
  assertSummary("issueSummary", assertion.issueSummary, validation.issueSummary, failures);
  assertSummary("ruleSummary", assertion.ruleSummary, validation.ruleSummary, failures);
  const ruleIds = /* @__PURE__ */ new Set();
  if (isRecord(validation.ruleSummary)) {
    for (const ruleId of Object.keys(validation.ruleSummary)) ruleIds.add(ruleId);
  }
  if (Array.isArray(validation.issues)) {
    for (const issue2 of validation.issues) {
      if (isRecord(issue2) && typeof issue2.ruleId === "string") ruleIds.add(issue2.ruleId);
    }
  }
  for (const ruleId of assertion.mustIncludeRuleIds ?? []) {
    if (!ruleIds.has(ruleId)) failures.push(`ruleId ${ruleId} was not present`);
  }
  for (const ruleId of assertion.mustExcludeRuleIds ?? []) {
    if (ruleIds.has(ruleId)) failures.push(`ruleId ${ruleId} was present`);
  }
  return {
    pass: failures.length === 0,
    type: "validation",
    message: failures.length === 0 ? "validation matched expectations" : failures.join("; ")
  };
}
function assertValidationRepairHints(assertion, validation) {
  if (!isRecord(validation) || !Array.isArray(validation.repairHints)) {
    return { pass: false, type: "validation.repairHints", message: "validation.repairHints was not an array" };
  }
  const failures = [];
  const hints = validation.repairHints.filter(isRecord);
  const ruleIds = new Set(hints.map((hint) => hint.ruleId).filter((ruleId) => typeof ruleId === "string"));
  const preferredTools = /* @__PURE__ */ new Set();
  for (const hint of hints) {
    if (!Array.isArray(hint.preferredTools)) continue;
    for (const tool of hint.preferredTools) {
      if (typeof tool === "string") preferredTools.add(tool);
    }
  }
  for (const ruleId of assertion.mustIncludeRuleIds) {
    if (!ruleIds.has(ruleId)) failures.push(`repairHints missing ruleId ${ruleId}`);
  }
  for (const tool of assertion.mustIncludePreferredTools ?? []) {
    if (!preferredTools.has(tool)) failures.push(`repairHints missing preferred tool ${tool}`);
  }
  return {
    pass: failures.length === 0,
    type: "validation.repairHints",
    message: failures.length === 0 ? "repair hints matched expectations" : failures.join("; ")
  };
}
function assertSummary(label, expected, actual, failures) {
  if (!expected) return;
  if (!isRecord(actual)) {
    failures.push(`${label} expected object, received ${typeof actual}`);
    return;
  }
  for (const [key, countExpectation] of Object.entries(expected)) {
    const actualValue = Number(actual[key] ?? 0);
    const normalized = normalizeCountExpectation(countExpectation);
    if (!matchesCount(actualValue, normalized)) {
      failures.push(`${label}.${key} expected ${formatCountExpectation(normalized)}, received ${actualValue}`);
    }
  }
}
function matchesWhere(node, where) {
  for (const [fieldPath, expectation] of Object.entries(where)) {
    const actual = getByPath(node, fieldPath);
    if (!matchesExpectation(actual, expectation)) return false;
  }
  return true;
}
function matchesExpectation(actual, expectation) {
  if (isFieldMatch(expectation)) {
    if (expectation.exists !== void 0 && actual !== void 0 !== expectation.exists) return false;
    if (expectation.notNull && actual == null) return false;
    if (expectation.equals !== void 0 && !deepEqual(actual, expectation.equals)) return false;
    if (expectation.approx !== void 0) {
      if (typeof actual !== "number") return false;
      if (Math.abs(actual - expectation.approx) > (expectation.tolerance ?? 1e-3)) return false;
    }
    return true;
  }
  return deepEqual(actual, expectation);
}
function isFieldMatch(value) {
  if (!isRecord(value)) return false;
  return "equals" in value || "approx" in value || "exists" in value || "notNull" in value;
}
function normalizeCountExpectation(expectation) {
  return typeof expectation === "number" ? { exact: expectation } : expectation;
}
function matchesCount(actual, expectation) {
  if (expectation.exact !== void 0 && actual !== expectation.exact) return false;
  if (expectation.min !== void 0 && actual < expectation.min) return false;
  if (expectation.max !== void 0 && actual > expectation.max) return false;
  return true;
}
function formatCountExpectation(expectation) {
  if (expectation.exact !== void 0) return `exact ${expectation.exact}`;
  const parts = [];
  if (expectation.min !== void 0) parts.push(`min ${expectation.min}`);
  if (expectation.max !== void 0) parts.push(`max ${expectation.max}`);
  return parts.join(", ") || "any";
}
function dist2D2(a, b) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}
function pointInPolygon2(x, z2, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, zi] = polygon[i];
    const [xj, zj] = polygon[j];
    const intersects = zi > z2 !== zj > z2 && x < (xj - xi) * (z2 - zi) / (zj - zi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}
function polygonsOverlap(a, b) {
  return a.some((point) => pointInPolygon2(point[0], point[1], b)) || b.some((point) => pointInPolygon2(point[0], point[1], a));
}
function itemBboxForHarness(position, dimensions, rotationDeg) {
  const rot = (rotationDeg % 360 + 360) % 360;
  const rotated = rot === 90 || rot === 270;
  const width = rotated ? dimensions[2] : dimensions[0];
  const depth = rotated ? dimensions[0] : dimensions[2];
  return {
    minX: position[0] - width / 2,
    minZ: position[2] - depth / 2,
    maxX: position[0] + width / 2,
    maxZ: position[2] + depth / 2
  };
}
function expandBboxForHarness(bbox, amount) {
  return {
    minX: bbox.minX - amount,
    minZ: bbox.minZ - amount,
    maxX: bbox.maxX + amount,
    maxZ: bbox.maxZ + amount
  };
}
function bboxesOverlapForHarness(a, b) {
  return a.maxX > b.minX && a.minX < b.maxX && a.maxZ > b.minZ && a.minZ < b.maxZ;
}
function bboxCornersInsidePolygonForHarness(bbox, polygon) {
  return [
    [bbox.minX, bbox.minZ],
    [bbox.maxX, bbox.minZ],
    [bbox.maxX, bbox.maxZ],
    [bbox.minX, bbox.maxZ]
  ].every(([x, z2]) => pointInPolygon2(x, z2, polygon));
}
function collectDoorInfos(walls, nodes) {
  const doors = [];
  for (const wall of walls) {
    if (!wall.start || !wall.end) continue;
    const len = dist2D2(wall.start, wall.end);
    if (len < 1e-3) continue;
    const dirX = (wall.end[0] - wall.start[0]) / len;
    const dirZ = (wall.end[1] - wall.start[1]) / len;
    for (const childId of wall.children ?? []) {
      const child = nodes[childId];
      if (!isRecord(child) || child.type !== "door") continue;
      const position = child.position;
      if (!Array.isArray(position) || typeof position[0] !== "number") continue;
      const width = typeof child.width === "number" ? child.width : 0.9;
      doors.push({
        id: String(child.id),
        worldX: wall.start[0] + dirX * position[0],
        worldZ: wall.start[1] + dirZ * position[0],
        width
      });
    }
  }
  return doors;
}
function itemRadius(item) {
  const size = item.asset?.size ?? [1, 1, 1];
  const scale = item.scale ?? [1, 1, 1];
  return Math.max(size[0] * scale[0], size[2] * scale[2]) / 2;
}
function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
function summarizeResult(result) {
  if (!isRecord(result)) return String(result);
  if (result.success === true) return "success";
  if (typeof result.error === "string") return `error: ${result.error}`;
  return JSON.stringify(result).slice(0, 120);
}
function printCaseResult(result, verbose) {
  const icon = result.pass ? "PASS" : "FAIL";
  console.log(`${icon} ${result.name} (${result.durationMs}ms)`);
  if (!result.pass || verbose) {
    for (const assertion of result.assertions) {
      const assertionIcon = assertion.pass ? "  \u2713" : "  \u2717";
      console.log(`${assertionIcon} ${assertion.type}: ${assertion.message}`);
    }
  }
}
main().catch((error48) => {
  console.error(error48 instanceof Error ? error48.message : String(error48));
  process.exit(1);
});
