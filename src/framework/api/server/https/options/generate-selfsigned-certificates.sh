openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes \
  -keyout private.pem -out public.pem -subj "/CN=somerandomdomain.com" \
  -addext "subjectAltName=DNS:somerandomdomain.com,DNS:www.somerandomdomain.com,IP:10.0.0.1"