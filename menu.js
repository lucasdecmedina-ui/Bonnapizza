// Transcrição do cardápio fornecido (2023). Conferir valores atuais no atendimento.
const categories = [
  ['tradicionais','Tradicionais'],['especiais','Especiais'],['lights','Lights'],['doces','Doces'],['calzones','Calzones'],['esfihas','Esfihas'],['promocionais','Promocionais']
];
const menu = [];
function add(category, rows) {
  rows.trim().split('\n').forEach(line => {
    const [id,name,description,small,normal] = line.split('|');
    menu.push({id,name,description,category,small:small?Number(small):null,normal:Number(normal)});
  });
}
add('tradicionais',`
01|Alho|Mussarela, parmesão ralado e alho frito|50.90|56
02|Bacon com mussarela|Bacon e mussarela|50.90|55
03|Calabresa simples|Calabresa e cebola|48.90|53
04|Frango desfiado com mussarela|Frango desfiado e mussarela|50.90|56
05|Mussarela e tomate|Mussarela e tomate|49.90|54
06|Mista|Presunto e mussarela|48.90|53
07|Napolitana|Mussarela, parmesão ralado e tomate|50.90|55
08|Marguerita|Mussarela, manjericão e tomate|50.90|56
09|Bauru|Mussarela, presunto e tomate|50.90|56
10|À moda|Presunto, mussarela, palmito, catupiry e calabresa|61.90|66
11|Americana|Mussarela, calabresa, bacon e cebola|56|61
12|Atum I|Atum e cebola|55|60
13|Atum II|Atum e mussarela|58|62
14|Atum III|Atum e catupiry|58|63
15|Baiana|Calabresa moída, ovo e cebola|50|55
16|Bonna Pizza|Peito de peru, mussarela, molho branco e gratinada com parmesão|61.90|63
17|Caipira|Peito de frango desfiado, catupiry e milho|51|56
18|Calabresa I|Calabresa com catupiry|49|54
19|Calafrango I|Frango desfiado, calabresa e catupiry|51|56
20|Calafrango II|Frango desfiado, calabresa e mussarela|55|60
21|Champignon|Champignon com molho rosé e mussarela|58|63
22|Da casa|Palmito, atum, cebola e mussarela|59|65
23|Dedra|Mussarela, calabresa moída, brócolis, catupiry e batata palha|59.90|63
24|Dois queijos|Mussarela e catupiry|53|58
25|Três queijos|Mussarela, provolone e catupiry|56|62
26|Quatro queijos|Mussarela, catupiry, parmesão ralado e gorgonzola|58|64
27|Cinco queijos|Mussarela, cheddar, gorgonzola, parmesão e catupiry|60|65
28|Francesa|Presunto, ovo, catupiry, mussarela e palmito|58|62
29|Frango com catupiry|Frango desfiado e catupiry|50|55
30|Gostosona|Mussarela, presunto, calabresa, catupiry, tomate e parmesão ralado|62|66
31|Gratinada|Mussarela, provolone e parmesão|55|60
32|Lombo I|Lombo defumado e mussarela|52|58
33|Lombo II|Lombo defumado e catupiry|51|56
34|Milho verde especial|Milho, mussarela, calabresa, bacon e cebola|57|62
35|Carne seca I|Carne seca desfiada, cebola e mussarela|61|66
36|Carne seca II|Carne seca desfiada, cebola e catupiry|61|66
37|Toscana|Mussarela, toscana, cebola roxa, pimentão e tomate cereja|61|66
38|Palmito I|Palmito com mussarela|50|56
39|Palmito II|Palmito com catupiry|50|56
40|Paulista|Calabresa, mussarela e cebola|55|60
41|Pepperoni|Pepperoni e mussarela|62|67
42|Peruana|Atum, palmito, ervilha, ovos, cebola e mussarela|60|65
43|Pizaiolo I|Peito de peru, ervilha, palmito, catupiry, brócolis ao alho e batata palha|57|63
44|Portuguesa|Presunto, ovos, cebola, calabresa, ervilha, palmito e mussarela|58|65
45|Romana|Mussarela, aliche, tomate e parmesão|59|65
46|Siciliana|Mussarela, champignon e bacon|54|60
`);
add('especiais',`
47|Da Nona|Peito de peru, palmito, catupiry, mussarela, alho-poró e tomate cereja|85|89.90
48|Costela especial|Mussarela, costela temperada, cebola roxa, molho barbecue, catupiry, cebolinha e tomate cereja|75|79.90
49|Calabresa super|Mussarela, calabresa, catupiry, ovo, tomate e parmesão|72|78
50|Da Nona especial|Peito de peru, mussarela de búfala, catupiry, tomate seco e alho-poró|86|91
51|Camarão especial I|Camarão e mussarela. Sob encomenda.|117|121
52|Camarão especial II|Camarão e catupiry. Sob encomenda.|117|121
`);
add('calzones',`
53|Calzone I|Molho de tomate, presunto, mussarela, catupiry e palmito, coberto com azeite e parmesão||52.90
54|Calzone II|Mussarela, frango, catupiry e milho||53.90
55|Calzone III|Mussarela, calabresa moída, catupiry e palmito||51.90
`);
add('lights',`
56|Abobrinha|Abobrinha grelhada, mussarela, parmesão e tomate cereja|54|59
57|Brócolis I|Brócolis temperado com alho, bacon e mussarela|52|58
58|Brócolis II|Mussarela de búfala, brócolis e tomate seco|60|65
59|Búfala|Mussarela de búfala com tomate seco|62|68
60|Rúcula|Mussarela de búfala, tomate seco e rúcula|62|68
61|Jardineira|Escarola, mussarela e bacon|56|61
62|Marachic|Mussarela, calabresa, molho rosé com champignon e azeitonas|58|62
63|Marguerita especial|Mussarela de búfala, manjericão, parmesão e tomate cereja|63|68
64|Peito de peru I|Peito de peru com mussarela|57|61
65|Peito de peru II|Peito de peru com catupiry|57|61
66|Peito de peru III|Peito de peru, mussarela de búfala, parmesão e tomate cereja|61|66
67|Lombo super|Mussarela, lombo, catupiry e bacon|61|66
68|Amigas light|Queijo frescal, peito de peru, manjericão, champignon in natura e tomate cereja|61|66
69|Frango à portuguesa|Mussarela, frango, ovos, presunto, ervilhas e cebola|65|68
70|Di Parma|Mussarela, manjericão, presunto tipo Parma, tomate cereja e parmesão|58|63
71|Fiorentina|Frango, catupiry, molho rosé com champignon e batata palha|58|62
`);
add('doces',`
72|Banana|Banana com leite condensado, creme de leite e canela|44|50
73|Banana com chocolate||44|50
74|Chocolate com confete||44|50
75|Brigadeiro|Chocolate com granulado|44|50
76|Paçoca|Doce de leite com paçoca|44|50
77|Doce de leite||44|50
78|Morango com chocolate|Consulte a disponibilidade no atendimento.|44|50
`);
add('esfihas',`
79|Atum com mussarela|||8
80|Atum com catupiry|||8
81|Bacon com mussarela|||8
82|Bacon com catupiry|||8
83|Brócolis ao alho e mussarela|||8
84|Brócolis ao alho e catupiry|||8
85|Brócolis com queijo branco|||8
86|Calabresa|||8
87|Calabresa com catupiry|||8
88|Calabresa com cheddar|||8
89|Calabresa com mussarela|||8
90|Carne|||8
91|Carne com mussarela|||10
92|Carne com catupiry|||9
93|Catupiry|||8
94|Catupiry com milho|||8
95|Dois queijos|Mussarela e catupiry||8
96|Cheddar|||8
97|Escarola com mussarela|||8
98|Escarola com catupiry|||8
99|Frango com catupiry|||8
100|Frango com catupiry e milho|||8
101|Mussarela|||8
102|Mussarela com alho|||8
103|Mussarela com milho|||8
104|Mussarela com tomate e orégano|||8
105|Palmito com mussarela|||8
106|Palmito com catupiry|||8
107|Pepperoni com catupiry|||8
108|Pepperoni com mussarela|||8
109|Pizza|||8
110|Presunto e mussarela|||8
111|Queijo branco|||8
112|Três queijos|Catupiry, provolone e parmesão||8
113|Tomate seco com mussarela|||8
114|Tomate seco com catupiry|||8
115|Portuguesa|Mussarela, presunto, ovo e cebola||8
116|Lombo|||8
117|Toscana|||8
`);
add('promocionais',`
P1|Apresuntado com requeijão|Disponibilidade e condição promocional sujeitas à confirmação.||42
P2|Frango com requeijão|Disponibilidade e condição promocional sujeitas à confirmação.||42
P3|Calabresa com requeijão|Disponibilidade e condição promocional sujeitas à confirmação.||42
P4|Bacon com requeijão|Disponibilidade e condição promocional sujeitas à confirmação.||42
P5|Brócolis com requeijão|Disponibilidade e condição promocional sujeitas à confirmação.||42
P6|Palmito com requeijão|Disponibilidade e condição promocional sujeitas à confirmação.||42
P7|Escarola com requeijão|Disponibilidade e condição promocional sujeitas à confirmação.||42
P8|Milho com requeijão|Disponibilidade e condição promocional sujeitas à confirmação.||42
`);
