function handler(event) {
  var dest = event.request.querystring["to"];
  if (!!dest) {
    var response = {
      statusCode: 200,
      statusDescription: "OK",
      headers: {
        refresh: { value: "0; url='" + decodeURIComponent(dest.value) + "'" },
      },
    };
    return response;
  }

  return event.request;
}
