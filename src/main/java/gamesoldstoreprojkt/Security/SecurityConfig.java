package gamesoldstoreprojkt.Security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/* Security configuration class. Here we store every configuration that we need, disable basic Spring Security default configurations and set up our own. */
@Configuration
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer{

    @Autowired
    private SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        /* Here we disable csrf, set up our authentication as stateless, define requests that only admins can access, add our corsfilters and only after that we build
         * our object.
         */
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                  .authorizeHttpRequests(authorize -> authorize
                    .requestMatchers(HttpMethod.POST, "auth/login").permitAll() /* Login request can be made by any */
                    .requestMatchers(HttpMethod.POST, "users/addClient").permitAll() /* New user of type client request can be made by any */
                    .requestMatchers(HttpMethod.POST, "/orders").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PUT, "/orders").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/orders").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.POST, "/games").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PUT, "/games").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/games").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.POST, "/users").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PUT, "/users").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/users").hasRole("ADMIN")  
                    .anyRequest().authenticated()
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class) /* Add filter to make necessary verifications based on token information */
                .build();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry
        .addMapping("/**")
        .allowedMethods("GET", "POST", "PUT", "DELETE")
        .allowedOrigins("http://localhost:4200/");
    }

    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    /* This method is responsible for returning of an instance of Spring Security's Authentication Manager for usage on our application.
     * The Bean annotation is required so that Spring can perform dependency injection.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    /* This method is responsible for returning a BCryptPasswordEncoder for password hashing before database insertion. */
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
