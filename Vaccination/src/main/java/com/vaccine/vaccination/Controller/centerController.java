package com.vaccine.vaccination.Controller;

import com.vaccine.vaccination.DTO.*;
import com.vaccine.vaccination.Message.LoginResponse;
import com.vaccine.vaccination.Message.RegisterResponse;
import com.vaccine.vaccination.Model.*;
import com.vaccine.vaccination.Service.CenterService;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Timer;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/vaccine")
public class centerController {
    @Autowired
    private final CenterService centerService;
    @PostMapping("center")
    public ResponseEntity<Centers> postCenter(@RequestBody CenterDTO centerDTO){
        Centers centers = centerService.postCenter(centerDTO);
        return new ResponseEntity<>( centers, HttpStatus.CREATED );
    }
    @GetMapping("getCenter")
    public ResponseEntity<List<Centers>> getCenters(){
        List<Centers> centers = centerService.getCenter();
        return new ResponseEntity<>( centers,HttpStatus.OK );
    }
    @GetMapping("getCenterById/{id}")
    public ResponseEntity<Centers> getCenterById(@PathVariable("id") Long id){
        Centers centers = centerService.getCenterById(id);
        return new ResponseEntity<>( centers,HttpStatus.OK );
    }
    @PostMapping("register")
    public ResponseEntity<RegisterResponse> registerUser(@RequestBody RegisterDTO registerDTO){
        RegisterResponse register = centerService.registerUser(registerDTO);
        return new ResponseEntity<>( register,HttpStatus.CREATED );
    }
    @PostMapping("login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO){
        LoginResponse msg = centerService.loginUser(loginDTO);
        return new ResponseEntity<>( msg,HttpStatus.OK );
    }
    @PostMapping("book")
    public ResponseEntity<Test> bookAppointment(@RequestBody testDTO bookingDTO){
        Test book = centerService.bookAppointment( bookingDTO);
        return new ResponseEntity<>( book,HttpStatus.CREATED );
    }
    @PostMapping("bookAppointment/{name}")
    public ResponseEntity<BookAppointment> book(@PathVariable("name") String name,@RequestBody BookAppointmentDTO bookAppointmentDTO){
        System.out.println(name);
        BookAppointment booking = centerService.book(bookAppointmentDTO,name);

        return new ResponseEntity<>( booking,HttpStatus.CREATED );
    }
    @GetMapping("getHistory")
    public ResponseEntity<List<BookAppointment>> getHistory(){
        List<BookAppointment> appointments = centerService.getHistory();
        return new ResponseEntity<>( appointments,HttpStatus.OK );
    }
    @PutMapping("updateCenter")
    public ResponseEntity<Centers> updateCenter(@RequestBody CenterDTO centerDTO){
        Centers center = centerService.updateCenter(centerDTO);
        return new ResponseEntity<>( center,HttpStatus.OK );
    }
    @PostMapping("date")
    public ResponseEntity<Availabledates> addDate(@RequestBody Availabledates availabledates){
        Availabledates dates = centerService.addDate(availabledates);
        return new ResponseEntity<>( dates,HttpStatus.CREATED );
    }
    @GetMapping("getDates")
    public ResponseEntity<List<Availabledates>> getDate(){
        List<Availabledates> dates = centerService.getDates();
        return new ResponseEntity<>( dates,HttpStatus.OK );
    }

    @PostMapping("timeslot")
    public ResponseEntity<TImeSlot> addSlot(@RequestBody TImeSlot tImeSlot){
        TImeSlot slot = centerService.addSlot(tImeSlot);
        return new ResponseEntity<>( slot,HttpStatus.CREATED );
    }

    @GetMapping("getTime")
    public ResponseEntity<List<TImeSlot>> getSlot(){
        List<TImeSlot> slot = centerService.getSlot();
        return new ResponseEntity<>( slot,HttpStatus.OK );
    }

    @PostMapping("bookslot/{name}/{date}/{time}")
    public ResponseEntity<?> bookSlot(@PathVariable("name") String name,
                                                @PathVariable("date") String date,
                                                @PathVariable("time") String time,
                                                @RequestBody SlotBookingDTO slotBookingDTO){
          RegisterResponse slotBooking = centerService.bookSlot(name,date,time,slotBookingDTO );
          return new ResponseEntity<>( slotBooking,HttpStatus.CREATED );
    }

    @GetMapping("getSlots")
    public ResponseEntity<List<SlotBooking>> getSlots(){
        List<SlotBooking> slot = centerService.getSlots();
        return new ResponseEntity<>( slot,HttpStatus.OK );
    }



}
