//
//  TrackDetailVC.swift
//  Capstone
//
//  Created by 유지훈 on 22/05/2019.
//  Copyright © 2019 유지훈. All rights reserved.
//

import UIKit
import Charts

class TrackDetailVC: UIViewController {

    var myavggrade: String?
    var swavggrade: String?
    var sw10avggrade: String?
    var TrackName: String?
    var ThreeGrade: [Double] = []
    
    
    @IBOutlet weak var trackname: UILabel!
    //트랙 이름
    
    @IBOutlet weak var view1: UIView!
    @IBOutlet weak var Avgrade: UILabel!
    //값 전달
    
    @IBOutlet weak var view2: UIView!
    @IBOutlet weak var SWavgrade: UILabel!
    //값 전달
    
    
    
    @IBOutlet weak var view3: UIView!
    @IBOutlet weak var SW10grade: UILabel!
    //값 전달
    
    
    
    @IBOutlet weak var chart: HorizontalBarChartView!
    
    
    var months: [String]!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        Avgrade.text = myavggrade;
        SWavgrade.text = swavggrade;
        SW10grade.text = sw10avggrade;
        trackname.text = TrackName;
        
        
        
        //박스 1모양
        view1.backgroundColor = UIColor.white
        view1.layer.cornerRadius = 9
        view1.layer.masksToBounds = true
        
        //그림자
        view1.layer.shadowColor = UIColor.darkGray.cgColor
        view1.layer.shadowOffset = CGSize(width: 0, height: 1)
        view1.layer.shadowRadius = 2
        view1.layer.shadowOpacity = 1
        view1.layer.masksToBounds = false

        //박스 2모양
        view2.backgroundColor = UIColor.white
        view2.layer.cornerRadius = 9
        view2.layer.masksToBounds = true
        
        //그림자
        view2.layer.shadowColor = UIColor.darkGray.cgColor
        view2.layer.shadowOffset = CGSize(width: 0, height: 1)
        view2.layer.shadowRadius = 2
        view2.layer.shadowOpacity = 1
        view2.layer.masksToBounds = false

        //박스 3모양
        view3.backgroundColor = UIColor.white
        view3.layer.cornerRadius = 9
        view3.layer.masksToBounds = true
        
        //그림자
        view3.layer.shadowColor = UIColor.darkGray.cgColor
        view3.layer.shadowOffset = CGSize(width: 0, height: 1)
        view3.layer.shadowRadius = 2
        view3.layer.shadowOpacity = 1
        view3.layer.masksToBounds = false

        
        
        
        
        
        
        
        
        
        // 수평 막대 차트
        chart.drawBarShadowEnabled = false
        chart.drawValueAboveBarEnabled = true
        chart.maxVisibleCount = 60
    
        let XAxis  = chart.xAxis
        XAxis.labelPosition = .bottom
        XAxis.drawAxisLineEnabled = true
        XAxis.drawGridLinesEnabled = false
        XAxis.granularity = 10.0
        
        let leftAxis = chart.leftAxis;
        leftAxis.drawAxisLineEnabled = true;
        leftAxis.drawGridLinesEnabled = true;
        leftAxis.axisMinimum = 0.0;
//        leftAxis.axisMinimum = startAtzero
        // this replaces startAtZero = YES
        
        let rightAxis = chart.rightAxis
        rightAxis.enabled = true;
        
        rightAxis.drawAxisLineEnabled = true;
        rightAxis.drawGridLinesEnabled = false;
        rightAxis.axisMinimum = 0.0; // this replaces startAtZero = YES
        
        let l = chart.legend
        l.enabled =  false
        
        chart.fitBars = true;
        
        setDataCount(count: 3, range: 4.5)
        
        
    }
    
    
    func setDataCount(count: Int, range: Double){
        
        let barWidth = 1.0
        let spaceForBar =  1.4;
        
        var yVals = [BarChartDataEntry]()
        
        let list = [1.0, 2.0, 3.0]
        
        
        //n번 트랙 값 전달 받기 (평균 점수, 상위 10프로, 자기 점수)
        //let varlist = [2.75, 3.83, 3.5]
        let varlist = ThreeGrade

        for i in 0..<count{
            
            yVals.append(BarChartDataEntry(x: list[i] * spaceForBar, y: varlist[i]))
            chart.tintColor = .black
        }
        
        var set1 : BarChartDataSet!
        
        if let count = chart.data?.dataSetCount, count > 0{
            set1 = chart.data?.dataSets[0] as! BarChartDataSet
            //set1.values = yVals


            set1.barBorderColor = .black;

            chart.data?.notifyDataChanged()
            chart.notifyDataSetChanged()
            
        }else{
            set1 = BarChartDataSet(entries: yVals, label: "DataSet")
            //set1.barBorderColor = .black;
            var dataSets = [BarChartDataSet]()
            dataSets.append(set1)
            
            let data = BarChartData(dataSets: dataSets)
            
            data.barWidth =  barWidth;
            
            chart.data = data
            
        }
        
        
        
        
    }
    


}
