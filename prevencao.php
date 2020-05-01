<?php
/*
Template Name: prevencao
*/
?>
<!DOCTYPE html>
<html>

<head>
    <?php get_header(); ?>
    <script type='text/javascript' src='https://platform-api.sharethis.com/js/sharethis.js#property=5ea45de781693d0012e589ac&product=inline-share-buttons' async='async'></script>
    <link href="https://fonts.googleapis.com/css?family=Abel&display=swap" rel="stylesheet">
</head>
<body class="page-template-default page page-id-22">
    <div id="page" class="site">
        <?php include_once('navbar.php') ?>
        <div id="content" class="site-content">
            <?php
                $args = array(
                'cat' => 2
                );
            ?>

            <?php
            $wp_query = new WP_Query($args);
            if ($wp_query->have_posts()) :
                while ($wp_query->have_posts()) : $wp_query->the_post();
                    echo the_content();
                endwhile;
            endif;

                ?>
        </div><!-- #content -->
        <p style="margin-top: 50px; text-align: center">Origem dos dados: <a href="https://github.com/CSSEGISandData/COVID-19">John Hopkins CSSE</a></p>
    </div><!-- #page -->
    <footer>
        <?php get_footer(); ?>
    </footer>

</body>

</html>