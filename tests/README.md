# Tests

```
pip install playwright
python -m http.server 8090 -d app
python tests/test_provenance.py  # source trail rules; fails on any error
python tests/test_routes.py   # screenshots to tests/shots/
python tests/test_population.py
python tests/test_scan.py     # needs tests/fakecam.y4m
```

Make the fake camera from a barcode screenshot:
`ffmpeg -loop 1 -i barcode.png -t 10 -r 15 -pix_fmt yuv420p tests/fakecam.y4m`
