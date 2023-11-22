package com.epitech.jobboard;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Component
public class JwtProvider {

    private final String SECRET_KEY = "YD6#HHzx7w2@d*p&xTHqe3kLBMMt7H!s63tjE!^QvQKXvLEhYR1YV%yEhZqE"; // Choisissez une
                                                                                                      // clé secrète
                                                                                                      // complexe
    private final long EXPIRATION_TIME = 604800000L; // 1 Semaine en millisecondes

    /**
     * Generate a token
     * @param email The email of the user
     * @param roles The roles of the user
     * @return The token
     */
    public String generateToken(String email, List<String> roles) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .claim("roles", roles)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    /**
     * Get the email from the token
     * @param token The token
     * @return The email
     */
    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    /**
     * Check if the token is valid
     * @param authToken The token
     * @return If the token is valid
     */
    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            System.out.println("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            System.out.println("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            System.out.println("JWT token is expired");
        } catch (UnsupportedJwtException ex) {
            System.out.println("JWT token is unsupported");
        } catch (IllegalArgumentException ex) {
            System.out.println("JWT claims string is empty");
        }
        return false;
    }

    /**
     * Retrieves the roles from the given authentication token.
     *
     * @param  authToken  the authentication token
     * @return            a list of roles extracted from the token
     */
    public List<String> getRolesFromToken(String authToken) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(authToken)
                .getBody();

        Gson gson = new Gson();
        TypeToken<List<String>> typeToken = new TypeToken<List<String>>() {
        };
        return gson.fromJson(gson.toJson(claims.get("roles")), typeToken.getType());
    }

}
