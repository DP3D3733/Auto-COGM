// ==UserScript==
// @name         Cad Equipes
// @namespace    http://tampermonkey.net/
// @version      2024-08-03
// @description  try to take over the world!
// @author       You
// @match        https://cadweb.sinesp.gov.br/cad-equipe-web/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gov.br
// @grant        none
// ==/UserScript==
wojvrnewovn
setInterval(function() {
    if(document.querySelector('mat-option')) {
        document.querySelectorAll('mat-option').forEach(function(item) {
            if(item.innerHTML.includes('Chefe de Gabinete') || item.innerHTML.includes('Chefe de Serviço') || item.innerHTML.includes('Comandante') || item.innerHTML.includes('Guarda Setor') || item.innerHTML.includes('Operador') || item.innerHTML.includes('Operador Drone') || item.innerHTML.includes('Plantão') || item.innerHTML.includes('Subcomandante')) {
                item.style.display = 'none';
            }
        });
    }
    if(localStorage.getItem('cards_selecionados')) {
        if (document.querySelector("div[id='naorepete-card']")) {
        } else {
            var valor = localStorage.getItem('cards_selecionados');
            if(document.querySelector('#checkbox')) {
                document.querySelector('#checkbox').querySelector('select').value = localStorage.getItem('cards_selecionados');
            }
            localStorage.setItem('cards_selecionados',valor);
            var cards = document.querySelectorAll('app-unidade-servico-card');
            if(valor == 'Todas') {
                cards.forEach(function (item) {
                    item.style.display = '';
                });
            } else {
                cards.forEach(function (item) {
                    if(item.querySelector('span').innerHTML.includes(valor)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }

                });

            }
        }
    }

    if(localStorage.getItem('encerra_sv') && document.querySelector('button[title="Encerrar Serviço"]')) {
        if (document.querySelector("div[id='naorepete-encerrasv']")) {
        } else {
            var c = document.createElement("div");
            document.querySelector('body').append(c);
            c.setAttribute("id", "naorepete-encerrasv");
            document.querySelector('button[title="Encerrar Serviço"]').click();
        }
    }

    if(localStorage.getItem('encerra_sv') && document.querySelector('app-modal-wrapper')) {
        if (document.querySelector("div[id='naorepete_encerra_sv_botao_sim']")) {
        } else {
            c = document.createElement("div");
            c.setAttribute("id", "naorepete_encerra_sv_botao_sim");
            document.querySelector('app-modal-wrapper').append(c);
            if(document.querySelector('app-modal-wrapper').innerHTML.includes('Encerrar o Serviço ?')) {
                document.querySelector('app-modal-wrapper').querySelectorAll('button')[1].click();
            }

        }
    }

    if(localStorage.getItem('encerra_sv') && document.querySelector('div[class="mat-mdc-snack-bar-label mdc-snackbar__label"]')) {
        if (document.querySelector("div[id='naorepete_mat-simple-snack-bar-content']")) {
        } else {
            c = document.createElement("div");
            c.setAttribute("id", "naorepete_mat-simple-snack-bar-content");
            document.querySelector('body').append(c);
            if(document.querySelector('div[class="mat-mdc-snack-bar-label mdc-snackbar__label"]').innerHTML.includes('serviço encerrado com sucesso.')) {
                location.reload();
            }

        }
    }

    if(localStorage.getItem('encerra_sv') && document.querySelector('app-unidade-servico-card') && !document.querySelector('button[title="Encerrar Serviço"]')) {
        //localStorage.removeItem('encerra_sv');
    }
    /*  if(document.querySelectorAll('span[class="mat-button-wrapper"]').length > 30 && document.querySelectorAll('span[class="mat-button-wrapper"]')[30].innerHTML == 'Novo Equipamento') {
        document.querySelectorAll('span[class="mat-button-wrapper"]')[30].click();
    }*/
    if(localStorage.getItem('camera') && document.getElementById('agencia')) {
        if(localStorage.getItem('camera') && !document.getElementById('agencia').innerHTML.includes('Guarda Municipal de Porto Alegre') && !document.querySelector('span[class="mat-option-text"]')) {
            document.getElementById('agencia').click();
        } else if (localStorage.getItem('camera') && document.querySelector('span[class="mat-option-text"]') && document.querySelector('span[class="mat-option-text"]').innerHTML.includes('Guarda Municipal de Porto Alegre')) {
            document.querySelector('span[class="mat-option-text"]').click();
        } else if (localStorage.getItem('camera') && !document.getElementById('tipoEquipamento').innerHTML.includes('Câmera Corporal') && !document.querySelector('span[class="mat-option-text"]')) {
            document.getElementById('tipoEquipamento').click();
        } else if (localStorage.getItem('camera') && document.querySelectorAll('mat-option').length>2) {
            document.querySelectorAll('mat-option')[1].click();
        } else if(localStorage.getItem('camera')) {
            var prefixo = localStorage.getItem('camera').split('-');
            document.querySelector('input[formcontrolname="prefixo"]').value = prefixo.shift();
            document.querySelector('input[formcontrolname="prefixo"]').dispatchEvent(new Event('input', { bubbles: true }));
            if(prefixo.length > -1) {
                var a = '';
                prefixo.forEach(function(item) {
                    a += item+'-';
                });
                localStorage.setItem('camera', a);
            } else {
                localStorage.removeItem('camera');
            }

            document.querySelectorAll('button')[2].click();
        }
    }

    if(localStorage.getItem('trava_encerra_sv') && !document.querySelector('mat-dialog-container')) {
        localStorage.setItem('trava_encerra_sv','nao');
    }
    if(localStorage.getItem('edita_equipe_pega_equipe') && document.querySelector('app-modal-detalhar-equipe')) {
        var selects = document.querySelector('#checkbox').querySelectorAll('select');
        var componentes = document.querySelector('app-modal-detalhar-equipe').querySelectorAll('div[class="modal-material-subtitulo"]');
        var gmo = [];
        var ptr = [];
        selects[4].querySelectorAll('option')[0].selected = true;
        selects[5].querySelectorAll('option')[0].selected = true;
        selects[6].querySelectorAll('option')[0].selected = true;
        selects[7].querySelectorAll('option')[0].selected = true;
        selects[8].querySelectorAll('option')[0].selected = true;
        selects[9].querySelectorAll('option')[0].selected = true;
        selects[10].querySelectorAll('option')[0].selected = true;
        componentes.forEach(function (pessoa) {
            if(pessoa.parentNode.innerHTML.includes('Patrulheiro')) {
                ptr.push(pessoa.innerHTML.trim().split(' ')[1]);
            } else if(pessoa.parentNode.innerHTML.includes('Motorista')) {
                gmo.push(pessoa.innerHTML.trim().split(' ')[1]);
            } else {
                selects[4].querySelectorAll('option').forEach(function (op) {
                    if(op.value == pessoa.innerHTML.trim().split(' ')[1]) {
                        op.selected = true;
                    }
                })
            }
        });
        for (let i = 0; i < gmo.length; i++) {
            selects[i+5].querySelectorAll('option').forEach(function (op) {
                if(op.value == gmo[i]) {
                    op.selected = true;
                }
            })
        }
        for (let i = 0; i < ptr.length; i++) {
            selects[i+8].querySelectorAll('option').forEach(function (op) {
                if(op.value == ptr[i]) {
                    op.selected = true;
                }
            })
        }
        document.querySelector('app-modal-detalhar-equipe').querySelector('button').click();
        if(!document.querySelectorAll('app-unidade-servico-card')[parseInt(document.querySelector('#sel_equipe_edit_equip').value)].innerHTML.includes('Sem equipamentos cadastrados')) {
            document.querySelectorAll('app-unidade-servico-card')[parseInt(document.querySelector('#sel_equipe_edit_equip').value)].querySelector('app-equipamentos-mini-card').querySelector('button').click();
        }
    }
    if(localStorage.getItem('editar_equipe') && document.querySelector('app-modal-editar-equipe') && document.querySelector('app-modal-editar-equipe').querySelector('ul')) {
        setTimeout(() => {
            if(localStorage.getItem('processo_edicao') == 'excluir_pessoas' ) {
                if(document.querySelector('app-modal-editar-equipe').querySelectorAll('button[title="Excluir"]').length > 0) {
                    document.querySelector('app-modal-editar-equipe').querySelectorAll('button[title="Excluir"]').forEach(function(a){
                        a.click();
                        localStorage.setItem('processo_edicao','inserir_pessoas');
                    });
                }
            }
        }, "1000");

    }

    if(localStorage.getItem('editar_equipe') && localStorage.getItem('processo_edicao') == 'inserir_pessoas' && document.querySelector('app-modal-editar-equipe') && !document.querySelector('cad-table')) {
        if(document.querySelector('app-modal-editar-equipe').querySelector('div[class="acoes-card ng-star-inserted"]').innerHTML.includes('Vincular Pessoas')){
            document.querySelector('app-modal-editar-equipe').querySelector('div[class="acoes-card ng-star-inserted"]').click();
            if(document.querySelector('app-modal-editar-equipe').querySelector('div[class="row-actions"]')) {
                document.querySelector('app-modal-editar-equipe').querySelector('div[class="row-actions"]').querySelector('button').click();
            }
        }

    }
    if(localStorage.getItem('editar_equipe') && localStorage.getItem('processo_edicao') == 'inserir_pessoas' && document.querySelector('app-modal-editar-equipe') && document.querySelector('cad-table') && document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value == '') {
        if(document.querySelector('app-modal-editar-equipe').querySelector('ul')) {
            if(!document.querySelector('app-modal-editar-equipe').querySelector('ul').innerHTML.includes(' '+localStorage.getItem('editar_equipe').split('-')[3]+' ') && localStorage.getItem('editar_equipe').split('-')[3] != ' ') {
                document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value = localStorage.getItem('editar_equipe').split('-')[3];
                document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').dispatchEvent(new Event('input', { bubbles: true }));
            } else if(!document.querySelector('app-modal-editar-equipe').querySelector('ul').innerHTML.includes(' '+localStorage.getItem('editar_equipe').split('-')[4]+' ') && localStorage.getItem('editar_equipe').split('-')[4] != ' ') {
                document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value = localStorage.getItem('editar_equipe').split('-')[4];
                document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').dispatchEvent(new Event('input', { bubbles: true }));
            } else if(!document.querySelector('app-modal-editar-equipe').querySelector('ul').innerHTML.includes(' '+localStorage.getItem('editar_equipe').split('-')[5]+' ') && localStorage.getItem('editar_equipe').split('-')[5] != ' ') {
                document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value = localStorage.getItem('editar_equipe').split('-')[5];
                document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').dispatchEvent(new Event('input', { bubbles: true }));
            } else if(!document.querySelector('app-modal-editar-equipe').querySelector('ul').innerHTML.includes(' '+localStorage.getItem('editar_equipe').split('-')[6]+' ') && localStorage.getItem('editar_equipe').split('-')[6] != ' ') {
                document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value = localStorage.getItem('editar_equipe').split('-')[6];
                document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').dispatchEvent(new Event('input', { bubbles: true }));
            } else if(!document.querySelector('app-modal-editar-equipe').querySelector('ul').innerHTML.includes(' '+localStorage.getItem('editar_equipe').split('-')[7]+' ') && localStorage.getItem('editar_equipe').split('-')[7] != ' ') {
                document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value = localStorage.getItem('editar_equipe').split('-')[7];
                document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').dispatchEvent(new Event('input', { bubbles: true }));
            } else if(!document.querySelector('app-modal-editar-equipe').querySelector('ul').innerHTML.includes(' '+localStorage.getItem('editar_equipe').split('-')[8]+' ') && localStorage.getItem('editar_equipe').split('-')[8] != ' ') {
                document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value = localStorage.getItem('editar_equipe').split('-')[8];
                document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').dispatchEvent(new Event('input', { bubbles: true }));
            } else if(!document.querySelector('app-modal-editar-equipe').querySelector('ul').innerHTML.includes(' '+localStorage.getItem('editar_equipe').split('-')[9]+' ') && localStorage.getItem('editar_equipe').split('-')[9] != ' ') {
                document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value = localStorage.getItem('editar_equipe').split('-')[9];
                document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').dispatchEvent(new Event('input', { bubbles: true }));
            } else{
                localStorage.setItem('processo_edicao', 'inserir_funcoes');
                localStorage.setItem('clicando_na_funcao','nao');
                localStorage.setItem('qual_gm','0');
            }
        } else if(localStorage.getItem('editar_equipe').split('-')[3] != ' ') {
            document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value = localStorage.getItem('editar_equipe').split('-')[3];
            document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').dispatchEvent(new Event('input', { bubbles: true }));
        } else if(localStorage.getItem('editar_equipe').split('-')[4] != ' ') {
            document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value = localStorage.getItem('editar_equipe').split('-')[4];
            document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').dispatchEvent(new Event('input', { bubbles: true }));
        } else if(localStorage.getItem('editar_equipe').split('-')[5] != ' ') {
            document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value = localStorage.getItem('editar_equipe').split('-')[5];
            document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').dispatchEvent(new Event('input', { bubbles: true }));
        } else if(localStorage.getItem('editar_equipe').split('-')[6] != ' ') {
            document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value = localStorage.getItem('editar_equipe').split('-')[6];
            document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').dispatchEvent(new Event('input', { bubbles: true }));
        } else if(localStorage.getItem('editar_equipe').split('-')[7] != ' ') {
            document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value = localStorage.getItem('editar_equipe').split('-')[7];
            document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').dispatchEvent(new Event('input', { bubbles: true }));
        } else if(localStorage.getItem('editar_equipe').split('-')[8] != ' ') {
            document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value = localStorage.getItem('editar_equipe').split('-')[8];
            document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').dispatchEvent(new Event('input', { bubbles: true }));
        } else if(localStorage.getItem('editar_equipe').split('-')[9] != ' ') {
            document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value = localStorage.getItem('editar_equipe').split('-')[9];
            document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').dispatchEvent(new Event('input', { bubbles: true }));
        }

    }
    if(localStorage.getItem('editar_equipe') && localStorage.getItem('processo_edicao') == 'inserir_pessoas' && document.querySelector('app-modal-editar-equipe') && document.querySelector('cad-table') && document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value != '' && document.querySelector('cad-table').querySelectorAll('tr').length < 5) {
        if(!document.querySelector('app-modal-editar-equipe').querySelector('span[class="fx-expand"]').innerHTML.includes(' '+document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value+' ')) {
            if(document.querySelector('app-modal-editar-equipe').querySelector('button[title="Vincular"]')) {
                document.querySelector('app-modal-editar-equipe').querySelector('button[title="Vincular"]').click();
                document.querySelector('app-modal-editar-equipe').querySelector('span[class="fx-expand"]').innerHTML += ' '+document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value+' ';
                document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value = '';
            }
        } else {
            document.querySelector('app-modal-editar-equipe').querySelector('input[name="column-filter-nome"]').value = '';
        }
    }
    if(localStorage.getItem('processo_edicao') == 'inserir_funcoes' && localStorage.getItem('clicando_na_funcao') && document.querySelector('app-modal-editar-equipe') && document.querySelector('app-modal-editar-equipe').querySelectorAll("li:not([data-feito])").length > 0 && !document.querySelector('mat-option')) {
        var equipe = localStorage.getItem('editar_equipe').split('-');
        var item = document.querySelector('app-modal-editar-equipe').querySelector("li:not([data-feito])");
        item.dataset.feito = 'feito';
        if(item.querySelector('button[aria-label="Limpar"]')) {
            item.querySelector('button[aria-label="Limpar"]').click();
        } else {
            item.querySelector('input').click();
        }
        if(equipe.indexOf(item.innerHTML.split('gm ')[1].split('-')[0].trim()) == 3) {
            item.querySelector('input').click();
            localStorage.setItem('clicando_na_funcao',11);
        } else if(equipe.indexOf(item.innerHTML.split('gm ')[1].split('-')[0].trim()) == 4 || equipe.indexOf(item.innerHTML.split('gm ')[1].split('-')[0].trim()) == 5 || equipe.indexOf(item.innerHTML.split('gm ')[1].split('-')[0].trim()) == 6) {
            item.querySelector('input').click();
            localStorage.setItem('clicando_na_funcao',5);
        } else {
            item.querySelector('input').click();
            localStorage.setItem('clicando_na_funcao',8);
        }
    }
    if(localStorage.getItem('processo_edicao') == 'inserir_funcoes' && localStorage.getItem('clicando_na_funcao') && document.querySelector('mat-option')) {
        if(document.querySelectorAll('mat-option')[parseInt(localStorage.getItem('clicando_na_funcao'))]) {
            document.querySelectorAll('mat-option')[parseInt(localStorage.getItem('clicando_na_funcao'))].click();
        }
    }
    if(localStorage.getItem('processo_edicao') == 'inserir_funcoes' && localStorage.getItem('clicando_na_funcao') && document.querySelector('app-modal-editar-equipe') && document.querySelector('app-modal-editar-equipe').querySelectorAll("li:not([data-feito])").length == 0 && !document.querySelector('mat-option')) {
        localStorage.removeItem('clicando_na_funcao');
        localStorage.setItem('processo_edicao','excluir_equipamentos');
        document.querySelector('app-modal-editar-equipe').querySelector('button.confirm-btn').click();
        if(document.querySelectorAll('app-unidade-servico-card')[parseInt(document.querySelector('#sel_equipe_edit_equip').value)].innerHTML.includes('Sem equipamentos cadastrados')) {
            document.querySelectorAll('app-unidade-servico-card')[parseInt(document.querySelector('#sel_equipe_edit_equip').value)].querySelector('button[title="Incluir Equipamentos"]').click();
        } else {
            document.querySelectorAll('app-unidade-servico-card')[parseInt(document.querySelector('#sel_equipe_edit_equip').value)].querySelector('app-equipamentos-mini-card').querySelector('button[title="Editar"]').click();
        }
    }
    if(localStorage.getItem('editar_equipe') && document.querySelector('app-modal-editar-equipamentos') && localStorage.getItem('processo_edicao') == 'excluir_equipamentos') {
        setTimeout(() => {
            if(localStorage.getItem('processo_edicao') == 'excluir_equipamentos' ) {
                if(document.querySelector('app-modal-editar-equipamentos').querySelectorAll('em[title="Excluir"]').length > 0) {
                    localStorage.setItem('processo_edicao','inserir_equipamentos');
                    document.querySelector('app-modal-editar-equipamentos').querySelectorAll('em[title="Excluir"]').forEach(function(a){
                        a.click();
                    });
                } else {
                    localStorage.setItem('processo_edicao','inserir_equipamentos');
                }
            }
        }, "1000");

    }
    if(localStorage.getItem('editar_equipe') && localStorage.getItem('processo_edicao') == 'inserir_equipamentos' && document.querySelector('app-modal-editar-equipamentos') && !document.querySelector('cad-table')) {
        if(document.querySelector('app-modal-editar-equipamentos').innerHTML.includes('Fechar Pesquisa')){
            document.querySelector('app-modal-editar-equipamentos').querySelectorAll('button')[2].click();
        } else {
            document.querySelector('app-modal-editar-equipamentos').querySelectorAll('em')[1].click();
        }
    }
    if(localStorage.getItem('editar_equipe') && localStorage.getItem('processo_edicao') == 'inserir_equipamentos' && document.querySelector('app-modal-editar-equipamentos') && document.querySelector('cad-table') && document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value == '') {
        if(document.querySelector('app-modal-editar-equipamentos').querySelector('ul')) {
            if(!document.querySelector('app-modal-editar-equipamentos').querySelector('ul').innerHTML.includes(' '+localStorage.getItem('editar_equipe').split('-')[10]) && localStorage.getItem('editar_equipe').split('-')[10] != ' ') {
                document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value = localStorage.getItem('editar_equipe').split('-')[10];
                document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').dispatchEvent(new Event('input', { bubbles: true }));
            } else if(!document.querySelector('app-modal-editar-equipamentos').querySelector('ul').innerHTML.includes(' '+localStorage.getItem('editar_equipe').split('-')[11]) && localStorage.getItem('editar_equipe').split('-')[11] != ' ') {
                document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value = localStorage.getItem('editar_equipe').split('-')[11];
                document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').dispatchEvent(new Event('input', { bubbles: true }));
            } else if(!document.querySelector('app-modal-editar-equipamentos').querySelector('ul').innerHTML.includes(' '+localStorage.getItem('editar_equipe').split('-')[12]) && localStorage.getItem('editar_equipe').split('-')[12] != ' ') {
                document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value = localStorage.getItem('editar_equipe').split('-')[12];
                document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').dispatchEvent(new Event('input', { bubbles: true }));
            } else if(!document.querySelector('app-modal-editar-equipamentos').querySelector('ul').innerHTML.includes('00'+localStorage.getItem('editar_equipe').split('-')[13]) && localStorage.getItem('editar_equipe').split('-')[13] != ' ') {
                document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value = '00'+localStorage.getItem('editar_equipe').split('-')[13];
                document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').dispatchEvent(new Event('input', { bubbles: true }));
            } else if(!document.querySelector('app-modal-editar-equipamentos').querySelector('ul').innerHTML.includes('00'+localStorage.getItem('editar_equipe').split('-')[14]) && localStorage.getItem('editar_equipe').split('-')[14] != ' ') {
                document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value = '00'+localStorage.getItem('editar_equipe').split('-')[14];
                document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').dispatchEvent(new Event('input', { bubbles: true }));
            } else if(!document.querySelector('app-modal-editar-equipamentos').querySelector('ul').innerHTML.includes('00'+localStorage.getItem('editar_equipe').split('-')[15]) && localStorage.getItem('editar_equipe').split('-')[15] != ' ') {
                document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value = '00'+localStorage.getItem('editar_equipe').split('-')[15];
                document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').dispatchEvent(new Event('input', { bubbles: true }));
            } else if(!document.querySelector('app-modal-editar-equipamentos').querySelector('ul').innerHTML.includes('00'+localStorage.getItem('editar_equipe').split('-')[16]) && localStorage.getItem('editar_equipe').split('-')[16] != ' ') {
                document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value = '00'+localStorage.getItem('editar_equipe').split('-')[16];
                document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').dispatchEvent(new Event('input', { bubbles: true }));
            } else{
                localStorage.setItem('processo_edicao', 'encerrar_edicao');
                document.querySelector('app-modal-editar-equipamentos').querySelector('button[class="confirm-btn"]').click();
            }
        } else if(localStorage.getItem('editar_equipe').split('-')[10] != ' ') {
            document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value = localStorage.getItem('editar_equipe').split('-')[10];
            document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').dispatchEvent(new Event('input', { bubbles: true }));
        } else if(localStorage.getItem('editar_equipe').split('-')[11] != ' ') {
            document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value = localStorage.getItem('editar_equipe').split('-')[11];
            document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').dispatchEvent(new Event('input', { bubbles: true }));
        } else if(localStorage.getItem('editar_equipe').split('-')[12] != ' ') {
            document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value = localStorage.getItem('editar_equipe').split('-')[12];
            document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').dispatchEvent(new Event('input', { bubbles: true }));
        } else if(localStorage.getItem('editar_equipe').split('-')[13] != ' ') {
            document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value = localStorage.getItem('editar_equipe').split('-')[13];
            document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').dispatchEvent(new Event('input', { bubbles: true }));
        } else if(localStorage.getItem('editar_equipe').split('-')[14] != ' ') {
            document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value = localStorage.getItem('editar_equipe').split('-')[14];
            document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').dispatchEvent(new Event('input', { bubbles: true }));
        } else if(localStorage.getItem('editar_equipe').split('-')[15] != ' ') {
            document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value = localStorage.getItem('editar_equipe').split('-')[15];
            document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').dispatchEvent(new Event('input', { bubbles: true }));
        } else if(localStorage.getItem('editar_equipe').split('-')[16] != ' ') {
            document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value = localStorage.getItem('editar_equipe').split('-')[16];
            document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').dispatchEvent(new Event('input', { bubbles: true }));
        }

    }
    if(localStorage.getItem('editar_equipe') && localStorage.getItem('processo_edicao') == 'inserir_equipamentos' && document.querySelector('app-modal-editar-equipamentos') && document.querySelector('cad-table') && document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value != '' && document.querySelector('cad-table').querySelectorAll('tr').length < 5) {
        if(!document.querySelector('app-modal-editar-equipamentos').querySelector('span[class="fx-expand"]').innerHTML.includes(' '+document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value+' ')) {
            if(document.querySelector('app-modal-editar-equipamentos').querySelector('button[title="Vincular"]')) {
                document.querySelector('app-modal-editar-equipamentos').querySelector('button[title="Vincular"]').click();
                document.querySelector('app-modal-editar-equipamentos').querySelector('span[class="fx-expand"]').innerHTML += ' '+document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value+' ';
                document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value = '';
            }
        } else {
            document.querySelector('app-modal-editar-equipamentos').querySelector('input[name="column-filter-prefixo"]').value = '';
        }
    }

    if(localStorage.getItem('editar_equipe') && localStorage.getItem('processo_edicao') == 'encerrar_edicao' && document.querySelector('div[class="mat-mdc-snack-bar-label mdc-snackbar__label"]')) {
        document.querySelectorAll('app-unidade-servico-card')[parseInt(localStorage.getItem('editar_equipe').split('-')[1])].querySelectorAll('app-equipe-mini-card').forEach(function(item){
            if(item.innerHTML.includes(localStorage.getItem('editar_equipe').split('-')[2])) {
                item.querySelector('svg').parentNode.click();
            }});
        document.querySelectorAll('app-unidade-servico-card')[parseInt(localStorage.getItem('editar_equipe').split('-')[1])].querySelector('button[title="Iniciar Serviço"]').click();
        localStorage.removeItem('editar_equipe');
    }
    if(localStorage.getItem('edita_equipe_pega_equipe') && document.querySelector('app-modal-detalhar-equipamentos')) {
        selects = document.querySelector('#checkbox').querySelectorAll('select');
        var equipamentos = document.querySelector('app-modal-detalhar-equipamentos').querySelectorAll('div[class="modal-material-subtitulo"]');
        var vtr = [];
        var cam = [];
        selects[11].querySelectorAll('option')[0].selected = true;
        selects[12].querySelectorAll('option')[0].selected = true;
        selects[13].querySelectorAll('option')[0].selected = true;
        selects[14].querySelectorAll('option')[0].selected = true;
        selects[15].querySelectorAll('option')[0].selected = true;
        selects[16].querySelectorAll('option')[0].selected = true;
        selects[17].querySelectorAll('option')[0].selected = true;
        equipamentos.forEach(function (eqp) {
            if(eqp.parentNode.innerHTML.includes('Câmera Corporal')) {
                cam.push(eqp.innerHTML.trim().slice(2));
            } else {
                vtr.push(eqp.innerHTML.trim());
            }
        });
        for (let i = 0; i < vtr.length; i++) {
            selects[i+11].querySelectorAll('option').forEach(function (op) {
                if(op.value == vtr[i]) {
                    op.selected = true;
                }
            })
        }
        for (let i = 0; i < cam.length; i++) {
            selects[i+14].querySelectorAll('option').forEach(function (op) {
                if(op.value == cam[i]) {
                    op.selected = true;
                }
            })
        }
        document.querySelector('app-modal-detalhar-equipamentos').querySelector('button').click();
        localStorage.removeItem('edita_equipe_pega_equipe');
    }
    if(document.querySelectorAll('app-unidade-servico-card').length > 20 && parseInt(localStorage.getItem('encerra_sv')) > -1 && localStorage.getItem('trava_encerra_sv') == 'nao') {
        var but_encerrar_sv = parseInt(localStorage.getItem('encerra_sv')) -1;
        document.querySelectorAll('button[title="Encerrar Serviço"]')[0].click();
        localStorage.setItem('encerra_sv', but_encerrar_sv);
        localStorage.setItem('trava_encerra_sv', 'sim');
    }
    if(document.querySelector('app-consultar-unidade-servico') && document.querySelector("mat-select[formcontrolname=registrosPorPagina]")) {
        if (document.querySelector("div[id='naorepete']")) {
        } else {
            a = document.createElement("div");
            a.setAttribute("id", "naorepete");
            document.querySelector('app-consultar-unidade-servico').append(a);
            document.querySelector("mat-select[formcontrolname=registrosPorPagina]").click();
            setTimeout(() => {
                document.querySelectorAll('mat-option')[4].click();
                document.querySelector("#sel_area_edit_equip").focus();
            }, "1000");
        }
    };

    if(document.querySelector('input[name=column-filter-nome]')) {
        if (document.querySelector("div[id='naorepete_editar_equipe']")) {
        } else {
            var b = document.createElement("div");
            b.setAttribute("id", "naorepete_editar_equipe");
            document.querySelector('app-modal-editar-equipe').append(b);

            document.querySelector('input[name=column-filter-nome]').addEventListener('keydown', function(event) {
                if (event.key === 'Enter' && document.querySelector('input[name=column-filter-nome]').value.length == 3) {
                    document.querySelectorAll('button[title=Vincular]')[0].click();
                    var n_gm = document.querySelector('input[name=column-filter-nome]').value;
                    setTimeout(() => {
                        var pessoas_equipe = document.querySelectorAll('.titulo');
                        pessoas_equipe.forEach(function (pessoa) {
                            if(pessoa.innerHTML.includes(n_gm)) {
                                pessoa.parentNode.parentNode.querySelector('mat-select').click();
                                document.querySelectorAll('mat-option')[8].click();
                                document.querySelector('input[name=column-filter-nome]').focus();
                                document.querySelector('input[name=column-filter-nome]').value = '';
                            }
                        });
                    }, "1000");

                }
            });

        }
    };
    var Tabela = {
        selecionarTabela: function(el) {
            var body = document.body, range, sel;
            if (document.createRange && window.getSelection) {
                range = document.createRange();
                sel = window.getSelection();
                sel.removeAllRanges();
                try {
                    range.selectNodeContents(el);
                    sel.addRange(range);
                } catch (e) {
                    range.selectNode(el);
                    sel.addRange(range);
                }
            } else if (body.createTextRange) {
                range = body.createTextRange();
                range.moveToElementText(el);
                range.select();
            }
            try {
                document.execCommand('copy');
                //navigator.clipboard.writeText(range);
                range.blur();
            } catch(error){
                // Exceção aqui
            }
        }
    }
    setTimeout(() => {
        if(document.querySelector('app-equipe-mini-card')) {
            if (document.querySelector("div[id='naorepete-empenhada']")) {
            } else {
                var c = document.createElement("div");
                c.setAttribute("id", "naorepete-empenhada");
                document.querySelector('app-consultar-unidade-servico').append(c);
                var checkbox = document.createElement("div");
                checkbox.setAttribute("id", "checkbox");
                var botao_gerar_lista_de_equipes = document.createElement("div");
                botao_gerar_lista_de_equipes.setAttribute("id", "botao_gerar_lista_de_equipes");
                botao_gerar_lista_de_equipes.setAttribute('class','cancel-btn');
                botao_gerar_lista_de_equipes.setAttribute('style',"margin-right:1%;display:inline-block");
                document.querySelector('app-consultar-unidade-servico').insertBefore(botao_gerar_lista_de_equipes, document.querySelector('app-consultar-unidade-servico').querySelector('form'));
                document.getElementById('botao_gerar_lista_de_equipes').innerHTML = 'Gerar Lista de Equipes';
                var botao_gerar_encerrar_todos_os_servicos = document.createElement("div");
                botao_gerar_encerrar_todos_os_servicos.setAttribute("id", "botao_gerar_encerrar_todos_os_servicos");
                botao_gerar_encerrar_todos_os_servicos.setAttribute('class','cancel-btn');
                botao_gerar_encerrar_todos_os_servicos.setAttribute('style',"margin-right:1%;display:inline-block");
                document.querySelector('app-consultar-unidade-servico').insertBefore(botao_gerar_encerrar_todos_os_servicos, document.querySelector('app-consultar-unidade-servico').querySelector('form'));
                document.querySelector('app-consultar-unidade-servico').insertBefore(checkbox, document.querySelector('app-consultar-unidade-servico').querySelector('form'));
                document.getElementById('checkbox').innerHTML = '<select style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"><option>Todas</option><option value=1000>ROMU</option><option value=1200>Centro</option><option value="200 Área Cruzeiro">21 - Cruzeiro</option><option value=300>31 - Partenon</option><option value=400>41 - Leste</option><option value=500>51 - Restinga</option><option value=600>61 - Norte</option><option value=700>71 - Eixo Baltazar</option><option value=800>81 - Pinheiro</option><option value=900>91 - Sul</option><option value=Alpha>Alpha</option></select>';
                document.querySelector('#checkbox').innerHTML+='<table><tbody><tr style="text-align:center"><td>Área</td><td>Equipe</td><td>Turno</td><td>GSP</td><td>GMO 1</td><td>GMO 2</td><td>GMO 3</td><td>PTR 1</td><td>PTR 2</td><td>PTR 3</td><td>VTR 1</td><td>VTR 2</td><td>VTR 3</td><td>Cam 1</td><td>Cam 2</td><td>Cam 3</td><td>Cam 4</td><td></td></tr><tr><td><select id=sel_area_edit_equip style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"><option value=1000>1000 - ROMU</option><option value=1200>1200 - Centro</option><option value="200">21 - Cruzeiro</option><option value="300">31 - Partenon</option><option value="400">41 - Leste</option><option value="500">51 - Restinga</option><option value="600">61 - Norte</option><option value="700">71 - Eixo Baltazar</option><option value="800">81 - Pinheiro</option><option value="900">91 - Sul</option><option value="Alpha">Alpha</option></select></td><td><select id=sel_equipe_edit_equip style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"></select></td><td><select style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"><option value="Dia">Dia</option><option value="Noite">Noite</option></select></td><td><select style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"></select></td></td><td><select style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"></select></td><td><select style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"></select></td><td><select style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"></select></td><td><select style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"></select></td><td><select style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"></select></td><td><select style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"></select></td><td><select style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"></select></td><td><select style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"></select></td><td><select style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"></select></td><td><select style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"></select></td><td><select style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"></select></td><td><select style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"></select></td><td><select style="padding:5px;border:0px;margin:5px;box-shadow:0px 1px 5px -1px rgba(0,0,0,0.75);font-weight: bold;border-radius:5px;cursor:pointer;font-size:15px"></select></td><td><button id=editar_equipe_but class=cancel-btn>Inserir</button></td></tr></tbody></table>';
                document.getElementById('botao_gerar_encerrar_todos_os_servicos').innerHTML = 'Encerrar Todos os Serviços';
                document.getElementById('botao_gerar_encerrar_todos_os_servicos').addEventListener('click', function() {
                    var confirme = confirm("Você deseja encerrar todos os serviços?");
                    if (confirme == true) {
                        localStorage.setItem('encerra_sv', but_encerrar_sv);
                        location.reload();
                    }
                });
                var vtrs = ['1000',['0819','0524',1119,1919],'1200',[1419,1422,'2b76',1919,1622,1522,1322,'1i54','2b85','2a67','2a58',2319],'200',[2519],'300',[2119],'400',['0422',2219],'500',[1619],'600',['0418',2019],'700',['0722',2019],'800',[1719],'900',[1519]];
                var cameras = ['Dia',['1000',[1304,1310,1303,1311,1319,1320,1346,1344,1347,1349,1343],'1200',[1241,1274,1245,1268,1269,1261,1249,1273,1255,1267,1266,1277,1248,1252,1253,1265,1272,1257,1253,1258,1250,1263,1275,1278,1280,1254,1264,1270,1246,1259],'200',[1403,1399,1404,1400,1397,1398],'300',[1234,1233,1235,1240,1239,1237,1238],'400',[1352,1354,1353,1357],'500',[1390,1394,1395,1393,1396],'600',[1455,1456,1454,1457,1458],'700',[1445,1447,1448,1446],'800',[1382,1384,1385,1387,1388],'900',[1406,1407,1409,1408]]];
                var gms = ['Dia',['1000',[100,120,124,124,137,140,188,222,229,279,299,325,361,445,465,473,475,494,502,525,543,549,577,585,586,608,609,619,630,642,648,653,666,667,676,705,713,722,735,740,753,765,766,775,777,783,797,799,835,836,845,874],'1200',['086','099',101,104,105,134,138,153,162,167,204,212,224,227,246,247,295,331,343,354,408,427,429,435,449,478,483,485,487,519,522,523,528,535,538,571,572,575,576,578,600,649,651,669,672,716,728,781,788,801,803,806,811,818,819,820,821,823,824,825,826,827,828,829,830,834,837,838,840,841,843,844,847,848,849,851,852,853,854,855,856,857,859,860,861,863,864,865,866,868,870,873],'200',['020',117,129,277,464,466,496,570,607,644],'300',['041','049','076',111,219,278,307,460,482,505,516,610,628,664,768,791,793,812,814,816],'400',['013','046','053',214,372,411,446,469,481,497,544,603,611,809,810],'500',['023',128,147,265,508,524,560,665,730,770,784],'600',[225,318,456,492,493,507,551,742],'700',['029',113,172,209,373,597,601,731,751],'800',['016',114,187,192,488,506,514,526,529,594,743,804,808],'900',[559,800,968,677,447,467,767,792]]];
                var selects = document.getElementById('checkbox').querySelector('table').querySelectorAll('select');
                document.querySelector("#sel_area_edit_equip").focus();
                document.getElementById('sel_area_edit_equip').addEventListener('change', function() {
                    document.getElementById('sel_equipe_edit_equip').innerHTML = '';
                    var equipes = document.querySelectorAll('app-unidade-servico-card');
                    var area = document.getElementById('sel_area_edit_equip').value;
                    for (let i = 0; i < equipes.length; i++) {
                        if(equipes[i].querySelector('span').innerHTML.split(' ')[0] == area) {
                            document.getElementById('sel_equipe_edit_equip').innerHTML+= '<option value='+i+'>'+equipes[i].querySelector('span').innerHTML.split('- ')[1]+'</option>';
                        }
                    }
                    var guardas = gms[gms.indexOf(selects[2].value)+1][gms[gms.indexOf(selects[2].value)+1].indexOf(selects[0].value)+1].sort();
                    var op = '<option value=" "></option>';
                    guardas.forEach(function(item) {
                        op += '<option value='+item+'>'+item+'</option>';
                    });
                    selects[3].innerHTML = op;
                    selects[4].innerHTML = op;
                    selects[5].innerHTML = op;
                    selects[6].innerHTML = op;
                    selects[7].innerHTML = op;
                    selects[8].innerHTML = op;
                    selects[9].innerHTML = op;
                    var viaturas = vtrs[vtrs.indexOf(selects[0].value)+1].sort();
                    var opvtr = '<option value=" "></option>';
                    viaturas.forEach(function(item) {
                        opvtr += '<option value='+item+'>'+item+'</option>';
                    });
                    selects[10].innerHTML = opvtr;
                    selects[11].innerHTML = opvtr;
                    selects[12].innerHTML = opvtr;
                    var camrs = cameras[cameras.indexOf(selects[2].value)+1][cameras[cameras.indexOf(selects[2].value)+1].indexOf(selects[0].value)+1].sort();
                    var opcams = '<option value=" "></option>';
                    camrs.forEach(function(item) {
                        opcams += '<option value='+item+'>'+item+'</option>';
                    });
                    selects[13].innerHTML = opcams;
                    selects[14].innerHTML = opcams;
                    selects[15].innerHTML = opcams;
                    selects[16].innerHTML = opcams;
                    document.getElementById('sel_equipe_edit_equip').dispatchEvent(new Event('change', { bubbles: true }));
                });
                document.getElementById('sel_equipe_edit_equip').addEventListener('change', function() {
                    localStorage.setItem('edita_equipe_pega_equipe','equipe');
                    var eqps = document.querySelectorAll('app-unidade-servico-card')[parseInt(document.querySelector('#sel_equipe_edit_equip').value)].querySelectorAll('app-equipe-mini-card');
                    for (let i = 0; i < eqps.length; i++) {
                        if(eqps[i].querySelector('span').innerHTML.includes(document.querySelectorAll('select')[3].value)) {
                            eqps[i].querySelector('button').click();
                            break;
                        }
                    };
                });
                selects[2].addEventListener('change', function() {
                    document.getElementById('sel_equipe_edit_equip').dispatchEvent(new Event('change', { bubbles: true }));
                });
                document.querySelector('#editar_equipe_but').addEventListener('click', function() {
                    localStorage.setItem('processo_edicao','excluir_pessoas');
                    localStorage.setItem('editar_equipe',selects[0].value+'-'+selects[1].value+'-'+selects[2].value+'-'+selects[3].value+'-'+selects[4].value+'-'+selects[5].value+'-'+selects[6].value+'-'+selects[7].value+'-'+selects[8].value+'-'+selects[9].value+'-'+selects[10].value+'-'+selects[11].value+'-'+selects[12].value+'-'+selects[13].value+'-'+selects[14].value+'-'+selects[15].value+'-'+selects[16].value)
                    var unidade_servico = document.querySelectorAll('app-unidade-servico-card')[parseInt(document.querySelector('#sel_equipe_edit_equip').value)];
                    if(unidade_servico.querySelector('button[title="Encerrar Serviço"]')) {
                        unidade_servico.querySelector('button[title="Encerrar Serviço"]').click();
                    } else {
                        for (let i = 0; i < unidade_servico.querySelectorAll('app-equipe-mini-card').length; i++) {
                            if(unidade_servico.querySelectorAll('app-equipe-mini-card')[i].querySelector('span').innerHTML.includes(document.querySelectorAll('select')[3].value)) {
                                unidade_servico.querySelectorAll('app-equipe-mini-card')[i].querySelectorAll('button')[1].click();
                                break;
                            }
                        };
                    }
                });
                document.getElementById('sel_area_edit_equip').dispatchEvent(new Event('change', { bubbles: true }));

                document.getElementById('botao_gerar_lista_de_equipes').addEventListener('click', function() {
                    var tabela_lista_de_equipes = document.createElement("table");
                    tabela_lista_de_equipes.setAttribute("id", "tabela_lista_de_equipes");
                    tabela_lista_de_equipes.setAttribute("class", "mat-focus-indicator mat-raised-button mat-button-base mat-botao-secundario");
                    document.getElementById('botao_gerar_lista_de_equipes').parentNode.insertBefore(tabela_lista_de_equipes, document.getElementById('botao_gerar_lista_de_equipes').nextSibling);
                    var botao_copiar_lista_equipes = document.createElement("div");
                    botao_copiar_lista_equipes.setAttribute("id", "botao_copiar_lista_equipes");
                    botao_copiar_lista_equipes.setAttribute('class','cancel-btn');
                    botao_copiar_lista_equipes.setAttribute('style',"margin-right:1%;display:inline-block");
                    document.getElementById('botao_gerar_lista_de_equipes').parentNode.insertBefore(botao_copiar_lista_equipes, document.getElementById('botao_gerar_lista_de_equipes').nextSibling);
                    document.getElementById('botao_copiar_lista_equipes').innerHTML = 'Copiar Lista de Equipes';
                    document.getElementById('tabela_lista_de_equipes').innerHTML = '<thead><tr><th>Guarnição</th><th>GM Nº</th><th>Nome</th><th>Função</th><th>Vtr</th><th>Câmeras</th></tr></thead><tbody>';
                    document.getElementById('botao_copiar_lista_equipes').addEventListener('click', function(){
                        Tabela.selecionarTabela(document.getElementById('tabela_lista_de_equipes'));
                    });
                    localStorage.setItem('lista_equipes_número',document.querySelectorAll('svg[class="iconeServico ng-star-inserted"]').length);
                    localStorage.setItem('lista_equipes_empenhadas',document.querySelectorAll('svg[class="iconeEmpenhada ng-star-inserted"]').length);
                    localStorage.setItem('lista_equipamentos',parseInt(document.querySelectorAll('app-equipamentos-mini-card').length));
                    localStorage.setItem('lista_equipes_pronto','sim');
                });
                document.getElementById('checkbox').querySelector('select').addEventListener('change', function() {
                    var valor = this.value;
                    localStorage.setItem('cards_selecionados',valor);
                    var cards = document.querySelectorAll('app-unidade-servico-card');
                    if(valor == 'Todas') {
                        cards.forEach(function (item) {
                            item.style.display = '';
                        });
                    } else {
                        cards.forEach(function (item) {
                            if(item.querySelector('span').innerHTML.includes(valor)) {
                                item.style.display = '';
                            } else {
                                item.style.display = 'none';
                            }

                        });

                    }
                });
                //document.getElementById('checkbox').click();
            }
        }
    }, "1000");
    if(localStorage.getItem('lista_equipes_pronto') && localStorage.getItem('lista_equipes_pronto') == 'sim') {
        if(parseInt(localStorage.getItem('lista_equipes_número'))>-1){
            if(parseInt(localStorage.getItem('lista_equipes_número'))%2!=0) {
                document.querySelectorAll('svg[class="iconeServico ng-star-inserted"]')[parseInt(localStorage.getItem('lista_equipes_número'))].parentNode.parentNode.parentNode.querySelector('button[title="Detalhar"]').click();
                localStorage.setItem('lista_equipes_pronto','nao');
            } else {
                localStorage.setItem('lista_equipes_número',parseInt(localStorage.getItem('lista_equipes_número'))-1);
            }
        } else if(parseInt(localStorage.getItem('lista_equipes_empenhadas'))>-1) {
            if(parseInt(localStorage.getItem('lista_equipes_empenhadas'))%2!=0) {
                document.querySelectorAll('svg[class="iconeEmpenhada ng-star-inserted"]')[parseInt(localStorage.getItem('lista_equipes_empenhadas'))].parentNode.parentNode.parentNode.querySelector('button[title="Detalhar"]').click();
                localStorage.setItem('lista_equipes_pronto','nao');
            } else {
                localStorage.setItem('lista_equipes_empenhadas',parseInt(localStorage.getItem('lista_equipes_empenhadas'))-1);
            }
        } else if(parseInt(localStorage.getItem('lista_equipamentos'))>-1) {
            if(document.querySelectorAll('app-equipamentos-mini-card')[parseInt(localStorage.getItem('lista_equipamentos'))]) {
                document.querySelectorAll('app-equipamentos-mini-card')[parseInt(localStorage.getItem('lista_equipamentos'))].querySelector('button[title="Detalhar"]').click();
                localStorage.setItem('lista_equipes_pronto','nao');
            }
            localStorage.setItem('lista_equipamentos', parseInt(localStorage.getItem('lista_equipamentos'))-1);
        } else {
            var BOM = "\uFEFF";
            var htmltabel = document.getElementById('tabela_lista_de_equipes');
            var html = htmltabel.outerHTML;
            var downbutton = document.createElement("div");
            downbutton.setAttribute('id','download_excel');
            downbutton.setAttribute('class','cancel-btn');
            downbutton.setAttribute('style',"margin-right:1%;display:inline-block");
            document.querySelector('#botao_copiar_lista_equipes').parentNode.insertBefore(downbutton,document.querySelector('#botao_copiar_lista_equipes'));
            downbutton.innerHTML = 'Download em Excel';
            document.querySelector('#download_excel').addEventListener('click', function() {
                window.open('data:application/vnd.ms-excel,'+ encodeURI(BOM + html));
            });
            localStorage.removeItem('lista_equipes_pronto');
        }
    }
    if(document.querySelector('app-modal-detalhar-equipe') && localStorage.getItem('lista_equipes_pronto') =='nao') {
        equipe = document.querySelector('app-modal-detalhar-equipe').querySelectorAll('strong')[1].innerHTML;
        componentes = document.querySelector('app-modal-detalhar-equipe').querySelectorAll('div[class="p-card-body"]');
        for (let i = 0; i < componentes.length; i++) {
            document.getElementById('tabela_lista_de_equipes').innerHTML += '<tr><td>'+equipe+'</td><td>'+componentes[i].parentNode.previousSibling.innerHTML.replace('gm ','')+'</td><td>'+componentes[i].querySelectorAll('strong')[1].parentNode.innerHTML.split('</strong>')[1].trim()+'</td><td>'+componentes[i].querySelectorAll('strong')[4].parentNode.innerHTML.split('</strong>')[1].trim()+'</td><td></td><td></td></tr>';
        }
        componentes='';
        if(parseInt(localStorage.getItem('lista_equipes_número'))!=-1) {
            localStorage.setItem('lista_equipes_número',parseInt(localStorage.getItem('lista_equipes_número'))-1);
        } else {
            localStorage.setItem('lista_equipes_empenhadas',parseInt(localStorage.getItem('lista_equipes_empenhadas'))-1);
        }
        document.querySelector('app-modal-detalhar-equipe').querySelector('button').click();
        localStorage.setItem('lista_equipes_pronto','sim');
    }
    if(document.querySelector('app-modal-detalhar-equipamentos') && localStorage.getItem('lista_equipes_pronto') =='nao') {
        var gu = document.querySelector('app-modal-detalhar-equipamentos').querySelector('strong').innerHTML.split('- ')[1].split(' ')[0];
        var dados = document.getElementById('tabela_lista_de_equipes').querySelectorAll('tr');
        equipamentos = document.querySelector('app-modal-detalhar-equipamentos').querySelectorAll('div[class="modal-material-subtitulo"]');
        vtr = '';
        cam = '';
        for (let i = 0; i < dados.length; i++) {
            if(dados[i].querySelector('td') && dados[i].querySelector('td').innerHTML.includes(gu)) {
                for (let idx = 0; idx < equipamentos.length; idx++) {
                    if(equipamentos[idx].innerHTML.trim().length > 4) {
                        cam += ' - '+equipamentos[idx].innerHTML.trim();
                    } else {
                        vtr += ' - '+equipamentos[idx].innerHTML.trim();
                    }
                }

                if(cam != '') {
                    dados[i].querySelectorAll('td')[5].innerHTML = cam.substring(3,cam.length);
                    cam = '';
                }
                if (vtr != '') {
                    console.log(vtr);
                    dados[i].querySelectorAll('td')[4].innerHTML = vtr.substring(3,vtr.length);
                    vtr = '';
                }
            }
        }
        document.querySelector('app-modal-detalhar-equipamentos').querySelector('button').click();
        localStorage.setItem('lista_equipes_pronto','sim');
    }

}, 100);
