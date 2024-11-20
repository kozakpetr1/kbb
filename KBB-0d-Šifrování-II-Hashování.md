## **Co je hashování?**
Hashování je proces, při kterém se vstupní data (např. text nebo soubor) převedou na hodnotu pevné délky, která se nazývá "hash" nebo "otisk". Tento proces využívá hashovací funkci, která z libovolně velkého vstupu vytvoří unikátní výstup o pevné délce. Hashovací funkce je navržena tak, že i malá změna v původním vstupu vede k výrazné změně výstupního hashového hodnoty, což činí hashování užitečné pro různé účely.

### **Základní vlastnosti hashovacích funkcí:**
- **Deterministické**: Pro stejný vstup bude hash vždy stejný.
- **Rychlost**: Hashování by mělo být rychlé, aby umožnilo rychlé zpracování i velkých objemů dat.
- **Jednosměrné**: Hashovací funkce je navržena tak, že je obtížné (prakticky nemožné) získat původní data z hashového výstupu.
- **Kollizní rezistence**: Je velmi nepravděpodobné, že dvě různá vstupní data povedou k identickému hashovému výstupu (tzv. "kolize").
- **Fixní délka**: Bez ohledu na délku vstupních dat má výstup vždy pevnou délku.

---

## **K čemu se hashování využívá?**

1. **Ukládání hesel**: 
   - Hesla uživatelů by měla být uložena v hashované podobě, nikoli v čistém textu. Pokud útočník získá přístup k databázi, nebude schopen získat původní hesla.
   - **Příklad**: Při registraci uživatele je jeho heslo hashováno a uloženo v databázi. Při přihlášení se uživatelovo heslo opět hashuje a porovná se s uloženým hashem.

2. **Integrita dat**:
   - Hashování je také používáno k ověření integrity dat. Pokud byla data změněna nebo poškozena, jejich hashová hodnota se změní, což umožní detekci změn.
   - **Příklad**: Při stahování souboru si můžete ověřit hash souboru poskytnutý poskytovatelem. Pokud se hash shoduje, soubor nebyl poškozen nebo pozměněn.

3. **Digitální podpisy a certifikáty**:
   - Digitální podpisy používají hashování k ověření autenticity a integrity zprávy. Před podepsáním zprávy se zpráva zhashuje, a tento hash je podepsán privátním klíčem.
   - **Příklad**: Využívá se například v SSL/TLS protokolech pro šifrovanou komunikaci na internetu.

4. **Uchovávání a vyhledávání v databázích**:
   - Hashování se používá k efektivnímu vyhledávání a porovnávání dat v databázích, zejména pro kontrolu duplicitních záznamů.
   - **Příklad**: Hashování může být použito k hledání duplicitních souborů na pevném disku.

5. **Blockchain**:
   - V technologii blockchain je hashování klíčovým prvkem, který zajišťuje integritu a bezpečnost transakcí. Každý blok obsahuje hash předchozího bloku, což vytváří nezměnitelný řetězec bloků.
   - **Příklad**: Bitcoin a jiné kryptoměny používají hashování k zabezpečení transakcí a těžbě bloků.

---

## **Hashovací algoritmy**

Existuje mnoho různých hashovacích algoritmů, každý s různými vlastnostmi a použitími. Některé z nejběžnějších algoritmů jsou:

1. **MD5 (Message Digest Algorithm 5)**
   - **Délka hashového výstupu**: 128 bitů (32 hexadecimálních znaků).
   - **Využití**: Používal se pro ověřování integrity dat a pro ukládání hesel. Dnes se již považuje za nebezpečný, protože je náchylný na kolize (existují dva různé vstupy s identickým hashovým výstupem).
   - **Důraz**: Kvůli bezpečnostním problémům se dnes již nedoporučuje pro citlivé aplikace.

2. **SHA-1 (Secure Hash Algorithm 1)**
   - **Délka hashového výstupu**: 160 bitů (40 hexadecimálních znaků).
   - **Využití**: Dříve běžně používaný algoritmus pro digitální podpisy, certifikáty a SSL/TLS. Nicméně, stejně jako MD5, je SHA-1 zranitelný vůči kolizím a dnes se považuje za zastaralý a nesafe.
   - **Důraz**: Mnoho aplikací přešlo na silnější alternativy (SHA-256 nebo SHA-3).

3. **SHA-256 (Secure Hash Algorithm 256-bit)**
   - **Délka hashového výstupu**: 256 bitů (64 hexadecimálních znaků).
   - **Využití**: V současnosti jeden z nejpopulárnějších algoritmů pro bezpečnostní aplikace, jako jsou blockchainy (např. Bitcoin), digitální podpisy, certifikáty a další.
   - **Důraz**: Bezpečnější než SHA-1, široce využívaný v průmyslu a považován za vysoce bezpečný.

4. **SHA-3 (Secure Hash Algorithm 3)**
   - **Délka hashového výstupu**: Variabilní (224, 256, 384 nebo 512 bitů).
   - **Využití**: Novější rodina hashovacích funkcí, která nabízí silnější bezpečnostní záruky než SHA-2.
   - **Důraz**: SHA-3 je vysoce bezpečný a vhodný pro použití ve všech aplikacích, kde je vyžadována silná hashovací funkce.

5. **BLAKE2**
   - **Délka hashového výstupu**: Variabilní (224, 256, 384, 512 bitů).
   - **Využití**: Rychlý a bezpečný hashovací algoritmus, který je moderní alternativou k MD5 a SHA-2. BLAKE2 je vhodný pro použití v různých aplikacích, kde je třeba kombinovat bezpečnost a rychlost.
   - **Důraz**: Vysoce efektivní a bezpečný algoritmus, který je stále více populární.

6. **RIPEMD-160 (RACE Integrity Primitives Evaluation Message Digest)**
   - **Délka hashového výstupu**: 160 bitů (40 hexadecimálních znaků).
   - **Využití**: Používá se v některých kryptografických aplikacích, i když je méně běžný než SHA-1 a SHA-256.
   - **Důraz**: Bezpečnější než MD5 a SHA-1, ale stále se používá méně často než novější algoritmy.

## **Závěr**

Hashování je důležitým nástrojem v oblasti bezpečnosti a kryptografie. Využívá se k zajištění integrity dat, uchovávání hesel, ověřování digitálních podpisů a v mnoha dalších aplikacích. Výběr správného hashovacího algoritmu závisí na požadavcích na bezpečnost, rychlost a odolnost vůči kolizím. Moderní algoritmy jako SHA-256 nebo SHA-3 jsou považovány za bezpečné, zatímco starší algoritmy jako MD5 a SHA-1 jsou již považovány za zastaralé a zranitelné.

---

# Duhový seznam (Rainbow Table)

**Duhový seznam** (Rainbow Table) je metoda pro zrychlení procesu získávání původního textu (např. hesla) z jeho hashované hodnoty. Jde o předpočítané tabulky, které obsahují hashované hodnoty a jejich odpovídající původní vstupy, což usnadňuje proces *reverzního hashování*.

### **Princip duhového seznamu**
Duhový seznamy jsou efektivní nástroje pro útoky typu *pre-image attack*, kdy útočník zná hashovou hodnotu a chce zjistit původní data, která vedla k tomuto hashovému výstupu. Místo aby se každé možné heslo nebo kombinace zkoušely individuálně, duhový seznam obsahuje již předpočítané hodnoty pro velký počet různých možností.

Hlavním rozdílem mezi běžným seznamem hashů a duhovým seznamem je použití **redukčních funkcí**, které umožňují zmenšení velikosti tabulek. Tento proces je zcela jiný než jednoduše ukládání všech hashovaných hodnot pro každý možný vstup.

### **Jak funguje duhový seznam?**
1. **Generování řetězců**: Duhový seznam se skládá z řetězců, které jsou vytvořeny aplikováním hashovací funkce na počáteční hodnoty (např. hesla). Poté se pomocí redukční funkce vrátí zpět na jiný řetězec (např. nové heslo). Tento proces se opakuje několikrát.
   
2. **Redukční funkce**: Redukční funkce slouží k převodu hashovaného výstupu zpět do formy textového řetězce. Není to reverzní funkce hashování (která je prakticky nemožná), ale způsob, jak z hashů generovat další možné vstupy. Tento proces je opakován, dokud není vytvořen dlouhý řetězec hodnot.

3. **Útok pomocí duhového seznamu**: Když útočník získá hashovanou hodnotu (například z databáze), může použít duhový seznam pro zpětný výpočet původního hesla. Tabulka obsahuje předpočítané řetězce, které odpovídají možným hashovaným hodnotám, čímž se zkracuje čas potřebný k nalezení původního hesla.

### **Výhody duhového seznamu:**
- **Úspora času**: Namísto provádění brutálního útoku na každý možný vstup, duhové tabulky umožňují útočníkovi využít předpočítané hodnoty a rychleji zjistit původní text.
- **Zkrácení doby dešifrování**: Pro útočníka, který získá hash, jsou duhové tabulky velmi užitečné pro efektivní prolomení hashovaného hesla.

### **Nevýhody duhového seznamu:**
- **Velikost tabulek**: Duhové tabulky mohou být velmi velké a vyžadují značné množství úložného prostoru.
- **Obrana pomocí solení**: Pokud jsou hesla před hashováním osolena (přidání náhodného textu k heslu před jeho hashováním), duhové tabulky se stanou prakticky neúčinnými, protože sůl mění výsledný hash, což znamená, že tabulka nebude odpovídat.

### **Závěr**
Duhové seznamy jsou efektivní technikou pro zkrácení času potřebného k prolomení hashovaných hodnot, zejména v případě, že nejsou použity bezpečnostní techniky, jako je sůl. Jsou však omezeny velikostí tabulek a používáním solení, což činí tuto metodu méně účinnou v moderní bezpečnosti.
