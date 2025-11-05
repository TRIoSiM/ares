import pandas as pd

data = {
    'Sıra': list(range(1, 51)),
    'Marka & Model': [
        'Fujifilm GFX 100S','Sony A1','Canon EOS R5','Nikon Z9','Sony A7R IV','Nikon Z7 II','Canon EOS R6',
        'Sony A7 IV','Sony A7 III','Panasonic Lumix S5','Canon EOS R','Nikon Z6 II','Fujifilm X-T4','Fujifilm X-H2',
        'Canon EOS R10','Canon EOS R10 Body','Nikon Z50 II Kit','Nikon Z50 II Body','Sony ZV-E10','Panasonic Lumix GH6',
        'Panasonic Lumix GH5 II','Olympus OM-D E-M1 Mark III','Olympus OM-D E-M1X','Canon EOS M6 Mark II','Canon EOS M50 Mark II',
        'Sony RX100 VII','Canon PowerShot G7 X Mark III','Nikon Coolpix P1000','Sony RX10 IV','Panasonic Lumix FZ1000 II',
        'Fujifilm X-T30 II','Fujifilm X-T20','Sony A6400','Sony A6100','Canon EOS 90D','Canon EOS 7D Mark II','Nikon D7500',
        'Nikon D5600','Nikon D3500','Canon EOS 6D Mark II','Pentax K-1 Mark II','Pentax KP','Leica SL2','Leica Q2','Sigma fp L',
        'Hasselblad X1D II 50C','Panasonic Lumix S1R','Panasonic Lumix S1','Canon EOS RP','Nikon Z50'
    ],
    'Sensör Tipi': [
        'Orta Format','Full Frame','Full Frame','Full Frame','Full Frame','Full Frame','Full Frame',
        'Full Frame','Full Frame','Full Frame','Full Frame','Full Frame','APS-C','APS-C',
        'APS-C','APS-C','APS-C','APS-C','APS-C','Micro Four Thirds',
        'Micro Four Thirds','Micro Four Thirds','Micro Four Thirds','APS-C','APS-C',
        '1"','1"','1/2.3"','1"','1"',
        'APS-C','APS-C','APS-C','APS-C','APS-C','APS-C','APS-C',
        'APS-C','Full Frame','Full Frame','APS-C','Full Frame','Full Frame','Full Frame',
        'Full Frame','Full Frame','Full Frame','Medium Format','Full Frame','Full Frame','Full Frame','APS-C'
    ],
    'Kit / Gövde': [
        'Body','Body','Body','Body','Body','Body','Body',
        'Body','Body','Body','Body','Body','Body','Body',
        'Kit','Body','Kit','Body','Body','Body',
        'Body','Body','Body','Body','Body','Kit','Kompakt','Kompakt','Kompakt','Kompakt',
        'Body','Body','Body','Body','Body','Body','Body','Body','Body','Body',
        'Body','Body','Body','Kompakt','Body','Body','Body','Body','Body'
    ],
    'Çözünürlük (MP)': [
        102,50,45,45.7,61,45.7,20.1,33,24.2,24.2,30.3,24.5,26.1,40,24.2,24.2,20.9,20.9,24.2,25.2,
        20.3,20.4,20.4,32.5,24.1,20.1,20.1,16,20.1,20.1,26.1,24.3,24.2,24.2,32.5,20.2,20.9,24.2,24.2,26.2,36.4,24.3,47.3,47.3,61,50,47.3,24.2,26.2,20.9
    ],
    'Video Özelliği': [
        '4K','8K','8K','8K','4K','4K','4K','4K','4K','4K','4K','4K','4K','8K','4K','4K','4K','4K','4K','5.7K',
        '4K 60p','4K 60p','4K 60p','4K','4K','4K','4K','4K','4K','4K','4K','4K','4K','1080p','4K','1080p','1080p','1080p',
        '4K','1080p','1080p','4K','4K','4K','4K','4K','4K','4K','4K'
    ],
    'FPS / Çekim Hızı': [
        10,30,20,20,10,10,20,10,10,60,8,14,15,15,15,15,11,11,30,75,60,60,60,14,10,90,30,7,24,12,30,14,11,11,10,10,8,5,5,6,4.4,7,10,10,18,2,9,9,5,11
    ],
    'Uzun Ömür Nedeni': [
        'Orta format, profesyonel detay','Sony’nin en üst seviye profesyonel modeli','RF lens ekosistemi, yüksek çözünürlük',
        'Nikon flagship, sağlam yapı','Ultra yüksek çözünürlük, lens desteği geniş','Yüksek çözünürlük, profesyonel kullanım',
        'Hızlı AF, RF lens desteği','Full frame, geniş lens desteği','Popüler, lens uyumluluğu güçlü','Video odaklı, dayanıklı yapı',
        'RF lens ekosistemi başlangıç seviyesi','Dayanıklı yapı, Z lens sistemi','Renk bilimleri, mekanik yapı',
        'APS-C yüksek çözünürlük, güçlü video','Kit lens ile uygun başlangıç','Lens yatırımı sonrası uzun kullanım',
        'Kit lens ile başlangıç için ideal','Z lens sistemi desteği ile uzun ömür','Vlog/video odaklı','Video odaklı, dayanıklı yapı',
        'Video odaklı, geniş lens uyumluluğu','5 eksenli sabitleme, dayanıklı yapı','Profesyonel kompakt gövde','Kompakt gövde, yüksek çözünürlük',
        'Vlog ve giriş seviyesi','Kompakt, taşınabilir, video odaklı','Süper zoom, taşınabilir','Bridge kamera, yüksek zoom','Bridge, taşınabilir',
        'Hafif, renk bilimleri güçlü','Hafif, fotoğraf odaklı','Lens desteği geniş, vlog-friendly','Başlangıç seviyesi APS-C','DSLR, uzun ömürlü gövde',
        'Dayanıklı DSLR, eski ama güvenilir','Dayanıklı gövde, uzun kullanım','Kompakt DSLR, amatör kullanım','Giriş seviyesi DSLR, hafif',
        'Full frame başlangıç seviyesi','Dayanıklı gövde, yüksek çözünürlük','Kompakt gövde, sağlam yapı','Profesyonel Leica gövde, dayanıklı',
        'Sabit lens, taşınabilir full frame','Modüler yapı, full frame','Orta format, profesyonel detay','Yüksek çözünürlük, dayanıklı yapı',
        'Video + fotoğraf dengesi','Uygun fiyatlı full frame','Taşınabilir APS-C, başlangıç seviyesi'
    ],
    'Fiyat (₺)': ['' for _ in range(50)]
}

df = pd.DataFrame(data)
df.to_excel('50_Kamera_Listesi.xlsx', index=False)
print("Excel dosyası oluşturuldu: 50_Kamera_Listesi.xlsx")
