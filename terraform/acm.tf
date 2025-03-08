resource "aws_acm_certificate" "cdn" {
  domain_name       = local.domain_name
  validation_method = "DNS"
  tags              = merge(local.tags, { "Name" = local.name_prefix })
}

resource "aws_acm_certificate_validation" "cdn" {
  certificate_arn         = aws_acm_certificate.cdn.arn
  validation_record_fqdns = [for dvo in aws_acm_certificate.cdn.domain_validation_options : dvo.resource_record_name]
  depends_on              = [aws_route53_record.acm]
}
