import	Home	from	'./Home.vue'
import	Login	from	'./LogIn.vue'
import	Cadastro	from	'./Cadastro.vue'
import	Sobre	from	'./pages/Sobre.vue'
import	Estrutura	from	'./pages/Estrutura.vue'
import	TiposEventos	from	'./pages/TiposEventos.vue'
import	Servicos	from	'./pages/Servicos.vue'
import	Cardapios	from	'./pages/Cardapio.vue'
import	Eventos	from	'./pages/Eventos.vue'
import	EventosFotos	from	'./pages/EventosFotos.vue'
import	FotosCasa	from	'./pages/FotosCasa.vue'

export const	routes =	[
  {	path:	'/login',	component:	Login	},
  {	path:	'/cadastro',	component:	Cadastro	},
  {	path:	'/sobre',	component:	Sobre	},
  {	path:	'/estrutura',	component:	Estrutura	},
  {	path:	'/servicos',	component:	Servicos	},
  {	path:	'/tipos-eventos',	component:	TiposEventos	},
  {	path:	'/cardapios',	component:	Cardapios	},
  {	path:	'/eventos',	component:	Eventos	},
  {	path:	'/eventos-fotos/:evento',	component:	EventosFotos	},
  {	path:	'/fotos-casa',	component:	FotosCasa	},
  {	path:	'/',	component:	Home	},
]
