/* JS */

function dateMask(inputData, e){
  if(document.all) // Internet Explorer
    var tecla = event.keyCode;
  else //Outros Browsers
    var tecla = e.which;

  if(tecla >= 47 && tecla < 58){ // numeros de 0 a 9 e "/"
    data = inputData.value;
    if (data.length == 2 || data.length == 5){
      data += '/';
      inputData.value = data;
    }
  } else if(tecla == 8 || tecla == 0) // Backspace, Delete e setas direcionais(para mover o cursor, apenas para FF)
      return data;
    else
      return false;
}

$(document).ready(function() {

    tipo = "";
    $("#btInsere").click(function() {
        $("#form")[0].reset();
        $("#modalInsere").modal("show");
        tipo = $(this).data("tipo");
    });

    $("#btAdd").click(function() {
        var nome    = $("#txtNome").val();
        var materia    = $("#txtMateria").val();
        var dataInicial = $("#txtDataInicial").val();
        var dataFinal = $("#txtDataFinal").val();



        cont = $("#tabela tbody tr").length + 1;

        if(nome=="" || materia=="" || dataInicial=="" || dataFinal=="") {
            bootbox.alert("Ops... Algum campo está em branco");
            return;
        } else {
            if(tipo == "N") {
                //insere nova linha
                bloco  = "<tr>";
                // bloco += "<td class='text-center'>" + cont + "</td>";
                bloco += "<td>" + nome + "</td>";
                bloco += "<td class='text-sucess'> Pendente </td>";
                bloco += "<td>" + materia + "</td>";
                bloco += "<td>" + dataInicial + "</td>";
                bloco += "<td>" + dataFinal + "</td>";
                bloco += "<td class='text-right'>";
                bloco += "  <button class='btn btn-info btn-sm btEdit' data-tipo='E'>";
                bloco += "      <i class='fa fa-edit'></i>";
                bloco += "  </button>";
                bloco += "</td>";
                bloco += "<td class='text-right'>";
                bloco += "  <button class='btn btn-danger btn-sm btApaga'>";
                bloco += "      <i class='fa fa-times'></i>";
                bloco += "  </button>";
                bloco += "</td>";
                bloco += "</tr>";

                $("#tabela tbody").append(bloco);
            } else {
                //edita
                linha = $("#tabela tbody").find(".marcar");
                linha.find("td:eq(1)").html(nome);
                linha.find("td:eq(2)").html(materia);
                linha.find("td:eq(3)").html(dataInicial);
                linha.find("td:eq(4)").html(dataFinal);

                $(".marcar").removeClass("marcar");
            }
            $("#btCalcula").trigger("click");
            $("#modalInsere").modal("hide");
        }
    });

    $(document).on("click",".btApaga",function() {
        /*
        if(confirm("Deseja realmente apagar o registro?")) {
            $(this).closest("tr").remove();
        }
        */
        $(this).closest("tr").addClass("apagar");

        bootbox.confirm({
            message: "Deseja <strong>REALMENTE</strong> apagar essa linha?",
            buttons: {
                confirm: {
                    label: 'SIM',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'NÃO',
                    className: 'btn-danger'
                }
            },
            size: 'small',
            callback: function (result) {
                if(result) {
                    $(".apagar").remove();
                }
            }
        });
    });

    $(document).on("click",".btEdit",function() {
        var el  = $(this).closest("tr");
        el.addClass("marcar");
        $("modal-title").val("Editar tarefa")
        nome    = el.find("td:eq(1)").html();
        materia    = el.find("td:eq(2)").html();
        dataInicial = el.find("td:eq(3)").html();
        dataFinal = el.find("td:eq(4)").html();

        $("#txtNome").val(nome);
        $("#txtMateria").val(materia);
        $("#txtDataInicial").val(dataInicial);
        $("#txtDataFinal").val(dataFinal);

        tipo = $(this).data("tipo");

        $("#modalInsere").modal("show");
    });

})
