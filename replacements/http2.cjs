module.exports = {
  constants: {
    HTTP2_HEADER_STATUS: ':status',
    HTTP_STATUS_OK: 200,
    HTTP2_HEADER_CONTENT_TYPE: 'content-type',
  }
}

// const http2HeaderStatusSafe = ':status';
// const http2HeaderContentTypeSafe = 'content-type';
// const httpStatusOk = 200

// const defaultResponseHeaders = {
//   // TODO(cjihrig): Remove these encoding headers from the default response
//   // once compression is integrated.
//   [GRPC_ACCEPT_ENCODING_HEADER]: 'identity,deflate,gzip',
//   [GRPC_ENCODING_HEADER]: 'identity',
//   [http2HeaderStatusSafe]: httpStatusOk,
//   [http2HeaderContentTypeSafe]: 'application/grpc+proto',
// };
