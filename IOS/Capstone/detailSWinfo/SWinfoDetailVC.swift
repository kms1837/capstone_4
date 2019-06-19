//
//  SWinfoDetailVC.swift
//  Capstone
//
//  Created by 유지훈 on 30/05/2019.
//  Copyright © 2019 유지훈. All rights reserved.
//

import UIKit
import Charts

class SWinfoDetailVC: UIViewController {


    @IBOutlet weak var piechart: PieChartView!
    
    @IBOutlet weak var gradudateTV: UITableView!
    
    @IBAction func backpage(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    var grade = PieChartDataEntry(value: 0)
    var coding = PieChartDataEntry(value: 0)
    var math = PieChartDataEntry(value: 0)
    var teamwork = PieChartDataEntry(value: 0)
    var activity = PieChartDataEntry(value: 0)

    
    @IBOutlet weak var rankbox: UILabel!
    
    
    var GraduateList: [Graduate] = []
    
    
    
    //점수 차
    @IBOutlet weak var DifGrade: UILabel!
    
    @IBOutlet weak var DifCoding: UILabel!
    
    @IBOutlet weak var DifMath: UILabel!
    
    @IBOutlet weak var DifTeamwork: UILabel!
    
    @IBOutlet weak var DifActivity: UILabel!
    
    
    
    var numberOfDownloadsDataEntries = [PieChartDataEntry]()
   // var trackList2: [MainTrack] = []
    
    
    /*
     자료 정보
         radarchart.axes = ["수학", "스펙", "전공", "팀플", "코딩"] // Set axes by giving
 
     radarchart.addDataSet(values: [Float(0.367*2.0), Float(0.37*2.0), Float(0.365*2.0), Float(0.45*2.0), Float(0.359*2.0) ], color: .crimsonRed)

     
     "Grade": "3.65".
     
     "Coding": "3.59",
     
     "Math": "3.67",
     
     "Teamwork": "4.5",
     
     "Activity": "365",  => 3.65
     
     "Rank": "Gold",
     
     
     
    */
    
    
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        
        piechart.chartDescription?.text = ""
        
        // 값 /4.5 * 20 => 퍼센트 비율 값
        grade.value = (3.65 / 4.5 ) * 20
        grade.label = "학점"
      
        
        coding.value = (3.59 / 4.5 ) * 20
        coding.label = "코딩"
        
        math.value = (3.67 / 4.5 ) * 20
        math.label = "수학"

        teamwork.value = (4.5 / 4.5 ) * 20
        teamwork.label = "팀플"

        activity.value = (3.65 / 4.5 ) * 20
        activity.label = "스펙"

        numberOfDownloadsDataEntries = [grade,coding,math,teamwork,activity]
        //piechart.entryLabelColor? = UIColor.brownishGrey
      
        updateChartData()
        
        // 테이블 뷰
        let nibName = UINib(nibName: "GraduateTVC", bundle: nil)
        
        gradudateTV.register(nibName, forCellReuseIdentifier: "GraduateTVC")

        SetGraduateData()

        gradudateTV.dataSource = self
        gradudateTV.delegate = self
        
        
    }
    
    func updateChartData(){
        let chartDataSet = PieChartDataSet(entries: numberOfDownloadsDataEntries, label: nil)
        let chartData = PieChartData(dataSet: chartDataSet)
        let colors = [UIColor.chartcolor1, UIColor.chartcolor2, UIColor.chartcolor3, UIColor.chartcolor4, UIColor.chartcolor5]
        chartDataSet.colors = colors as! [NSUIColor]

        piechart.data = chartData
    }

    
    /*
    @IBAction func graphpopup(_ sender: Any) {
        displayMyAlertMessage(userMessage: "학교에 다니시며 받으신 점수로 산출한 결과입니다. 각 분야에 만점 점수는 4.5점이고 사용자는 어느 분야에 뛰어난지 직관적으로 확인이 가능합니다. \n\nCODING \nC언어 인증시험, 프로그래밍 -P, JAVA와 같은 실습이 있는 과목의 평균 학점 입니다. 때문에 이 분야에 점수가 높다면 기업의 코딩테스트점수에서 우수한 점수를 받을 확률이 높습니다.\n\nSPEC\nTOPCIT, 장학금여부등 교내에서 알 수 있는 스펙의 점수이며 이 외에 교외에서 상을타고 자격증을 취득하는등 좋은 대외활동이 있다면 언제든 관리자에게 요청해 SPEC을 추가할 수 있습니다.\n\nTEAMPLE\n교과목 중 팀플이 있었던 수업들의 평균 학점입니다. 만약 TEAMPLE 점수가 좋다면 기업에서 뛰어난 협업을 보여줄 가능성이 높습니다.\n\nMATH\n보통 수학을 잘하는 사람들이 CODING을 잘 한다고 합니다. 왜냐면 수학을 하며 논리성을 배우기 때문인데요. 그렇기에 MATH점수가 높다면 논리력이 뛰어날 확률이 높습니다.\n\nGRADE\n총 학점입니다. 이는 학교를 다니며 받은 모든 과목의 총 학점으로 이 점수가 높다면 해당 학생은 어떤 과목이든 가리지 않고 모든 과목을 성실히 이행하였다는 증거가 될것입니다.")
        
    }
    */

}


extension SWinfoDetailVC: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        return GraduateList.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = gradudateTV.dequeueReusableCell(withIdentifier: "GraduateTVC") as! GraduateTVC
        
        let gradu = GraduateList[indexPath.row]
        
        cell.Rank.text = gradu.GRURank
        cell.TVCgrade.text = gradu.GRUgrade
        cell.TVCcoding.text = gradu.GRUcoding
        cell.TVCmath.text = gradu.GRUmath
        cell.TVCteample.text = gradu.GRUteample
        cell.TVCactivity.text = gradu.GRUactivity
        cell.job.text = gradu.GRUjob
  
        
        return cell
    }
    
    
    func displayMyAlertMessage(userMessage:String){
        var myAlert = UIAlertController(title:"그래프 분석", message:
            userMessage, preferredStyle:
            UIAlertController.Style.alert);
        
        let okAction = UIAlertAction(title:"확인", style:
            UIAlertAction.Style.default, handler:nil);
        
        myAlert.addAction(okAction);
        
        self.present(myAlert, animated: true, completion: nil);
        
        
    }
}
extension SWinfoDetailVC {
    func SetGraduateData(){
 //       let bronze = Graduate("Bronze","2.0","2.0","2.0","2.0","2.0")
 //       let silver = Graduate("Silver","3.0","3.0","3.0","3.0","3.0")

        let gold = Graduate("Gold","3.7","3.6","3.8","3.72","4.0","나이스정보통신(주)")
        let gold2 = Graduate("Gold","3.5","3.45","4.0","3.9","3.8","한국인터넷진흥원")
        let gold3 = Graduate("Gold","3.6","3.7","4.0","4.02","3.7","한국정보인증")

//        let platinum = Graduate("Platinum","4.0","4.0","4.0","4.0","4.0")
//        let dia = Graduate("Dia","4.2","4.2","4.2","4.2","4.2")
//        let challenger = Graduate("Challenger","4.4","4.4","4.4","4.4","4.4")


        GraduateList = [gold,gold2,gold3]
    }
    
    
    
    
    
    
    
}
//테이블 뷰셀 크기 조정 
extension SWinfoDetailVC: UITableViewDelegate{
    
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return CGFloat(110)
    }
}
