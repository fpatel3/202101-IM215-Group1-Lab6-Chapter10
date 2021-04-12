// populating the lists from their respective URL's provided
sites = [
    {   
        id: $('#filterCountry'),
        site: 'http://randyconnolly.com/funwebdev/services/visits/countries.php?continent=EU'
        
    },
    {
        id: $('#filterBrowser'),
        site: 'http://randyconnolly.com/funwebdev/services/visits/browsers.php'
        
    },
    {
        id: $('#filterOS'),
        site: 'http://randyconnolly.com/funwebdev/services/visits/os.php'   
    }
]

// populating the list in the table
$.get('http://randyconnolly.com/funwebdev/services/visits/visits.php?continent=EU&month=1&limit=100').done(list => {
    populateListTable(list);
    filterTable(list);
});

for (var i = 0; i < sites.length; i++) {
    populateListFilters(sites[i].site, sites[i].id);
}


function populateListFilters(url, id) {
    return $.get(url).done(list => {
        getList(list, id);
    });
}

function getList(list, id) {
    var temp = '';
    list.forEach(element => {
        temp += `<option value='${element.id || element.iso}'> ${element.name} </option>`;
    });
    id.append(temp);
}


function populateListTable(list) {
    var html = '';
    list.forEach(el => {
        html += `<tr><td>${el.id}</td><td>${el.visit_date}</td><td>${el.country}</td><td>${el.browser}</td><td>${el.operatingSystem}</td></tr>`;
    });
    $('#visitsBody').html(html);
}

// filter the table based on events
const filterTable = (list) => {
    var filterList = {};
    const entries = {'filterCountry': 'country_code', 'filterBrowser': 'browser_id', 'filterOS': 'os_id'};
    $('#filterCountry,#filterBrowser,#filterOS').on('change', (e) => {
        var entry = entries[e.target.id];
        (e.target.value == 0) ? delete filterList[entry] : filterList[entry] = e.target.value;
        if (Object.keys(filterList).length == 0) populateListTable(list);
        var current = $.grep(list, (el, i) => {
            var result = true;
            Object.keys(filterList).forEach(e => {
                if (el[e] !== filterList[e]) {
                    result = false;
                }
            });
            return result;
        });
        populateListTable(current);
    });

}