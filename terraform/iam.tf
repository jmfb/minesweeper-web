resource "aws_cloudfront_origin_access_identity" "cdn" {
  comment = "Identity for ${local.bucket_name} cloudfront distribution"
}

data "aws_iam_policy_document" "cloudfront_cdn" {
  policy_id = "PolicyForCloudFrontPrivateContent"
  version   = "2012-10-17"
  statement {
    sid    = "ObjectReadOnly"
    effect = "Allow"
    principals {
      identifiers = [aws_cloudfront_origin_access_identity.cdn.iam_arn]
      type        = "AWS"
    }
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.cdn.arn}/*"]
  }
  statement {
    sid    = "BucketReadOnly"
    effect = "Allow"
    principals {
      identifiers = [aws_cloudfront_origin_access_identity.cdn.iam_arn]
      type        = "AWS"
    }
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.cdn.arn]
  }
}

resource "aws_s3_bucket_policy" "cloudfront_cdn" {
  bucket     = aws_s3_bucket.cdn.id
  policy     = data.aws_iam_policy_document.cloudfront_cdn.json
  depends_on = [aws_s3_bucket_public_access_block.cdn]
}
