package com.vaccine.vaccination.Message;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class LoginResponse {
    private String message;
    private Boolean status;
    private String email;
    private String role;
}
