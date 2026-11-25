const Order = (() => {
  const money = n => n.toLocaleString('pt-BR', {style:'currency',currency:'BRL'});
  const clean = s => String(s || '').trim();
  const label = item => item.category === 'esfihas' ? `Esfiha ${item.name}` : item.name;
  function total(items) {return items.reduce((sum, item) => sum + Math.round(item.price * 100) * item.quantity, 0) / 100;}
  function validate(items, customer) {
    if (!items.length) return 'Adicione pelo menos um item ao pedido.';
    if (items.some(i => !Number.isInteger(i.quantity) || i.quantity < 1 || i.quantity > 20 || !Number.isFinite(i.price) || i.price <= 0)) return 'Confira as quantidades do seu pedido.';
    if (!clean(customer.name)) return 'Informe seu nome.';
    if (!['delivery','pickup'].includes(customer.fulfillment)) return 'Escolha entrega ou retirada.';
    if (customer.fulfillment === 'delivery' && ['street','number','district','city'].some(key => !clean(customer[key]))) return 'Preencha rua, número, bairro e cidade para a entrega.';
    return '';
  }
  function message(items, customer) {
    const error = validate(items, customer);
    if (error) throw new Error(error);
    const lines = ['Olá, Bonna Pizza! Gostaria de fazer este pedido pelo site:', '', '*MEU PEDIDO*'];
    items.forEach(item => {
      lines.push(`${item.quantity}x ${item.id} — ${label(item)} (${item.size})`);
      if (clean(item.notes)) lines.push(`  Observação do item: ${clean(item.notes)}`);
    });
    lines.push('', `*Nome:* ${clean(customer.name)}`, `*Atendimento:* ${customer.fulfillment === 'pickup' ? 'Retirada no balcão' : 'Entrega'}`);
    if (customer.fulfillment === 'delivery') {
      lines.push('*Endereço de entrega:*', `${clean(customer.street)}, ${clean(customer.number)}`, `${clean(customer.district)} — ${clean(customer.city)}`);
      if (clean(customer.zip)) lines.push(`CEP: ${clean(customer.zip)}`);
      if (clean(customer.complement)) lines.push(`Complemento: ${clean(customer.complement)}`);
      if (clean(customer.reference)) lines.push(`Referência: ${clean(customer.reference)}`);
    }
    if (clean(customer.notes)) lines.push('', `*Observações gerais:* ${clean(customer.notes)}`);
    lines.push('', `Subtotal de referência (cardápio de 2023): ${money(total(items))}.`, 'Pode confirmar os preços atuais, a disponibilidade, o prazo e o total final' + (customer.fulfillment === 'delivery' ? ' com a taxa de entrega?' : '?'));
    return lines.join('\n');
  }
  return {money, total, label, validate, message};
})();
