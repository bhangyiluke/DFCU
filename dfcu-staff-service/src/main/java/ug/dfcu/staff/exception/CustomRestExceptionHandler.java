package ug.dfcu.staff.exception;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.validation.method.MethodValidationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

// TODO: Handle all known types of exceptions and provide appropriate error codes
@ControllerAdvice
public class CustomRestExceptionHandler{

    // @Override
    // @ExceptionHandler({ Throwable.class })
    // protected ResponseEntity<Object> handleMethodArgumentNotValid(
    //         MethodArgumentNotValidException ex,
    //         HttpHeaders headers,
    //         HttpStatus status,
    //         WebRequest request) {
    //     List<String> errors = new ArrayList<String>();
    //     for (FieldError error : ex.getBindingResult().getFieldErrors()) {
    //         errors.add(error.getField() + ": " + error.getDefaultMessage());
    //     }
    //     for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
    //         errors.add(error.getObjectName() + ": " + error.getDefaultMessage());
    //     }

    //     ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors);
    //     return handleExceptionInternal(
    //             ex, apiError, headers, apiError.getStatus(), request);
    // }

    @ExceptionHandler(Throwable.class)
    public ResponseEntity<Object> handleAll(Exception ex, WebRequest request) {
        ApiError apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, ex.getLocalizedMessage(), ex.getMessage());
        return new ResponseEntity<Object>(apiError, null, apiError.getStatus());
    }

}
