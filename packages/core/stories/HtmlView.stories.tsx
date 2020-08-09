import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { HtmlView } from '../src';

const articleContent = `
<h5>Lion</h5>
<img src="https://source.unsplash.com/IPRFX7CVVoU/288x288" alt="Lion" />

<p>
    The lion is a species in the family 
    <a href="https://en.wikipedia.org/wiki/Felidae">Felidae</a>.
    It is a muscular, deep-chested cat with a short, rounded head,
    a reduced neck and round ears, and a hairy tuft at the end of
    its tail.
</p>

<p>
    One of the most widely recognised animal symbols in human culture,
    the lion has been extensively depicted in sculptures and paintings,
    on national flags, and in contemporary films and literature.
</p>

<table style="font-size: 12px; width: 100%; margin-bottom: 8px">
    <thead>
        <tr>
            <th>Average</th>
            <th>Female</th>
            <th>Male</th>
        </tr>  
    </thead>
    <tbody>
        <tr>
            <td>Body length</td>        
            <td>160–184 cm</td>        
            <td>184–208 cm</td>        
        </tr>
        <tr>
            <td>Tail length</td>        
            <td>72–89.5 cm</td>        
            <td>82.5–93.5 cm</td>        
        </tr>
        <tr>
            <td>Weight</td>        
            <td>90.5–138 kg</td>        
            <td>155–169 kg</td>        
        </tr>
    </tbody>
</table>

<h6>References</h6>
<ul>
    <li>Wikipedia - <a href="https://en.wikipedia.org/wiki/Lion">Lion</a></li>
    <li>Cat Specialist Group - <a href="http://www.catsg.org/index.php?id=108">African Lion</a></li>
    <li><a href="http://www.lionconservationfund.org/">Lion Conservation Fund</a></li>
</ul>
`;

const cardContent = `
<img src="https://source.unsplash.com/9c_djeQTDyY/288x288" alt="Reading Material" />
<h6>Pre-Workshop Reading</h6>
<h6 class="rf-subtitle">React Basics</h6>
<p>
   Be sure to read the prerequisite material before the workshop.
</p>
`;

const htmlElementsContent = `
<h1 class="rf-mb-gutter">Headline 1</h1>
<h2 class="rf-mb-gutter">Headline 2</h2>
<h3 class="rf-mb-gutter">Headline 3</h3>
<h4 class="rf-mb-gutter">Headline 4</h4>
<h5 class="rf-mb-gutter">Headline 5</h5>
<h6 class="rf-mb-gutter">Headline 6</h6>
<h6 class="rf-subtitle1 rf-mb-gutter">Subtitle 1</h6>
<h6 class="rf-subtitle2 rf-mb-gutter">Subtitle 2</h6>

<p class="rf-body1 rf-mb-gutter">
    Body 1. The lion is a species in the family Felidae. It is a muscular,
    deep-chested cat with a short, rounded head, a reduced neck and
    round ears, and a hairy tuft at the end of its tail.
</p>


<p class="rf-body2 rf-mb-gutter">
    Body 2. The lion is a species in the family Felidae. It is a muscular,
    deep-chested cat with a short, rounded head, a reduced neck and
    round ears, and a hairy tuft at the end of its tail.
</p>

<p>
    <strong>Bold</strong><br />
    <em>Italic</em><br />
    <u>Underline</u><br />
    <s>Strikethrough</s><br />
    <code>Code</code>
</p>

<p>
    <a href="https://en.wikipedia.org/wiki/Lion">Lion</a>
</p>

<p>
    <img src="https://source.unsplash.com/IPRFX7CVVoU/288x288" alt="Lion" />
</p>

<ul>
    <li>The lion is a species in the family Felidae. It is a muscular,
    deep-chested cat with a short, rounded head, a reduced neck and
    round ears, and a hairy tuft at the end of its tail.</li>
    <li>One of the most widely recognised animal symbols in human culture,
    the lion has been extensively depicted in sculptures and paintings,
    on national flags, and in contemporary films and literature.</li>
</ul>

<ol>
    <li>The lion is a species in the family Felidae. It is a muscular,
    deep-chested cat with a short, rounded head, a reduced neck and
    round ears, and a hairy tuft at the end of its tail.</li>
    <li>One of the most widely recognised animal symbols in human culture,
    the lion has been extensively depicted in sculptures and paintings,
    on national flags, and in contemporary films and literature.</li>
</ol>

<blockquote>
    Ask not what your country can do for you,
    but what you can do for your country.
    - John F. Kennedy
</blockquote>

<pre>
<code>
const total = price * quantity;
const tax = total * taxRate
</code>
</pre>
`;

const metadata = {
    component: HtmlView,
    title: 'core/HtmlView',
};
export default metadata;

export const ArticleStory = () => {
    return <HtmlView maxWidth={320} html={articleContent} />;
};
ArticleStory.storyName = 'Article';

export const CardStory = () => {
    return <HtmlView maxWidth={320} html={cardContent} />;
};
CardStory.storyName = 'Card';

export const HtmlElementsStory = () => {
    return <HtmlView maxWidth={480} html={htmlElementsContent} />;
};
HtmlElementsStory.storyName = 'HTML Elements';

export const MuiTypographyStory = () => {
    return (
        <Box maxWidth={480}>
            <Typography variant="h1" gutterBottom>
                Headline 1
            </Typography>
            <Typography variant="h2" gutterBottom>
                Headline 2
            </Typography>
            <Typography variant="h3" gutterBottom>
                Headline 3
            </Typography>
            <Typography variant="h4" gutterBottom>
                Headline 4
            </Typography>
            <Typography variant="h5" gutterBottom>
                Headline 5
            </Typography>
            <Typography variant="h6" gutterBottom>
                Headline 6
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Subtitle 1
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Subtitle 2
            </Typography>
            <Typography variant="body1" gutterBottom>
                Body 1. The lion is a species in the family Felidae. It is a
                muscular, deep-chested cat with a short, rounded head, a reduced
                neck and round ears, and a hairy tuft at the end of its tail.
            </Typography>
            <Typography variant="body2" gutterBottom>
                Body 2. The lion is a species in the family Felidae. It is a
                muscular, deep-chested cat with a short, rounded head, a reduced
                neck and round ears, and a hairy tuft at the end of its tail.
            </Typography>
        </Box>
    );
};
MuiTypographyStory.storyName = 'MUI Typography';
