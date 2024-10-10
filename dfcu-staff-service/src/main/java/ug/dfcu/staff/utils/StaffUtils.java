package ug.dfcu.staff.utils;

import java.util.Random;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class StaffUtils {
    public static <T> T applyPatch(T patch, T target)
            throws IllegalArgumentException, JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        // JsonNode patched=patch.apply(mapper.convertValue(target, JsonNode.class));
        return (T)mapper.updateValue(target, patch);
    }

    public static String randomAlphanumeric(Integer length) {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        Random random = new Random();
        // Generate the code but filter out special characters between 65 and 90
        String code = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(length)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        return code;
    }
}
