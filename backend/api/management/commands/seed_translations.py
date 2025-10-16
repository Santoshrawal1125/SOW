from django.core.management.base import BaseCommand
from api.models import Translation


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
    ('terms.body','en','Full English terms text...'),
    ('terms.body','sv','Full Swedish terms text...'),

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