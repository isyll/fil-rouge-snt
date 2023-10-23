class TokenResponse {
  final String token;

  const TokenResponse({required this.token});

  factory TokenResponse.create(Map<String, dynamic> json) {
    return TokenResponse(token: json['token'] as String);
  }
}
