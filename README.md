# Aberoth Farm Organizer

Organizador de farm para o jogo Aberoth, com foco em gerenciamento de chefes (bosses), realms e rendimento diário do jogador.

---

## Conceito

O Aberoth Farm Organizer é uma aplicação que auxilia o jogador a registrar, acompanhar e exportar informações do seu farm de chefes no jogo Aberoth, de forma simples, visual e eficiente.

---

## Funcionalidades Principais

1. **Marcador de Mortes**  
   - Permite ao jogador marcar a morte de um chefe (boss), registrando o horário e atualizando o total diário.

2. **Tempo de Respawn**  
   - Ao marcar um chefe como morto, o programa exibe a estimativa de tempo para o próximo respawn, com contagem regressiva automática.

3. **Organização por Chefe e Realm**  
   - O usuário pode criar layouts personalizados, agrupando chefes e realms para facilitar o acompanhamento de múltiplos farms simultâneos.

4. **Planilha Geral**  
   - Exportação dos dados completos em formato Excel/CSV, incluindo histórico diário e semanal de mortes, rendimento e horários.

5. **Chefes e Realms Pré-Registrados**  
   - Listas pré-definidas de chefes e realms disponíveis para seleção rápida, com opção de adicionar novos chefes/realms.

6. **Layouts Persistentes**  
   - Todos os layouts criados são salvos e carregados automaticamente ao reiniciar o programa.

7. **Remoção de Chefes/Layout**  
   - Opção de remover chefes individuais de um layout, remover o layout inteiro ou realizar uma limpeza geral (clear all).

8. **Histórico Resumido e Completo**  
   - Exibição das últimas 5 atualizações do histórico, com opção de visualizar o histórico completo quando necessário.

9. **Configurações Personalizadas**  
   - Notificações, formato de horário, tema, e outras opções para personalização da experiência do usuário.

---

## Fluxo de Uso

1. **Adicionar Chefe/Realm**
   - O usuário acessa a opção “Adicionar Chefe/Realm”, seleciona chefes e realms pré-registrados (ou adiciona novos) e define o tempo de respawn do chefe.
   - O layout é salvo automaticamente.

2. **Marcar Morte**
   - O usuário marca a morte de um chefe, atualizando o total diário e iniciando a contagem regressiva para o respawn.

3. **Visualização dos Layouts**
   - Os layouts salvos aparecem na tela principal, com informações dos chefes, tempos de respawn e botões para remoção.

4. **Histórico e Exportação**
   - O histórico mostra as últimas 5 mortes registradas, com opção de expandir para ver o histórico completo.
   - O usuário pode exportar a planilha geral com todos os dados registrados.

5. **Configurações**
   - Personalização das opções do programa conforme preferência do usuário.

---

## Exemplo Visual (Mockup Textual)

```
─────────────────────────────────────────────
      Aberoth Farm Organizer v1.0
─────────────────────────────────────────────

[Planilha]   [Adicionar Chefe/Realm]   [Configurações]

─────────────────────────────────────────────

Meus Layouts Salvos:

┌─────────────────────────────────────────────┐
│ Layout: Realm 1                            │
│ ─ Chefe: Goblin King   [Remover do Layout] │
│ ─ Chefe: Spider Queen  [Remover do Layout] │
│ [Remover Layout]                            │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Layout: Realm 2                            │
│ ─ Chefe: Ogre Lord     [Remover do Layout] │
│ [Remover Layout]                            │
└─────────────────────────────────────────────┘

[Adicionar Chefe/Realm ao Layout]

─────────────────────────────────────────────

Últimas Atualizações:
| Horário      | Chefe        | Realm   | Mortes |
|--------------|--------------|---------|--------|
| 16:10        | Goblin King  | Realm 1 |   1    |
| 14:00        | Spider Queen | Realm 1 |   1    |
| ...          | ...          | ...     | ...    |

[Ver histórico completo]
```

---

## Estrutura Sugerida para o Projeto

- `src/` - Código-fonte da aplicação
- `data/` - Dados persistentes (chefes, realms, layouts)
- `assets/` - Ícones, imagens e recursos visuais
- `README.md` - Documentação principal
- `docs/` - Documentação complementar

---

## Ideias para Persistência de Dados

- Utilizar arquivos locais (JSON, SQLite) para armazenar chefes, realms, layouts e histórico.
- Opção para backup/restauração dos dados.

---

## Próximos Passos

1. Definir tecnologia/base (ex: Electron, WebApp, Desktop App).
2. Implementar estrutura básica de chefes, realms e layouts.
3. Desenvolver interface visual de acordo com o mockup.
4. Garantir persistência dos dados e exportação de planilha.
5. Adicionar funcionalidades extras conforme feedback do usuário.

---

## Licença

[Definir licença conforme necessidade]
