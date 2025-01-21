# Základní techniky používané při hackingu

Hacking využívá širokou škálu technik a metod, které mohou sloužit k odhalení zranitelností, získání neoprávněného přístupu nebo manipulaci s daty. Níže jsou uvedeny některé základní techniky:

---

## 1. **Skenování portů (Port Scanning)**
- **Princip**: Pomocí nástrojů, jako je **Nmap**, se identifikují otevřené porty na cílovém systému, které mohou sloužit jako vstupní bod.
- **Účel**: Zjistit, jaké služby nebo aplikace běží na daných portech, a hledat potenciální zranitelnosti.

---

## 2. **Sociální inženýrství**
- **Princip**: Manipulace lidí k získání citlivých informací, jako jsou hesla nebo přístupové údaje.
- **Příklady**:
  - Phishingové e-maily nebo podvodné telefonní hovory.
  - Vydávání se za technickou podporu.

---

## 3. **Brute Force Attack**
- **Princip**: Automatické zkoušení všech možných kombinací hesel, dokud není nalezena správná.
- **Nevýhody**: Náročné na čas a zdroje, často detekovatelné.
- **Varianta**: **Dictionary Attack** – používání seznamu běžných hesel.

---

## 4. **Man-in-the-Middle (MITM) útok**
- **Princip**: Útočník se postaví mezi komunikující strany (např. uživatele a server) a odposlouchává nebo upravuje přenášená data.
- **Příklad použití**: Krádež přihlašovacích údajů při nezabezpečeném připojení.

---

## 5. **SQL Injection**
- **Princip**: Vkládání škodlivých SQL příkazů do vstupních polí webových aplikací, které nejsou správně zabezpečené.
- **Účel**: Přístup k databázím, krádež dat nebo jejich mazání.
- **Příklad**:
  ```sql
  ' OR '1'='1'; --
  ```

---

## 6. **Cross-Site Scripting (XSS)**
- **Princip**: Vložení škodlivého skriptu (např. JavaScriptu) do webové stránky, který se spustí u jiných uživatelů.
- **Účel**: Krádež cookies, přesměrování uživatelů nebo manipulace s obsahem stránky.

---

## 7. **Sniffing**
- **Princip**: Odposlouchávání síťového provozu za účelem zachycení citlivých dat, jako jsou hesla nebo přihlašovací údaje.
- **Nástroje**: **Wireshark**, **tcpdump**.
- **Prevence**: Použití šifrování (např. HTTPS).

---

## 8. **Exploity**
- **Princip**: Využití známých zranitelností v softwaru nebo hardwaru k získání přístupu do systému.
- **Příklady**:
  - Využití neaktualizovaného operačního systému.
  - Zneužití chyb v kódu aplikace.

---

## 9. **Denial of Service (DoS) a Distributed DoS (DDoS) útoky**
- **Princip**: Přetížení serveru nebo sítě nadměrným množstvím požadavků, což vede k nedostupnosti služby.
- **Rozdíl**:
  - **DoS**: Útok z jednoho zdroje.
  - **DDoS**: Útok z více infikovaných zařízení (botnet).

---

## 10. **Password Cracking**
- **Princip**: Získání hesel pomocí technik, jako je:
  - Hashování a následné porovnání s databází známých hashů.
  - Rainbow Tables (předpočítané tabulky hashů).

---

## 11. **Privilege Escalation**
- **Princip**: Získání vyšších oprávnění v systému, než má útočník původně.
- **Příklad**: Získání administrátorských práv na uživatelském účtu.

---

## 12. **Phishing**
- **Princip**: Vytvoření podvodné webové stránky, e-mailu nebo SMS zprávy, které se tváří jako legitimní a sbírají citlivé údaje od uživatelů.
- **Varianty**:
  - Spear Phishing (cílené na konkrétní osobu).
  - Whaling (cílené na vysoce postavené osoby).

---

## 13. **Backdoor**
- **Princip**: Vytvoření skryté cesty pro opětovný přístup k systému, i když jsou objeveny původní zranitelnosti.
- **Účel**: Dlouhodobá kontrola nad systémem.

---

## 14. **Spoofing**
- **Princip**: Maskování útočníka za důvěryhodnou entitu.
- **Typy**:
  - IP spoofing.
  - E-mail spoofing.

---

Tyto techniky mohou být využity k legálním účelům (např. bezpečnostní testování) i k nelegálním aktivitám. Klíčem k ochraně před hackingem je prevence, vzdělávání a používání moderních bezpečnostních opatření.