# Umsóknarverkefni fyrir Spiir

Til að keyra:

- Í línu 19 í `spiir.js` þarf að setja gilt session Id.
- Opnið `index.html` í vafra og skoðið javascript console-inn.

Um kóðann:
Ég hef aldrei fyrirspurt OData Server áður, en gat prófað mig áfram og fengið þetta til að virka.
Það er samt örugglega til betri leið en sú sem ég er að nota, sem er að búa til langan query streng með öllum SubcategoryId-unum sem voru gefin í verkefnalýsingunni. Ég gat bara sett 20 SubcategoryId í eitt request, þannig að ég þurfti að gera þrjú request til að fá allar færslurnar með öllum þessum 50 SubcategoryIds.

Svo concattaði ég þessum þremur response-objectum saman og gat þá farið að vinna með gögnin.

Ég útfærði dæmið á þrjá mismunandi vegu:

1. Summaði saman færslurnar eftir dögum
2. Summaði saman færslurnar eftir 4 daga tímabilum
3. Summaði saman færslurnar eftir 10 daga tímabilum

Ég notaði objects sem associative arrays, á svipaðan hátt og dictionaries eru notaðar í Python.