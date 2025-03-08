locals {
  name_prefix = "minesweeper"
  root_domain = "buysse.link"
  domain_name = "${local.name_prefix}.${local.root_domain}"
  tags = {
    application = "minesweeper"
  }
}
