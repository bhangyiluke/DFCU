package ug.dfcu.staff.utils;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Properties;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.enhanced.SequenceStyleGenerator;

import org.hibernate.MappingException;
import org.hibernate.internal.util.config.ConfigurationHelper;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.type.Type;
import org.hibernate.type.descriptor.java.spi.JavaTypeBasicAdaptor;
import org.hibernate.type.descriptor.jdbc.NumericJdbcType;
import org.hibernate.type.internal.NamedBasicTypeImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DatePrefixedSequenceIdGenerator extends SequenceStyleGenerator {
    private static final Logger logger = LoggerFactory.getLogger(DatePrefixedSequenceIdGenerator.class);
    public static final String DATE_FORMAT_PARAMETER = "dateFormat";
    public static final String DATE_FORMAT_DEFAULT = "%tY";

    public static final String NUMBER_FORMAT_PARAMETER = "numberFormat";
    public static final String NUMBER_FORMAT_DEFAULT = "%6d";

    public static final String DATE_NUMBER_SEPARATOR_PARAMETER = "dateNumberSeparator";
    public static final String DATE_NUMBER_SEPARATOR_DEFAULT = "-";

    private String format;

    @Override
//     @Transactional(propagation = Propagation.REQUIRES_NEW, readOnly = true)
//     @Transactional
    public Serializable generate(SharedSessionContractImplementor session,
            Object object) throws HibernateException {
        String val = String.format(this.format, LocalDate.now(), super.generate(session, object)).replace(" ", "0");
        // logger.info("The resulting value: " + val);
        return Long.valueOf(val);
    }

    @Override
    public void configure(Type type, Properties params,
            ServiceRegistry serviceRegistry) throws MappingException {
        super.configure(
                new NamedBasicTypeImpl<>(new JavaTypeBasicAdaptor<>(Long.class), NumericJdbcType.INSTANCE, "long"),
                params, serviceRegistry);

        String dateFormat = ConfigurationHelper.getString(DATE_FORMAT_PARAMETER, params, DATE_FORMAT_DEFAULT)
                .replace("%", "%1");
        String numberFormat = ConfigurationHelper.getString(NUMBER_FORMAT_PARAMETER, params, NUMBER_FORMAT_DEFAULT);
        String dateNumberSeparator = ConfigurationHelper.getString(DATE_NUMBER_SEPARATOR_PARAMETER, params,
                DATE_NUMBER_SEPARATOR_DEFAULT);
        this.format = dateFormat + dateNumberSeparator + numberFormat;
        // logger.info("The resulting format: " + this.format);
    }
}
