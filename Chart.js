class Chart {
  constructor() {}
}

Chart.prototype.piePanneau = function() {
  am4core.ready(function() {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create('chartdiv', am4charts.PieChart);
    // FIXE, Déroulant, Unipole, Façade;
    // Add data
    chart.data = [
      {
        type: 'FIXE',
        litres: 501.9,
        color: am4core.color('#3333cc')
      },
      {
        type: 'Déroulant',
        litres: 301.9,
        color: am4core.color('#F1D302')
      },
      {
        type: 'Unipole',
        litres: 201.1,
        color: am4core.color('#ff0066')
      },
      {
        type: 'Façade',
        litres: 165.8,
        color: am4core.color('#800000')
      }
    ];

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'litres';
    pieSeries.dataFields.category = 'type';
    pieSeries.slices.template.propertyFields.fill = 'color';

    // pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
  }); // end am4core.ready()
};
Chart.prototype.statusChart = function() {
  am4core.ready(function() {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create('statusChart', am4charts.PieChart);

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'litres';
    pieSeries.dataFields.category = 'status';
    pieSeries.slices.template.propertyFields.fill = 'color';

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    // change the cursor on hover to make it apparent the object can be interacted with
    pieSeries.slices.template.cursorOverStyle = [
      {
        property: 'cursor',
        value: 'pointer'
      }
    ];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    var shadow = pieSeries.slices.template.filters.push(
      new am4core.DropShadowFilter()
    );
    shadow.opacity = 0;

    // Create hover state
    var hoverState = pieSeries.slices.template.states.getKey('hover'); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();

    chart.data = [
      {
        status: 'Disponible',
        litres: 501.9,
        color: am4core.color('#71C585')
      },
      {
        status: 'Reserver normale',
        litres: 165.8,
        color: am4core.color('#FFC107')
      },
      {
        status: 'Reserver bloquant',
        litres: 130.9,
        color: am4core.color('#FEB3BC')
      },
      {
        status: 'Commandé',
        litres: 128.3,
        color: am4core.color('#FD6173')
      },
      {
        status: 'Soclé',
        litres: 99,
        color: am4core.color('#9E9E9E')
      },
      {
        status: 'Mixte ',
        litres: 60,
        color: am4core.color('#A369DA')
      }
    ];
  }); // end am4core.ready()
};
Chart.prototype.columnChart = function() {
  am4core.ready(function() {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create('columnChart', am4charts.XYChart);

    // Add data
    chart.data = [
      {
        type: 'FIXE',
        visits: 15000,
        color: am4core.color('#3333cc')
      },
      {
        type: 'Déroulant',
        visits: 20000,
        color: am4core.color('#F1D302')
      },
      {
        type: 'Unipole',
        visits: 30000,
        color: am4core.color('#ff0066')
      },
      {
        type: 'Façade',
        visits: 43000,
        color: am4core.color('#800000')
      }
    ];

    // Create axes

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'type';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add('dy', function(
      dy,
      target
    ) {
      if (target.dataItem && target.dataItem.index & (2 == 2)) {
        return dy + 25;
      }
      return dy;
    });

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    var topContainer = chart.chartContainer.createChild(am4core.Container);
    topContainer.layout = 'absolute';
    topContainer.toBack();
    topContainer.paddingBottom = 15;
    topContainer.width = am4core.percent(100);

    var axisTitle = topContainer.createChild(am4core.Label);
    axisTitle.text = 'Prix en Dh';
    axisTitle.fontWeight = 600;
    axisTitle.align = 'left';
    axisTitle.paddingLeft = 10;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'visits';
    series.dataFields.categoryX = 'type';
    series.name = 'Visits';
    series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
    series.columns.template.fillOpacity = 0.8;
    series.columns.template.width = am4core.percent(40);

    series.columns.template.propertyFields.fill = 'color';
    series.columns.template.propertyFields.stroke = 'color';
    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 1;
    columnTemplate.strokeOpacity = 1;
  }); // end am4core.ready()
};
