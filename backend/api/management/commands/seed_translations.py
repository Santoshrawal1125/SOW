from django.core.management.base import BaseCommand
from api.models import Translation

TERMS_EN = """
BY clicking Invoice Now, you choose to register according to the information that you have typed in and the text on the registration page and the terms here, and you at the same time accept the terms here.

You can use the program FOR FREE for 14 days.

123 Fakturera is so easy and self-explanatory that the chance that you will need support is minimal, but if you should need support, we are here for you, with our office manned for the most part of the day. After the trial period, the subscription continues and costs SEK 99 excluding VAT per month, which is billed annually. If you do not want to keep the program, just cancel the trial period by giving notice before 14 days from registration.

You have of course the right to terminate the use of the program without any costs, by giving us notice per email before 14 days from registration, that you do not want to continue with the program, and you then of course do not pay anything.

If we do not receive such a notice from you before 14 days from registration, then the order, for natural reasons, cannot be changed. With registration it is meant the date and time when you did choose to press the button Invoice Now.

Billing is for one year at a time.

The price for 123 Fakturera (offer price SEK 99 per month / ordinary price SEK 159 per month) is for the annual fee Start for one year's use of the program. (When using the offer price of SEK 99, the one-year period is calculated from registration.)

All prices are excluding VAT.

Offer, Inventory Control, Member Invoicing, Multiuser version and English printout are (or can be) additional modules that can be ordered later.

Intermediation, as well as invoicing, may take place from K-Soft Sverige AB, Box 2826, 187 28 Täby. In the future, we may choose to cooperate with another company for e.g. intermediation and invoicing. However, the customer relationship is with us. The payment is made to the company from which the invoice comes.

The annual fee is on a continuous basis, but if you do not wish to continue using the program, all you have to do is give notice thirty days before the start of the next one-year period.

The introductory offer (SEK 99 per month) is for the annual fee Start for the first year. After the first year, the ordinary price is billed, which is currently, for annual fee Start, one hundred and fifty-nine kroner per month, for annual fee Remote control, three hundred kroner per month and for annual fee Pro, three hundred and thirty-three kroner per month. After one year, the annual Remote Control fee is invoiced as standard, but you can choose Start or Pro by giving notice at any time before the due date.

If you choose to keep the program by not notifying us by email within 14 days of registration that you do not wish to continue with the program, you accept that you will pay the invoice for your order. Failure to pay the invoice or late payment does not give the right to cancel the order. We are happy to help you with logo at a cost price.

License for the use of 123 Fakturera is of course sold in accordance with applicable laws.

In order to be able to help you more easily and provide you with support, as well as to comply with the laws, we, for natural reasons, have to store your information.

In connection with the storage of information, the law requires that we provide you with the following information:

If you order as a private person, you have the right to cancel as stated by law. Your information is stored so that we can help you, etc. We will use it to be able to help you if you need help, follow the laws regarding bookkeeping, etc. When there are upgrades and the like, we may send you offers and the like about our products and services by email or the like. You may be contacted by email, post and telephone. If you don't want to be contacted, just send us an email about it.

You can at any time ask not to be sent information about upgrades by email, letter or the like, and we will of course not do that. You send such a request to us by email, post or similar.

For natural reasons, we have to store, process and move your data. Your information is stored until further notice. You give us permission to store, process and move your data, as well as to send you offers and the like by email, letter and the like, and tell others that you are customer. Due to the way it works with software, permission also needs to be given to other parties. The permission is therefore granted to us, as well as to the companies and/or person(s) who own the software, the source code, the website and the like. It is also given to current and future companies owned and/or controlled by one or more of those who currently own and/or control us. It is also given to current and future companies owned and/or controlled by one or more of those who currently own and/or control the companies (if any), which own or will own the software, source code, website and the like. It is also given to current and future persons (if any) who own or will own the software, source code, website and the like. This applies both to current and future products and services. It is also given to another company, (like K-Soft Sverige AB), which we can use to send/sell products, upgrades and the like, either by intermediation or otherwise.

You of course have the right to request access to, change and deletion of the information we hold about you. You also have the right to request restriction of data processing, and to object to data processing and the right to data portability. You have the right to complain to the supervisory authority. You can find more legal information about us here. The laws of Ireland are the applicable laws. Placing an order is of course completely voluntary. Of course, we do not use any automated profiling or decisions.

If you wish to contact us, please use the information on this website.

Click on Invoice Now to register according to the information you have entered and the terms here. (Date and time of admission are entered automatically in our registers.)

Our experience is that our customers are very satisfied with the way we work and hope and believe that this will also be your experience.

Have a great day!
"""

TERMS_SV = """
Genom att klicka på Fakturera nu väljer du att registrera dig enligt den information som du har angett på registreringssidan och villkoren här, och du accepterar samtidigt dessa villkor.

Du kan använda programmet GRATIS i 14 dagar.

123 Fakturera är så enkelt och självförklarande att chansen att du behöver support är minimal, men om du skulle behöva hjälp finns vi här för dig, med vårt kontor bemannat större delen av dagen. Efter testperioden fortsätter abonnemanget och kostar 99 SEK exklusive moms per månad, vilket faktureras årligen. Om du inte vill behålla programmet, avsluta testperioden genom att säga upp det inom 14 dagar från registreringen.

Du har självklart rätt att säga upp användningen av programmet utan kostnad genom att meddela oss via e-post innan 14 dagar från registreringen har passerat, och du betalar då självklart ingenting.

Om vi inte får ett sådant meddelande från dig inom 14 dagar från registreringen kan beställningen, av naturliga skäl, inte ändras. Med registrering avses datum och tid då du tryckte på knappen Fakturera nu.

Fakturering sker ett år i taget.

Priset för 123 Fakturera (erbjudandepris 99 SEK per månad / ordinarie pris 159 SEK per månad) gäller för årsavgiften Start för ett års användning av programmet. (När du använder erbjudandepriset 99 SEK räknas ettårsperioden från registreringen.)

Alla priser är exklusive moms.

Erbjudande, Lagerkontroll, Medlemsfakturering, Fleranvändarversion och engelsk utskrift är (eller kan vara) tilläggsmoduler som kan beställas senare.

Förmedling samt fakturering kan ske via K-Soft Sverige AB, Box 2826, 187 28 Täby. I framtiden kan vi välja att samarbeta med ett annat företag för t.ex. förmedling och fakturering. Kundförhållandet är dock med oss. Betalning sker till det företag som utfärdar fakturan.

Årsavgiften löper fortlöpande, men om du inte önskar fortsätta använda programmet behöver du endast meddela oss trettio dagar före nästa årsperiod startar.

Introduktionserbjudandet (99 SEK per månad) gäller för årsavgiften Start det första året. Efter första året debiteras ordinarie pris, som för närvarande är 159 kronor per månad för Start, 300 kronor per månad för Fjärrkontroll och 333 kronor per månad för Pro. Efter ett år faktureras årsavgiften för Fjärrkontroll som standard, men du kan välja Start eller Pro genom att meddela oss före förfallodatumet.

Om du väljer att behålla programmet genom att inte meddela oss via e-post inom 14 dagar från registreringen att du inte önskar fortsätta med programmet, accepterar du att betala fakturan för din beställning. Underlåten betalning eller sen betalning ger inte rätt att avboka beställningen. Vi hjälper dig gärna med logotyp till självkostnadspris.

Licens för användning av 123 Fakturera säljs naturligtvis i enlighet med gällande lagar.

För att kunna hjälpa dig enklare och följa lagstiftningen måste vi naturligtvis lagra din information.

I samband med lagring av information kräver lagen att vi informerar dig enligt följande:

Om du beställer som privatperson har du rätt att ångra enligt lag. Din information sparas för att vi ska kunna hjälpa dig vid behov, följa bokföringslagar osv. När det sker uppgraderingar och liknande kan vi skicka dig erbjudanden och information via e-post eller liknande. Du kan kontaktas via e-post, post och telefon. Om du inte vill bli kontaktad, skicka oss bara ett e-postmeddelande om det.

Du kan när som helst be om att inte få information om uppgraderingar via e-post, brev eller liknande, och vi kommer naturligtvis att respektera det.

Av naturliga skäl måste vi lagra, behandla och flytta dina uppgifter. Dina uppgifter sparas tills vidare. Du ger oss tillåtelse att lagra, behandla och flytta dina uppgifter samt att skicka dig erbjudanden och liknande via e-post, brev och liknande. Detta tillstånd ges till oss och till företag/personer som äger programvaran, källkoden, webbplatsen osv., nu och i framtiden. Detta gäller för både nuvarande och framtida produkter och tjänster.

Du har självklart rätt att begära tillgång till, ändring och radering av de uppgifter vi har om dig. Du har också rätt att begära begränsning av behandlingen, invända mot behandlingen samt rätt till dataportabilitet. Du har rätt att lämna klagomål till tillsynsmyndigheten. Gällande lag är irländsk lag. Att lägga en beställning är naturligtvis helt frivilligt. Vi använder inte automatiserade beslut eller profilering.

Om du vill kontakta oss, använd informationen på denna webbplats.

Klicka på Fakturera nu för att registrera enligt den information du har angett och villkoren här. (Datum och tid för registrering registreras automatiskt i våra register.)

Våra kunder är mycket nöjda med vårt sätt att arbeta och vi hoppas och tror att du kommer att uppleva detsamma.

Ha en fantastisk dag!
"""

SEED = [
    # Login
    ('login.title','en','Sign in'),
    ('login.title','sv','Logga in'),
    ('login.email_label','en','Enter your email address'),
    ('login.email_label','sv','Ange din e-postadress'),
    ('login.email_placeholder','en','Email address'),
    ('login.email_placeholder','sv','E-postadress'),
    ('login.password_label','en','Enter your password'),
    ('login.password_label','sv','Ange ditt lösenord'),
    ('login.password_placeholder','en','Password'),
    ('login.password_placeholder','sv','Lösenord'),
    ('login.button','en','Log in'),
    ('login.button','sv','Logga in'),
    ('login.register','en','Register'),
    ('login.register','sv','Registrera'),
    ('login.forgot','en','Forgotten password?'),
    ('login.forgot','sv','Glömt lösenord?'),

    # Terms
    ('terms.title','en','Terms & Conditions'),
    ('terms.title','sv','Villkor'),
    ('terms.body','en',TERMS_EN),
    ('terms.body','sv',TERMS_SV),
    ('terms.close','en','Close and Go Back'),
    ('terms.close','sv','Stäng och gå tillbaka'),

    # Pricelist headers
    ('pricelist.header.product','en','Product / Service'),
    ('pricelist.header.product','sv','Produkt / Tjänst'),
    ('pricelist.header.in_price','en','In Price'),
    ('pricelist.header.in_price','sv','Inköpspris'),
    ('pricelist.header.price','en','Price'),
    ('pricelist.header.price','sv','Pris'),
    ('pricelist.header.tax','en','Tax'),
    ('pricelist.header.tax','sv','Moms'),

    # Navbar links
    ('nav.home','en','Home'),
    ('nav.home','sv','Hem'),
    ('nav.order','en','Order'),
    ('nav.order','sv','Beställ'),
    ('nav.customers','en','Our Customers'),
    ('nav.customers','sv','Våra kunder'),
    ('nav.about','en','About us'),
    ('nav.about','sv','Om oss'),
    ('nav.contact','en','Contact Us'),
    ('nav.contact','sv','Kontakta oss'),

    # Footer
    ('footer.copyright','en','© Lättfaktura, CRO no. 638537, 2025. All rights reserved.'),
    ('footer.copyright','sv','© Lättfaktura, CRO nr. 638537, 2025. Alla rättigheter förbehållna.')
]

class Command(BaseCommand):
    help = "Seed translation rows"

    def handle(self, *args, **options):
        for key, lang, value in SEED:
            obj, created = Translation.objects.update_or_create(
                key=key, lang=lang,
                defaults={'value': value}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created {key} [{lang}]"))
            else:
                self.stdout.write(self.style.WARNING(f"Updated {key} [{lang}]"))