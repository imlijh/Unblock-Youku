/*
 * Generate Switchy Omega rule list.
 *
 * @author        k. Lee
 * @created       2017-11-14
 * @last-modified 2018-03-21
 */

const execSync = require('child_process').execSync;

(function() {
    "use strict";

    var shared_urls = require('./urls');

    var squid_regex_list = shared_urls.regex_crx_urls;
    var i, single_str;

    var regex_to_extract_https_domain = /^\^https:\\\/\\\/([^:]+)\\\//i;

    var regex_str_list = [];
    for (i = 0; i < squid_regex_list.length; i++) {
        single_str = squid_regex_list[i].toString();
        single_str = single_str.substring(1, single_str.length - 2);

        if (single_str.match(regex_to_extract_https_domain)) {
            single_str = single_str.match(regex_to_extract_https_domain)[0];
        }

        regex_str_list.push(single_str);
    }

    console.log("[SwitchyOmega Conditions]");
    console.log("; Require: SwitchyOmega >= 2.3.2");
    console.log("; Date: " + new Date().toLocaleDateString());
    console.log("; Generated using uku/Unblock-Youku's chrome proxy url list:");
    // print hash for the git HEAD
    execSync('git show HEAD --format=format:"; on commit %h" --no-patch', { stdio: 'inherit' });
    console.log();
    console.log();
    for (var i = 0; i < regex_str_list.length; i++) {
        console.log("UrlRegex: " + regex_str_list[i]);
    }
}());
