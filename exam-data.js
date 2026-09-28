(() => {
  const options = (...entries) => entries.map(([value, label]) => ({ value, label }));
  const question = (id, number, prompt, itemOptions, answer, type = 'a') => ({ id, number, prompt, options: itemOptions, answer, type });
  const mc = (id, number, prompt, itemOptions, answer) => question(id, number, prompt, itemOptions, answer, 'a');
  const tf = (id, number, prompt, answer) => question(id, number, prompt, options(['richtig', 'Richtig'], ['falsch', 'Falsch']), answer, 'tf');
  const matching = options(
    ['a', 'Anzeige a'], ['b', 'Anzeige b'], ['c', 'Anzeige c'], ['d', 'Anzeige d'],
    ['e', 'Anzeige e'], ['f', 'Anzeige f'], ['g', 'Anzeige g'], ['h', 'Anzeige h'],
    ['x', 'X – keine passende Anzeige']
  );

  const gast2Food = options(
    ['a', 'Es ist nicht wichtig, ob das Gemüse „bio“ ist.'],
    ['b', 'Fisch ist zu teuer.'],
    ['c', 'Fleisch macht den Körper stark.'],
    ['d', 'Kinder mögen oft kein Gemüse.'],
    ['e', 'Obst und Gemüse selbst anzupflanzen macht Spaß.'],
    ['f', 'Obst und Gemüse sind wichtig für die Gesundheit.']
  );

  const aufjedenHealth = options(
    ['a', 'Die Schule muss für eine gesunde Umgebung sorgen.'],
    ['b', 'Die Schule muss gesundes Essen anbieten.'],
    ['c', 'Gesund leben lernt man nur zu Hause.'],
    ['d', 'Gesundheitsunterricht macht Kindern keinen Spaß.'],
    ['e', 'In der Schule kann man gut zum Thema Gesundheit arbeiten.'],
    ['f', 'Kinder sollen sich auch in der Schule viel bewegen.']
  );

  const telcHealth = options(
    ['a', 'Es ist gut, wenn Kinder ihre Hausaufgaben in der Schule machen können.'],
    ['b', 'Die ganztägige Grundschule ist zu teuer.'],
    ['c', 'Es ist schade, dass Kinder dann keine Freizeit mehr haben.'],
    ['d', 'Kinder sollen nachmittags nicht allein am Computer sitzen.'],
    ['e', 'Kinder haben nachmittags in der Ganztagsschule interessante Beschäftigung.'],
    ['f', 'In der ganztägigen Grundschule machen die Kinder Lernspiele am Computer.']
  );

  const goetheChildren = options(
    ['a', 'Kinder sollten viel Zeit mit Erwachsenen verbringen.'],
    ['b', 'Es ist wichtig, dass man sich Zeit nur für die Kinder nimmt, auch wenn es nicht viel ist.'],
    ['c', 'Kinder sollten bis zum Schulalter bei ihrer Mutter zu Hause bleiben können.'],
    ['d', 'Kinder sollten früh in den Kindergarten.'],
    ['e', 'Der Kindergarten ist besonders nützlich für ausländische Kinder.'],
    ['f', 'Kindererziehung zu Hause ist eine Frage des Geldes.']
  );

  window.EXTRA_SOURCES = {
    gast2: {
      title: 'Übungssatz 2',
      provider: 'g.a.s.t. · Juni 2024',
      tag: 'offizielle Originalaufgaben',
      url: 'https://www.gast.de/fileadmin/gast.de/GAST/5_DTZ/PDF/gast_DTZ_UEbungssatz_2.pdf',
      audio: {
        url: 'https://www.gast.de/fileadmin/gast.de/GAST/5_DTZ/Audio/gast_Deutsch-Test_fuer_Zuwanderer_UEbungssatz_2.mp3',
        label: 'g.a.s.t. · Übungssatz 2 MP3'
      },
      hoeren: [
        mc('h1', 1, 'An welchem Gleis fährt der Zug nach Frankfurt?', options(['a', 'Gleis 10.'], ['b', 'Gleis 11.'], ['c', 'Gleis 12.']), 'c'),
        mc('h2', 2, 'Was ist das Problem?', options(['a', 'Eine falsche Kontonummer.'], ['b', 'Eine falsche Telefonnummer.'], ['c', 'Eine falsche Versicherung.']), 'a'),
        mc('h3', 3, 'Wann kann Herr Mücke seinen Ausweis abholen?', options(['a', 'Heute bis 12 Uhr.'], ['b', 'Morgen Vormittag.'], ['c', 'Nächste Woche.']), 'a'),
        mc('h4', 4, 'Wann ist Frau Aysel wieder da?', options(['a', 'Heute.'], ['b', 'Morgen.'], ['c', 'Übermorgen.']), 'c'),
        mc('h5', 5, 'Wer darf die Tropfen „VitaFit“ nehmen?', options(['a', 'Auch Babys.'], ['b', 'Auch Kinder ab 6 Jahren.'], ['c', 'Nur Erwachsene.']), 'b'),
        mc('h6', 6, 'Was kann man gewinnen?', options(['a', 'Ein Abendessen.'], ['b', 'Einen Besuch im Radiostudio.'], ['c', 'Eintrittskarten für ein Konzert.']), 'c'),
        mc('h7', 7, 'Welche Straßenbahnen fahren auch in den Sommerferien?', options(['a', '1 und 2.'], ['b', '2 und 3.'], ['c', '4 und 5.']), 'c'),
        mc('h8', 8, 'Wie kann man zum Schloss kommen?', options(['a', 'Mit dem Bus.'], ['b', 'Mit der S-Bahn.'], ['c', 'Zu Fuß.']), 'a'),
        mc('h9', 9, 'Was kosten die Karten für das ganze Programm?', options(['a', '15 Euro.'], ['b', '18 Euro.'], ['c', '40 Euro.']), 'c'),
        tf('h10', 10, 'Die beiden Frauen sehen sich zum ersten Mal.', 'richtig'),
        mc('h11', 11, 'Was soll Frau Schubert als Haushaltshilfe machen?', options(['a', 'Kinder betreuen.'], ['b', 'Kochen und putzen.'], ['c', 'Krankenpflege übernehmen.']), 'b'),
        tf('h12', 12, 'Frau Koslowski hat eine Frage an ihren Chef.', 'richtig'),
        mc('h13', 13, 'Frau Koslowski', options(['a', 'arbeitet beim Fernsehen.'], ['b', 'hatte vor Kurzem Urlaub.'], ['c', 'möchte drei Wochen Urlaub.']), 'b'),
        tf('h14', 14, 'Herr Klimke möchte seinen Termin auf nächste Woche verschieben.', 'falsch'),
        mc('h15', 15, 'Herr Klimke kann', options(['a', 'direkt zum Doktor gehen.'], ['b', 'übermorgen wiederkommen.'], ['c', 'um 15 Uhr anrufen.']), 'b'),
        tf('h16', 16, 'Der Mann und die Frau sind am Hauptbahnhof.', 'falsch'),
        mc('h17', 17, 'Die Königstraße ist', options(['a', 'die nächste Straße rechts.'], ['b', 'ganz in der Nähe.'], ['c', 'zu Fuß 30 Minuten entfernt.']), 'c'),
        mc('h18', 18, '18 ...', gast2Food, 'a'),
        mc('h19', 19, '19 ...', gast2Food, 'f'),
        mc('h20', 20, '20 ...', gast2Food, 'c')
      ],
      lesen: [
        mc('l21', 21, 'Ihr kleiner Neffe hat schlechte Schulnoten bekommen.', options(['a', 'Kapitel 1'], ['b', 'Kapitel 3'], ['c', 'anderes Kapitel']), 'b'),
        mc('l22', 22, 'Sie wollen bei einer Internet-Bank ein Konto eröffnen.', options(['a', 'Kapitel 2'], ['b', 'Kapitel 4'], ['c', 'anderes Kapitel']), 'b'),
        mc('l23', 23, 'Sie haben Fragen zu Ihrem Arbeitsvertrag.', options(['a', 'Kapitel 3'], ['b', 'Kapitel 5'], ['c', 'anderes Kapitel']), 'c'),
        mc('l24', 24, 'Sie möchten neue Menschen kennenlernen.', options(['a', 'Kapitel 1'], ['b', 'Kapitel 5'], ['c', 'anderes Kapitel']), 'b'),
        mc('l25', 25, 'Sie suchen ein billiges Kinderbett.', options(['a', 'Kapitel 1'], ['b', 'Kapitel 4'], ['c', 'anderes Kapitel']), 'a'),
        mc('l26', 26, 'Eine Freundin möchte sich gegen Unfälle versichern.', matching, 'd'),
        mc('l27', 27, 'Ihre Bekannte hat eine Katze und sucht eine große Mietwohnung mit Balkon.', matching, 'h'),
        mc('l28', 28, 'Sie möchten eine kleine Wohnung kaufen.', matching, 'c'),
        mc('l29', 29, 'Ein Freund sucht eine Krankenversicherung für seinen Hund.', matching, 'x'),
        mc('l30', 30, 'Ihre Verwandten kommen zu Besuch, aber Ihre Wohnung ist sehr klein.', matching, 'f'),
        tf('l31', 31, 'Das Bürgerbüro in Bergheim wird nächstes Jahr geschlossen.', 'falsch'),
        mc('l32', 32, 'Was kann man im Bürgerbüro machen?', options(['a', 'Ein Auto anmelden.'], ['b', 'Einen Führerschein beantragen.'], ['c', 'Sich von einem Anwalt helfen lassen.']), 'c'),
        tf('l33', 33, 'Nächstes Jahr müssen Eltern mehr für den Kindergarten bezahlen.', 'richtig'),
        mc('l34', 34, 'Was muss der Kindergarten machen?', options(['a', 'Einen neuen Spielplatz bauen.'], ['b', 'Geld an die Stadt zahlen.'], ['c', 'Renovieren.']), 'c'),
        tf('l35', 35, 'Herr Khan hat sich für einen Deutschkurs angemeldet.', 'falsch'),
        mc('l36', 36, 'Herr Khan', options(['a', 'hat einen Test zur Einstufung gemacht.'], ['b', 'kann an „Deutsch für den Beruf“ teilnehmen.'], ['c', 'spricht Deutsch auf dem Niveau B2.']), 'a'),
        tf('l37', 37, 'Für Fahrräder braucht man keinen Fahrschein.', 'falsch'),
        tf('l38', 38, 'Man muss Rucksäcke immer absetzen.', 'falsch'),
        tf('l39', 39, 'Hunde dürfen mitfahren.', 'richtig'),
        mc('l40', 40, '___ für Ihre Bestellung. Wir liefern Ihnen die Zeitschrift BLICK ab Heft 17 dieses Jahres', options(['a', 'danken'], ['b', 'viele Grüße'], ['c', 'vielen Dank']), 'c'),
        mc('l41', 41, 'Wir liefern Ihnen die Zeitschrift BLICK ab Heft 17 dieses Jahres ___ die oben genannte Adresse.', options(['a', 'an'], ['b', 'für'], ['c', 'über']), 'a'),
        mc('l42', 42, 'Sie werden schon in wenigen Tagen Ihr erstes BLICK-Heft in ___ Briefkasten finden.', options(['a', 'einem'], ['b', 'Ihrem'], ['c', 'unserem']), 'b'),
        mc('l43', 43, 'Bitte prüfen Sie zur Sicherheit ___ Anschrift', options(['a', 'Ihre'], ['b', 'seine'], ['c', 'unsere']), 'a'),
        mc('l44', 44, 'Bitte informieren Sie uns, ___ Änderungen notwendig sind.', options(['a', 'trotzdem'], ['b', 'weil'], ['c', 'wenn']), 'c'),
        mc('l45', 45, 'Wir wünschen Ihnen viel Freude mit ___ Zeitschrift!', options(['a', 'deiner'], ['b', 'meiner'], ['c', 'unserer']), 'c')
      ],
      schreiben: {
        tasks: [
          { id: 'A', title: 'Aufgabe A', prompt: 'Ihr Bekannter, Herr Max Litwicki, fährt diesen Samstag in den Urlaub. Er hat Ihnen eine E-Mail geschrieben. Er möchte, dass Sie sich um seinen Garten kümmern. Schreiben Sie ihm eine E-Mail zurück.', points: ['Hilfe zusagen', 'Ihre Aufgaben', 'Werkzeug', 'Wie oft?'], recipient: 'Herr Litwicki' },
          { id: 'B', title: 'Aufgabe B', prompt: 'In Ihrer Wohnung schließen die Fenster nicht richtig. Deshalb ist es kalt in der Wohnung. Sie haben Ihren Vermieter, Herrn Schneider, schon angerufen. Aber nichts ist seitdem passiert. Schreiben Sie an Herrn Schneider.', points: ['Grund für Ihr Schreiben', 'Warum eine kalte Wohnung schlecht ist', 'Was Sie wollen', 'Was Sie tun, wenn nichts passiert'], recipient: 'Herr Schneider' }
        ]
      }
    },

    aufjeden: {
      title: 'Auf jeden Fall! B1.2 · Übungstest DTZ',
      provider: 'telc · B1.2',
      tag: 'offizielle Originalaufgaben',
      url: 'https://www.telc.net/fileadmin/user_upload/Downloads_Verlag/Auf_jeden_Fall/Uebungstests/Auf_jeden_Fall_B1.2_UEbungstest_DTZ.pdf',
      audio: {
        url: 'audio/auf-jeden-fall-b1-2-track-127.mp3',
        downloadUrl: 'https://www.telc.net/fileadmin/user_upload/Downloads_Verlag/Auf_jeden_Fall/Audios/Auf_jeden_Fall_B1_2_Track_127_Uebungstest_Deutsch_Test_fuer_Zuwanderer.zip',
        label: 'telc · Track 127 · MP3'
      },
      hoeren: [
        mc('h1', 1, 'Was soll Herr Rossi machen?', options(['a', 'Den anderen Teilnehmern Bescheid sagen.'], ['b', 'In der Sprachschule anrufen.'], ['c', 'Sofort in den Kurs kommen.']), 'b'),
        mc('h2', 2, 'Wann soll Frau Tulipano anrufen?', options(['a', 'Am Nachmittag.'], ['b', 'Nächste Woche.'], ['c', 'Vormittags.']), 'c'),
        mc('h3', 3, 'Was muss Frau Jensen tun?', options(['a', 'Die Geburtsurkunde schicken.'], ['b', 'In den nächsten Tagen einen Brief schreiben.'], ['c', 'Zum neuen Termin in die Schule gehen.']), 'c'),
        mc('h4', 4, 'Sie haben gerade ein dringendes technisches Problem. Was sollen Sie machen?', options(['a', 'Bis 17. August warten.'], ['b', 'Eine E-Mail schicken.'], ['c', 'Sich telefonisch melden.']), 'b'),
        mc('h5', 5, 'Was für eine Sendung hören Sie?', options(['a', 'Eine Kindersendung.'], ['b', 'Eine Kochsendung.'], ['c', 'Eine Reisesendung.']), 'a'),
        mc('h6', 6, 'Wie wird das Wetter am Nachmittag?', options(['a', 'Ab und zu schneit es.'], ['b', 'Es wird nicht mehr regnen.'], ['c', 'Überall scheint die Sonne.']), 'b'),
        mc('h7', 7, 'Auf der A6', options(['a', 'ist die Straße frei.'], ['b', 'kann man schlecht sehen.'], ['c', 'steht man im Stau.']), 'a'),
        mc('h8', 8, 'Was ist dieses Jahr anders?', options(['a', 'Das Bad öffnet früher.'], ['b', 'Der Eintritt kostet mehr.'], ['c', 'Im Herbst ist das Bad länger offen.']), 'a'),
        mc('h9', 9, 'Das Eltern-Kind-Zentrum', options(['a', 'bekommt einen Teil des Verkaufspreises.'], ['b', 'holt die gebrauchten Sachen ab.'], ['c', 'wirft die schmutzigen Sachen weg.']), 'a'),
        tf('h10', 10, 'Der Mann spricht mit der Lehrerin der Kinder.', 'falsch'),
        mc('h11', 11, 'Was soll er tun?', options(['a', 'Die Kinder von der Schule abholen.'], ['b', 'Ein großes Menü kochen.'], ['c', 'Viele Vorlesungen besuchen.']), 'a'),
        tf('h12', 12, 'Jonathan arbeitet im Supermarkt.', 'falsch'),
        mc('h13', 13, 'Was möchte Jonathan fragen?', options(['a', 'Ob er Sprudelwasser haben darf.'], ['b', 'Ob Frau Ercan etwas aus dem Geschäft braucht.'], ['c', 'Ob Frau Ercan ihm Geld geben kann.']), 'b'),
        tf('h14', 14, 'Die Frau telefoniert mit einer Sprachschule.', 'richtig'),
        mc('h15', 15, 'Was möchte Frau Hashemian wissen?', options(['a', 'In welchem Raum der Kurs stattfindet.'], ['b', 'Ob jemand ihr Buch gefunden hat.'], ['c', 'Wann der nächste Übungskurs ist.']), 'b'),
        tf('h16', 16, 'Marisa und Luis sind Freunde.', 'falsch'),
        mc('h17', 17, 'Was fragt Marisa?', options(['a', 'Ob es auch Yogakurse gibt.'], ['b', 'Wie viel die Mitgliedskarte kostet.'], ['c', 'Wo sie sich umziehen kann.']), 'a'),
        mc('h18', 18, '18 ...', aufjedenHealth, 'c'),
        mc('h19', 19, '19 ...', aufjedenHealth, 'e'),
        mc('h20', 20, '20 ...', aufjedenHealth, 'a')
      ],
      lesen: [
        mc('l21', 21, 'Sie möchten gerne Gemüse anpflanzen.', options(['a', 'Gesundheit'], ['b', 'Kultur & Freizeit'], ['c', 'Wohnen & Bauen']), 'c'),
        mc('l22', 22, 'Ihre Freundin möchte Krankenschwester werden.', options(['a', 'Download'], ['b', 'Gesundheit'], ['c', 'Wirtschaft & Arbeit']), 'b'),
        mc('l23', 23, 'Sie möchten ein Geschäft mieten.', options(['a', 'Kultur & Freizeit'], ['b', 'Wirtschaft & Arbeit'], ['c', 'Wohnen & Bauen']), 'b'),
        mc('l24', 24, 'Sie verreisen bald. Sie möchten wissen, welche Medikamente Sie mitnehmen sollen.', options(['a', 'Kultur & Freizeit'], ['b', 'Verkehr'], ['c', 'anderer Menüpunkt']), 'c'),
        mc('l25', 25, 'Ihr Sohn soll in der Schule einen Vortrag über die Stadt halten. Wo findet er Informationen?', options(['a', 'Download'], ['b', 'Kultur & Freizeit'], ['c', 'Wohnen & Bauen']), 'b'),
        mc('l26', 26, 'Sie brauchen eine Autoversicherung. Sie sind bei keinem Autoclub.', matching, 'd'),
        mc('l27', 27, 'Ihre Familie plant einen Urlaub. Sie möchten sich dafür versichern lassen.', matching, 'g'),
        mc('l28', 28, 'Markus studiert. Er möchte sich gegen Unfälle versichern lassen.', matching, 'h'),
        mc('l29', 29, 'Sie möchten eine private Rentenversicherung abschließen.', matching, 'x'),
        mc('l30', 30, 'Ihr Sohn sucht eine neue Stelle bei einer Versicherung.', matching, 'c'),
        tf('l31', 31, 'Es gibt immer mehr Jugendliche, die nicht mehr lesen.', 'falsch'),
        mc('l32', 32, 'Junge Menschen', options(['a', 'interessieren sich mehr für Technik als für Bücher.'], ['b', 'lesen heute anders als früher.'], ['c', 'lesen keine Papier-Zeitung mehr.']), 'b'),
        tf('l33', 33, 'Auf der Bahnstrecke kommt es in der Nacht zu Wartezeiten.', 'falsch'),
        mc('l34', 34, 'Die Nachtarbeiten', options(['a', 'dauern von Montag bis Donnerstag.'], ['b', 'haben keine Folgen für die Anwohner.'], ['c', 'sollen am Wochenende fertig sein.']), 'c'),
        tf('l35', 35, 'Die ENERGIE Gesellschaft will am 12. Juni vorbeikommen.', 'richtig'),
        mc('l36', 36, 'Wenn man den Zähler selbst ablesen möchte, muss man', options(['a', 'anrufen.'], ['b', 'eine Mail schreiben.'], ['c', 'sich online anmelden.']), 'c'),
        tf('l37', 37, 'Beim Test erhielt das Mittel eine sehr gute Note.', 'richtig'),
        tf('l38', 38, 'Das Mittel ist gut für Espressomaschinen geeignet.', 'falsch'),
        tf('l39', 39, 'In Gefäßen muss man das Mittel immer mit Wasser mischen.', 'falsch'),
        mc('l40', 40, 'Leider mussten wir feststellen, dass wir zu der ___ genannten Rechnung noch keine Zahlung erhalten haben.', options(['a', 'höher'], ['b', 'oben'], ['c', 'unten']), 'b'),
        mc('l41', 41, 'Mit diesem Schreiben schicken wir ___ eine Kopie der Rechnung.', options(['a', 'dir'], ['b', 'Ihnen'], ['c', 'uns']), 'b'),
        mc('l42', 42, 'Bitte überweisen Sie den offenen Betrag bis ___ 25. November auf unser Konto.', options(['a', 'frühestens'], ['b', 'schnellstens'], ['c', 'spätestens']), 'c'),
        mc('l43', 43, '___ Sie den vollständigen Betrag nicht bis zu diesem Datum überweisen, werden wir Mahnkosten und Zinsen berechnen.', options(['a', 'Damit'], ['b', 'Weil'], ['c', 'Wenn']), 'c'),
        mc('l44', 44, 'Falls Sie den offenen Betrag in der Zwischenzeit überwiesen haben, ___ Sie dieses Schreiben nicht zu beachten.', options(['a', 'brauchen'], ['b', 'können'], ['c', 'müssen']), 'a'),
        mc('l45', 45, 'Bei Fragen können Sie uns ___ anrufen.', options(['a', 'gerne'], ['b', 'manchmal'], ['c', 'oft']), 'a')
      ],
      schreiben: {
        tasks: [
          { id: 'A', title: 'Aufgabe A', prompt: 'Ihr Sohn hatte einen Unfall. Er darf nicht am Sportunterricht teilnehmen. Schreiben Sie eine Entschuldigung für die Sportlehrerin, Elke Treber.', points: ['Grund für Ihr Schreiben', 'Was passiert ist', 'Wie lange?', 'Arzt'], recipient: 'Frau Treber' },
          { id: 'B', title: 'Aufgabe B', prompt: 'Die Fenster in Ihrer Wohnung sind schlecht. Deshalb schreiben Sie einen Brief an Ihren Vermieter.', points: ['Grund für Ihr Schreiben', 'Lärm', 'Temperatur', 'Reparatur'], recipient: 'Sehr geehrte Damen und Herren' }
        ]
      }
    },

    telc1: {
      title: 'Übungstest 1 · A2–B1',
      provider: 'telc gGmbH',
      tag: 'offizielle Originalaufgaben',
      url: 'https://shop.telc.net/media/catalog/product/file/5/0/5010-b00-020101_barrierefrei_web.pdf',
      audio: {
        url: 'https://shop.telc.net/media/catalog/product/file/d/e/deutsch-test-fuer-zuwanderer_uebungstest_1.mp3',
        label: 'telc · Übungstest 1 MP3'
      },
      hoeren: [
        mc('h1', 1, 'Was soll Herr Matuschek machen?', options(['a', 'Den Stromzähler ablesen.'], ['b', 'Die Stromrechnung bezahlen.'], ['c', 'Einen neuen Termin machen.']), 'c'),
        mc('h2', 2, 'Wohin soll Frau Böhmer kommen?', options(['a', 'In den Kindergarten.'], ['b', 'Zur Agentur für Arbeit.'], ['c', 'Zur Schule.']), 'b'),
        mc('h3', 3, 'Wohin soll Herr Holstein mit seinem Sohn gehen?', options(['a', 'Ins Krankenhaus.'], ['b', 'Zum Arzt.'], ['c', 'Zum Gesundheitsamt.']), 'b'),
        mc('h4', 4, 'Wo soll Herr Lee sein Auto abholen?', options(['a', 'Bei der Polizei.'], ['b', 'Bei einem Autohändler.'], ['c', 'In der Werkstatt.']), 'c'),
        mc('h5', 5, 'Was hören Sie?', options(['a', 'Das Horoskop.'], ['b', 'Den Wetterbericht.'], ['c', 'Die Sportnachrichten.']), 'a'),
        mc('h6', 6, 'Die Züge ...', options(['a', 'fahren mit Verspätung.'], ['b', 'fahren wie immer.'], ['c', 'werden durch Busse ersetzt.']), 'c'),
        mc('h7', 7, 'Wie macht man bei dem Gewinnspiel mit?', options(['a', 'Man muss beim Sender anrufen.'], ['b', 'Man muss sich auf der Internetseite anmelden.'], ['c', 'Man schreibt eine Postkarte.']), 'a'),
        mc('h8', 8, 'Wo fährt der Falschfahrer?', options(['a', 'Auf der A7.'], ['b', 'Auf der A8.'], ['c', 'Auf der A96.']), 'c'),
        mc('h9', 9, 'Wie wird das Wetter in Westdeutschland?', options(['a', 'Es gibt Regen.'], ['b', 'Es gibt Schnee.'], ['c', 'Es wird sonnig.']), 'c'),
        tf('h10', 10, 'Das Gespräch findet in Norwegen statt.', 'falsch'),
        mc('h11', 11, 'Worum bittet Herr Jansen Frau Samsonov?', options(['a', 'Sie soll auf das Haus von Familie Jansen aufpassen.'], ['b', 'Sie soll Herrn Jansen den Schlüssel geben.'], ['c', 'Sie soll sich um die Katzen von Familie Jansen kümmern.']), 'c'),
        tf('h12', 12, 'Frau Baier und Herr Steiner sind Kollegen.', 'falsch'),
        mc('h13', 13, 'Was macht Frau Baier?', options(['a', 'Sie kauft die Wohnung.'], ['b', 'Sie mietet die Wohnung.'], ['c', 'Sie will ihrem Mann von der Wohnung erzählen.']), 'c'),
        tf('h14', 14, 'Frau Melnik telefoniert mit dem Lehrer ihrer Tochter.', 'richtig'),
        mc('h15', 15, 'Was kann Frau Melnik nicht so gut?', options(['a', 'Einladungen schreiben.'], ['b', 'Getränke verkaufen.'], ['c', 'Kuchen backen.']), 'c'),
        tf('h16', 16, 'Frau Keller ist in einem Lebensmittelgeschäft.', 'falsch'),
        mc('h17', 17, 'Wie viel kosten die Medikamente?', options(['a', '20,00 €'], ['b', '18,50 €'], ['c', '1,50 €']), 'b'),
        mc('h18', 18, '18 ...', telcHealth, 'e'),
        mc('h19', 19, '19 ...', telcHealth, 'a'),
        mc('h20', 20, '20 ...', telcHealth, 'd')
      ],
      lesen: [
        mc('l21', 21, 'Sie wollen heiraten. Wohin gehen Sie?', options(['a', '210'], ['b', '211'], ['c', 'anderes Zimmer']), 'a'),
        mc('l22', 22, 'Sie wollen sich beim Chef des Bürgerbüros über etwas beschweren.', options(['a', '111'], ['b', '112'], ['c', 'anderes Zimmer']), 'b'),
        mc('l23', 23, 'Sie haben gestern Ihr Handy verloren und hoffen, dass es jemand abgegeben hat.', options(['a', '113'], ['b', '115'], ['c', 'anderes Zimmer']), 'a'),
        mc('l24', 24, 'Sie sind umgezogen und möchten Ihre neue Adresse melden.', options(['a', '111'], ['b', '211'], ['c', 'anderes Zimmer']), 'a'),
        mc('l25', 25, 'Sie möchten einen Anwohnerparkausweis beantragen.', options(['a', '111'], ['b', '112'], ['c', 'anderes Zimmer']), 'c'),
        mc('l26', 26, 'Sie möchten Ihren Vater zum Essen einladen. Ihr Vater liebt die asiatische Küche und kann nicht alleine laufen.', matching, 'f'),
        mc('l27', 27, 'Für eine Hochzeitsfeier mit über hundert Gästen suchen Sie ein passendes Restaurant.', matching, 'a'),
        mc('l28', 28, 'Sie möchten Ihren Geburtstag zu Hause feiern, aber das Essen nicht selbst kochen. Sie erwarten zwölf Gäste.', matching, 'b'),
        mc('l29', 29, 'Sie möchten mit Ihren Kindern (2 und 6 Jahre alt) am Samstagabend essen gehen. Sie wollen im Freien sitzen, aber trotzdem bei Regen nicht nass werden.', matching, 'e'),
        mc('l30', 30, 'Sie haben Ihren Kindern versprochen, sie am Sonntag in ein Eiscafé zu einem großen Becher Eis einzuladen.', matching, 'x'),
        tf('l31', 31, 'Die KKB Krankenkasse bezahlt ihren Mitgliedern einen Kurs im Fitness-Club.', 'falsch'),
        mc('l32', 32, 'Um am Trainingsprogramm von Trainer Tom teilzunehmen,', options(['a', 'braucht man viel Zeit.'], ['b', 'muss man ins Internet gehen.'], ['c', 'muss man sehr sportlich sein.']), 'b'),
        tf('l33', 33, 'Kinder sollen immer den kürzesten Weg zur Schule nehmen.', 'falsch'),
        mc('l34', 34, 'Eltern sollen', options(['a', 'den ganzen Weg zur Schule langsam fahren.'], ['b', 'ihre Kinder immer begleiten.'], ['c', 'mit ihren Kindern den Schulweg üben.']), 'c'),
        tf('l35', 35, 'Die Firma Teletronica GmbH kann auch an einem anderen Termin kommen.', 'richtig'),
        mc('l36', 36, 'Herr Demir soll vor dem 30.11. die Firma Teletronica GmbH anrufen,', options(['a', 'wenn er an dem Tag nicht zu Hause ist.'], ['b', 'wenn er Informationen zu seinem TV- und Radioempfang braucht.'], ['c', 'wenn er keinen neuen Anschluss möchte.']), 'a'),
        tf('l37', 37, 'Die Ware wird immer innerhalb von fünf Werktagen geliefert.', 'falsch'),
        tf('l38', 38, 'Die Ware wird an Kunden in der ganzen Welt verschickt.', 'falsch'),
        tf('l39', 39, 'Bei Rücksendung der Ware muss der Kunde in bestimmten Fällen das Porto selbst bezahlen.', 'richtig'),
        mc('l40', 40, 'Bitte helfen Sie ___ . Unsere Buchhaltung hat den Betrag ... noch nicht als Zahlungseingang feststellen können.', options(['a', 'euch'], ['b', 'ihnen'], ['c', 'uns']), 'c'),
        mc('l41', 41, '... den Betrag von 59,65 € vom 10.03. noch nicht als Zahlungseingang feststellen ___ .', options(['a', 'können'], ['b', 'müssen'], ['c', 'sollen']), 'a'),
        mc('l42', 42, '___ Sie in der Hektik des Alltags vergessen, den Rechnungsbetrag zu überweisen?', options(['a', 'Haben'], ['b', 'Hätten'], ['c', 'Würden']), 'a'),
        mc('l43', 43, 'Wir bitten Sie in diesem Fall um Zahlung innerhalb der ___ 14 Tage.', options(['a', 'letzten'], ['b', 'nächsten'], ['c', 'vorigen']), 'b'),
        mc('l44', 44, 'Oder haben Sie den Betrag ___ bezahlt, und wir konnten das Geld nicht richtig zuordnen?', options(['a', 'erst'], ['b', 'schon'], ['c', 'wieder']), 'b'),
        mc('l45', 45, '___ bitten wir um Zusendung des Zahlungsbelegs.', options(['a', 'Damit'], ['b', 'Dann'], ['c', 'Sonst']), 'b')
      ],
      schreiben: {
        tasks: [
          { id: 'A', title: 'Aufgabe A', prompt: 'Sie haben ein interessantes Wohnungsangebot gelesen. Sie schreiben einen Brief an den Vermieter, Herrn Schmitz, weil Sie sich für die Wohnung interessieren.', points: ['Grund für Ihr Schreiben', 'Angaben zu Ihrer Person', 'Termin für Besichtigung', 'möglicher Einzugstermin'], recipient: 'Herr Schmitz' },
          { id: 'B', title: 'Aufgabe B', prompt: 'Sie haben vor einem halben Jahr bei der Firma Neumann eine Waschmaschine gekauft. Jetzt ist sie kaputt. Sie erreichen bei der Firma telefonisch niemanden. Deshalb schreiben Sie eine E-Mail.', points: ['Grund für Ihr Schreiben', 'Garantie', 'Reparatur oder neue Waschmaschine', 'wie Sie erreichbar sind'], recipient: 'Sehr geehrte Damen und Herren' }
        ]
      }
    },

    goetheModellsatz: {
      title: 'DTZ-Modellsatz · Erwachsene (2009)',
      provider: 'Goethe-Institut & telc · 2009',
      tag: 'offizieller Modellsatz',
      url: 'https://www.goethe.de/resources/files/pdf209/dtz_modellsatz_e_2009_08.pdf',
      audio: {
        url: 'audio/dtz-goethe-modellsatz.mp3',
        downloadUrl: 'https://www.goethe.de/resources/files/epub1/modellsatz.zip',
        label: 'Goethe-Institut · Modellsatz Hören'
      },
      hoeren: [
        mc('h1', 1, 'Was soll Frau Aslan machen?', options(['a', 'In der Praxis anrufen.'], ['b', 'In die Praxis kommen.'], ['c', 'Sich untersuchen lassen.']), 'a'),
        mc('h2', 2, 'Was soll Frau Yang tun?', options(['a', 'Eine Gebühr bezahlen.'], ['b', 'Einen neuen Antrag ausfüllen.'], ['c', 'Zur Wohngeldstelle gehen.']), 'c'),
        mc('h3', 3, 'Wie können Sie heute mit dem Zug nach Lübeck fahren?', options(['a', 'Mit dem Zug um 20 Uhr 05.'], ['b', 'Gar nicht.'], ['c', 'Nach Bad Oldesloe fahren und da umsteigen.']), 'c'),
        mc('h4', 4, 'Sie brauchen schnell einen Termin. Was sollen Sie machen?', options(['a', 'Bei einem anderen Arzt anrufen.'], ['b', 'Bis zum 15. April warten.'], ['c', 'Heute noch einmal anrufen.']), 'a'),
        mc('h5', 5, 'Was hören Sie?', options(['a', 'Den Wetterbericht.'], ['b', 'Die Nachrichten.'], ['c', 'Eine Verkehrsmeldung.']), 'b'),
        mc('h6', 6, 'Wie wird das Wetter in Norddeutschland?', options(['a', 'Die Sonne scheint.'], ['b', 'Es gibt Regen.'], ['c', 'Es wird warm.']), 'b'),
        mc('h7', 7, 'Wo laufen Leute auf der Straße?', options(['a', 'Auf der A6.'], ['b', 'Auf der A8.'], ['c', 'Auf der A92.']), 'c'),
        mc('h8', 8, 'Wie bekommt man zwei Gratiskarten?', options(['a', 'Bis zum 28. Mai schreiben.'], ['b', 'Auf die Homepage schauen.'], ['c', 'Eine Nummer anrufen.']), 'c'),
        mc('h9', 9, 'Was sollen Sie tun?', options(['a', 'Nach draußen gehen.'], ['b', 'Fenster und Türen schließen und zu Hause bleiben.'], ['c', 'Fenster und Türen zumachen und aus dem Haus gehen.']), 'b'),
        tf('h10', 10, 'Frau Hansen und der Mann sind Kollegen.', 'falsch'),
        mc('h11', 11, 'Worum bittet Frau Hansen?', options(['a', 'Die Musik leiser zu spielen.'], ['b', 'Ihr Schmerztabletten zu holen.'], ['c', 'Keinen Besuch zu haben.']), 'a'),
        tf('h12', 12, 'Markus und Tina wollen heiraten.', 'falsch'),
        mc('h13', 13, 'Worüber sprechen Markus und Tina?', options(['a', 'Über einen Geschenketisch.'], ['b', 'Über einen Tisch als Geschenk.'], ['c', 'Über Tische und Stühle für das Hochzeitsfest.']), 'a'),
        tf('h14', 14, 'Der Mann hilft Frau Bergmann bei der Arbeitssuche.', 'richtig'),
        mc('h15', 15, 'Was fragt er Frau Bergmann?', options(['a', 'Ob sie Berufserfahrung hat.'], ['b', 'Ob sie in Teilzeit arbeiten kann.'], ['c', 'Wie viel sie bis jetzt verdient hat.']), 'a'),
        tf('h16', 16, 'Die Lehrerin telefoniert mit Igor.', 'falsch'),
        mc('h17', 17, 'Frau Bergner', options(['a', 'möchte, dass Igor die Klasse wiederholt.'], ['b', 'möchte, dass Igor mit seiner Mutter zu ihr kommt.'], ['c', 'möchte mit Igors Vater oder Mutter in der Schule sprechen.']), 'c'),
        mc('h18', 18, '18 ...', goetheChildren, 'd'),
        mc('h19', 19, '19 ...', goetheChildren, 'f'),
        mc('h20', 20, '20 ...', goetheChildren, 'e')
      ],
      lesen: [
        mc('l21', 21, 'Sie möchten ein gebrauchtes Auto kaufen.', options(['a', 'Audio'], ['b', 'Reise'], ['c', 'andere Seite']), 'c'),
        mc('l22', 22, 'Eine Bekannte hört gerne Geschichten. Wo finden Sie ein passendes Geschenk?', options(['a', 'Filme & DVDs'], ['b', 'Bücher'], ['c', 'andere Seite']), 'b'),
        mc('l23', 23, 'Sie ziehen in zwei Wochen in eine neue Wohnung und suchen dafür Kartons.', options(['a', 'Möbel & Wohnen'], ['b', 'Heimwerker'], ['c', 'andere Seite']), 'b'),
        mc('l24', 24, 'Sie brauchen am Arbeitsplatz eine Kaffeemaschine.', options(['a', 'Feinschmecker'], ['b', 'Heimwerker'], ['c', 'andere Seite']), 'c'),
        mc('l25', 25, 'Sie arbeiten abends zu Hause und suchen eine Schreibtischlampe.', options(['a', 'Büro'], ['b', 'Möbel & Wohnen'], ['c', 'andere Seite']), 'b'),
        mc('l26', 26, 'Frau Seifert ist Friseurin und möchte stundenweise arbeiten. Sie wohnt in Berlin.', matching, 'c'),
        mc('l27', 27, 'Frau Richter sucht eine Ausbildungsstelle als Köchin ab September.', matching, 'a'),
        mc('l28', 28, 'Herr Seibold sucht einen Job als Maler und Tapezierer.', matching, 'x'),
        mc('l29', 29, 'Herr Kindler sucht Arbeit in einer KFZ-Werkstatt. Er will auch junge Menschen ausbilden.', matching, 'f'),
        mc('l30', 30, 'Frau Kerschel möchte sich ein Auto kaufen und braucht dafür Geld. Deshalb will sie während des Sommers zusätzlich etwas verdienen.', matching, 'e'),
        tf('l31', 31, 'Das Land Hessen gibt zukünftig eine halbe Million Euro für Integrationshelfer aus.', 'richtig'),
        mc('l32', 32, 'Das Ministerium möchte, dass', options(['a', '800 Helfer mehr eingestellt werden.'], ['b', 'die Arbeit der Helfer mehr Wirkung hat.'], ['c', 'die Helfer für ihre Arbeit mehr Geld verdienen.']), 'b'),
        tf('l33', 33, 'Die Eltern sollen den Kindergarten putzen.', 'falsch'),
        mc('l34', 34, 'Das Kindergartenteam möchte, dass die Eltern', options(['a', 'das Programm planen und organisieren.'], ['b', 'etwas mitbringen oder bezahlen.'], ['c', 'Lieder singen oder Sommerblumen basteln.']), 'b'),
        tf('l35', 35, 'Ab 1. Februar muss Familie Müller mehr Miete zahlen.', 'falsch'),
        mc('l36', 36, 'Familie Müller', options(['a', 'braucht ab Februar nichts mehr für die Nebenkosten auszugeben.'], ['b', 'hat zu viel an Nebenkosten bezahlt.'], ['c', 'muss im kommenden Jahr 150 Euro Nebenkosten bezahlen.']), 'b'),
        tf('l37', 37, 'Man soll die Tabletten nicht vor dem Essen nehmen.', 'richtig'),
        tf('l38', 38, 'Nachdem man die Tabletten genommen hat, darf man nicht selbst Auto fahren.', 'falsch'),
        tf('l39', 39, 'Während der gesamten Schwangerschaft darf das Medikament auf keinen Fall eingenommen werden.', 'falsch'),
        mc('l40', 40, '___ Damen und Herren,', options(['a', 'Sehr geehrte'], ['b', 'Sehr geehrten'], ['c', 'Viel geehrte']), 'a'),
        mc('l41', 41, 'Die zwei Wochen Probelesen Ihrer Tageszeitung enden für ___ am 17.5.2008.', options(['a', 'mein'], ['b', 'mich'], ['c', 'mir']), 'b'),
        mc('l42', 42, 'Hiermit ___ ich mein Probeabonnement fristgerecht kündigen.', options(['a', 'kann'], ['b', 'möchte'], ['c', 'soll']), 'b'),
        mc('l43', 43, 'Leider ___ ich feststellen, dass ich nicht genug Zeit für regelmäßiges Zeitunglesen habe.', options(['a', 'konnte'], ['b', 'musste'], ['c', 'sollte']), 'a'),
        mc('l44', 44, '___ möchte ich die Norddeutsche Zeitung nicht weiter abonnieren.', options(['a', 'Denn'], ['b', 'Deshalb'], ['c', 'Weil']), 'b'),
        mc('l45', 45, 'Mit ___ Grüßen,', options(['a', 'freundlichen'], ['b', 'lieben'], ['c', 'vielen']), 'a')
      ],
      schreiben: {
        tasks: [
          { id: 'A', title: 'Aufgabe A', prompt: 'Sie besuchen einen Deutschkurs. Sie können diese Woche nicht mehr in den Kurs kommen. Deshalb schreiben Sie an Ihre Lehrerin Frau Meinert.', points: ['Grund für Ihr Schreiben', 'Entschuldigung', 'Hausaufgaben', 'Rückkehr in den Kurs'], recipient: 'Frau Meinert' },
          { id: 'B', title: 'Aufgabe B', prompt: 'Ihre frühere Deutschlehrerin Frau Berg hat bald Geburtstag. Sie möchte eine Geburtstagsparty feiern und hat Ihnen eine Einladung geschickt. Antworten Sie auf diese Einladung.', points: ['Grund für Ihr Schreiben', 'Was Sie im Moment tun', 'Kommen Sie?', 'Bitte um Wegbeschreibung'], recipient: 'Frau Berg' }
        ]
      }
    },

    b1QuestionPaper: {
      title: 'DTZ B1 · Modelltest Fragen',
      provider: 'Lokale Markdown-Sammlung',
      tag: 'B1-Übungsfragen',
      url: 'exam/dtz_b1_question_paper.pdf',
      hoeren: [],
      lesen: [
        mc('l1', 1, 'Sie suchen eine neue Kaffeemaschine.', options(['a', 'ab Seite 74'], ['b', 'ab Seite 105'], ['c', 'andere Seiten']), 'b'),
        mc('l2', 2, 'Sie wollen mit ein paar Freunden eine Fahrradtour machen. Sie brauchen etwas gegen Regen.', options(['a', 'ab Seite 43'], ['b', 'ab Seite 50'], ['c', 'andere Seiten']), 'b'),
        mc('l3', 3, 'Sie sind gerade umgezogen. Sie brauchen noch ein paar Teller und Tassen.', options(['a', 'ab Seite 77'], ['b', 'ab Seite 105'], ['c', 'andere Seiten']), 'a'),
        mc('l4', 4, 'Sie sind zu einer großen Hochzeit eingeladen und wollen dafür ein Kleid kaufen.', options(['a', 'ab Seite 35'], ['b', 'ab Seite 74'], ['c', 'andere Seiten']), 'c'),
        mc('l5', 5, 'Sie möchten eine Puppe für Ihre Tochter kaufen.', options(['a', 'ab Seite 74'], ['b', 'ab Seite 92'], ['c', 'andere Seiten']), 'b'),
        mc('l6', 6, 'Aziza möchte gern in einer Wohngemeinschaft leben. Sie will aber ihre eigenen Möbel mitbringen.', matching, 'e'),
        mc('l7', 7, 'Herr Mertkol sucht eine möblierte Wohnung.', matching, 'b'),
        mc('l8', 8, 'Frau Rossi möchte ein kleines Apartment mieten. Die zentrale Lage ist für sie sehr wichtig. Sie will sofort einziehen.', matching, 'd'),
        mc('l9', 9, 'Sylvia und Istvan suchen eine 2-Zimmer-Wohnung. Sie sind bereit, die Wohnung selbst zu renovieren, aber die Miete muss sehr niedrig sein.', matching, 'f'),
        mc('l10', 10, 'Carlos möchte gern umziehen, weil er in der alten Wohnung zu wenig Platz hat. Außerdem möchte er, dass sein Hund auch allein draußen sein kann.', matching, 'g'),
        tf('l11', 11, 'Es handelt sich um einen Test für neue Fahrzeuge.', 'richtig'),
        mc('l12', 12, 'Wo kann man die Batterien des Elektroautos auftanken?', options(['a', 'An jeder Tankstelle.'], ['b', 'Nur am Stromautomaten.'], ['c', 'Zu Hause oder an den Stromautomaten.']), 'c'),
        tf('l13', 13, 'Der Kinderspielplatz ist neu.', 'richtig'),
        mc('l14', 14, 'Die Hausverwaltung möchte,', options(['a', 'dass die Kinder nicht im Sandkasten spielen.'], ['b', 'dass die Eltern mit ihren Kindern spielen.'], ['c', 'dass die Kinder nicht allein auf dem Spielplatz sind.']), 'c'),
        tf('l15', 15, 'Die letzte Stromrechnung war zu hoch.', 'falsch'),
        mc('l16', 16, 'Man bezahlt weniger,', options(['a', 'wenn man die Homepage des Anbieters besucht.'], ['b', 'wenn man keine schriftliche Rechnung bekommt.'], ['c', 'wenn man den Anbieter anruft.']), 'b'),
        tf('l17', 17, 'Wenn man die Kanne nur selten benutzt, muss man sie erst ausspülen.', 'richtig'),
        tf('l18', 18, 'Man kann die Kanne in der Maschine waschen.', 'falsch'),
        tf('l19', 19, 'Heiße Milch darf man nicht in die Kanne gießen.', 'richtig'),
        mc('l20', 20, 'Sehr ___ Damen und Herren,', options(['a', 'geehrter'], ['b', 'geehrten'], ['c', 'geehrte']), 'c'),
        mc('l21', 21, 'Hiermit möchte ich ___ mitteilen, dass ich im vergangenen Monat umgezogen bin.', options(['a', 'Ihnen'], ['b', 'ihnen'], ['c', 'euch']), 'a'),
        mc('l22', 22, 'Ich wohne jetzt nicht mehr in Bad Hersfeld, ___ in Siegen.', options(['a', 'aber'], ['b', 'doch'], ['c', 'sondern']), 'c'),
        mc('l23', 23, '___ Sie mir bitte so schnell wie möglich mitteilen, an welche Adresse ich mich jetzt wenden kann?', options(['a', 'Müssten'], ['b', 'Dürfen'], ['c', 'Könnten']), 'c'),
        mc('l24', 24, 'Ich ___ Ihnen dankbar, wenn Sie mir möglichst schnell antworten.', options(['a', 'wäre'], ['b', 'war'], ['c', 'sei']), 'a'),
        mc('l25', 25, 'Ich wäre Ihnen dankbar, wenn Sie mir möglichst schnell antworten ___ .', options(['a', 'werden'], ['b', 'würden'], ['c', 'waren']), 'b')
      ],
      schreiben: {
        tasks: [
          { id: 'A', title: 'Aufgabe a', prompt: 'Sie haben eine neue Wohnung gemietet. Ihre Nachbarn, Herr und Frau Ebeler, haben Ihnen beim Umzug geholfen. Deshalb möchten Sie sie zum Essen einladen. Schreiben Sie eine Einladung.', points: ['Grund für Ihr Schreiben', 'Dank für die Hilfe', 'Termin', 'Was Sie vorbereiten möchten'], recipient: 'Herr und Frau Ebeler' },
          { id: 'B', title: 'Aufgabe b', prompt: 'Sie suchen eine Arbeit. In der Zeitung haben Sie eine Anzeige für eine Stelle in einer Firma gelesen. Die Stelle interessiert Sie. Schreiben Sie eine Bewerbung an die Firma.', points: ['Grund für Ihr Schreiben', 'Schule und Ausbildung', 'Berufserfahrung', 'Sprachkenntnisse'], recipient: 'Sehr geehrte Damen und Herren' }
        ]
      }
    },

    b1ExtraPractice: {
      title: 'DTZ B1 · Zusätzliche Übungen',
      provider: 'Lokale Markdown-Sammlung',
      tag: 'B1-Übungsfragen',
      url: 'exam/dtz_b1_extra_questions_practice.pdf',
      hoeren: [],
      lesen: [
        mc('l1', 1, 'Caroline arbeitet seit fünf Jahren in Deutschland, ihr Freund kommt aus den Niederlanden. Sie möchte seine Sprache lernen.', matching, 'b'),
        mc('l2', 2, 'Istvan L. spricht bisher nur wenig Deutsch und will es möglichst schnell lernen. Er arbeitet in einer Computerfirma, aber am Vormittag hat er immer frei.', matching, 'f'),
        mc('l3', 3, 'Frau Neumann lernt seit fünf Jahren an der Volkshochschule Türkisch. Sie möchte türkische Konversation machen und vielleicht eine Freundin finden.', matching, 'g'),
        mc('l4', 4, 'Herr Brandhorst soll in drei Monaten für seine Firma nach Saudi-Arabien gehen. Er hat zweimal wöchentlich am Nachmittag frei für den Arabischunterricht.', matching, 'x'),
        mc('l5', 5, 'Frau Sikorska sucht einen Deutschkurs für Fortgeschrittene, der zweimal pro Woche am Nachmittag stattfindet.', matching, 'a'),
        tf('l6', 6, 'Für diese Produkte muss der Kunde kein Geld bezahlen.', 'falsch'),
        tf('l7', 7, 'In dem Prämien-Programm wird kein Spielzeug angeboten.', 'falsch'),
        tf('l8', 8, 'Wenn man vom IDEAS-Prämienprogramm keine Post mehr bekommen möchte, kann man es telefonisch abbestellen.', 'richtig'),
        mc('l9', 9, 'Sehr geehrte ___,', options(['a', 'Frau'], ['b', 'Damen und Herren'], ['c', 'Herr']), 'b'),
        mc('l10', 10, 'Mit den Artikeln in ___ Zeitung bin ich durchaus einverstanden.', options(['a', 'seiner'], ['b', 'Ihren'], ['c', 'Ihrer']), 'c'),
        mc('l11', 11, 'Am 1. August ___ ich die erste Zeitung bekommen.', options(['a', 'hätte'], ['b', 'habe'], ['c', 'sollte']), 'b'),
        mc('l12', 12, 'Dafür waren in der folgenden Woche jeden Tag zwei Zeitungen in ___ Briefkasten.', options(['a', 'deinem'], ['b', 'Ihrem'], ['c', 'meinem']), 'c'),
        mc('l13', 13, 'Über eine kurze Antwort von Ihnen ___ ich mich freuen.', options(['a', 'habe'], ['b', 'würde'], ['c', 'wird']), 'b'),
        mc('l14', 14, 'Mit ___ Grüßen', options(['a', 'frohen'], ['b', 'fröhlichen'], ['c', 'freundlichen']), 'c')
      ],
      schreiben: {
        tasks: [
          { id: 'A', title: 'Defekter Boiler', prompt: 'Schreiben Sie eine E-Mail an Ihre Hausverwaltung, Herrn Broderson, weil der Boiler in Ihrem Badezimmer nicht funktioniert und es deshalb kein heißes Wasser gibt.', points: ['Grund für Ihr Schreiben', 'Was die Hausverwaltung unternehmen soll', 'Warum es dringend ist', 'Was Sie unternehmen werden, wenn die Hausverwaltung nicht reagiert'], recipient: 'Herr Broderson' },
          { id: 'B', title: 'Einladung zur Geburtstagsfeier', prompt: 'Sie wohnen seit kurzer Zeit in einer neuen Wohnung. Ihre Frau hat Geburtstag, Sie machen eine kleine Feier und möchten Ihre Nachbarn dazu einladen. Schreiben Sie eine Einladung.', points: ['Grund für Ihr Schreiben', 'Termin für die Feier', 'Wo die Feier stattfindet', 'Was Sie vorbereiten werden'], recipient: 'Ihre Nachbarn' },
          { id: 'C', title: 'Absage wegen Terminüberschneidung', prompt: 'Istvan, ein Bekannter aus Ihrem ersten Deutschkurs, der jetzt in einer anderen Stadt lebt, möchte Sie am Wochenende zu sich aufs Land einladen. Leider können Sie nicht hinfahren. Schreiben Sie eine Entschuldigung.', points: ['Grund für Ihr Schreiben', 'Dank für die Einladung', 'Warum Sie nicht kommen können', 'Wann Sie ihn besuchen könnten'], recipient: 'Istvan' },
          { id: 'D', title: 'Elternsprechstunde absagen', prompt: 'Ihr Sohn bringt aus der Schule einen Brief mit, in dem Sie zu einer Elternsprechstunde gebeten werden. Leider können Sie zu dem Termin nicht und möchten sich entschuldigen. Schreiben Sie einen Brief an den Klassenlehrer, Herrn Rink.', points: ['Grund für Ihr Schreiben', 'Dank für den Brief', 'Warum Sie nicht kommen können', 'Bitte um einen anderen Termin'], recipient: 'Herr Rink' },
          { id: 'E', title: 'Hilfe beim Kindergarten-Sommerfest', prompt: 'Der Kindergarten Ihres Kindes macht ein Sommerfest und bittet alle Eltern, bei den Vorbereitungen zu helfen. Schreiben Sie an Frau Fohrer im Kindergarten.', points: ['Grund für Ihr Schreiben', 'Angebot mitzuhelfen', 'Vorschläge, was Sie machen könnten', 'Wie viel Zeit Sie haben'], recipient: 'Frau Fohrer' },
          { id: 'F', title: 'Einladung zum Ausflug', prompt: 'Sie möchten Ihren ehemaligen Kollegen und seine Frau, Familie Branic, die jetzt in eine andere Stadt gezogen sind, zu einem gemeinsamen Ausflug einladen. Schreiben Sie über die vier Leitpunkte.', points: ['Grund für Ihr Schreiben', 'Ziel', 'Wo und wann Sie sich treffen wollen', 'Was sie mitnehmen sollen'], recipient: 'Familie Branic' },
          { id: 'G', title: 'Absage Weihnachtsfeier', prompt: 'Sie sind am Freitagabend zur Weihnachtsfeier Ihrer Firma eingeladen, können aber leider nicht teilnehmen. Antworten Sie Herrn Somson mit einem kurzen Schreiben.', points: ['Grund für Ihr Schreiben', 'Dank für die Einladung', 'Warum Sie nicht kommen können', 'Weihnachtswünsche'], recipient: 'Herr Somson' }
        ]
      }
    }
  };
})();
