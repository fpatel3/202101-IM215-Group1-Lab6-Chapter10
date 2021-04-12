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
    },
    {
        id: $('#geochart'),
        site: 'https://developers.google.com/chart/'
    },
    {
        id: $('#piechart'),
        site: 'https://developers.google.com/chart/'
    },
    {
        id: $('#columnchart'),
        site: 'https://developers.google.com/chart/'
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
// Populate the Map
    google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });

        google.charts.setOnLoadCallback(drawMap);
    
        function drawMap() {
          var data = google.visualization.arrayToDataTable([
            [result]
            
          ]);
    
        var options = {
          showTooltip: true,
          showInfoWindow: true
        };
    
        var map = new google.visualization.Map(document.getElementById('chart_div'));
    
        map.draw(data, options);
      };

      //Draw Piechart

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          title: 'My Daily Activities'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }

      //Draw Column chart

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Visitations', { role: 'style' } ],
          ['2010', 10, 'color: gray'],
          ['2020', 14, 'color: #76A7FA'],
          ['2030', 16, 'opacity: 0.2'],
          ['2040', 22, 'stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF'],
          ['2050', 28, 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2']
        ]);
}