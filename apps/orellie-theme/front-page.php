<?php
/**
 * Orellie Theme — Front Page (Homepage)
 *
 * Recreates the Next.js landing page design as a WordPress template.
 *
 * @package Orellie
 */

get_header();
?>

<!-- ═══════════════════════════════════════════════
     HERO SECTION
     ═══════════════════════════════════════════════ -->
<section class="hero">
  <div class="hero__blob"></div>
  <div class="container">
    <!-- Text Content -->
    <div class="hero__content">
      <div class="badge hero__badge animate-fadeInUp">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
        The Aura Collection
      </div>

      <h1 class="animate-fadeInUp animate-fadeInUp-delay-1">
        Express your inner <br>
        <span class="accent">radiance.</span>
      </h1>

      <p class="hero__desc animate-fadeInUp animate-fadeInUp-delay-2">
        Handcrafted luxury earrings designed to turn heads without weighing you down. Experience the perfect blend of bold aesthetics and delicate craftsmanship.
      </p>

      <div class="hero__buttons animate-fadeInUp animate-fadeInUp-delay-3">
        <?php if ( class_exists( 'WooCommerce' ) ) : ?>
          <a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="btn btn-primary btn-lg">
            Shop the Collection
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        <?php endif; ?>
        <a href="#features" class="btn btn-outline btn-lg">Explore Styles</a>
      </div>
    </div>

    <!-- Hero Image -->
    <div class="hero__image animate-fadeInUp animate-fadeInUp-delay-4">
      <img
        src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero-model.png' ); ?>"
        alt="Model wearing Orellie earrings"
        loading="eager"
      >
      <div class="hero__image-overlay"></div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════
     FEATURES SECTION
     ═══════════════════════════════════════════════ -->
<section class="features" id="features">
  <div class="container">
    <!-- Image -->
    <div class="features__image">
      <div class="features__image-wrap">
        <img
          src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/scroll-model.png' ); ?>"
          alt="Model wearing delicate handmade pink earrings"
          loading="lazy"
        >
      </div>
    </div>

    <!-- Feature List -->
    <div class="features__list">
      <div class="feature-item">
        <div class="feature-number">01</div>
        <div>
          <h3>Handmade purely from affection.</h3>
          <p>Every piece is thoughtfully designed and created by hand in our studio. We believe in the slow craft of making things that last.</p>
        </div>
      </div>

      <div class="feature-item">
        <div class="feature-number">02</div>
        <div>
          <h3>Incredibly lightweight.</h3>
          <p>We use premium polymer clay designed to be so light, you'll forget you're wearing them. Statement earrings that don't weigh you down.</p>
        </div>
      </div>

      <div class="feature-item">
        <div class="feature-number">03</div>
        <div>
          <h3>Hypoallergenic fittings.</h3>
          <p>Your comfort is our priority. We exclusively use surgical steel and titanium posts, safe for even the most sensitive ears.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════
     SIGNATURE PRODUCT GRID
     ═══════════════════════════════════════════════ -->
<section class="signature-grid">
  <div class="container">
    <div class="signature-grid__header">
      <div>
        <h2>Curated Signatures</h2>
        <p>Explore our most beloved handcrafted designs, shaped by intuition and defined by elegance.</p>
      </div>
      <?php if ( class_exists( 'WooCommerce' ) ) : ?>
        <a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="view-all-desktop">
          View full collection
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      <?php endif; ?>
    </div>

    <?php if ( class_exists( 'WooCommerce' ) ) : ?>
      <?php
      // Pull latest 9 products
      $args = array(
        'post_type'      => 'product',
        'posts_per_page' => 9,
        'post_status'    => 'publish',
        'orderby'        => 'date',
        'order'          => 'DESC',
      );
      $products = new WP_Query( $args );

      if ( $products->have_posts() ) :
      ?>
        <div class="product-grid">
          <?php while ( $products->have_posts() ) : $products->the_post(); ?>
            <?php global $product; ?>
            <a href="<?php the_permalink(); ?>" class="product-card">
              <div class="product-card__image">
                <?php if ( has_post_thumbnail() ) : ?>
                  <?php the_post_thumbnail( 'woocommerce_thumbnail' ); ?>
                <?php endif; ?>

                <?php if ( $product->is_on_sale() ) : ?>
                  <div class="product-card__badges">
                    <span class="product-badge product-badge--sale">Sale</span>
                  </div>
                <?php endif; ?>

                <div class="product-card__quickview">
                  <span>View Details →</span>
                </div>
              </div>

              <div class="product-card__info">
                <div>
                  <div class="product-card__name"><?php the_title(); ?></div>
                  <div class="product-card__category">
                    <?php
                    $cats = wp_get_post_terms( get_the_ID(), 'product_cat' );
                    echo ! empty( $cats ) ? esc_html( $cats[0]->name ) : 'Handcrafted';
                    ?>
                  </div>
                </div>
                <div>
                  <div class="product-card__price"><?php echo $product->get_price_html(); ?></div>
                </div>
              </div>
            </a>
          <?php endwhile; ?>
        </div>
        <?php wp_reset_postdata(); ?>
      <?php else : ?>
        <!-- Fallback static grid when no products exist yet -->
        <div class="product-grid">
          <?php
          $placeholders = array(
            array( 'name' => 'Celestial Aura Drops', 'price' => '$65.00', 'img' => 'signature/Woman_revealing_earring_202604131110.jpeg' ),
            array( 'name' => 'Rose Petal studs',      'price' => '$55.00', 'img' => 'signature/Model_wearing_earring_202604131109.jpeg' ),
            array( 'name' => 'Gilded Blossom set',    'price' => '$85.00', 'img' => 'signature/Earrings_with_matching_202604131110.jpeg' ),
            array( 'name' => 'Signature Pearline',    'price' => '$75.00', 'img' => 'signature/Earrings_with_matching_202604131110 (1).jpeg' ),
            array( 'name' => 'Artisan Curve',         'price' => '$95.00', 'img' => 'signature/Place_earring_onto_202604131109.jpeg' ),
            array( 'name' => 'Ethereal 40mm Dangles', 'price' => '$80.00', 'img' => 'signature/Earring_height_40mm_202604131110.jpeg' ),
            array( 'name' => 'Minimal 31mm Studs',    'price' => '$45.00', 'img' => 'signature/Earring_height_31_202604131110.jpeg' ),
            array( 'name' => 'Classic 14mm Studs',    'price' => '$40.00', 'img' => 'signature/Stud_earrings_14mm_202604131110.jpeg' ),
            array( 'name' => 'Geometric Precision',   'price' => '$110.00', 'img' => 'signature/Stud_earring_diameter_202604131110.jpeg' ),
          );
          foreach ( $placeholders as $item ) :
          ?>
            <div class="product-card">
              <div class="product-card__image">
                <img
                  src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/' . $item['img'] ); ?>"
                  alt="<?php echo esc_attr( $item['name'] ); ?>"
                  loading="lazy"
                >
                <div class="product-card__quickview">
                  <span>View Details →</span>
                </div>
              </div>
              <div class="product-card__info">
                <div>
                  <div class="product-card__name"><?php echo esc_html( $item['name'] ); ?></div>
                  <div class="product-card__category">Handcrafted</div>
                </div>
                <div class="product-card__price"><?php echo esc_html( $item['price'] ); ?></div>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    <?php endif; ?>

    <div class="signature-grid__mobile-cta">
      <?php if ( class_exists( 'WooCommerce' ) ) : ?>
        <a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="btn btn-outline">
          View full collection
        </a>
      <?php endif; ?>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════
     TRUST SIGNALS
     ═══════════════════════════════════════════════ -->
<section class="cta-banner">
  <div class="container">
    <div class="trust-signals" style="margin-bottom: 3rem;">
      <span>🇳🇿 Made in New Zealand</span>
      <span>💎 Hypoallergenic fittings</span>
      <span>📦 Free NZ shipping over $80</span>
      <span>✨ Gift packaging included</span>
    </div>

    <h2>Not sure where to start?</h2>
    <p>Take our style quiz and we'll recommend the perfect Orellie piece for you.</p>
    <a href="#" class="btn btn-outline btn-lg">
      Take the Style Quiz
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    </a>
  </div>
</section>

<?php get_footer(); ?>
