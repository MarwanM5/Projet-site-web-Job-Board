package com.epitech.jobboard;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import net.sf.log4jdbc.sql.jdbcapi.DataSourceSpy;

@Configuration
@EnableJpaRepositories("com.epitech.jobboard.Repository")
@EntityScan("com.epitech.jobboard.Entities")
@EnableTransactionManagement
public class AppConfig {

    /**
     * A description of the entire Java function.
     *
     * @param  properties   description of parameter
     * @return              description of return value
     */
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    DataSource realDataSource(DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().build();
    }

    /**
     * A description of the entire Java function.
     *
     * @param  dataSource  description of parameter
     * @return             description of return value
     */
    @Bean
    @Primary
    DataSource dataSource(DataSource dataSource) {
        return new DataSourceSpy(dataSource);
    }
}