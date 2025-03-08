data "aws_route53_zone" "root" {
  name         = "${local.root_domain}."
  private_zone = false
}

resource "aws_route53_record" "acm" {
  for_each = {
    for dvo in aws_acm_certificate.cdn.domain_validation_options : dvo.domain_name => {
      name    = dvo.resource_record_name
      type    = dvo.resource_record_type
      record  = dvo.resource_record_value
      zone_id = data.aws_route53_zone.root.zone_id
    }
  }
  allow_overwrite = true
  zone_id         = each.value.zone_id
  name            = each.value.name
  type            = each.value.type
  records         = [each.value.record]
  ttl             = 60
}

resource "aws_route53_record" "cdn" {
  name    = local.domain_name
  type    = "A"
  zone_id = data.aws_route53_zone.root.zone_id
  alias {
    evaluate_target_health = true
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
  }
}
