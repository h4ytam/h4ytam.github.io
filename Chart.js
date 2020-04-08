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
        color: am4core.color('#e60073')
      },
      {
        type: 'Déroulant',
        litres: 301.9,
        color: am4core.color('#751aff')
      },
      {
        type: 'Unipole',
        litres: 201.1,
        color: am4core.color('#993366')
      },
      {
        type: 'Façade',
        litres: 165.8,
        color: am4core.color('#bf4040')
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
        status: 'Réservé normal',
        litres: 165.8,
        color: am4core.color('#FFC107')
      },
      {
        status: 'Réservé bloquant',
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
        color: am4core.color('#e60073')
      },
      {
        type: 'Déroulant',
        visits: 20000,
        color: am4core.color('#751aff')
      },
      {
        type: 'Unipole',
        visits: 30000,
        color: am4core.color('#993366')
      },
      {
        type: 'Façade',
        visits: 43000,
        color: am4core.color('#bf4040')
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
Chart.prototype.ChiffreDaffaire=function(){

  am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("evolutionChart", am4charts.XYChart);

    // Add data
    chart.data = generatechartData();
    function generatechartData() {
      var chartData = [];
      var firstDate = new Date();
      firstDate.setDate( firstDate.getDate() - 150 );
      var visits = 4000;
      var b = 0.6;
      for ( var i = 0; i < 150; i++ ) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        var newDate = new Date( firstDate );
        newDate.setDate( newDate.getDate() + i );
        if(i > 80){
            b = 0.4;
        }
        visits +=  Math.round( Math.random() * ( 40 + i ) ) + 100 + i;
//  Math.round((Math.random()<b?1:-1)*Math.random()*10);
        chartData.push( {
          date: newDate,
          visits: visits
        } );
      }
      return chartData;
    }

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.5;


    // Create value axis
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
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.dateX = "date";
    series.strokeWidth = 3;
    series.tooltipText = "{valueY.value}";
    series.fillOpacity = 0.1;
    series.stroke =  am4core.color("#00b3b3");
    series.fill =  am4core.color("#00b3b3");


    // Create a range to change stroke for values below 0
    var range = valueAxis.createSeriesRange(series);
    range.value = 0;
    range.endValue = -1000;
    range.contents.stroke = chart.colors.getIndex(4);
    range.contents.fill = '#00b3b3';
    range.contents.strokeOpacity = 0.7;
    range.contents.fillOpacity = 0.1;
    range.contents.stroke = '#0352b5';

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.scrollbarX = new am4core.Scrollbar();
    chart.cursor.lineY.stroke = am4core.color("#00b3b3");
    chart.zoomOutButton.background.fill = am4core.color("#00b3b3");
    chart.zoomOutButton.background.states.getKey("hover").properties.fill = am4core.color("#00cccc");
    chart.zoomOutButton.background.states.getKey("down").properties.fill = am4core.color("#00cccc");

    // axis tooltip
    let axisTooltip = categoryAxis.tooltip;
    axisTooltip.background.fill = am4core.color("#00b3b3");
    axisTooltip.background.strokeWidth = 0;
    axisTooltip.background.cornerRadius = 3;
    axisTooltip.background.pointerLength = 0;
    axisTooltip.dy = 5;


    series.tooltip.getFillFromObject = false;
    series.tooltip.adapter.add("x", (x, target)=>{
        if(series.tooltip.tooltipDataItem.valueY < 0){
            series.tooltip.background.fill = chart.colors.getIndex(4);
        }
        else{
            series.tooltip.background.fill = chart.colors.getIndex(0);
        }
        return x;
    })

    }); // end am4core.ready()
}
