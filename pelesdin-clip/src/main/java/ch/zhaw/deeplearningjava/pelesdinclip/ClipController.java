package ch.zhaw.deeplearningjava.pelesdinclip;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ai.djl.modality.cv.Image;
import ai.djl.modality.cv.ImageFactory;

import java.util.Arrays;

@RestController
public class ClipController {

    @GetMapping("/api/compare")
    public ResponseEntity<double[]> compareTextAndImage(@RequestParam String text1, @RequestParam String text2,
            @RequestParam String imageUrl) {
        try {
            Image img = ImageFactory.getInstance().fromUrl(imageUrl);
            ClipModel model = new ClipModel();
            float[] logit0 = model.compareTextAndImage(img, text1);
            float[] logit1 = model.compareTextAndImage(img, text2);
            double total = Arrays.stream(new double[] { logit0[0], logit1[0] }).map(Math::exp).sum();
            double[] probabilities = new double[] { Math.exp(logit0[0]) / total, Math.exp(logit1[0]) / total };
            model.close();
            return new ResponseEntity<>(probabilities, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
