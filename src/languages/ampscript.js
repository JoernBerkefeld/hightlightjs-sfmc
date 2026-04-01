/*
Language: AMPscript
Author: Joern Berkefeld <joern.berkefeld@gmail.com>
Category: Salesforce Marketing Cloud
Website: https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/AMPscript.html
*/

/** @type LanguageFn */
export default function (hljs) {
  const AMPSCRIPT_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_]*';

  const CONTENT_FUNCTIONS = [
    'AttachFile',
    'BarcodeURL',
    'BeginImpressionRegion',
    'BuildOptionList',
    'BuildRowsetFromJSON',
    'BuildRowSetFromString',
    'BuildRowSetFromXML',
    'ContentAreaByName',
    'ContentBlockByID',
    'ContentBlockByKey',
    'ContentBlockByName',
    'ContentImageByID',
    'ContentImageByKey',
    'EndImpressionRegion',
    'GetPortfolioItem',
    'Image',
    'LiveContentMicrositeURL',
    'TransformXML',
    'TreatAsContent',
    'TreatAsContentArea',
  ];

  const UTILITY_FUNCTIONS = [
    'AttributeValue',
    'AuthenticatedEmployeeID',
    'AuthenticatedEmployeeNotificationAddress',
    'AuthenticatedEmployeeUserName',
    'AuthenticatedEnterpriseID',
    'AuthenticatedMemberID',
    'AuthenticatedMemberName',
    'CloudPagesURL',
    'Domain',
    'Empty',
    'Format',
    'FormatCurrency',
    'FormatNumber',
    'GetValue',
    'GUID',
    'IIf',
    'IsCHTMLBrowser',
    'IsEmailAddress',
    'IsNull',
    'IsNullDefault',
    'IsPhoneNumber',
    'MicrositeURL',
    'Output',
    'OutputLine',
    'QueryParameter',
    'RaiseError',
    'Redirect',
    'RedirectTo',
    'RequestParameter',
    'SetValue',
    'V',
    'WAT',
    'WATP',
    'WrapLongURL',
  ];

  const DATA_EXTENSION_FUNCTIONS = [
    'ClaimRow',
    'ClaimRowValue',
    'DataExtensionRowCount',
    'DeleteData',
    'DeleteDE',
    'ExecuteFilter',
    'ExecuteFilterOrderedRows',
    'Field',
    'InsertData',
    'InsertDE',
    'Lookup',
    'LookupOrderedRows',
    'LookupOrderedRowsCS',
    'LookupRows',
    'LookupRowsCS',
    'Row',
    'RowCount',
    'UpdateData',
    'UpdateDE',
    'UpsertData',
    'UpsertDE',
  ];

  const DATE_TIME_FUNCTIONS = [
    'DateAdd',
    'DateDiff',
    'DateParse',
    'DatePart',
    'FormatDate',
    'GetSendTime',
    'LocalDateToSystemDate',
    'Now',
    'StringToDate',
    'SystemDateToLocalDate',
  ];

  const ENCRYPTION_FUNCTIONS = [
    'Base64Decode',
    'Base64Encode',
    'DecryptSymmetric',
    'EncryptSymmetric',
    'GetJWT',
    'GetJWTByKeyName',
    'MD5',
    'SHA1',
    'SHA256',
    'SHA512',
    'StringToHex',
    'URLEncode',
  ];

  const HTTP_FUNCTIONS = [
    'HTTPGet',
    'HTTPPost',
    'HTTPPost2',
    'HTTPPostWithRetry',
    'HTTPRequestHeader',
  ];

  const MATH_FUNCTIONS = ['Add', 'Divide', 'Mod', 'Multiply', 'Random', 'Subtract'];

  const API_FUNCTIONS = [
    'AddObjectArrayItem',
    'CreateObject',
    'InvokeCreate',
    'InvokeDelete',
    'InvokeExecute',
    'InvokePerform',
    'InvokeRetrieve',
    'InvokeUpdate',
    'SetObjectProperty',
  ];

  const CRM_FUNCTIONS = [
    'AddMSCRMListMember',
    'CreateMSCRMRecord',
    'DescribeMSCRMEntities',
    'DescribeMSCRMEntityAttributes',
    'RetrieveMSCRMRecords',
    'RetrieveMSCRMRecordsFetchXML',
    'SetStateMSCRMRecord',
    'UpdateMSCRMRecords',
    'UpsertMSCRMRecord',
  ];

  const SFDC_FUNCTIONS = [
    'CreateSalesforceObject',
    'LongSFID',
    'RetrieveSalesforceJobSources',
    'RetrieveSalesforceObjects',
    'UpdateSingleSalesforceObject',
  ];

  const MOBILE_FUNCTIONS = [
    'CreateSmsConversation',
    'EndSmsConversation',
    'SetSmsConversationNextKeyword',
    'UpsertContact',
  ];

  const SOCIAL_FUNCTIONS = [
    'GetPublishedSocialContent',
    'GetSocialPublishURL',
    'GetSocialPublishURLByName',
  ];

  const STRING_FUNCTIONS = [
    'Char',
    'Concat',
    'IndexOf',
    'Length',
    'Lowercase',
    'ProperCase',
    'RegExMatch',
    'Replace',
    'ReplaceList',
    'Substring',
    'Trim',
    'Uppercase',
  ];

  const OTHER_FUNCTIONS = ['RatingStars', 'ContentArea'];

  const ALL_FUNCTIONS = [
    ...CONTENT_FUNCTIONS,
    ...UTILITY_FUNCTIONS,
    ...DATA_EXTENSION_FUNCTIONS,
    ...DATE_TIME_FUNCTIONS,
    ...ENCRYPTION_FUNCTIONS,
    ...HTTP_FUNCTIONS,
    ...MATH_FUNCTIONS,
    ...API_FUNCTIONS,
    ...CRM_FUNCTIONS,
    ...SFDC_FUNCTIONS,
    ...MOBILE_FUNCTIONS,
    ...SOCIAL_FUNCTIONS,
    ...STRING_FUNCTIONS,
    ...OTHER_FUNCTIONS,
  ];

  const CONTROL_KEYWORDS = [
    'if',
    'then',
    'elseif',
    'else',
    'endif',
    'for',
    'to',
    'downto',
    'do',
    'next',
  ];

  const DECLARATION_KEYWORDS = ['var', 'set'];

  const LOGICAL_OPERATORS = ['and', 'or', 'not'];

  const KEYWORDS = {
    $pattern: /[a-zA-Z_@][a-zA-Z0-9_]*/,
    keyword: [...CONTROL_KEYWORDS, ...DECLARATION_KEYWORDS],
    literal: ['true', 'false'],
    built_in: ALL_FUNCTIONS,
  };

  const BLOCK_COMMENT = hljs.COMMENT('/\\*', '\\*/', { relevance: 1 });

  const SINGLE_QUOTE_STRING = {
    scope: 'string',
    begin: /'/,
    end: /'/,
    contains: [{ begin: /''/, relevance: 0 }],
    relevance: 0,
  };

  const DOUBLE_QUOTE_STRING = {
    scope: 'string',
    begin: /"/,
    end: /"/,
    contains: [{ begin: /""/, relevance: 0 }],
    relevance: 0,
  };

  const NUMBERS = {
    scope: 'number',
    match: /\b\d+(\.\d+)?\b/,
    relevance: 0,
  };

  const SYSTEM_VARIABLE = {
    scope: 'variable.language',
    match: /@@[a-zA-Z_][a-zA-Z0-9_]*/,
    relevance: 5,
  };

  const USER_VARIABLE = {
    scope: 'variable',
    match: /@[a-zA-Z_][a-zA-Z0-9_]*/,
    relevance: 3,
  };

  const ATTRIBUTE_ACCESS = {
    scope: 'attr',
    begin: /\[/,
    end: /\]/,
    excludeBegin: true,
    excludeEnd: true,
    relevance: 0,
    contains: [
      SINGLE_QUOTE_STRING,
      DOUBLE_QUOTE_STRING,
      {
        scope: 'attr',
        match: AMPSCRIPT_IDENT_RE,
        relevance: 0,
      },
    ],
  };

  const FUNCTION_CALL = {
    match: [
      /\b/,
      hljs.regex.concat(hljs.regex.either(...ALL_FUNCTIONS)),
      /\s*(?=\()/,
    ],
    scope: { 2: 'built_in' },
    relevance: 5,
  };

  const OPERATORS = {
    scope: 'operator',
    match: /==|!=|<>|<=|>=|[<>+\-*\/]/,
    relevance: 0,
  };

  const LOGICAL_OPERATOR_RE = {
    scope: 'keyword',
    match: /\b(?:and|or|not)\b/i,
    relevance: 0,
  };

  const BLOCK_OPEN = {
    scope: 'meta',
    match: /%%\[/,
    relevance: 10,
  };

  const BLOCK_CLOSE = {
    scope: 'meta',
    match: /\]%%/,
    relevance: 10,
  };

  const INLINE_OPEN = {
    scope: 'meta',
    match: /%%=/,
    relevance: 10,
  };

  const INLINE_CLOSE = {
    scope: 'meta',
    match: /=%%/,
    relevance: 10,
  };

  const PERSONALIZATION = {
    scope: 'variable.language',
    match: /%%[a-zA-Z_][a-zA-Z0-9_]*%%/,
    relevance: 8,
  };

  const COMMA = {
    match: /,/,
    scope: 'punctuation',
    relevance: 0,
  };

  const PARENS = {
    match: /[()]/,
    scope: 'punctuation',
    relevance: 0,
  };

  return {
    name: 'AMPscript',
    aliases: ['ampscript', 'amp'],
    case_insensitive: true,
    disableAutodetect: false,
    keywords: KEYWORDS,
    contains: [
      BLOCK_COMMENT,
      BLOCK_OPEN,
      BLOCK_CLOSE,
      INLINE_OPEN,
      INLINE_CLOSE,
      PERSONALIZATION,
      SINGLE_QUOTE_STRING,
      DOUBLE_QUOTE_STRING,
      NUMBERS,
      SYSTEM_VARIABLE,
      USER_VARIABLE,
      FUNCTION_CALL,
      LOGICAL_OPERATOR_RE,
      OPERATORS,
      ATTRIBUTE_ACCESS,
      COMMA,
      PARENS,
    ],
    illegal: [
      /\bclass\s+\w+/,
      /\bimport\s+/,
      /\bpackage\s+/,
      /\bnamespace\s+/,
      /\busing\s+/,
      /\bdef\s+/,
      /#include/,
      /\bfn\s+/,
      /\bfunc\s+/,
    ],
  };
}
