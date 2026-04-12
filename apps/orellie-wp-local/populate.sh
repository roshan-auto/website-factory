#!/bin/bash
for i in 1 2 3 4 5 6; do
  wp post create --post_type=product --post_title="Signature Earring $i" --post_status=publish --allow-root --meta_input='{"_price":"85.00","_regular_price":"85.00"}'
done
