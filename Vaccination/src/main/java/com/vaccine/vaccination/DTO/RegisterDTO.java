package com.vaccine.vaccination.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RegisterDTO {
    private Long id;
    private String name;
    private String email;
    private String password;


}
