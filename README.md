# QA úkol – Testování sekce kontaktů napříč doménami

## Testing issue

1. přihlašování do účtu
- ne vždy se dobře vyčistila cash, tím pádem vzniká dvojí situace (bud je form pro přihlášení vidět hned nebo je  potřeba ho zobrazit přes button - "Přihlásit se do mého účtu")
- řešení: přidávala jsem jednu metodu navíc, která ověřuje, že existuje button pro přihlášení do účtu 

2. Kontakt je potřeba smazat přes 2 kroky. V prvním se zobrazí hláška, že byl kontakt úspěšně smazán, ale stále se v tabulce zobrazuje. 
Bud je potřeba reload stránky.
Nebo Pokud ho dám smazat ještě jednou, zobrazí se hláška nelze smazat, ale následně už kontakt z tabulky zmizí.

3. Ve formuláři jsem použila IDs. Nelze využít bezpečnější verzi getByRole, protože inputy jsou udělány jako type="strig"

