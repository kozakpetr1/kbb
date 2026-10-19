## Co je šifrování?

**Šifrování** je proces přeměny čitelných informací (nazývaných **plain text**) na nečitelnou podobu (**cipher text**), která je k pochopení přístupná pouze osobám nebo systémům, které mají správný klíč pro dešifrování. Hlavním cílem šifrování je zajistit **důvěrnost** informací, aby k nim neměli přístup neoprávněné osoby.

Šifrování se používá k ochraně citlivých dat, jako jsou hesla, finanční transakce, osobní údaje nebo komunikace mezi uživateli. Bezpečné šifrování je zásadní pro ochranu soukromí a integrity dat, zejména v digitálním světě.

---

## Základní princip šifrování

1. **Šifrovací algoritmus**: Je to matematická funkce, která určuje, jak bude proces šifrování a dešifrování probíhat.
2. **Klíč**: Údaje, které se používají ve šifrovacím algoritmu k určení, jak bude text převeden na šifrovaný formát.
3. **Dešifrování**: Proces převodu šifrovaného textu zpět na původní čitelný formát, který je možný pouze s odpovídajícím klíčem.

---

## Typy šifrování

1. **Symetrické šifrování**  
   - Používá **jeden klíč** pro šifrování i dešifrování dat.
   - **Výhody**: Rychlé a efektivní pro šifrování velkých objemů dat.
   - **Nevýhody**: Bezpečnost je ohrožena, pokud dojde ke kompromitaci klíče, protože ten samý klíč je použit pro obě operace.

2. **Asymetrické šifrování (veřejný klíč)**  
   - Používá **dva různé klíče**: **veřejný klíč** pro šifrování a **soukromý klíč** pro dešifrování.
   - **Výhody**: Vyšší úroveň bezpečnosti, protože soukromý klíč nikdy neopustí zařízení.
   - **Nevýhody**: Pomalé oproti symetrickému šifrování, náročné na výpočetní výkon.

---

## Nejběžnější šifrovací algoritmy

### 1. **AES (Advanced Encryption Standard)**
- **Typ**: Symetrické šifrování
- **Použití**: Nejvíce používaný algoritmus pro šifrování citlivých dat, používá se ve VPN, šifrování disků (např. BitLocker, FileVault).
- **Klíčové délky**: 128-bit, 192-bit, 256-bit
- **Výhody**: Velmi bezpečný a rychlý. Používá se v mnoha komerčních a vládních aplikacích.

### 2. **RSA (Rivest-Shamir-Adleman)**
- **Typ**: Asymetrické šifrování
- **Použití**: Používá se hlavně pro šifrování malých objemů dat (např. šifrování šifrovacích klíčů nebo digitálních podpisů).
- **Výhody**: Velmi bezpečný, ale pomalejší než symetrické algoritmy. 
- **Klíčové délky**: Obvykle 1024-bit, 2048-bit, 4096-bit

### 3. **ECC (Elliptic Curve Cryptography)**
- **Typ**: Asymetrické šifrování
- **Použití**: Efektivní pro zařízení s nízkým výpočetním výkonem, jako jsou mobilní telefony a IoT zařízení.
- **Výhody**: Menší klíče při zachování vysoké úrovně bezpečnosti (např. 256-bit klíč v ECC je stejně bezpečný jako 3072-bit klíč u RSA).
- **Příklady**: ECDSA (Elliptic Curve Digital Signature Algorithm), ECDH (Elliptic Curve Diffie-Hellman)

### 4. **3DES (Triple DES)**
- **Typ**: Symetrické šifrování
- **Použití**: Byl historicky populární pro šifrování bankovních a finančních transakcí.
- **Výhody**: Zvyšuje bezpečnost DES (Data Encryption Standard) tím, že provádí šifrování třikrát s třemi různými klíči.
- **Nevýhody**: Pomalý a méně bezpečný než moderní šifrovací algoritmy jako AES.

### 5. **Blowfish**
- **Typ**: Symetrické šifrování
- **Použití**: Používá se pro šifrování dat v aplikacích a sítích.
- **Výhody**: Rychlý a flexibilní algoritmus, navržený pro nízké nároky na výpočetní výkon.
- **Nevýhody**: Má menší bezpečnost než moderní algoritmy jako AES, a proto je v současnosti méně běžně používán.

### 6. **ChaCha20**
- **Typ**: Symetrické šifrování
- **Použití**: Využívá se jako alternativa k AES, zejména v mobilních a nízkoúrovňových zařízeních, kde je důležitá rychlost a efektivita.
- **Výhody**: Vysoký výkon a bezpečnost, často používán v kombinaci s **Poly1305** pro autentizaci (ChaCha20-Poly1305).
- **Příklady**: Využíván v protokolech jako TLS 1.3.

---

## Závěr

Šifrování je klíčovým nástrojem pro ochranu citlivých dat v digitálním světě. Zatímco symetrické algoritmy jako **AES** jsou rychlé a efektivní pro šifrování velkých objemů dat, asymetrické algoritmy jako **RSA** a **ECC** poskytují silnou bezpečnost při práci s klíči a digitálními podpisy. V závislosti na konkrétní aplikaci a požadavcích na bezpečnost a výkon se volí nejvhodnější šifrovací algoritmus.