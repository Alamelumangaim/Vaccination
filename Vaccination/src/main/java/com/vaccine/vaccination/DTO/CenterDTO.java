package com.vaccine.vaccination.DTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class CenterDTO {
    private Long id;
    private String imageUrl;
    private String name;
    private String location;
}
