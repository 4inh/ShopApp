package nhlinh.shopapp.components;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import nhlinh.shopapp.utils.WebUtils;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.LocaleResolver;

import java.util.Locale;

@Component
@RequiredArgsConstructor
public class LocalizationUtils {

    private final MessageSource messageSource;
    private final LocaleResolver localeResolver;

    public String getLocalizedMessage(String messageKey, Object... params) {
        HttpServletRequest httpServletRequest = WebUtils.getCurrentRequest();
        Locale locale = localeResolver.resolveLocale(httpServletRequest);

        return messageSource.getMessage(messageKey, params, locale);

    }
}
