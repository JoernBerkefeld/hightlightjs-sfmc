/*
Language: SSJS (Server-Side JavaScript for Salesforce Marketing Cloud)
Author: Joern Berkefeld <joern.berkefeld@gmail.com>
Category: Salesforce Marketing Cloud
Website: https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/ssjs_serverSideJavaScript.html
Requires: javascript
*/

/** @type LanguageFn */
export default function (hljs) {
  const SFMC_GLOBAL_FUNCTIONS = [
    'Write',
    'Stringify',
    'ContentBlockByKey',
    'ContentBlockByName',
    'ContentBlockByID',
    'ContentAreaByKey',
    'TreatAsContent',
    'TreatAsContentArea',
  ];

  const SFMC_GLOBAL_OBJECTS = [
    'Platform',
    'Variable',
    'Attribute',
    'HTTP',
    'WSProxy',
    'Script',
    'DataExtension',
    'Subscriber',
    'Email',
    'TriggeredSend',
    'List',
    'ContentArea',
    'Folder',
    'QueryDefinition',
    'Send',
    'SendDefinition',
    'Template',
    'DeliveryProfile',
    'SenderProfile',
    'SendClassification',
    'FilterDefinition',
    'Account',
    'AccountUser',
    'Portfolio',
    'BounceEvent',
    'ClickEvent',
    'ForwardedEmailEvent',
    'ForwardedEmailOptInEvent',
    'NotSentEvent',
    'OpenEvent',
    'SentEvent',
    'SurveyEvent',
    'UnsubEvent',
  ];

  const PLATFORM_FUNCTION_METHODS = [
    'Lookup',
    'LookupRows',
    'LookupOrderedRows',
    'InsertData',
    'InsertDE',
    'UpdateData',
    'UpdateDE',
    'UpsertData',
    'UpsertDE',
    'DeleteData',
    'DeleteDE',
    'ContentBlockByKey',
    'ContentBlockByName',
    'ContentBlockByID',
    'TreatAsContent',
    'Substring',
    'Trim',
    'Replace',
    'IndexOf',
    'Length',
    'Uppercase',
    'Lowercase',
    'ProperCase',
    'Char',
    'Concat',
    'Format',
    'DateAdd',
    'DateDiff',
    'DateParse',
    'Now',
    'FormatDate',
    'SystemDateToLocalDate',
    'GetValue',
    'SetValue',
    'RaiseError',
    'Redirect',
    'CloudPagesURL',
    'MicrositeURL',
    'GUID',
    'Base64Encode',
    'Base64Decode',
    'EncryptSymmetric',
    'DecryptSymmetric',
    'SHA256',
    'SHA512',
    'MD5',
    'IsEmailAddress',
    'IsNull',
    'Empty',
    'IIf',
    'DataExtensionRowCount',
    'CreateObject',
    'SetObjectProperty',
    'AddObjectArrayItem',
    'InvokeCreate',
    'InvokeUpdate',
    'InvokeDelete',
    'InvokeRetrieve',
    'InvokePerform',
    'InvokeConfigure',
    'InvokeExecute',
    'AttributeValue',
    'HTTPGet',
    'HTTPPost',
    'HTTPRequestHeader',
    'ParseJSON',
    'URLEncode',
  ];

  const WSPROXY_METHODS = [
    'createItem',
    'updateItem',
    'deleteItem',
    'retrieve',
    'performItem',
    'execute',
    'setBatchSize',
    'setClientId',
    'createBatch',
    'updateBatch',
    'deleteBatch',
  ];

  const CORE_OBJECT_METHODS = [
    'Init',
    'Add',
    'Remove',
    'Update',
    'Retrieve',
    'Rows',
    'Fields',
  ];

  const PLATFORM_NAMESPACES = {
    scope: 'built_in',
    match:
      /\bPlatform\b(?=\s*\.)|(?<=Platform\.)\bFunction\b(?=\s*\.)|(?<=Platform\.)\bLoad\b(?=\s*\()|(?<=Platform\.)\bResponse\b(?=\s*\.)|(?<=Platform\.)\bRequest\b(?=\s*\.)|(?<=Platform\.)\bClientBrowser\b(?=\s*\.)/,
    relevance: 10,
  };

  const SCRIPT_UTIL = {
    scope: 'built_in',
    match: /\bScript\b(?=\s*\.)|(?<=Script\.)\bUtil\b(?=\s*\.)/,
    relevance: 8,
  };

  const SFMC_GLOBAL_FUNCTION_RE = {
    match: [
      hljs.regex.concat(/\b/, hljs.regex.either(...SFMC_GLOBAL_FUNCTIONS)),
      /\s*(?=\()/,
    ],
    scope: { 1: 'built_in' },
    relevance: 8,
  };

  const SFMC_GLOBAL_OBJECT_RE = {
    scope: 'built_in',
    match: hljs.regex.concat(
      /\b/,
      hljs.regex.either(...SFMC_GLOBAL_OBJECTS),
      /\b(?=\s*\.|\s*\()/
    ),
    relevance: 5,
  };

  const PLATFORM_FUNC_METHOD_RE = {
    match: [
      /(?<=Platform\.Function\.)/,
      hljs.regex.concat(hljs.regex.either(...PLATFORM_FUNCTION_METHODS)),
      /\s*(?=\()/,
    ],
    scope: { 2: 'built_in' },
    relevance: 10,
  };

  const WSPROXY_METHOD_RE = {
    match: [
      /(?<=\.\s*)/,
      hljs.regex.concat(hljs.regex.either(...WSPROXY_METHODS)),
      /\s*(?=\()/,
    ],
    scope: { 2: 'title.function.invoke' },
    relevance: 3,
  };

  const CORE_METHOD_RE = {
    match: [
      /(?<=\.\s*)/,
      hljs.regex.concat(hljs.regex.either(...CORE_OBJECT_METHODS)),
      /\s*(?=\()/,
    ],
    scope: { 2: 'title.function.invoke' },
    relevance: 3,
  };

  const HTTP_METHODS = {
    scope: 'built_in',
    match: /\bHTTP\b(?=\s*\.)|(?<=HTTP\.)\b(?:Get|Post|GetRequest|PostRequest)\b/,
    relevance: 8,
  };

  return {
    name: 'SSJS',
    aliases: ['ssjs', 'sfmc-ssjs'],
    disableAutodetect: true,
    supersetOf: 'javascript',
    keywords: {
      $pattern: /[a-zA-Z_$][a-zA-Z0-9_$]*/,
      built_in: [...SFMC_GLOBAL_FUNCTIONS, ...SFMC_GLOBAL_OBJECTS],
    },
    contains: [
      PLATFORM_NAMESPACES,
      SCRIPT_UTIL,
      PLATFORM_FUNC_METHOD_RE,
      SFMC_GLOBAL_FUNCTION_RE,
      SFMC_GLOBAL_OBJECT_RE,
      HTTP_METHODS,
      WSPROXY_METHOD_RE,
      CORE_METHOD_RE,
    ],
    subLanguage: 'javascript',
  };
}
