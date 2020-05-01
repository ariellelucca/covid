<?php
date_default_timezone_set('America/Sao_Paulo');
?>
<!DOCTYPE html>
<html>

<head>
    <?php get_header(); ?>
    <script type='text/javascript' src='https://platform-api.sharethis.com/js/sharethis.js#property=5ea45de781693d0012e589ac&product=inline-share-buttons' async='async'></script>
    <link href="https://fonts.googleapis.com/css?family=Abel&display=swap" rel="stylesheet">
</head>

<div id="splash">
    <img src="//coronavirusbrasil2020.com/wp-content/uploads/loading.gif" class="loading">
    <p style="margin-top: 15px" style="color: #0a1b1f"><strong>Aguarde um momento enquanto o gráfico é carregado</strong></p>
</div>

<body class="page-template-default page page-id-22">
    <div id="page" class="site">
        <?php include_once('navbar.php') ?>
        <div id="content" class="site-content">
            <section class="wp-bp-full-page-header">
                <div class="page-header-overlay">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-12 text-center" style="margin-top: 20px">
                                <h2><strong>Brasil</strong></h2>
                                <h4 id="dayOneBrz">Primeiro dia com confirmados oficialmente: 25/01/2020</h4>
                                <div class="row" style="margin-bottom: 20px">
                                    <input type="hidden" id="active_brazil_val" style="display: none">
                                    <input type="hidden" id="recovered_brazil_val" style="display: none">
                                    <input type="hidden" id="deaths_brazil_val" style="display: none">

                                    <div class="col-sm-4 block_topo" style="background-color: #ffe9e9; margin-bottom: 20px">
                                        <h4>Confirmados</h4>
                                        <h2 id="active_brazil"></h2>
                                    </div>
                                    <div class="col-sm-4 block_topo" style="background-color: #87e7524a; margin-bottom: 20px">
                                        <h4>Recuperados</h4>
                                        <h2 id="recovered_brazil"></h2>
                                    </div>
                                    <div class="col-sm-4 block_topo" style="background-color: #4a4a4a61; margin-bottom: 20px">
                                        <h4>Mortes</h4>
                                        <h2 id="deaths_brazil"></h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="row">
                <div class="container-fluid">
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <section class="row">
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 block_chart">
                                <h5><strong>Confirmados </strong>Brasil</h5>
                                <p><strong>A partir do primeiro dia com casos positivos</strong></p>
                                <canvas id="chartTotalBrazil"></canvas>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 block_chart">
                                <h3>Quais os sintomas?</h3>
                                <p>Alguns dos sintomas podem confundir com outras doenças simples, mas fique atento:</p>
                                <ul>
                                    <li>Febre</li>
                                    <li>Tosse</li>
                                    <li>Fadiga</li>
                                    <li>Dor de cabeça</li>
                                    <li>Catarro</li>
                                    <li>Diarréia</li>
                                    <li>Falta de ar</li>
                                    <li>Dor de garganta</li>
                                </ul>
                                <p>Há casos em que a pessoa é assintomática, portanto evite quaisquer riscos desnecessários e proteja-se!</p>
                            </div>
                        </section>
                        <hr>
                        <section class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12">
                                <section class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 block_chart">
                                        <h3>Saiba como proteger você e seus familiares</h3>
                                        <p>Fique atento aos cuidados abaixo para evitar o contágio e propagação do vírus:</p>
                                        <ul>
                                            <li>Lave as mãos frequentemente com água e sabão por um período mínimo de 20 segundos, limpando, inclusive, embaixo das unhas. Também pode ser feita a higienização com álcool em gel;</li>
                                            <li>Caso precise tossir ou espirrar, cubra o nariz e a boca com a parte interna do cotovelo ou com um lenço;</li>
                                            <li>Mantenha distância de segurança das outras pessoas. Essa distância deve ser de um metro em situações normais e, em torno de oito metros em caso de atividades físicas;</li>
                                            <li>Caso apresente algum sintoma da doença, evite contato com outras pessoas. Caso outras pessoas morem junto na mesma casa, evite compartilhar itens de higiene, talheres, toalhas e outros;</li>
                                            <li>Evite tocar os olhos e boca antes de fazer a higienização das mãos;</li>
                                            <li>Pessoas idosas devem evitar, ainda mais, sair de casa. Se possível, se ofereça para ir ao mercados e à farmácia para elas.</li>
                                            <li>Sempre que sair, <strong>use máscara</strong></li>
                                        </ul>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 block_chart">
                                        <h5><strong>Recuperados </strong>Brasil</h5>
                                        <p><strong>A partir do primeiro dia com casos positivos</strong></p>
                                        <canvas id="chartRecoveryBrazil"></canvas>
                                    </div>
                                </section>
                            </div>
                        </section>
                    </div>
            </section>
            <hr style="border-top: 2px solid rgba(0,0,0,.1)">
            <div class="container-fluid">
                <div class="row">
                    <div id="adsBlock" class="col-xs-12 col-sm-12 col-md-2 col-lg-2"></div>
                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                        <main id="main">
                            <div class="row" style="margin-bottom: 30px">
                                <!-- CONFIRMADOS -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 block_chart_0">
                                    <h5><strong>Confirmados </strong>Brasil x EUA x Itália x China</h5>
                                    <p><strong>A partir do primeiro dia com casos positivos no Brasil</strong></p>
                                    <canvas id="chartTotal"></canvas>
                                    <hr>
                                </div>
                                
                                <!-- RECUPERADOS -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 block_chart_0">
                                    <h5><strong>Recuperados </strong>Brasil x EUA x Itália x China</h5>
                                    <p><strong>A partir do primeiro dia com casos positivos no Brasil</strong></p>
                                    <canvas id="chartRecovery"></canvas>
                                    <hr>
                                </div>

                                <!-- CONFIRMADOS 14 DIAS -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 block_chart_0">
                                    <h5><strong>Confirmados Brasil - Últimos 14 dias</strong></h5>
                                    <canvas id="chartlast14DaysConfirmedBrazil" style=" margin-bottom: 20px"></canvas>
                                    <hr>
                                </div>

                                <!-- RECUPERADOS 14 DIAS -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 block_chart_0">
                                    <h5><strong>Recuperados Brasil - Últimos 14 dias</strong></h5>
                                    <canvas id="chartlast14DaysRecoveryBrazil" style=" margin-bottom: 20px"></canvas>
                                    <hr>
                                </div>
                                
                                <!-- MORTES 14 DIAS -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 block_chart_0">
                                    <h5><strong>Mortes Brasil - Últimos 14 dias</strong></h5>
                                    <canvas id="chartlast14DaysDeathBrazil" style=" margin-bottom: 20px"></canvas>
                                    <hr>
                                </div>

                                <!-- CONFIRMADOS 14 DIAS -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 block_chart_0">
                                    <h5><strong>Confirmados Brasil - Diário</strong></h5>
                                    <canvas id="chartlast13DaysConfBrazil" style=" margin-bottom: 20px"></canvas>
                                    <hr>
                                </div>

                                <!-- RECUPERADOS 14 DIAS -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 block_chart_0">
                                    <h5><strong>Recuperados Brasil - Diário</strong></h5>
                                    <canvas id="chartlast13DaysRecovBrazil" style=" margin-bottom: 20px"></canvas>
                                    <hr>
                                </div>

                                <!-- MORTES 14 DIAS -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 block_chart_0">
                                    <h5><strong>Mortes Brasil - Diário</strong></h5>
                                    <canvas id="chartlast13DaysDeathBrazil" style=" margin-bottom: 20px"></canvas>
                                </div>

                                <!-- CONFIRMADO RECUPERADO 14 DIAS BRASIL -->
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 block_chart_0">
                                    <h5><strong>Confirmado x Recuperado Brasil - Diário</strong></h5>
                                    <canvas id="chartConfRecovBrazil14d" style=" margin-bottom: 20px"></canvas>
                                </div>
                            </div> <!-- /.col-md-8 -->

                            <p style="margin-top: 50px; text-align: center">Origem dos dados: <a href="https://github.com/CSSEGISandData/COVID-19">John Hopkins CSSE</a></p>
                            <p style="width: 100%; text-align: center;"><small style="margin: auto;">A data pode estar adiantada ou atrasada devido ao fuso horário, o que não altera os resultados</small></p>
                            <p style="width: 100%; text-align: center;"><small style="margin: auto;">Não possuimos responsabilidade sobre as quantidades informadas, os mesmos são originados de bases de dados de terceiros.</small></p>
                        </main>
                    </div>
                    <div id="adsBlock" class="col-xs-12 col-sm-12 col-md-10 col-lg-2"></div>
                </div>
            </div> <!-- /.container -->
        </div><!-- #content -->

    </div><!-- #page -->
    <footer>
        <?php get_footer(); ?>
    </footer>
    <script src="<?php echo get_template_directory_uri() ?>/assets/js/covid.js"></script>

</body>

</html>